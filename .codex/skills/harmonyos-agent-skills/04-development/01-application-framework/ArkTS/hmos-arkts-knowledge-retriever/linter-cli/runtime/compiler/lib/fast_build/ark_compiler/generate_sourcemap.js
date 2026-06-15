"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceMapGenerator = void 0;

class SourceMapGenerator {
  static getInstance() {
    if (!SourceMapGenerator.instance) {
      SourceMapGenerator.instance = new SourceMapGenerator();
    }
    return SourceMapGenerator.instance;
  }

  isNewSourceMaps() { return false; }
  getSourceMaps() { return {}; }
  getSourceMap() { return undefined; }
  getSpecifySourceMap() { return undefined; }
  fillSourceMapPackageInfo() {}
  updateSourceMap() {}
  buildModuleSourceMapInfoSingle() {}
  saveKeyMappingForObfFileName() {}
  cleanSourceMapObject() {}
}

SourceMapGenerator.instance = null;
exports.SourceMapGenerator = SourceMapGenerator;
