"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.packageCollection = exports.newSourceMaps = exports.SRC_MAIN = void 0;
exports.buildCachePath = buildCachePath;
exports.cleanUpUtilsObjects = cleanUpUtilsObjects;
exports.collectObfuscationFileContent = collectObfuscationFileContent;
exports.compileToolIsRollUp = compileToolIsRollUp;
exports.genAbcFileName = genAbcFileName;
exports.genBuildPath = genBuildPath;
exports.genMergeProtoFileName = genMergeProtoFileName;
exports.genProtoFileName = genProtoFileName;
exports.genSourceMapFileName = genSourceMapFileName;
exports.generateSourceFilesToTemporary = generateSourceFilesToTemporary;
exports.getArkBuildDir = getArkBuildDir;
exports.getBuildBinDir = getBuildBinDir;
exports.getBuildModeInLowerCase = getBuildModeInLowerCase;
exports.getNormalizedOhmUrlByAliasName = getNormalizedOhmUrlByAliasName;
exports.getNormalizedOhmUrlByFilepath = getNormalizedOhmUrlByFilepath;
exports.getNormalizedOhmUrlByModuleRequest = getNormalizedOhmUrlByModuleRequest;
exports.getOhmUrlByByteCodeHar = getOhmUrlByByteCodeHar;
exports.getOhmUrlByExternalPackage = getOhmUrlByExternalPackage;
exports.getOhmUrlByFilepath = getOhmUrlByFilepath;
exports.getOhmUrlBySystemApiOrLibRequest = getOhmUrlBySystemApiOrLibRequest;
exports.getPackageInfo = getPackageInfo;
exports.getPkgInfo = getPkgInfo;
exports.getPreviousStageSourceMap = getPreviousStageSourceMap;
exports.isEs2Abc = isEs2Abc;
exports.isOhModules = isOhModules;
exports.isTs2Abc = isTs2Abc;
exports.mangleDeclarationFileName = mangleDeclarationFileName;
exports.removeDuplicateInfo = removeDuplicateInfo;
exports.transformModuleSpecifier = transformModuleSpecifier;
exports.transformOhmurlToPkgName = transformOhmurlToPkgName;
exports.transformOhmurlToRecordName = transformOhmurlToRecordName;
exports.tryMangleFileName = tryMangleFileName;
exports.writeArkguardObfuscatedSourceCode = writeArkguardObfuscatedSourceCode;
exports.writeDeclarationFiles = writeDeclarationFiles;
exports.writeFileSyncByString = writeFileSyncByString;
exports.writeFileSyncCaseAware = writeFileSyncCaseAware;
exports.writeMinimizedSourceCode = writeMinimizedSourceCode;
exports.writeObfuscatedSourceCode = writeObfuscatedSourceCode;

const fs = require("fs");
const path = require("path");

const SRC_MAIN = "src/main";
exports.SRC_MAIN = SRC_MAIN;
let newSourceMaps = {};
exports.newSourceMaps = newSourceMaps;
const packageCollection = new Map();
exports.packageCollection = packageCollection;

function compileToolIsRollUp() {
  return process.env.compileTool === "rollup";
}

function getBuildModeInLowerCase(projectConfig) {
  return String((compileToolIsRollUp() ? projectConfig?.buildMode : projectConfig?.buildArkMode) || "").toLowerCase();
}

function genSourceMapFileName(filePath) {
  return filePath.endsWith(".ts") ? filePath.replace(/\.ts$/, ".ts.map") : filePath.replace(/\.js$/, ".js.map");
}

function genAbcFileName(filePath) { return filePath.replace(/\.(?:ts|js)$/, ".abc"); }
function genProtoFileName(filePath) { return filePath.replace(/\.(?:[tj]s|json)$/, ".protoBin"); }
function genMergeProtoFileName(filePath) { return path.join(process.env.cachePath || "", "protos", filePath.split("temporary").pop() || ""); }
function buildCachePath(filePath, projectConfig) { return path.join(projectConfig?.cachePath || projectConfig?.aceModuleBuild || "", filePath); }
function getArkBuildDir(root) { return path.join(root, "build"); }
function getBuildBinDir(root) { return path.join(getArkBuildDir(root), "bin"); }
function isOhModules(projectConfig) { return projectConfig?.packageDir === "oh_modules"; }
function isEs2Abc(projectConfig) { return projectConfig?.pandaMode === "es2abc" || projectConfig?.pandaMode === undefined; }
function isTs2Abc(projectConfig) { return projectConfig?.pandaMode === "ts2abc"; }
function removeDuplicateInfo(items) { return Array.from(new Map((items || []).map((item) => [item.tempFilePath, item])).values()); }
function cleanUpUtilsObjects() { exports.newSourceMaps = newSourceMaps = {}; packageCollection.clear(); }
function transformModuleSpecifier(_filePath, content) { return content; }
function getPreviousStageSourceMap() { return undefined; }
function collectObfuscationFileContent() {}
function tryMangleFileName(filePath) { return filePath; }
async function mangleDeclarationFileName() {}
async function writeArkguardObfuscatedSourceCode() {}
function writeDeclarationFiles() {}

function writeFileSyncCaseAware(filePath, content, options) {
  if (typeof filePath !== "number" && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, options);
}

function writeFileSyncByString(filePath, content) {
  writeFileSyncCaseAware(filePath, content);
}

async function writeObfuscatedSourceCode(fileInfo) {
  writeFileSyncCaseAware(fileInfo.buildFilePath, fileInfo.content || "");
}

async function writeMinimizedSourceCode(content, filePath) {
  writeFileSyncCaseAware(filePath, content);
}

function generateSourceFilesToTemporary() {}

function getPackageInfo(moduleJsonPath) {
  if (packageCollection.has(moduleJsonPath)) {
    return packageCollection.get(moduleJsonPath);
  }
  const data = JSON.parse(fs.readFileSync(moduleJsonPath).toString());
  const result = [data.app?.bundleName || "", data.module?.name || ""];
  packageCollection.set(moduleJsonPath, result);
  return result;
}

function getPkgInfo() { return undefined; }
function getNormalizedOhmUrlByFilepath(filePath) { return filePath; }
function getNormalizedOhmUrlByModuleRequest(request) { return request?.normalizedPath; }
function getNormalizedOhmUrlByAliasName(alias) { return alias; }
function getOhmUrlByFilepath(filePath) { return filePath; }
function getOhmUrlByByteCodeHar() { return undefined; }
function getOhmUrlByExternalPackage() { return undefined; }
function getOhmUrlBySystemApiOrLibRequest(args) {
  const request = args?.moduleRequest || "";
  const match = request.match(/^@([^.]*)\.(\S+)/);
  return match ? `@ohos:${match[2]}` : undefined;
}
function genBuildPath(filePath, projectPath, cachePath) { return filePath && projectPath ? path.join(cachePath || "", path.relative(projectPath, filePath)) : ""; }
function transformOhmurlToRecordName(url) { return String(url).split("&").slice(2).join("&"); }
function transformOhmurlToPkgName(url) { return String(url).split("&")[3] || ""; }
