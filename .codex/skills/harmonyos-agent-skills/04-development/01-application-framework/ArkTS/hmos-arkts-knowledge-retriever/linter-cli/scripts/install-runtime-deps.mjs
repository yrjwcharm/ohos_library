#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const nodeModulesRoot = path.join(packageRoot, 'node_modules');
const typescriptTargetDir = path.join(nodeModulesRoot, 'typescript');
const DEFAULT_TYPESCRIPT_REPO = 'https://gitcode.com/openharmony/third_party_typescript.git';
const DEFAULT_TYPESCRIPT_BRANCH = 'master';
const TYPESCRIPT_PACKAGE_FILES = [
  'bin',
  'lib',
  'LICENSE.txt',
  'README.md',
  'SECURITY.md',
  'ThirdPartyNoticeText.txt',
  'package.json'
];

main();

function main() {
  ensureDir(nodeModulesRoot);

  const args = parseArgs(process.argv.slice(2));
  const sourceDir = resolveTypescriptSourceDir(args);
  installTypescriptFromSource(sourceDir, typescriptTargetDir);

  process.stdout.write(
    [
      'Installed OpenHarmony TypeScript runtime for linter-cli.',
      `Source: ${sourceDir}`,
      `Target: ${typescriptTargetDir}`
    ].join('\n') + '\n'
  );
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index++) {
    const item = argv[index];
    if (!item.startsWith('--')) {
      fail(`Unknown argument: ${item}`);
    }

    const [rawKey, inlineValue] = item.slice(2).split('=', 2);
    const key = rawKey.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    if (inlineValue !== undefined) {
      args[key] = inlineValue;
      continue;
    }

    const next = argv[index + 1];
    if (next === undefined || next.startsWith('--')) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index++;
  }
  return args;
}

function resolveTypescriptSourceDir(args) {
  if (args.sourceDir) {
    const resolved = path.resolve(args.sourceDir);
    assertPackageJson(resolved);
    return resolved;
  }

  return cloneTypescriptRepo(args.branch);
}

function cloneTypescriptRepo(branch = DEFAULT_TYPESCRIPT_BRANCH) {
  const cloneRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'linter-cli-ohos-typescript-'));
  const targetDir = path.join(cloneRoot, 'third_party_typescript');

  run('git', [
    'clone',
    '--depth=1',
    '--branch',
    branch,
    DEFAULT_TYPESCRIPT_REPO,
    targetDir
  ]);

  assertPackageJson(targetDir);
  return targetDir;
}

function installTypescriptFromSource(sourceDir, targetDir) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  ensureDir(targetDir);

  for (const relativePath of TYPESCRIPT_PACKAGE_FILES) {
    const sourcePath = path.join(sourceDir, relativePath);
    if (!fs.existsSync(sourcePath)) {
      continue;
    }

    const targetPath = path.join(targetDir, relativePath);
    fs.cpSync(sourcePath, targetPath, { recursive: true });
  }

  assertPackageJson(targetDir);
  if (!fs.existsSync(path.join(targetDir, 'lib', 'typescript.js'))) {
    fail(`lib/typescript.js not found in ${sourceDir}`);
  }
}

function assertPackageJson(directory) {
  const packageJsonPath = path.join(directory, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    fail(`package.json not found in ${directory}`);
  }
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function run(command, args, options = {}) {
  try {
    return execFileSync(command, args, {
      cwd: options.cwd || packageRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    const details = [
      `Command failed: ${command} ${args.join(' ')}`,
      error.stdout ? `stdout:\n${error.stdout}` : '',
      error.stderr ? `stderr:\n${error.stderr}` : ''
    ].filter(Boolean).join('\n');
    fail(details);
  }
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
