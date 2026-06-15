/*
 * Copyright (c) 2020 Huawei Device Co., Ltd.
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

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const JSON5 = require('json5');

const {
  readFile,
  writeFileSync,
  resourcesRawfile,
  getStoredFileInfo,
  hspRawfileResources
} = require('./lib/utils');

const {
  COLD_RELOAD_MODE,
  ES2ABC,
  FAIL,
  TEST_RUNNER_DIR_SET,
  TS2ABC,
  WORKERS_DIR,
  APIVERSION
} = require('./lib/pre_define');

const {
  checkAotConfig
} = require('./lib/gen_aot');

const logger = {
  debug: (...args) => console.debug(...args),
  info: (...args) => console.info(...args),
  warn: (...args) => console.warn(...args),
  error: (...args) => console.error(...args)
};

let staticPreviewPage = process.env.aceStaticPreview;
let aceCompileMode = process.env.aceCompileMode || 'page';
const abilityConfig = {
  abilityType: process.env.abilityType || 'page',
  abilityEntryFile: null,
  projectAbilityPath: [],
  testRunnerFile: []
};
const projectConfig = {};
const resources = {
  app: {},
  sys: {}
};
const rawfileResources = new Map();
const systemModules = [];
const abilityPagesFullPath = new Set();
let globalModulePaths = [];
let sdkConfigs = [];
let defaultSdkConfigs = [];
let extendSdkConfigs = [];
let sdkConfigPrefix = 'ohos|system|kit|arkts';
let ohosSystemModulePaths = [];
let ohosSystemModuleSubDirPaths = [];
let allModulesPaths = [];
let externalApiCheckPlugin = new Map();
let externalApiMethodPlugin = new Map();
let fileDeviceCheckPlugin = new Map();
let fileAvailableCheckPlugin = new Map();
let suppressWarningsCheckPlugin = new Map();
// 拓展SDK校验插件
let externalApiCheckerMap = new Map();

function initProjectConfig(projectConfig) {
  initProjectPathConfig(projectConfig);
  projectConfig.entryObj = {};
  projectConfig.entryArrayForObf = []; // Only used for arkguard
  projectConfig.cardObj = {};
  projectConfig.aceBuildJson = projectConfig.aceBuildJson || process.env.aceBuildJson;
  projectConfig.xtsMode = /ets_loader_ark$/.test(__dirname) || process.env.xtsMode === 'true';
  projectConfig.isPreview = projectConfig.isPreview || process.env.isPreview === 'true';
  projectConfig.compileMode = projectConfig.compileMode || process.env.compileMode || 'jsbundle';
  projectConfig.runtimeOS = projectConfig.runtimeOS || process.env.runtimeOS || 'default';
  projectConfig.sdkInfo = projectConfig.sdkInfo || process.env.sdkInfo || 'default';
  projectConfig.compileHar = false;
  projectConfig.compileShared = false;
  projectConfig.splitCommon = false;
  projectConfig.allowEtsAnnotations = true;
  projectConfig.checkEntry = projectConfig.checkEntry || process.env.checkEntry;
  projectConfig.obfuscateHarType = projectConfig.obfuscateHarType || process.env.obfuscate;
  projectConfig.packageDir = 'node_modules';
  projectConfig.packageJson = 'package.json';
  projectConfig.packageManagerType = 'npm';
  projectConfig.cardEntryObj = {};
  projectConfig.compilerTypes = [];
  projectConfig.isCrossplatform = projectConfig.isCrossplatform || false;
  projectConfig.enableDebugLine = projectConfig.enableDebugLine || process.env.enableDebugLine || false;
  projectConfig.bundleType = projectConfig.bundleType || process.env.bundleType || '';
  projectConfig.optLazyForEach = false;
  projectConfig.hspResourcesMap = false;
  projectConfig.useArkoala = false;
  projectConfig.resetBundleName = false;
  projectConfig.integratedHsp = false;
  projectConfig.useTsHar = false;
  projectConfig.optTryCatchFunc = true;
  // All files which dependent on bytecode har, and should be added to compilation entries.
  projectConfig.otherCompileFiles = {};
  // Packages which need to update version in bytecode har 
  projectConfig.updateVersionInfo = undefined;
  projectConfig.allowEmptyBundleName = false;
  projectConfig.uiTransformOptimization = false;
  projectConfig.ignoreCrossplatformCheck = false;
  projectConfig.strictCheckerOnly = false;
}

function initProjectPathConfig(projectConfig) {
  projectConfig.projectPath = projectConfig.projectPath || process.env.aceModuleRoot ||
    path.join(process.cwd(), 'sample');
  projectConfig.buildPath = projectConfig.buildPath || process.env.aceModuleBuild ||
    path.resolve(projectConfig.projectPath, 'build');
  projectConfig.aceModuleBuild = projectConfig.buildPath; // To be compatible with both webpack and rollup
  projectConfig.manifestFilePath = projectConfig.manifestFilePath || process.env.aceManifestPath ||
    path.join(projectConfig.projectPath, 'manifest.json');
  projectConfig.aceProfilePath = projectConfig.aceProfilePath || process.env.aceProfilePath;
  projectConfig.aceModuleJsonPath = projectConfig.aceModuleJsonPath || process.env.aceModuleJsonPath;
  projectConfig.aceSuperVisualPath = projectConfig.aceSuperVisualPath || process.env.aceSuperVisualPath;
  projectConfig.hashProjectPath = projectConfig.hashProjectPath ||
    hashProjectPath(projectConfig.projectPath);
  projectConfig.cachePath = projectConfig.cachePath || process.env.cachePath ||
    path.resolve(__dirname, 'node_modules/.cache');
  projectConfig.aceSoPath = projectConfig.aceSoPath || process.env.aceSoPath;
  projectConfig.localPropertiesPath = projectConfig.localPropertiesPath || process.env.localPropertiesPath;
  projectConfig.projectProfilePath = projectConfig.projectProfilePath || process.env.projectProfilePath;
}

function loadMemoryTrackingConfig(projectConfig) {
  projectConfig.enableMemoryDotting = process.env.enableMemoryDotting || false;
  projectConfig.memoryDottingPath = path.resolve(projectConfig.buildPath, '../', '../', 'dottingfile');
  // recordInterval config, unit is ms
  projectConfig.memoryDottingRecordInterval = process.env.memoryDottingRecordInterval || 100;
  // records the config interval for writing files， unit is ms. 
  projectConfig.memoryDottingWriteFileInterval = process.env.memoryDottingWriteFileInterval || 1000;
}

function loadEntryObj(projectConfig) {
  let manifest = {};
  initMain();
  initProjectConfig(projectConfig);
  loadMemoryTrackingConfig(projectConfig);
  loadBuildJson();

  if (process.env.aceManifestPath && aceCompileMode === 'page') {
    setEntryFile(projectConfig);
    setFaTestRunnerFile(projectConfig);
  }
  if (process.env.aceModuleJsonPath) {
    setStartupPagesForObf(projectConfig);
    setIntentEntryPages(projectConfig);
    setAbilityPages(projectConfig);
    setStageTestRunnerFile(projectConfig);
    loadNavigationConfig(aceBuildJson);
  }

  if (staticPreviewPage) {
    projectConfig.entryObj['./' + staticPreviewPage] = projectConfig.projectPath + path.sep +
      staticPreviewPage + '.ets?entry';
    setEntryArrayForObf(staticPreviewPage);
  } else if (abilityConfig.abilityType === 'page') {
    if (fs.existsSync(projectConfig.manifestFilePath)) {
      const jsonString = fs.readFileSync(projectConfig.manifestFilePath).toString();
      manifest = JSON.parse(jsonString);
      if (manifest && manifest.minPlatformVersion) {
        process.env.minPlatformVersion = manifest.minPlatformVersion;
        partialUpdateController(manifest.minPlatformVersion);
      }
      projectConfig.pagesJsonFileName = 'config.json';
    } else if (projectConfig.aceModuleJsonPath && fs.existsSync(projectConfig.aceModuleJsonPath)) {
      process.env.compileMode = 'moduleJson';
      buildManifest(manifest, projectConfig.aceModuleJsonPath);
    } else {
      throw Error('\u001b[31m ERROR: the manifest file ' + projectConfig.manifestFilePath.replace(/\\/g, '/') +
        ' or module.json is lost or format is invalid. \u001b[39m').message;
    }
    if (!projectConfig.compileHar) {
      if (manifest.pages) {
        const pages = manifest.pages;
        pages.forEach((element) => {
          const sourcePath = element.replace(/^\.\/ets\//, '');
          const fileName = path.resolve(projectConfig.projectPath, sourcePath + '.ets');
          if (fs.existsSync(fileName)) {
            projectConfig.entryObj['./' + sourcePath] = fileName + '?entry';
            // Collect the file paths in main_pages.json
            setEntryArrayForObf(sourcePath);
          } else {
            throw Error('\u001b[31m10906403 ArkTS Compiler Error' + '\n' +
              'Error Message: ' + `Page '${fileName.replace(/\\/g, '/')}' does not exist. \u001b[39m`)
              .message;
          }
        });
      } else {
        throw Error('\u001b[31m ERROR: missing pages attribute in ' +
          projectConfig.manifestFilePath.replace(/\\/g, '/') +
          '. \u001b[39m').message;
      }
    }
  }
}

function readJsonFile(filePath) {
  try {
    if (filePath && fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath).toString());
    }
  } catch (e) {
    throw Error('\x1B[31m' + `BUIDERROR: the ${filePath} file format is invalid.` +
      '\x1B[39m').message;
  }
  return null;
}

function setStartupPagesForObf(projectConfig) {
  const moduleJson = readJsonFile(projectConfig.aceModuleJsonPath);
  if (moduleJson && moduleJson.module && moduleJson.module.appStartup) {
    const startupFileName = `${moduleJson.module.appStartup.replace(/\$profile\:/, '')}.json`;
    const startupFilePath = path.resolve(projectConfig.aceProfilePath, startupFileName);
    const startupConfig = readJsonFile(startupFilePath);
    if (!startupConfig) {
      return;
    }
    setEntryArrayForObf(startupConfig.configEntry);
    startupConfig.startupTasks?.forEach(task => {
      if (task.srcEntry) {
        setEntryArrayForObf(task.srcEntry);
      }
    });
  }
}

function loadNavigationConfig(aceBuildJson) {
  if (aceBuildJson && aceBuildJson.routerMap && Array.isArray(aceBuildJson.routerMap)) {
    aceBuildJson.routerMap.forEach((item) => {
      if (item.pageSourceFile && (item.name || item.name === '') && item.buildFunction) {
        const filePath = path.resolve(item.pageSourceFile);
        setEntryArrayForObf(filePath);
        const storedFileInfo = getStoredFileInfo();
        if (storedFileInfo.routerInfo.has(filePath)) {
          storedFileInfo.routerInfo.get(filePath).push({ name: item.name, buildFunction: item.buildFunction });
        } else {
          storedFileInfo.routerInfo.set(filePath, [{ name: item.name, buildFunction: item.buildFunction }]);
        }
      }
    });
  }
}

function buildManifest(manifest, aceConfigPath) {
  try {
    const moduleConfigJson = JSON.parse(fs.readFileSync(aceConfigPath).toString());
    manifest.type = process.env.abilityType;
    if (moduleConfigJson && moduleConfigJson.app && moduleConfigJson.app.minAPIVersion) {
      if (moduleConfigJson.module && moduleConfigJson.module.metadata) {
        partialUpdateController(moduleConfigJson.app.minAPIVersion, moduleConfigJson.module.metadata,
          moduleConfigJson.module.type);
        stageOptimization(moduleConfigJson.module.metadata);
      } else {
        partialUpdateController(moduleConfigJson.app.minAPIVersion);
      }
    }
    if (moduleConfigJson.module) {
      switch (moduleConfigJson.module.type) {
        case 'har':
          projectConfig.compileHar = true;
          getPackageJsonEntryPath();
          break;
        case 'shared':
          projectConfig.compileShared = true;
          getPackageJsonEntryPath();
          manifest.pages = getPages(moduleConfigJson);
          break;
        default:
          manifest.pages = getPages(moduleConfigJson);
          break;
      }
    } else {
      throw Error('\u001b[31m' +
        'BUIDERROR: the config.json file miss key word module || module[abilities].' +
        '\u001b[39m').message;
    }
  } catch (e) {
    if (/BUIDERROR/.test(e)) {
      throw Error(e.replace('BUIDERROR', 'ERROR')).message;
    } else {
      throw Error('\x1B[31m' + 'ERROR: the module.json file is lost or format is invalid.' +
        '\x1B[39m').message;
    }
  }
}

function getPackageJsonEntryPath() {
  let rootPackageJsonPath = path.resolve(projectConfig.projectPath, '../../../' + projectConfig.packageJson);
  if (fs.existsSync(rootPackageJsonPath)) {
    let rootPackageJsonContent;
    try {
      rootPackageJsonContent = (projectConfig.packageManagerType === 'npm' ?
        JSON : JSON5).parse(fs.readFileSync(rootPackageJsonPath, 'utf-8'));
    } catch (e) {
      throw Error('\u001b[31m' + 'BUIDERROR: ' + rootPackageJsonPath + ' format is invalid.' + '\u001b[39m').message;
    }
    if (rootPackageJsonContent) {
      if (rootPackageJsonContent.module) {
        getEntryPath(rootPackageJsonContent.module, rootPackageJsonPath);
      } else if (rootPackageJsonContent.main) {
        getEntryPath(rootPackageJsonContent.main, rootPackageJsonPath);
      } else {
        getEntryPath('', rootPackageJsonPath);
      }
    } else if (projectConfig.compileHar && !projectConfig.customizedHar) {
      throw Error('\u001b[31m' + 'BUIDERROR: lack message in ' + projectConfig.packageJson + '.' +
        '\u001b[39m').message;
    }
  }
}

function supportSuffix(mainEntryPath) {
  if (fs.existsSync(path.join(mainEntryPath, 'index.ets'))) {
    mainEntryPath = path.join(mainEntryPath, 'index.ets');
  } else if (fs.existsSync(path.join(mainEntryPath, 'index.ts'))) {
    mainEntryPath = path.join(mainEntryPath, 'index.ts');
  } else if (fs.existsSync(path.join(mainEntryPath, 'index.js'))) {
    mainEntryPath = path.join(mainEntryPath, 'index.js');
  } else if (projectConfig.compileHar && !projectConfig.customizedHar) {
    throw Error('\u001b[31m' + 'BUIDERROR: not find entry file in ' + projectConfig.packageJson +
      '.' + '\u001b[39m').message;
  }
  return mainEntryPath;
}

function supportExtName(mainEntryPath) {
  if (path.extname(mainEntryPath) === '') {
    if (fs.existsSync(mainEntryPath + '.ets')) {
      mainEntryPath = mainEntryPath + '.ets';
    } else if (fs.existsSync(mainEntryPath + '.ts')) {
      mainEntryPath = mainEntryPath + '.ts';
    } else if (fs.existsSync(mainEntryPath + '.js')) {
      mainEntryPath = mainEntryPath + '.js';
    }
  }
  return mainEntryPath;
}

function getEntryPath(entryPath, rootPackageJsonPath) {
  let mainEntryPath = path.resolve(rootPackageJsonPath, '../', entryPath);
  if (fs.existsSync(mainEntryPath) && fs.statSync(mainEntryPath).isDirectory()) {
    mainEntryPath = supportSuffix(mainEntryPath);
  } else {
    mainEntryPath = supportExtName(mainEntryPath);
  }
  if (fs.existsSync(mainEntryPath) && fs.statSync(mainEntryPath).isFile()) {
    const entryKey = path.relative(projectConfig.projectPath, mainEntryPath);
    projectConfig.entryObj[entryKey] = mainEntryPath;
    setEntryArrayForObf(entryKey);
    abilityPagesFullPath.add(path.resolve(mainEntryPath).toLowerCase());
  } else if (projectConfig.compileHar && !projectConfig.customizedHar) {
    throw Error('\u001b[31m' + `BUIDERROR: not find entry file in ${rootPackageJsonPath}.` + '\u001b[39m').message;
  }
}

function stageOptimization(metadata) {
  if (Array.isArray(metadata) && metadata.length) {
    metadata.some(item => {
      if (item.name && item.name === 'USE_COMMON_CHUNK' &&
        item.value && item.value === 'true') {
        projectConfig.splitCommon = true;
        return true;
      }
    });
  }
}

function getPages(configJson) {
  const pages = [];
  let pagesJsonFileName = '';
  // pages is not necessary in stage
  if (process.env.compileMode === 'moduleJson' && configJson.module && configJson.module.pages) {
    pagesJsonFileName = `${configJson.module.pages.replace(/\$profile\:/, '')}.json`;
  } else {
    return pages;
  }
  const modulePagePath = path.resolve(projectConfig.aceProfilePath, pagesJsonFileName);
  if (fs.existsSync(modulePagePath)) {
    try {
      const pagesConfig = JSON.parse(fs.readFileSync(modulePagePath, 'utf-8'));
      if (pagesConfig && pagesConfig.src) {
        projectConfig.pagesJsonFileName = pagesJsonFileName;
        return pagesConfig.src;
      }
    } catch (e) {
      throw Error('\x1B[31m' + `BUIDERROR: the ${modulePagePath} file format is invalid.` +
        '\x1B[39m').message;
    }
  }
  return pages;
}

function setEntryFile(projectConfig) {
  const entryFileName = abilityConfig.abilityType === 'page' ? 'app' : abilityConfig.abilityType;
  const extendFile = entryFileName === 'app' ? '.ets' : '.ts';
  const entryFileRealPath = entryFileName + extendFile;
  const entryFilePath = path.resolve(projectConfig.projectPath, entryFileRealPath);
  abilityConfig.abilityEntryFile = entryFilePath;
  if (!fs.existsSync(entryFilePath) && aceCompileMode === 'page') {
    throw Error(`\u001b[31m ERROR: missing ${entryFilePath.replace(/\\/g, '/')}. \u001b[39m`).message;
  }
  projectConfig.entryObj[`./${entryFileName}`] = entryFilePath + '?entry';
  setEntryArrayForObf(entryFileName);
}

function setIntentEntryPages(projectConfig) {
  projectConfig.intentEntry.forEach(pages => {
    const entryKey = path.relative(projectConfig.projectPath, pages).replace(/\.(ets|ts|js)$/, '');
    projectConfig.entryObj[entryKey] = pages;
    if (/\.ets$/.test(pages)) {
      abilityPagesFullPath.add(path.resolve(pages).toLowerCase());
    }
  });
}

function setAbilityPages(projectConfig) {
  let abilityPages = [];
  if (projectConfig.aceModuleJsonPath && fs.existsSync(projectConfig.aceModuleJsonPath)) {
    const moduleJson = JSON.parse(fs.readFileSync(projectConfig.aceModuleJsonPath).toString());
    abilityPages = readAbilityEntrance(moduleJson);
    setAbilityFile(projectConfig, abilityPages);
    setBundleModuleInfo(projectConfig, moduleJson);
  }
}

function setTestRunnerFile(projectConfig, isStageBased) {
  const index = projectConfig.projectPath.split(path.sep).join('/').lastIndexOf('\/');
  TEST_RUNNER_DIR_SET.forEach((dir) => {
    const projectPath = isStageBased ? projectConfig.projectPath : projectConfig.projectPath.substring(0, index + 1);
    const testRunnerPath = path.resolve(projectPath, dir);
    if (fs.existsSync(testRunnerPath) && folderExistsCaseSensitive(testRunnerPath)) {
      const testRunnerFiles = [];
      readFile(testRunnerPath, testRunnerFiles);
      testRunnerFiles.forEach((item) => {
        if (/\.(ts|js|ets)$/.test(item)) {
          if (/\.ets$/.test(item)) {
            abilityPagesFullPath.add(path.resolve(item).toLowerCase());
          }
          const relativePath = path.relative(testRunnerPath, item).replace(/\.(ts|js|ets)$/, '');
          if (isStageBased) {
            projectConfig.entryObj[`./${dir}/${relativePath}`] = item;
          } else {
            projectConfig.entryObj[`../${dir}/${relativePath}`] = item;
          }
          setEntryArrayForObf(dir, relativePath);
          abilityConfig.testRunnerFile.push(item);
        }
      });
    }
  });
}

// entryPath: the filename of the entry file and the name of the outer directory.
// The directory should be placed before the filename, and the filename must be the last argument.
function setEntryArrayForObf(...entryPath) {
  projectConfig.entryArrayForObf?.push(entryPath.join('/'));
}

function folderExistsCaseSensitive(folderPath) {
  try {
    const folders = fs.readdirSync(path.dirname(folderPath), { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
    const targetFolderName = path.basename(folderPath);
    return folders.includes(targetFolderName);
  } catch (error) {
    return false;
  }
}

function setFaTestRunnerFile(projectConfig) {
  setTestRunnerFile(projectConfig, false);
}

function setStageTestRunnerFile(projectConfig) {
  setTestRunnerFile(projectConfig, true);
}

function setBundleModuleInfo(projectConfig, moduleJson) {
  if (moduleJson.module) {
    projectConfig.moduleName = moduleJson.module.name;
  }
  if (moduleJson.app) {
    projectConfig.bundleName = moduleJson.app.bundleName;
  }
}

function setAbilityFile(projectConfig, abilityPages) {
  abilityPages.forEach(abilityPath => {
    if (abilityPath.endsWith('.so')) {
      return;
    }
    const projectAbilityPath = path.resolve(projectConfig.projectPath, '../', abilityPath);
    if (path.isAbsolute(abilityPath)) {
      abilityPath = '.' + abilityPath.slice(projectConfig.projectPath.length);
    }
    const entryPageKey = abilityPath.replace(/^\.\/ets\//, './').replace(/\.ts$/, '').replace(/\.ets$/, '');
    if (fs.existsSync(projectAbilityPath)) {
      abilityConfig.projectAbilityPath.push(projectAbilityPath);
      projectConfig.entryObj[entryPageKey] = projectAbilityPath + '?entry';
      setEntryArrayForObf(entryPageKey);
    } else {
      const projectAbilityDeclFilePath = projectAbilityPath.replace(/\.ts$/, '.d.ts').replace(/\.ets$/, '.d.ets');
      if (projectConfig.customizedHar && fs.existsSync(projectAbilityDeclFilePath)) {
        return;
      }
      throw Error(
        `\u001b[31m ERROR: srcEntry file '${projectAbilityPath.replace(/\\/g, '/')}' does not exist. \u001b[39m`
      ).message;
    }
  });
}

function readAbilityEntrance(moduleJson) {
  const abilityPages = [];
  if (moduleJson.module) {
    const moduleSrcEntrance = moduleJson.module.srcEntrance;
    const moduleSrcEntry = moduleJson.module.srcEntry;
    if (moduleSrcEntry) {
      abilityPages.push(moduleSrcEntry);
      abilityPagesFullPath.add(getAbilityFullPath(projectConfig.projectPath, moduleSrcEntry));
    } else if (moduleSrcEntrance) {
      abilityPages.push(moduleSrcEntrance);
      abilityPagesFullPath.add(getAbilityFullPath(projectConfig.projectPath, moduleSrcEntrance));
    }
    if (moduleJson.module.abilities && moduleJson.module.abilities.length > 0) {
      setEntrance(moduleJson.module.abilities, abilityPages);
    }
    if (moduleJson.module.extensionAbilities && moduleJson.module.extensionAbilities.length > 0) {
      setEntrance(moduleJson.module.extensionAbilities, abilityPages);
      setCardPages(moduleJson.module.extensionAbilities);
    }
  }
  return abilityPages;
}

function setEntrance(abilityConfig, abilityPages) {
  if (abilityConfig && abilityConfig.length > 0) {
    abilityConfig.forEach(ability => {
      if (ability.srcEntry) {
        abilityPages.push(ability.srcEntry);
        abilityPagesFullPath.add(getAbilityFullPath(projectConfig.projectPath, ability.srcEntry));
      } else if (ability.srcEntrance) {
        abilityPages.push(ability.srcEntrance);
        abilityPagesFullPath.add(getAbilityFullPath(projectConfig.projectPath, ability.srcEntrance));
      }
    });
  }
}

function setCardPages(extensionAbilities) {
  if (extensionAbilities && extensionAbilities.length > 0) {
    extensionAbilities.forEach(extensionAbility => {
      if (extensionAbility.metadata) {
        extensionAbility.metadata.forEach(metadata => {
          if (metadata.resource) {
            readCardResource(metadata.resource);
          }
        });
      }
    });
  }
}

function readCardResource(resource) {
  const cardJsonFileName = `${resource.replace(/\$profile\:/, '')}.json`;
  const modulePagePath = path.resolve(projectConfig.aceProfilePath, cardJsonFileName);
  if (fs.existsSync(modulePagePath)) {
    const cardConfig = JSON.parse(fs.readFileSync(modulePagePath, 'utf-8'));
    if (cardConfig.forms) {
      cardConfig.forms.forEach(form => {
        readCardForm(form);
      });
    }
  }
}

function readCardForm(form) {
  if ((form.type && form.type === 'eTS') ||
    (form.uiSyntax && form.uiSyntax === 'arkts')) {
    const sourcePath = form.src.replace(/\.ets$/, '');
    const cardPath = path.resolve(projectConfig.projectPath, '..', sourcePath + '.ets');
    if (cardPath && fs.existsSync(cardPath)) {
      projectConfig.entryObj['../' + sourcePath] = cardPath + '?entry';
      setEntryArrayForObf(sourcePath);
      projectConfig.cardEntryObj['../' + sourcePath] = cardPath;
      projectConfig.cardObj[cardPath] = sourcePath.replace(/^\.\//, '');
    }
  }
}

function getAbilityFullPath(projectPath, abilityPath) {
  const finalPath = path.resolve(path.resolve(projectPath, '../'), abilityPath);
  if (fs.existsSync(finalPath)) {
    return finalPath.toLowerCase();
  } else {
    return path.resolve(abilityPath).toLowerCase();
  }
}

function loadWorker(projectConfig, workerFileEntry) {
  if (workerFileEntry) {
    projectConfig.entryObj = Object.assign(projectConfig.entryObj, workerFileEntry);
    const keys = Object.keys(workerFileEntry);
    for (const key of keys) {
      setEntryArrayForObf(key);
    }
  } else {
    const workerPath = path.resolve(projectConfig.projectPath, WORKERS_DIR);
    if (fs.existsSync(workerPath)) {
      const workerFiles = [];
      readFile(workerPath, workerFiles);
      workerFiles.forEach((item) => {
        if (/\.(ts|js|ets)$/.test(item)) {
          const relativePath = path.relative(workerPath, item)
            .replace(/\.(ts|js|ets)$/, '').replace(/\\/g, '/');
          projectConfig.entryObj[`./${WORKERS_DIR}/` + relativePath] = item;
          setEntryArrayForObf(WORKERS_DIR, relativePath);
          abilityPagesFullPath.add(path.resolve(item).toLowerCase());
        }
      });
    }
  }
}

let aceBuildJson = {};
function loadBuildJson() {
  if (projectConfig.aceBuildJson && fs.existsSync(projectConfig.aceBuildJson)) {
    aceBuildJson = JSON.parse(fs.readFileSync(projectConfig.aceBuildJson).toString());
  }
  if (aceBuildJson.packageManagerType === 'ohpm') {
    projectConfig.packageManagerType = 'ohpm';
    projectConfig.packageDir = 'oh_modules';
    projectConfig.packageJson = 'oh-package.json5';
  }
  // add the oh-exports visibility file
  projectConfig.ohExports = aceBuildJson['oh-exports'] || [];
  // add intent framework entry file
  projectConfig.intentEntry = aceBuildJson.compileEntry || [];
  if (!!aceBuildJson.otherCompileFiles) {
    aceBuildJson.otherCompileFiles.forEach(pages => {
      const entryKey = path.relative(projectConfig.projectPath, pages).replace(/\.(ets|ts|js|mjs|cjs)$/, '');
      projectConfig.otherCompileFiles[entryKey] = pages;
      if (/\.ets$/.test(pages)) {
        abilityPagesFullPath.add(path.resolve(pages).toLowerCase());
      }
    });
  }
  if (!!aceBuildJson.byteCodeHar) {
    projectConfig.useTsHar = true;
  }

  projectConfig.customizedHar = !!aceBuildJson.customizedHar;

  if (aceBuildJson.updateVersionInfo) {
    projectConfig.updateVersionInfo = aceBuildJson.updateVersionInfo;
  }

  // Add the value of the oh-exports field to the filename obfuscation whitelist.
  let ohExports = aceBuildJson['oh-exports'];
  if (Array.isArray(ohExports) && ohExports.length !== 0) {
    ohExports.forEach(ohExportPath => {
      setEntryArrayForObf(ohExportPath);
    });
  }
}

function initBuildInfo() {
  projectConfig.projectRootPath = aceBuildJson.projectRootPath;
  if (projectConfig.compileHar && aceBuildJson.moduleName &&
    aceBuildJson.modulePathMap[aceBuildJson.moduleName]) {
    projectConfig.moduleRootPath = aceBuildJson.modulePathMap[aceBuildJson.moduleName];
  }
}

function readWorkerFile() {
  const workerFileEntry = {};
  if (aceBuildJson.workers) {
    aceBuildJson.workers.forEach(worker => {
      if (!/\.(ts|js|ets)$/.test(worker)) {
        throw Error(
          '\u001b[31m10906402 ArkTS Compiler Error' + '\n' +
          'Error Message: ' + 'File: ' + worker + '.' + '\n' +
          "The worker file can only be an '.ets', '.ts', or '.js' file.\u001b[39m"
        ).message;
      }
      const relativePath = path.relative(projectConfig.projectPath, worker);
      if (filterWorker(relativePath)) {
        const workerKey = relativePath.replace(/\.(ts|js)$/, '').replace(/\\/g, '/');
        if (workerFileEntry[workerKey]) {
          throw Error(
            '\u001b[31m10905407 ArkTS Compiler Error' + '\n' +
            'Error Message: ' + 'The worker file cannot use the same file name: \n' +
            workerFileEntry[workerKey] + '\n' + worker + '\u001b[39m'
          ).message;
        } else {
          workerFileEntry[workerKey] = worker;
          abilityPagesFullPath.add(path.resolve(workerFileEntry[workerKey]).toLowerCase());
        }
      }
    });
    return workerFileEntry;
  }
  return null;
}

function readPatchConfig() {
  if (aceBuildJson.patchConfig) {
    projectConfig.hotReload = (process.env.watchMode === 'true' && !projectConfig.isPreview) ||
      aceBuildJson.patchConfig.mode === 'hotReload';
    projectConfig.coldReload = aceBuildJson.patchConfig.mode === COLD_RELOAD_MODE ? true : false;
    // The "isFirstBuild" field indicates whether it is the first compilation of cold reload mode
    // It is determined by hvigor and passed via env
    projectConfig.isFirstBuild = process.env.isFirstBuild === 'false' ? false : true;
    projectConfig.patchAbcPath = aceBuildJson.patchConfig.patchAbcPath;
    projectConfig.changedFileList = aceBuildJson.patchConfig.changedFileList ?
      aceBuildJson.patchConfig.changedFileList : path.join(projectConfig.cachePath, 'changedFileList.json');
    projectConfig.removeChangedFileListInSdk = aceBuildJson.patchConfig.removeChangedFileListInSdk === 'true' || false;
    if (!projectConfig.removeChangedFileListInSdk && projectConfig.hotReload) {
      writeFileSync(projectConfig.changedFileList, JSON.stringify({
        modifiedFiles: [],
        removedFiles: []
      }));
    }
  }
}

function filterWorker(workerPath) {
  return /\.(ts|js|ets)$/.test(workerPath);
}

; (function initSystemResource() {
  const sysResourcePath = path.resolve(__dirname, './sysResource.js');
  if (fs.existsSync(sysResourcePath)) {
    resources.sys = require(sysResourcePath).sys;
  }
  if (!process.env.externalApiPaths) {
    return;
  }
  const sdkPaths = process.env.externalApiPaths.split(path.delimiter);
  for (let i = 0; i < sdkPaths.length; i++) {
    const sysResourceExtPath = path.resolve(__dirname, sdkPaths[i], 'sysResource.js');
    if (!fs.existsSync(sysResourceExtPath)) {
      continue;
    }
    Object.entries(require(sysResourceExtPath).sys).forEach(([key, value]) => {
      if (key in resources.sys) {
        Object.assign(resources.sys[key], value);
      }
    });
  }
})();

; (function readSystemModules() {
  const apiDirPath = path.resolve(__dirname, '../../api');
  const arktsDirPath = path.resolve(__dirname, '../../arkts');
  const kitsDirPath = path.resolve(__dirname, '../../kits');
  const systemModulePathArray = [apiDirPath];
  if (!process.env.isFaMode) {
    systemModulePathArray.push(arktsDirPath, kitsDirPath);
  }
  systemModulePathArray.forEach(systemModulesPath => {
    if (fs.existsSync(systemModulesPath)) {
      globalModulePaths.push(systemModulesPath);
      const modulePaths = [];
      readFile(systemModulesPath, modulePaths);
      systemModules.push(...fs.readdirSync(systemModulesPath));
      ohosSystemModulePaths.push(...modulePaths);
      const moduleSubdir = modulePaths.filter(filePath => {
        const dirName = path.dirname(filePath);
        return !(dirName === apiDirPath || dirName === arktsDirPath || dirName === kitsDirPath);
      }).map(filePath => {
        return filePath
          .replace(apiDirPath, '')
          .replace(arktsDirPath, '')
          .replace(kitsDirPath, '')
          .replace(/\\/g, '/')
          .replace(/(^\/)|(.d.e?ts$)/g, '');
      });
      ohosSystemModuleSubDirPaths.push(...moduleSubdir);
      allModulesPaths.push(...modulePaths);
    }
  });
  defaultSdkConfigs = [
    {
      'apiPath': systemModulePathArray,
      'prefix': '@ohos'
    }, {
      'apiPath': systemModulePathArray,
      'prefix': '@system'
    }, {
      'apiPath': systemModulePathArray,
      'prefix': '@arkts'
    }
  ];
  const externalApiPathStr = process.env.externalApiPaths || '';
  const externalApiPaths = externalApiPathStr.split(path.delimiter);
  collectExternalModules(externalApiPaths);
  sdkConfigs = [...defaultSdkConfigs, ...extendSdkConfigs];
})();

/**
 * Plugin configuration object structure.
 * @typedef {Object} PluginConfig
 * @property {string} tag - Plugin tag (e.g., "since", "available")
 * @property {string} type - Plugin type (e.g., "CompatibilityCheck", "FormatValidation")
 * @property {string} path - Absolute path to plugin file
 * @property {string} functionName - Function name to load from plugin
 */

