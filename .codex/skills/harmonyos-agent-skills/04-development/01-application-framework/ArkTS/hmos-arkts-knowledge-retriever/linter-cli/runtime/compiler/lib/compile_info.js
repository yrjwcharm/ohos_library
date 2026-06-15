"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultStates = exports.logger = void 0;

const logger = {
  debug: (...args) => console.debug(...args),
  info: (...args) => console.info(...args),
  warn: (...args) => console.warn(...args),
  error: (...args) => console.error(...args)
};

exports.logger = logger;

class ResultStates {
  apply() {}
}

exports.ResultStates = ResultStates;
