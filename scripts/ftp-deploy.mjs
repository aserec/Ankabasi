#!/usr/bin/env node
/**
 * Upload the Astro `dist/` folder to the configured FTP server.
 *
 * Usage:
 *   npm run deploy              # build, then upload
 *   npm run deploy:ftp          # upload existing dist/
 *   npm run deploy:ftp:dry      # list files, do not connect
 *   npm run deploy:ftp:check    # connect and list remote dir, do not upload
 *
 * Credentials come from `.env` (see `.env.example`). Never commit `.env`.
 */
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ConfigError,
  assertDistReady,
  joinRemotePath,
  listDistFiles,
  loadEnvFile,
  loadFtpConfig,
  normalizeRemoteDir,
  parseCliArgs,
  planRemoteDeletes,
} from './ftp-deploy.lib.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');

const USAGE = `Upload dist/ to FTP.

Usage:
  node scripts/ftp-deploy.mjs [options]

Options:
  --dry-run          List local files and remote destinations; do not connect
  --check            Connect and list the remote directory; do not upload
  --clean            Delete remote files that are not in dist/ (never .htaccess, cgi-bin, .well-known)
  --verbose          Log every FTP command
  --env-file <path>  Env file to read (default: .env)
  -h, --help         Show this help

Required environment variables (from .env or the shell):
  FTP_HOST  FTP_USER  FTP_PASSWORD  FTP_REMOTE_DIR

Optional:
  FTP_PORT  FTP_SECURE  FTP_TLS_REJECT_UNAUTHORIZED
`;

function fail(message, code = 1) {
  console.error(message);
  process.exit(code);
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * @param {import('basic-ftp').Client} client
 * @param {string} remoteDir
 */
async function enterRemoteDir(client, remoteDir) {
  const normalized = normalizeRemoteDir(remoteDir);
  if (!normalized) {
    console.log(`Using FTP login directory (${await client.pwd()}) as upload root.`);
    return;
  }
  try {
    await client.cd(normalized);
  } catch {
    await client.ensureDir(normalized);
  }
  console.log(`Remote working directory: ${await client.pwd()}`);
}

/**
 * @param {import('basic-ftp').Client} client
 * @param {string} prefix
 * @returns {Promise<string[]>}
 */
async function listRemoteFilesRecursive(client, prefix = '') {
  const listing = await client.list();
  /** @type {string[]} */
  const out = [];
  for (const entry of listing) {
    if (entry.name === '.' || entry.name === '..') continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory) {
      await client.cd(entry.name);
      out.push(...(await listRemoteFilesRecursive(client, rel)));
      await client.cdup();
    } else {
      out.push(rel);
    }
  }
  return out;
}

async function main() {
  const args = parseCliArgs(process.argv.slice(2));
  if (args.help) {
    console.log(USAGE);
    return;
  }

  const envPath = resolve(root, args.envFile);
  const env = loadEnvFile(envPath, process.env);

  let config;
  try {
    config = loadFtpConfig(env);
    assertDistReady(distDir);
  } catch (err) {
    if (err instanceof ConfigError) fail(err.message);
    throw err;
  }

  const files = listDistFiles(distDir);
  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

  console.log(`Local build: ${distDir} (${files.length} files, ${formatBytes(totalBytes)})`);
  console.log(`FTP host:    ${config.host}:${config.port}`);
  console.log(`FTP user:    ${config.user}`);
  console.log(`Remote dir:  ${config.remoteDir}`);
  console.log(`TLS:         ${config.secure === false ? 'off (plain FTP)' : config.secure}`);
  if (!existsSync(envPath) && !process.env.FTP_HOST) {
    console.warn(`Note: ${args.envFile} was not found. Using process environment only.`);
  }

  if (args.dryRun) {
    console.log('\nDry run — nothing will be uploaded:\n');
    for (const file of files) {
      console.log(`  ${file.relativePosix}  →  ${joinRemotePath(config.remoteDir, file.relativePosix)}`);
    }
    if (args.clean) {
      console.log(
        '\n--clean is set: extra remote files under the remote dir would be deleted (except .htaccess, cgi-bin, .well-known, …).',
      );
    }
    return;
  }

  const { Client } = await import('basic-ftp');
  const client = new Client(30_000);
  client.ftp.verbose = args.verbose;

  try {
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port,
      secure: config.secure,
      secureOptions:
        config.secure === false
          ? undefined
          : { rejectUnauthorized: env.FTP_TLS_REJECT_UNAUTHORIZED !== 'false' },
    });

    await enterRemoteDir(client, config.remoteDir);

    if (args.check) {
      const listing = await client.list();
      console.log(`\nConnected. Remote directory has ${listing.length} entries. No files uploaded (--check).`);
      for (const entry of listing) {
        const kind = entry.isDirectory ? 'dir ' : 'file';
        console.log(`  ${kind}  ${entry.name}`);
      }
      return;
    }

    if (args.clean) {
      const remoteFiles = await listRemoteFilesRecursive(client);
      const deletes = planRemoteDeletes({
        localRelativePaths: files.map((f) => f.relativePosix),
        remoteRelativePaths: remoteFiles,
      });
      console.log(`\nCleaning ${deletes.length} remote file(s) not present in dist/…`);
      for (const rel of deletes) {
        await client.remove(rel);
        console.log(`  deleted ${rel}`);
      }
    }

    console.log(`\nUploading ${files.length} files from dist/…`);
    let lastName = '';
    client.trackProgress((info) => {
      if (info.name && info.name !== lastName) {
        lastName = info.name;
        if (args.verbose) console.log(`  ${info.name}`);
      }
    });
    await client.uploadFromDir(distDir);
    client.trackProgress();
    console.log(
      `\nUpload complete: ${files.length} files → ${config.host}${joinRemotePath(config.remoteDir, '')}`,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    fail(`FTP upload failed: ${message}`);
  } finally {
    client.close();
  }
}

main();