/**
 * Collects external API check plugins from SDK config.
 * Loads plugins and stores them with keys: {osName}/{tag}/{type}
 * 
 * Plugin key format: {osName}/{tag}/{type}
 * Example: "since/CompatibilityCheck"
 * 
 * @param {Object} sdkConfig - SDK configuration object
 * @param {string} sdkPath - Base SDK path for resolving plugin paths
 */
function collectExternalApiCheckPlugin(sdkConfig, sdkPath) {
  const osName = sdkConfig.osName;
  if (!osName) {
    return;
  }

  const pluginGroups = [
    sdkConfig.apiCheckPlugin,
    sdkConfig.annotationCheckPlugin
  ].filter(Boolean);
  for (let i = 0; i < pluginGroups.length; i++) {
    const pluginGroup = pluginGroups[i];

    for (const config of pluginGroup) {
      let pluginKey = '';
      
      if (config.type) {
        // New format: has type field
        // Key: {osName}/{tag}/{type}
        pluginKey = [osName, config.tag, config.type].join('/');
      } else {
        // Old format: no type field
        // Key: {osName}/{tag}
        pluginKey = [osName, config.tag].join('/');
      }

      const pluginConfig = {
        ...config,
        path: path.resolve(sdkPath, config.path)
      };

      const existingPlugins = externalApiCheckPlugin.get(pluginKey) || [];
      existingPlugins.push(pluginConfig);
      externalApiCheckPlugin.set(pluginKey, existingPlugins);
    }
  }
}

