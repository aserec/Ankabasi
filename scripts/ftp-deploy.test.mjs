import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import {
  ConfigError,
  PROTECTED_REMOTE_NAMES,
  applyDotEnv,
  assertDistReady,
  joinRemotePath,
  listDistFiles,
  loadFtpConfig,
  normalizeRemoteDir,
  parseCliArgs,
  parseDotEnv,
  planRemoteDeletes,
} from './ftp-deploy.lib.mjs';

const root = process.cwd();

describe('parseDotEnv', () => {
  it('parses keys, quoted values, and skips comments', () => {
    const parsed = parseDotEnv(`
# comment
FTP_HOST=ftp.example.com
FTP_USER="ankabasi"
FTP_PASSWORD='p@ss word'
FTP_REMOTE_DIR=/public_html
EMPTY=
NOEQUALS
    `);
    assert.equal(parsed.FTP_HOST, 'ftp.example.com');
    assert.equal(parsed.FTP_USER, 'ankabasi');
    assert.equal(parsed.FTP_PASSWORD, 'p@ss word');
    assert.equal(parsed.FTP_REMOTE_DIR, '/public_html');
    assert.equal(parsed.EMPTY, '');
    assert.equal(parsed.NOEQUALS, undefined);
  });
});

describe('applyDotEnv', () => {
  it('does not override variables already set in the environment', () => {
    const merged = applyDotEnv(
      { FTP_HOST: 'from-file', FTP_USER: 'file-user' },
      { FTP_HOST: 'already-set' },
    );
    assert.equal(merged.FTP_HOST, 'already-set');
    assert.equal(merged.FTP_USER, 'file-user');
  });

  it('ignores undefined existing values so a .env file can fill them in', () => {
    const merged = applyDotEnv({ FTP_HOST: 'from-file' }, { FTP_HOST: undefined });
    assert.equal(merged.FTP_HOST, 'from-file');
  });
});

describe('parseCliArgs', () => {
  it('reads flags and leftover values', () => {
    const args = parseCliArgs(['--dry-run', '--clean', '--verbose', '--env-file', '.env.prod']);
    assert.equal(args.dryRun, true);
    assert.equal(args.clean, true);
    assert.equal(args.verbose, true);
    assert.equal(args.check, false);
    assert.equal(args.help, false);
    assert.equal(args.envFile, '.env.prod');
  });

  it('defaults flags to off', () => {
    const args = parseCliArgs([]);
    assert.equal(args.dryRun, false);
    assert.equal(args.clean, false);
    assert.equal(args.verbose, false);
    assert.equal(args.check, false);
    assert.equal(args.help, false);
    assert.equal(args.envFile, '.env');
  });
});

describe('loadFtpConfig', () => {
  it('requires host, user, password, and remote directory', () => {
    assert.throws(() => loadFtpConfig({}), (err) => err instanceof ConfigError);
    assert.throws(
      () => loadFtpConfig({ FTP_HOST: 'h', FTP_USER: 'u', FTP_PASSWORD: 'p' }),
      /FTP_REMOTE_DIR/,
    );
  });

  it('loads defaults for port and secure', () => {
    const cfg = loadFtpConfig({
      FTP_HOST: 'ftp.ankabasi.com',
      FTP_USER: 'user',
      FTP_PASSWORD: 'secret',
      FTP_REMOTE_DIR: '/public_html',
    });
    assert.equal(cfg.host, 'ftp.ankabasi.com');
    assert.equal(cfg.user, 'user');
    assert.equal(cfg.password, 'secret');
    assert.equal(cfg.remoteDir, '/public_html');
    assert.equal(cfg.port, 21);
    assert.equal(cfg.secure, false);
  });

  it('parses FTPS and implicit TLS', () => {
    const explicit = loadFtpConfig({
      FTP_HOST: 'h',
      FTP_USER: 'u',
      FTP_PASSWORD: 'p',
      FTP_REMOTE_DIR: '/',
      FTP_SECURE: 'true',
      FTP_PORT: '990',
    });
    assert.equal(explicit.secure, true);
    assert.equal(explicit.port, 990);

    const implicit = loadFtpConfig({
      FTP_HOST: 'h',
      FTP_USER: 'u',
      FTP_PASSWORD: 'p',
      FTP_REMOTE_DIR: '/',
      FTP_SECURE: 'implicit',
    });
    assert.equal(implicit.secure, 'implicit');
  });
});

describe('remote paths', () => {
  it('normalizes remote directories', () => {
    assert.equal(normalizeRemoteDir('/'), '');
    assert.equal(normalizeRemoteDir('.'), '');
    assert.equal(normalizeRemoteDir(''), '');
    assert.equal(normalizeRemoteDir('public_html/'), '/public_html');
    assert.equal(normalizeRemoteDir('/public_html/es'), '/public_html/es');
  });

  it('joins local relative files onto the remote directory', () => {
    assert.equal(joinRemotePath('/public_html', 'es/index.html'), '/public_html/es/index.html');
    assert.equal(joinRemotePath('/', 'index.html'), '/index.html');
    assert.equal(joinRemotePath('.', 'sitemap-index.xml'), '/sitemap-index.xml');
  });
});

describe('dist listing', () => {
  /** @type {string} */
  let distDir;

  before(() => {
    distDir = mkdtempSync(join(tmpdir(), 'ankabasi-dist-'));
    mkdirSync(join(distDir, 'es'), { recursive: true });
    writeFileSync(join(distDir, 'index.html'), '<html></html>');
    writeFileSync(join(distDir, 'es', 'index.html'), '<html>es</html>');
    writeFileSync(join(distDir, '.DS_Store'), 'junk');
  });

  after(() => {
    rmSync(distDir, { recursive: true, force: true });
  });

  it('rejects a missing or empty dist folder', () => {
    const missing = join(distDir, 'does-not-exist');
    assert.throws(() => assertDistReady(missing), /dist/);
    const empty = mkdtempSync(join(tmpdir(), 'ankabasi-empty-'));
    try {
      assert.throws(() => assertDistReady(empty), /empty|no files/i);
    } finally {
      rmSync(empty, { recursive: true, force: true });
    }
  });

  it('lists files with posix relative paths and skips OS junk', () => {
    assertDistReady(distDir);
    const files = listDistFiles(distDir);
    assert.deepEqual(
      files.map((f) => f.relativePosix),
      ['es/index.html', 'index.html'],
    );
    assert.equal(files.every((f) => f.size > 0), true);
  });
});

describe('clean planning', () => {
  it('never deletes hosting-protected names', () => {
    for (const name of ['.htaccess', '.htpasswd', 'cgi-bin', '.well-known']) {
      assert.equal(PROTECTED_REMOTE_NAMES.has(name), true);
    }
    const deletes = planRemoteDeletes({
      localRelativePaths: ['index.html', 'es/index.html'],
      remoteRelativePaths: ['index.html', '.htaccess', 'old.html', 'cgi-bin'],
    });
    assert.deepEqual(deletes, ['old.html']);
  });
});

describe('gitignore', () => {
  it('keeps .env out of git', () => {
    const gi = readFileSync(join(root, '.gitignore'), 'utf8');
    assert.match(gi, /^\.env$/m);
  });
});
