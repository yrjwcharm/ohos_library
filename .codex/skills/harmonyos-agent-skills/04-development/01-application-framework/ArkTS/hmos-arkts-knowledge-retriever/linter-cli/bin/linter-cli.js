#!/usr/bin/env node
/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const compilerDir = path.join(rootDir, 'runtime', 'compiler');

const EXIT_OK = 0;
const EXIT_DIAGNOSTIC_ERROR = 1;
const SDK_CONFIG_PREFIXES = ['@kit', '@ohos', '@system', '@arkts'];

main();

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    fail(error.message, EXIT_DIAGNOSTIC_ERROR);
  }

  if (args.help || !args.input) {
    printHelp();
    process.exit(args.help ? EXIT_OK : EXIT_DIAGNOSTIC_ERROR);
  }

  const inputPath = resolveFile(args.input, '--input');
  const cacheDir = resolvePath(args.cacheDir || path.join(process.cwd(), 'linter-cache'));
  const bundleName = args.bundleName || 'com.example.lintercli';
  const moduleName = args.moduleName || 'entry';
  const packageManagerType = args.packageManagerType || 'npm';

  ensureDir(cacheDir);

  const projectContext = createProjectContext({
    inputPath,
    cacheDir,
    bundleName,
    moduleName,
    moduleRoot: args.moduleRoot,
    projectRoot: args.projectRoot,
    moduleJson: args.moduleJson
  });
  const sdkConfig = configureSdkPaths(args.sdkPath, cacheDir);

  const diagnostics = [];
  const logger = createLogger(diagnostics);
  runChecker(projectContext, {
    inputPath,
    moduleName,
    packageManagerType,
    logger,
    etsLoaderPath: sdkConfig.etsLoaderPath
  });

  if (hasErrors(diagnostics)) {
    process.exit(EXIT_DIAGNOSTIC_ERROR);
  }

  process.stdout.write('Lint Check: OK\n');
  process.exit(EXIT_OK);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index++) {
    const item = argv[index];
    if (item === '--help' || item === '-h') {
      args.help = true;
      continue;
    }
    if (!item.startsWith('--')) {
      throw new Error(`Unknown argument: ${item}`);
    }
    const [rawKey, inlineValue] = item.slice(2).split('=', 2);
    const key = rawKey.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    if (inlineValue !== undefined) {
      setArg(args, key, inlineValue);
      continue;
    }
    const next = argv[index + 1];
    if (next === undefined || next.startsWith('--')) {
      args[key] = true;
      continue;
    }
    setArg(args, key, next);
    index++;
  }
  return args;
}

function setArg(args, key, value) {
  if (key === 'sdkPath') {
    args.sdkPath = args.sdkPath || [];
    args.sdkPath.push(value);
    return;
  }
  args[key] = value;
}

function printHelp() {
  const text = [
    'Usage:',
    '  node ./bin/linter-cli.js --input /abs/path/file.ets [options]',
    '',
    'Options:',
    '  --sdk-path PATH               SDK path. Repeatable. Supports WSL and Windows paths',
    '  --cache-dir PATH              Checker cache and generated helper directory',
    '  --module-root PATH            Module root override. Defaults to path before src/main/ets',
    '  --project-root PATH           Project root override. Defaults to nearest build-profile.json5/oh-package.json5',
    '  --module-json PATH            module.json/module.json5 override',
    '  --bundle-name NAME            Bundle name used in generated module.json',
    '  --module-name NAME            Module name used in generated module.json',
    '  --package-manager-type TYPE   npm or ohpm',
    '  --help                        Show this message'
  ].join('\n');
  process.stdout.write(`${text}\n`);
}

function resolveFile(filePath, optionName) {
  const resolved = resolvePath(filePath);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    fail(`Invalid value for ${optionName}: ${resolved}`, EXIT_DIAGNOSTIC_ERROR);
  }
  return resolved;
}

function resolveDirectory(directoryPath, optionName) {
  const resolved = resolvePath(directoryPath);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
    fail(`Invalid value for ${optionName}: ${resolved}`, EXIT_DIAGNOSTIC_ERROR);
  }
  return resolved;
}