/**
 * Collects external API check plugins from SDK config.
 * Loads plugins and stores them with keys: {osName}/{tag}/{type}
 * 
 * Plugin key format: {osName}/{tag}/{type}
 * Example: "since/CompatibilityCheck"
 * 
 * @param {Object} sdkConfig - SDK configuration object
 * @param {string} sdkPath - Base SDK path for resolving plugin paths
 */
function collectExternalApiChecker(sdkConfig, sdkPath) {
  if (!sdkConfig.apiCheckPlugins || sdkConfig.apiCheckPlugins.length === 0) {
    return;
  }
  const apiCheckPlugins = sdkConfig.apiCheckPlugins;
  if (!apiCheckPlugins || apiCheckPlugins.length === 0) {
    return;
  }
  apiCheckPlugins.forEach(plugin => {
    const externalModulePath = path.resolve(sdkPath, plugin.path);
    if (!fs.existsSync(externalModulePath)) {
      return;
    }
    try {
      const externalModule = require(path.resolve(sdkPath, plugin.path));
      const externalChecker = new externalModule[plugin.className];
      if (externalApiCheckerMap.get(plugin.tagName)) {
        externalApiCheckerMap.set(plugin.tagName, externalApiCheckerMap.get(plugin.tagName).push(externalChecker));
      } else {
        externalApiCheckerMap.set(plugin.tagName, [externalChecker]);
      }
    } catch (error) {
      return;
    }
  });
}

