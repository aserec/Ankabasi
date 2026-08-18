import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export class ConfigError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = 'ConfigError';
  }
}

export const PROTECTED_REMOTE_NAMES = new Set([
  '.htaccess',
  '.htpasswd',
  'cgi-bin',
  'error_log',
  'php.ini',
  '.well-known',
]);

const SKIP_LOCAL_NAMES = new Set(['.DS_Store', 'Thumbs.db']);

/**
 * @param {string} text
 * @returns {Record<string, string>}
 */
export function parseDotEnv(text) {
  /** @type {Record<string, string>} */
  const out = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

/**
 * File values fill gaps only; process env always wins.
 * @param {Record<string, string | undefined>} fromFile
 * @param {NodeJS.ProcessEnv | Record<string, string | undefined>} existing
 * @returns {Record<string, string | undefined>}
 */
export function applyDotEnv(fromFile, existing) {
  /** @type {Record<string, string | undefined>} */
  const merged = { ...fromFile };
  for (const [key, value] of Object.entries(existing)) {
    if (value !== undefined) merged[key] = value;
  }
  return merged;
}

/**
 * @param {string} envPath
 * @param {NodeJS.ProcessEnv | Record<string, string | undefined>} existing
 */
export function loadEnvFile(envPath, existing = process.env) {
  if (!existsSync(envPath)) return { ...existing };
  const parsed = parseDotEnv(readFileSync(envPath, 'utf8'));
  return applyDotEnv(parsed, existing);
}

/**
 * @param {string[]} argv
 */
export function parseCliArgs(argv) {
  /** @type {{ dryRun: boolean, clean: boolean, verbose: boolean, check: boolean, help: boolean, envFile: string }} */
  const args = {
    dryRun: false,
    clean: false,
    verbose: false,
    check: false,
    help: false,
    envFile: '.env',
  };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--dry-run') args.dryRun = true;
    else if (token === '--clean') args.clean = true;
    else if (token === '--verbose') args.verbose = true;
    else if (token === '--check') args.check = true;
    else if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--env-file') {
      args.envFile = argv[i + 1] ?? args.envFile;
      i += 1;
    }
  }
  return args;
}

/**
 * @param {string | undefined} value
 * @returns {boolean | 'implicit'}
 */
function parseSecure(value) {
  const raw = (value ?? '').trim().toLowerCase();
  if (raw === 'implicit') return 'implicit';
  return raw === 'true' || raw === '1' || raw === 'yes';
}

/**
 * @param {NodeJS.ProcessEnv | Record<string, string | undefined>} env
 */
export function loadFtpConfig(env) {
  const host = (env.FTP_HOST ?? '').trim();
  const user = (env.FTP_USER ?? '').trim();
  const password = env.FTP_PASSWORD ?? '';
  const remoteDir = (env.FTP_REMOTE_DIR ?? '').trim();
  const missing = [];
  if (!host) missing.push('FTP_HOST');
  if (!user) missing.push('FTP_USER');
  if (!password) missing.push('FTP_PASSWORD');
  if (!remoteDir) missing.push('FTP_REMOTE_DIR');
  if (missing.length) {
    throw new ConfigError(
      `Missing FTP settings: ${missing.join(', ')}. Copy .env.example to .env and fill them in.`,
    );
  }
  const portRaw = (env.FTP_PORT ?? '21').trim();
  const port = Number.parseInt(portRaw, 10);
  if (!Number.isInteger(port) || port <= 0) {
    throw new ConfigError(`FTP_PORT must be a positive integer, got "${portRaw}"`);
  }
  return {
    host,
    user,
    password,
    remoteDir,
    port,
    secure: parseSecure(env.FTP_SECURE),
  };
}

/**
 * @param {string} dir
 */
export function normalizeRemoteDir(dir) {
  const trimmed = (dir ?? '').trim();
  if (!trimmed || trimmed === '.' || trimmed === '/') return '';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
}

/**
 * @param {string} remoteDir
 * @param {string} relativePosix
 */
export function joinRemotePath(remoteDir, relativePosix) {
  const root = normalizeRemoteDir(remoteDir);
  const rel = relativePosix.replace(/^\/+/, '').replaceAll('\\', '/');
  return root ? `${root}/${rel}` : `/${rel}`;
}

/**
 * @param {string} distDir
 */
export function assertDistReady(distDir) {
  if (!existsSync(distDir) || !statSync(distDir).isDirectory()) {
    throw new ConfigError(
      `Build output folder not found: ${distDir}. Run \`npm run build\` first.`,
    );
  }
  const files = listDistFiles(distDir);
  if (files.length === 0) {
    throw new ConfigError(`Build output folder is empty: ${distDir}. Run \`npm run build\` first.`);
  }
}

/**
 * @param {string} distDir
 * @returns {{ relativePosix: string, absolute: string, size: number }[]}
 */
export function listDistFiles(distDir) {
  /** @type {{ relativePosix: string, absolute: string, size: number }[]} */
  const files = [];
  /**
   * @param {string} absDir
   * @param {string} relDir
   */
  function walk(absDir, relDir) {
    for (const name of readdirSync(absDir)) {
      if (SKIP_LOCAL_NAMES.has(name)) continue;
      const abs = join(absDir, name);
      const rel = relDir ? `${relDir}/${name}` : name;
      const st = statSync(abs);
      if (st.isDirectory()) walk(abs, rel);
      else {
        files.push({
          relativePosix: rel.replaceAll('\\', '/'),
          absolute: abs,
          size: st.size,
        });
      }
    }
  }
  walk(distDir, '');
  files.sort((a, b) => a.relativePosix.localeCompare(b.relativePosix));
  return files;
}

/**
 * @param {string} relativePosix
 */
export function isProtectedRemotePath(relativePosix) {
  const first = relativePosix.replace(/^\/+/, '').split('/')[0];
  return PROTECTED_REMOTE_NAMES.has(first);
}

/**
 * Extra remote files that would be removed with --clean.
 * @param {{ localRelativePaths: string[], remoteRelativePaths: string[] }} input
 */
export function planRemoteDeletes(input) {
  const local = new Set(input.localRelativePaths.map((p) => p.replace(/^\/+/, '')));
  return input.remoteRelativePaths
    .map((p) => p.replace(/^\/+/, ''))
    .filter((p) => !local.has(p) && !isProtectedRemotePath(p))
    .sort((a, b) => a.localeCompare(b));
}
