"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.utUtils = exports.compilingEtsOrTsFiles = exports.hasTsNoCheckOrTsIgnoreFiles = void 0;
exports.changeFileExtension = changeFileExtension;
exports.cleanUpFilesList = cleanUpFilesList;
exports.genCachePath = genCachePath;
exports.genTemporaryModuleCacheDirectoryForBundle = genTemporaryModuleCacheDirectoryForBundle;
exports.getEs2abcFileThreadNumber = getEs2abcFileThreadNumber;
exports.hasArkDecorator = hasArkDecorator;
exports.isAotMode = isAotMode;
exports.isBranchElimination = isBranchElimination;
exports.isCommonJsPluginVirtualFile = isCommonJsPluginVirtualFile;
exports.isCurrentProjectFiles = isCurrentProjectFiles;
exports.isDebug = isDebug;
exports.isJsSourceFile = isJsSourceFile;
exports.isJsonSourceFile = isJsonSourceFile;
exports.isMasterOrPrimary = isMasterOrPrimary;
exports.isSpecifiedExt = isSpecifiedExt;
exports.isTsOrEtsSourceFile = isTsOrEtsSourceFile;
exports.needAotCompiler = needAotCompiler;
exports.removeCacheFile = removeCacheFile;
exports.shouldETSOrTSFileTransformToJS = shouldETSOrTSFileTransformToJS;
exports.shouldETSOrTSFileTransformToJSWithoutRemove = shouldETSOrTSFileTransformToJSWithoutRemove;
exports.updateSourceMap = updateSourceMap;
exports.writeFileContentToTempDir = writeFileContentToTempDir;

const fs = require("fs");
const os = require("os");
const path = require("path");
const ts = require("typescript");

let hasTsNoCheckOrTsIgnoreFiles = [];
let compilingEtsOrTsFiles = [];
exports.hasTsNoCheckOrTsIgnoreFiles = hasTsNoCheckOrTsIgnoreFiles;
exports.compilingEtsOrTsFiles = compilingEtsOrTsFiles;

function cleanUpFilesList() {
  exports.hasTsNoCheckOrTsIgnoreFiles = hasTsNoCheckOrTsIgnoreFiles = [];
  exports.compilingEtsOrTsFiles = compilingEtsOrTsFiles = [];
}

function changeFileExtension(filePath, extension, currentExtension = "") {
  currentExtension = currentExtension || path.extname(filePath);
  return filePath.substring(0, filePath.lastIndexOf(currentExtension)) + extension;
}

function removeCacheFile(filePath, extension) {
  const target = changeFileExtension(filePath, extension);
  if (fs.existsSync(target)) {
    fs.rmSync(target);
  }
}

function isDebug(projectConfig) {
  return String(projectConfig?.buildMode || "").toLowerCase() === "debug";
}

function isAotMode() { return false; }
function needAotCompiler() { return false; }
function isBranchElimination(projectConfig) { return !!projectConfig?.branchElimination; }
function isMasterOrPrimary() { return true; }
function isCommonJsPluginVirtualFile(filePath) { return String(filePath).includes("\0"); }
function isCurrentProjectFiles() { return true; }
function isSpecifiedExt(filePath, extension) { return path.extname(filePath) === extension; }
function isTsOrEtsSourceFile(filePath) { return /(?<!\.d)\.[e]?ts$/.test(filePath); }
function isJsSourceFile(filePath) { return /\.[cm]?js$/.test(filePath); }
function isJsonSourceFile(filePath) { return /\.json$/.test(filePath); }
function getEs2abcFileThreadNumber() { return Math.min(os.cpus().length, 16); }
function genTemporaryModuleCacheDirectoryForBundle(projectConfig) { return path.join(projectConfig.cachePath || "", "temporary"); }
function genCachePath(filePath, projectConfig) { return path.join(projectConfig.cachePath || projectConfig.aceModuleBuild || "", filePath); }
function shouldETSOrTSFileTransformToJS() { return true; }
function shouldETSOrTSFileTransformToJSWithoutRemove() { return true; }
async function updateSourceMap(_previousSourceMap, sourceMap) { return sourceMap; }
async function writeFileContentToTempDir() {}

function hasArkDecorator(node, decoratorName) {
  const decorators = ts.getAllDecorators?.(node);
  if (!decorators?.length) {
    return false;
  }
  return decorators.some((decorator) => decorator.getText().replace(/\(.*\)$/, "").replace(/\s*/g, "").trim() === decoratorName);
}

exports.utUtils = { writeFileContent: async function writeFileContent() {} };