function collectExternalModules(sdkPaths) {
  for (let i = 0; i < sdkPaths.length; i++) {
    const sdkPath = sdkPaths[i];
    const sdkConfigPath = path.resolve(sdkPath, 'sdkConfig.json');
    if (!fs.existsSync(sdkConfigPath)) {
      continue;
    }
    const sdkConfig = JSON.parse(fs.readFileSync(sdkConfigPath, 'utf-8'));
    if (!sdkConfig.apiPath) {
      continue;
    }

    if (sdkConfig.apiCheckPlugin && sdkConfig.apiCheckPlugin.length > 0) {
      // TODO: 待合并
      collectExternalApiCheckPlugin(sdkConfig, sdkPath);
    }
    collectExternalApiChecker(sdkConfig, sdkPath);
    let externalApiPathArray = [];
    if (Array.isArray(sdkConfig.apiPath)) {
      externalApiPathArray = sdkConfig.apiPath;
    } else {
      externalApiPathArray.push(sdkConfig.apiPath);
    }
    const resolveApiPathArray = [];
    externalApiPathArray.forEach(element => {
      const resolvePath = path.resolve(sdkPath, element);
      resolveApiPathArray.push(resolvePath);
      if (fs.existsSync(resolvePath)) {
        const extrenalModulePaths = [];
        globalModulePaths.push(resolvePath);
        systemModules.push(...fs.readdirSync(resolvePath));
        readFile(resolvePath, extrenalModulePaths);
        allModulesPaths.push(...extrenalModulePaths);
      }
    });
    sdkConfigPrefix += `|${sdkConfig.prefix.replace(/^@/, '')}`;
    sdkConfig.apiPath = resolveApiPathArray;
    extendSdkConfigs.push(sdkConfig);
  }
}

