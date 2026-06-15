"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryMonitor = void 0;
exports.memoryMonitor = memoryMonitor;

class MemoryMonitor {
  static getInstance() {
    if (!MemoryMonitor.instance) {
      MemoryMonitor.instance = new MemoryMonitor();
    }
    return MemoryMonitor.instance;
  }

  static recordStage(stage) {
    return { recordStage: stage, recordIndex: 0 };
  }

  static stopRecordStage() {}

  getRecordFileName() {
    return "";
  }

  start() {}

  stop() {}

  recordStageInner(stage) {
    return MemoryMonitor.recordStage(stage);
  }

  stopRecordStageInner() {}

  addMemoryReport() {}

  async queryMemoryUsage() {
    return {};
  }

  cleanUp() {}
}

MemoryMonitor.instance = null;
exports.MemoryMonitor = MemoryMonitor;

function memoryMonitor() {
  return { name: "memoryMonitor" };
}
