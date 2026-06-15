"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.writeUnobfuscationContent = exports.writeObfuscationNameCache = exports.nameCacheMap = exports.mangleFilePath = exports.handleUniversalPathInObf = exports.handleObfuscatedFilePath = exports.getRelativeSourcePath = exports.generateConsumerObConfigFile = exports.enableObfuscatedFilePathConfig = exports.enableObfuscateFileName = exports.collectResevedFileNameInIDEConfig = exports.collectReservedNameForObf = exports.ObConfigResolver = exports.MergedConfig = exports.OBF_ERR_CODE = exports.IDENTIFIER_CACHE = exports.sourceFileDependencies = exports.obfLogger = void 0;
exports.collectSourcesWhiteList = collectSourcesWhiteList;
exports.getNameCacheByPath = getNameCacheByPath;
exports.getUpdatedFiles = getUpdatedFiles;
exports.handleKeepFilesAndGetDependencies = handleKeepFilesAndGetDependencies;
exports.handlePostObfuscationTasks = handlePostObfuscationTasks;
exports.initObfLogger = initObfLogger;
exports.obfuscationPreprocess = obfuscationPreprocess;
exports.printObfLogger = printObfLogger;
exports.reObfuscate = reObfuscate;
exports.readProjectCaches = readProjectCaches;
exports.removeRedundantFiles = removeRedundantFiles;
exports.resetObfuscation = resetObfuscation;
exports.setNewNameCache = setNewNameCache;
exports.setUnobfuscationNames = setUnobfuscationNames;
exports.updateIncrementalCaches = updateIncrementalCaches;
exports.writeObfuscatedFile = writeObfuscatedFile;
exports.writeObfuscationCaches = writeObfuscationCaches;

const fs = require("fs");
const path = require("path");

const sourceFileDependencies = new Map();
exports.sourceFileDependencies = sourceFileDependencies;
exports.IDENTIFIER_CACHE = "IdentifierCache";
exports.OBF_ERR_CODE = "108";
exports.obfLogger = void 0;
exports.nameCacheMap = new Map();
exports.MergedConfig = class MergedConfig {};
exports.ObConfigResolver = class ObConfigResolver {};

function noop() {}
function emptySet() { return new Set(); }
function identity(value) { return value; }

exports.collectReservedNameForObf = noop;
exports.collectResevedFileNameInIDEConfig = noop;
exports.enableObfuscateFileName = () => false;
exports.enableObfuscatedFilePathConfig = () => false;
exports.generateConsumerObConfigFile = noop;
exports.getRelativeSourcePath = (filePath, projectRootPath, belongProjectPath) => {
  const root = belongProjectPath || projectRootPath || "";
  return root ? path.relative(root, filePath).replace(/\\/g, "/") : filePath;
};
exports.handleObfuscatedFilePath = identity;
exports.handleUniversalPathInObf = noop;
exports.mangleFilePath = identity;
exports.writeObfuscationNameCache = noop;
exports.writeUnobfuscationContent = noop;

function resetObfuscation() {
  sourceFileDependencies.clear();
}

function initObfLogger(logger) {
  exports.obfLogger = logger;
}

function printObfLogger(message, _info, level) {
  const logger = exports.obfLogger || console;
  const method = level === "error" ? "error" : level === "warn" ? "warn" : "log";
  logger[method]?.(message);
}

function collectSourcesWhiteList() {}
function handleKeepFilesAndGetDependencies() { return emptySet(); }
function getNameCacheByPath() { return new Map(); }
function setNewNameCache() {}
function setUnobfuscationNames() {}
function updateIncrementalCaches() {}
function readProjectCaches() {}
function getUpdatedFiles(_pluginContext, files) { return files || emptySet(); }
function obfuscationPreprocess() {}
async function reObfuscate() {}
async function handlePostObfuscationTasks() {}
function removeRedundantFiles() {}
function writeObfuscationCaches() {}

function writeObfuscatedFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}