function readHspResource() {
  if (aceBuildJson.hspResourcesMap) {
    projectConfig.hspResourcesMap = true;
    for (const hspName in aceBuildJson.hspResourcesMap) {
      if (fs.existsSync(aceBuildJson.hspResourcesMap[hspName])) {
        const resourceMap = new Map();
        const hspResourceCollect = resources[hspName] = {};
        const hspResource = fs.readFileSync(aceBuildJson.hspResourcesMap[hspName], 'utf-8');
        const resourceArr = hspResource.split(/\n/);
        processResourceArr(resourceArr, resourceMap, aceBuildJson.hspResourcesMap[hspName]);
        for (const [key, value] of resourceMap) {
          hspResourceCollect[key] = value;
        }
      }
      const hspRawFileSource = path.join(aceBuildJson.hspResourcesMap[hspName], '../resources/rawfile');
      if (fs.existsSync(hspRawFileSource) && fs.statSync(hspRawFileSource).isDirectory()) {
        const tempHspRawfileResource = [];
        hspRawfileResources(hspRawFileSource, tempHspRawfileResource, '');
        rawfileResources.set(hspName, tempHspRawfileResource);
      }
    }
  }
}

function readAppResource(filePath) {
  readHspResource();
  if (fs.existsSync(filePath)) {
    const appResource = fs.readFileSync(filePath, 'utf-8');
    const resourceArr = appResource.split(/\n/);
    const resourceMap = new Map();
    processResourceArr(resourceArr, resourceMap, filePath);
    for (let [key, value] of resourceMap) {
      resources.app[key] = value;
    }
  }
  if (process.env.rawFileResource && process.env.compileMode === 'moduleJson') {
    resourcesRawfile(process.env.rawFileResource, getStoredFileInfo().resourcesArr);
  }
}