function resolvePath(inputPath) {
  if (typeof inputPath !== 'string') {
    return inputPath;
  }
  const normalized = inputPath.replace(/\\/g, '/');
  if (process.platform === 'win32') {
    const wslMountMatch = normalized.match(/^\/mnt\/([a-zA-Z])\/(.*)$/);
    if (wslMountMatch) {
      return path.resolve(`${wslMountMatch[1].toUpperCase()}:/${wslMountMatch[2]}`);
    }
    return path.resolve(normalized);
  }
  const windowsMatch = normalized.match(/^([a-zA-Z]):\/(.*)$/);
  if (windowsMatch) {
    return path.resolve('/mnt', windowsMatch[1].toLowerCase(), windowsMatch[2]);
  }
  return path.resolve(normalized);
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function createProjectContext(options) {
  const moduleRoot = options.moduleRoot ?
    resolveDirectory(options.moduleRoot, '--module-root') :
    inferModuleRoot(options.inputPath);
  const projectRoot = options.projectRoot ?
    resolveDirectory(options.projectRoot, '--project-root') :
    inferProjectRoot(moduleRoot);
  const moduleJsonPath = options.moduleJson ?
    resolveFile(options.moduleJson, '--module-json') :
    resolveModuleJson(moduleRoot, options.cacheDir, options.bundleName, options.moduleName);
  const globalsPath = createGlobalsFile(options.cacheDir);

  return {
    projectRoot,
    moduleRoot,
    moduleJsonPath,
    globalsPath,
    buildDir: path.join(options.cacheDir, 'build'),
    checkerCacheDir: path.join(options.cacheDir, 'checker'),
    resolveModulePaths: collectResolveModulePaths(projectRoot, moduleRoot)
  };
}

function inferModuleRoot(inputPath) {
  const unixInput = inputPath.replace(/\\/g, '/');
  const marker = '/src/main/ets/';
  const index = unixInput.lastIndexOf(marker);
  if (index === -1) {
    fail(`Cannot infer module root from --input. Use --module-root for files outside src/main/ets: ${inputPath}`,
      EXIT_DIAGNOSTIC_ERROR);
  }
  return unixInput.slice(0, index);
}

function inferProjectRoot(moduleRoot) {
  const found = findUp(moduleRoot, ['build-profile.json5', 'oh-package.json5']);
  return found || moduleRoot;
}

function findUp(startDir, fileNames) {
  let current = path.resolve(startDir);
  while (true) {
    if (fileNames.some((fileName) => fs.existsSync(path.join(current, fileName)))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return undefined;
    }
    current = parent;
  }
}

function resolveModuleJson(moduleRoot, cacheDir, bundleName, moduleName) {
  const candidates = [
    path.join(moduleRoot, 'src', 'main', 'module.json5'),
    path.join(moduleRoot, 'src', 'main', 'module.json'),
    path.join(moduleRoot, 'module.json5'),
    path.join(moduleRoot, 'module.json')
  ];
  const existing = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (existing) {
    return existing;
  }

  const fallbackDir = path.join(cacheDir, 'generated');
  const fallbackPath = path.join(fallbackDir, 'module.json');
  ensureDir(fallbackDir);
  fs.writeFileSync(fallbackPath, JSON.stringify({
    app: {
      bundleName,
      minAPIVersion: 8
    },
    module: {
      name: moduleName,
      type: 'entry'
    }
  }, null, 2));
  return fallbackPath;
}

function createGlobalsFile(cacheDir) {
  const generatedDir = path.join(cacheDir, 'generated');
  const globalsPath = path.join(generatedDir, 'linter-cli-globals.d.ts');
  ensureDir(generatedDir);
  fs.writeFileSync(globalsPath, [
    'declare interface ArkTsLintCliConsole {',
    '  log(...args: Object[]): void;',
    '  info(...args: Object[]): void;',
    '  warn(...args: Object[]): void;',
    '  error(...args: Object[]): void;',
    '  debug(...args: Object[]): void;',
    '}',
    'declare const console: ArkTsLintCliConsole;',
    'declare function setTimeout(handler: () => void, timeout?: number): number;',
    'declare function clearTimeout(handle?: number): void;',
    'declare function setInterval(handler: () => void, timeout?: number): number;',
    'declare function clearInterval(handle?: number): void;'
  ].join('\n'));
  return globalsPath;
}

function collectResolveModulePaths(projectRoot, moduleRoot) {
  return [
    path.join(moduleRoot, 'oh_modules'),
    path.join(projectRoot, 'oh_modules'),
    path.join(moduleRoot, 'node_modules'),
    path.join(projectRoot, 'node_modules')
  ].filter((modulePath, index, array) => {
    return array.indexOf(modulePath) === index &&
      fs.existsSync(modulePath) &&
      fs.statSync(modulePath).isDirectory();
  });
}

function configureSdkPaths(sdkPathArgs, cacheDir) {
  const rawSdkPaths = Array.isArray(sdkPathArgs) ? sdkPathArgs : sdkPathArgs ? [sdkPathArgs] : [];
  if (rawSdkPaths.length === 0) {
    return {};
  }

  const externalApiPaths = [];
  let etsLoaderPath;
  rawSdkPaths.forEach((rawSdkPath) => {
    collectSdkRoots(resolveDirectory(rawSdkPath, '--sdk-path')).forEach((sdkRoot) => {
      if (!etsLoaderPath && isOpenHarmonyEtsSdkRoot(sdkRoot)) {
        etsLoaderPath = sdkRoot;
      }
      externalApiPaths.push(...createExternalApiConfigPaths(sdkRoot, cacheDir));
    });
  });

  if (externalApiPaths.length > 0) {
    const existing = process.env.externalApiPaths ? process.env.externalApiPaths.split(path.delimiter) : [];
    process.env.externalApiPaths = [...existing, ...externalApiPaths].join(path.delimiter);
  }
  return { etsLoaderPath };
}

function collectSdkRoots(sdkPath) {
  const candidates = [
    sdkPath,
    path.join(sdkPath, 'ets'),
    path.join(sdkPath, 'openharmony', 'ets'),
    path.join(sdkPath, 'hms', 'ets')
  ];
  const roots = [];
  candidates.forEach((candidate) => {
    if (isSdkRoot(candidate) && !roots.includes(candidate)) {
      roots.push(candidate);
    }
  });
  return roots.length > 0 ? roots : [sdkPath];
}

function isSdkRoot(sdkPath) {
  return fs.existsSync(path.join(sdkPath, 'sdkConfig.json')) || isOpenHarmonyEtsSdkRoot(sdkPath);
}

function isOpenHarmonyEtsSdkRoot(sdkPath) {
  return ['api', 'arkts', 'kits', 'component'].some((directory) => {
    const directoryPath = path.join(sdkPath, directory);
    return fs.existsSync(directoryPath) && fs.statSync(directoryPath).isDirectory();
  });
}

function createExternalApiConfigPaths(sdkRoot, cacheDir) {
  if (fs.existsSync(path.join(sdkRoot, 'sdkConfig.json'))) {
    return [sdkRoot];
  }
  if (!isOpenHarmonyEtsSdkRoot(sdkRoot)) {
    return [];
  }

  const apiPaths = ['api', 'arkts', 'kits', 'component']
    .map((directory) => path.join(sdkRoot, directory))
    .filter((directoryPath) => fs.existsSync(directoryPath) && fs.statSync(directoryPath).isDirectory());
  const configRoot = path.join(cacheDir, 'generated', 'sdk-configs', stablePathName(sdkRoot));
  return SDK_CONFIG_PREFIXES.map((prefix) => {
    const prefixDir = path.join(configRoot, prefix.slice(1));
    ensureDir(prefixDir);
    fs.writeFileSync(path.join(prefixDir, 'sdkConfig.json'), JSON.stringify({
      apiPath: apiPaths,
      prefix
    }, null, 2));
    return prefixDir;
  });
}

function stablePathName(value) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^_+|_+$/g, '') || 'sdk';
}