function processResourceArr(resourceArr, resourceMap, filePath) {
  for (let i = 0; i < resourceArr.length; i++) {
    if (!resourceArr[i].length) {
      continue;
    }
    const resourceData = resourceArr[i].split(/\s/);
    if (resourceData.length === 3 && !isNaN(Number(resourceData[2]))) {
      if (resourceMap.get(resourceData[0])) {
        const resourceKeys = resourceMap.get(resourceData[0]);
        if (!resourceKeys[resourceData[1]] || resourceKeys[resourceData[1]] !== Number(resourceData[2])) {
          resourceKeys[resourceData[1]] = Number(resourceData[2]);
        }
      } else {
        let obj = {};
        obj[resourceData[1]] = Number(resourceData[2]);
        resourceMap.set(resourceData[0], obj);
      }
      if (process.env.compileTool === 'rollup' && process.env.compileMode === 'moduleJson') {
        getStoredFileInfo().updateResourceList(resourceData[0] + '_' + resourceData[1]);
      }
    } else {
      logger.warn(`\u001b[31m ArkTS:WARN The format of file '${filePath}' is incorrect. \u001b[39m`);
      break;
    }
  }
}

function hashProjectPath(projectPath) {
  const hash = crypto.createHash('sha256');
  hash.update(projectPath.toString());
  process.env.hashProjectPath = '_' + hash.digest('hex');
  return process.env.hashProjectPath;
}

function loadModuleInfo(projectConfig, envArgs) {
  if (projectConfig.aceBuildJson && fs.existsSync(projectConfig.aceBuildJson)) {
    const buildJsonInfo = JSON.parse(fs.readFileSync(projectConfig.aceBuildJson).toString());
    if (buildJsonInfo.compileMode) {
      projectConfig.compileMode = buildJsonInfo.compileMode;
    }
    projectConfig.projectRootPath = buildJsonInfo.projectRootPath;
    projectConfig.modulePathMap = buildJsonInfo.modulePathMap;
    projectConfig.isOhosTest = buildJsonInfo.isOhosTest;
    let faultHandler = function (error) {
      // rollup's error will be handled in fast build
      if (process.env.compileTool === 'rollup') {
        return;
      }
      logger.error(error);
      process.exit(FAIL);
    };
    projectConfig.es2abcCompileTsInAotMode = true;
    projectConfig.es2abcCompileTsInNonAotMode = false;
    const compileMode = process.env.compileTool === 'rollup' ? projectConfig.compileMode : buildJsonInfo.compileMode;
    if (checkAotConfig(compileMode, buildJsonInfo, faultHandler)) {
      projectConfig.processTs = true;
      projectConfig.pandaMode = TS2ABC;
      projectConfig.anBuildOutPut = buildJsonInfo.anBuildOutPut;
      projectConfig.anBuildMode = buildJsonInfo.anBuildMode;
      projectConfig.apPath = buildJsonInfo.apPath;
      if (projectConfig.es2abcCompileTsInAotMode) {
        projectConfig.pandaMode = ES2ABC;
      }
    } else {
      projectConfig.processTs = false;
      projectConfig.pandaMode = buildJsonInfo.pandaMode;
      if (projectConfig.es2abcCompileTsInNonAotMode) {
        projectConfig.pandaMode = ES2ABC;
        projectConfig.processTs = true;
      }
    }
    if (envArgs !== undefined) {
      projectConfig.buildArkMode = envArgs.buildMode;
    }
    if (compileMode === 'esmodule') {
      projectConfig.nodeModulesPath = buildJsonInfo.nodeModulesPath;
      projectConfig.harNameOhmMap = buildJsonInfo.harNameOhmMap;
    }
    if (projectConfig.compileHar && buildJsonInfo.moduleName &&
      buildJsonInfo.modulePathMap[buildJsonInfo.moduleName]) {
      if (projectConfig.useTsHar) {
        projectConfig.processTs = true;
      }
      projectConfig.moduleRootPath = buildJsonInfo.modulePathMap[buildJsonInfo.moduleName];
    }
  }
}

function checkAppResourcePath(appResourcePath, config) {
  if (appResourcePath) {
    readAppResource(appResourcePath);
    if (fs.existsSync(appResourcePath) && config.cache) {
      config.cache.buildDependencies.config.push(appResourcePath);
    }
    if (!projectConfig.xtsMode) {
      const appResourcePathSavePath = path.resolve(projectConfig.cachePath, 'resource_path.txt');
      saveAppResourcePath(appResourcePath, appResourcePathSavePath);
      if (fs.existsSync(appResourcePathSavePath) && config.cache) {
        config.cache.buildDependencies.config.push(appResourcePathSavePath);
      }
    }
  }
}

function saveAppResourcePath(appResourcePath, appResourcePathSavePath) {
  let isSave = false;
  if (fs.existsSync(appResourcePathSavePath)) {
    const saveContent = fs.readFileSync(appResourcePathSavePath);
    if (appResourcePath !== saveContent) {
      isSave = true;
    }
  } else {
    isSave = true;
  }
  if (isSave) {
    fs.writeFileSync(appResourcePathSavePath, appResourcePath);
  }
}

function addSDKBuildDependencies(config) {
  if (projectConfig.localPropertiesPath &&
    fs.existsSync(projectConfig.localPropertiesPath) && config.cache) {
    config.cache.buildDependencies.config.push(projectConfig.localPropertiesPath);
  }
  if (projectConfig.projectProfilePath &&
    fs.existsSync(projectConfig.projectProfilePath) && config.cache) {
    config.cache.buildDependencies.config.push(projectConfig.projectProfilePath);
  }
}

function getCleanConfig(workerFile) {
  const cleanPath = [];
  if (projectConfig.compileMode === 'esmodule') {
    return cleanPath;
  }
  cleanPath.push(projectConfig.buildPath);
  if (workerFile) {
    const workerFilesPath = Object.keys(workerFile);
    for (const workerFilePath of workerFilesPath) {
      cleanPath.push(path.join(projectConfig.buildPath, workerFilePath, '..'));
    }
  }
  return cleanPath;
}

function isPartialUpdate(metadata, moduleType) {
  if (!Array.isArray(metadata) || !metadata.length) {
    return;
  }
  metadata.some(item => {
    if (item.name && item.value) {
      if (item.name === 'ArkTSPartialUpdate' && item.value === 'false') {
        partialUpdateConfig.partialUpdateMode = false;
        if (projectConfig.aceModuleJsonPath) {
          logger.warn('\u001b[33m ArkTS:WARN File: ' + projectConfig.aceModuleJsonPath + '.' + '\n' +
            " The 'ArkTSPartialUpdate' field will no longer be supported in the future. \u001b[39m");
        }
      }
      if (item.name === 'ArkTSBuilderCheck' && item.value === 'false') {
        partialUpdateConfig.builderCheck = false;
      }
      if (item.name === 'Api11ArkTSCheck' && item.value === 'SkipArkTSCheckInApi11') {
        partialUpdateConfig.executeArkTSLinter = false;
      }
      if (item.name === 'Api11ArkTSCheckMode' && item.value === 'DoArkTSCheckInCompatibleModeInApi11') {
        partialUpdateConfig.standardArkTSLinter = false;
      }
      if (item.name === 'ArkoalaPlugin' && item.value === 'true') {
        projectConfig.useArkoala = true;
      }
      if (item.name === 'ArkTSVersion') {
        partialUpdateConfig.arkTSVersion = item.value;
      }
      if (item.name === 'OPTLazyForEach' && item.value === 'true') {
        projectConfig.optLazyForEach = true;
      }
      if (item.name === 'SkipTscOhModuleCheck' && item.value === 'true') {
        partialUpdateConfig.skipTscOhModuleCheck = true;
      }
      if (item.name === 'SkipArkTSStaticBlocksCheck' && item.value === 'true') {
        partialUpdateConfig.skipArkTSStaticBlocksCheck = true;
      }
      if (item.name === 'UseTsHar' && item.value === 'true' && moduleType === 'har') {
        projectConfig.useTsHar = true;
      }
      if (item.name === 'OptTryCatchFunc' && item.value === 'false') {
        projectConfig.optTryCatchFunc = false;
      }
    }
    return !partialUpdateConfig.partialUpdateMode && !partialUpdateConfig.builderCheck &&
      !partialUpdateConfig.executeArkTSLinter && !partialUpdateConfig.standardArkTSLinter &&
      partialUpdateConfig.arkTSVersion !== undefined && projectConfig.optLazyForEach &&
      partialUpdateConfig.skipTscOhModuleCheck && partialUpdateConfig.skipArkTSStaticBlocksCheck;
  });
}