function createLogger(diagnostics) {
  const write = (level, values) => {
    const message = values.map(formatLogValue).join(' ').trim();
    if (!message) {
      return;
    }
    diagnostics.push({ level, message });
    const stream = level === 'error' ? process.stderr : process.stdout;
    stream.write(`${message}\n`);
  };
  return {
    debug: (...args) => write('debug', args),
    info: (...args) => write('info', args),
    warn: (...args) => write('warn', args),
    error: (...args) => write('error', args)
  };
}

function formatLogValue(value) {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (value instanceof Error) {
    return value.stack || value.message;
  }
  return String(value);
}

function hasErrors(diagnostics) {
  return diagnostics.some((item) => item.level === 'error' || item.message.includes('ArkTS:ERROR'));
}

function runChecker(projectContext, options) {
  ensureDir(projectContext.buildDir);
  ensureDir(projectContext.checkerCacheDir);
  const { etsStandaloneChecker } = require(path.join(compilerDir, 'lib', 'ets_checker'));
  etsStandaloneChecker({
    './main': options.inputPath,
    './linter-cli-globals': projectContext.globalsPath
  }, options.logger, {
    projectPath: projectContext.moduleRoot,
    projectRootPath: projectContext.projectRoot,
    modulePath: projectContext.moduleRoot,
    buildPath: projectContext.buildDir,
    cachePath: projectContext.checkerCacheDir,
    aceModuleBuild: projectContext.buildDir,
    aceModuleJsonPath: projectContext.moduleJsonPath,
    packageManagerType: options.packageManagerType,
    compilerTypes: [],
    compileMode: 'moduleJson',
    moduleRootPath: projectContext.moduleRoot,
    resolveModulePaths: projectContext.resolveModulePaths,
    strictCheckerOnly: true,
    compatibleSdkVersion: 10,
    allowEtsAnnotations: true,
    etsLoaderPath: options.etsLoaderPath,
    projectArkOption: {
      arkTSVersion: 'ArkTS_1_1',
      tscConfig: {
        targetESVersion: 'ES2021'
      }
    }
  });
}

function fail(message, exitCode) {
  process.stderr.write(`${message}\n`);
  process.exit(exitCode);
}