function applicationConfig() {
  const localProperties = path.resolve(aceBuildJson.projectRootPath, 'local.properties');
  if (fs.existsSync(localProperties)) {
    try {
      const localPropertiesFile = fs.readFileSync(localProperties, { encoding: 'utf-8' }).split(/\r?\n/);
      localPropertiesFile.some((item) => {
        const builderCheckValue = item.replace(/\s+|;/g, '');
        if (builderCheckValue === 'ArkTSConfig.ArkTSBuilderCheck=false') {
          partialUpdateConfig.builderCheck = false;
          return true;
        }
      });
    } catch (err) {
    }
  }
}

function partialUpdateController(minAPIVersion, metadata = null, moduleType = '') {
  projectConfig.minAPIVersion = minAPIVersion;
  if (minAPIVersion >= APIVERSION.apiVersionNine) {
    partialUpdateConfig.partialUpdateMode = true;
  }
  const MIN_VERSION_OPTIMIZE_COMPONENT = APIVERSION.apiVersionTen;
  if (minAPIVersion < MIN_VERSION_OPTIMIZE_COMPONENT) {
    partialUpdateConfig.optimizeComponent = false;
  }
  if (metadata) {
    isPartialUpdate(metadata, moduleType);
  }
  if (aceBuildJson.projectRootPath) {
    applicationConfig();
  }
}

const globalProgram = {
  builderProgram: null,
  program: null,
  watchProgram: null,
  checker: null,
  strictChecker: null,
  strictLanguageService: null,
};

const partialUpdateConfig = {
  partialUpdateMode: false,
  builderCheck: true,
  executeArkTSLinter: true,
  standardArkTSLinter: true,
  optimizeComponent: true,
  arkTSVersion: undefined,
  skipTscOhModuleCheck: false,
  skipArkTSStaticBlocksCheck: false
};

function resetMain() {
  staticPreviewPage = undefined;
  aceCompileMode = 'page';
  resetAbilityConfig();
  resetProjectConfig();
  resources.app = {};
  rawfileResources.clear();
  abilityPagesFullPath.clear();
  aceBuildJson = {};
  partialUpdateConfig.builderCheck = true;
  globalModulePaths = [];
  sdkConfigs = [];
  defaultSdkConfigs = [];
  extendSdkConfigs = [];
  sdkConfigPrefix = 'ohos|system|kit';
  ohosSystemModulePaths = [];
  ohosSystemModuleSubDirPaths = [];
  allModulesPaths = [];
  externalApiCheckPlugin = new Map();
  externalApiMethodPlugin = new Map();
  fileDeviceCheckPlugin = new Map();
  fileAvailableCheckPlugin = new Map();
  suppressWarningsCheckPlugin = new Map();
  externalApiCheckerMap = new Map();
}

function resetAbilityConfig() {
  abilityConfig.abilityType = 'page';
  abilityConfig.abilityEntryFile = null;
  abilityConfig.projectAbilityPath = [];
  abilityConfig.testRunnerFile = [];
}

function resetProjectConfig() {
  projectConfig.entryObj = {};
  projectConfig.entryArrayForObf = [];
  projectConfig.cardObj = {};
  projectConfig.compileHar = false;
  projectConfig.compileShared = false;
  projectConfig.packageDir = 'node_modules';
  projectConfig.packageJson = 'package.json';
  projectConfig.packageManagerType = 'npm';
  projectConfig.cardEntryObj = {};
  projectConfig.compilerTypes = [];
  projectConfig.optLazyForEach = false;
  projectConfig.hspResourcesMap = false;
  projectConfig.coldReload = undefined;
  projectConfig.hotReload = undefined;
  projectConfig.isFirstBuild = undefined;
  projectConfig.changedFileList = undefined;
  projectConfig.patchAbcPath = undefined;
  projectConfig.removeChangedFileListInSdk = false;
  projectConfig.allowEmptyBundleName = false;
  projectConfig.uiTransformOptimization = false;
  projectConfig.ignoreCrossplatformCheck = false;
  projectConfig.strictCheckerOnly = false;
  const props = ['projectPath', 'buildPath', 'aceModuleBuild', 'manifestFilePath', 'aceProfilePath',
    'aceModuleJsonPath', 'aceSuperVisualPath', 'hashProjectPath', 'aceBuildJson', 'cachePath',
    'aceSoPath', 'localPropertiesPath', 'projectProfilePath', 'isPreview', 'compileMode', 'runtimeOS',
    'sdkInfo', 'checkEntry', 'obfuscateHarType', 'isCrossplatform', 'enableDebugLine', 'bundleType'
  ];
  for (let key in projectConfig) {
    if (props.includes(key)) {
      projectConfig[key] = undefined;
    }
  }
  projectConfig.otherCompileFiles = {};
  projectConfig.updateVersionInfo = undefined;
}

function resetGlobalProgram() {
  globalProgram.builderProgram = null;
  globalProgram.program = null;
  globalProgram.checker = null;
  globalProgram.strictChecker = null;
  globalProgram.strictLanguageService = null;
}

function initMain() {
  staticPreviewPage = process.env.aceStaticPreview;
  aceCompileMode = process.env.aceCompileMode || 'page';
  abilityConfig.abilityType = process.env.abilityType || 'page';
}

exports.globalProgram = globalProgram;
exports.projectConfig = projectConfig;
exports.loadEntryObj = loadEntryObj;
exports.readAppResource = readAppResource;
exports.resources = resources;
exports.rawfileResources = rawfileResources;
exports.loadWorker = loadWorker;
exports.abilityConfig = abilityConfig;
exports.readWorkerFile = readWorkerFile;
exports.abilityPagesFullPath = abilityPagesFullPath;
exports.loadModuleInfo = loadModuleInfo;
exports.systemModules = systemModules;
exports.checkAppResourcePath = checkAppResourcePath;
exports.addSDKBuildDependencies = addSDKBuildDependencies;
exports.partialUpdateConfig = partialUpdateConfig;
exports.readPatchConfig = readPatchConfig;
exports.initBuildInfo = initBuildInfo;
exports.getCleanConfig = getCleanConfig;
exports.globalModulePaths = globalModulePaths;
exports.defaultSdkConfigs = defaultSdkConfigs;
exports.extendSdkConfigs = extendSdkConfigs;
exports.sdkConfigs = sdkConfigs;
exports.sdkConfigPrefix = sdkConfigPrefix;
exports.ohosSystemModulePaths = ohosSystemModulePaths;
exports.resetMain = resetMain;
exports.ohosSystemModuleSubDirPaths = ohosSystemModuleSubDirPaths;
exports.allModulesPaths = allModulesPaths;
exports.resetProjectConfig = resetProjectConfig;
exports.resetGlobalProgram = resetGlobalProgram;
exports.setEntryArrayForObf = setEntryArrayForObf;
exports.getPackageJsonEntryPath = getPackageJsonEntryPath;
exports.setIntentEntryPages = setIntentEntryPages;
exports.setStartupPagesForObf = setStartupPagesForObf;
exports.externalApiCheckPlugin = externalApiCheckPlugin;
exports.externalApiMethodPlugin = externalApiMethodPlugin;
exports.fileDeviceCheckPlugin = fileDeviceCheckPlugin;
exports.fileAvailableCheckPlugin = fileAvailableCheckPlugin;
exports.suppressWarningsCheckPlugin = suppressWarningsCheckPlugin;
exports.externalApiCheckerMap = externalApiCheckerMap;
