"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isOnline;
var _isBrowser = _interopRequireDefault(require("../../../utils/isBrowser"));
function isOnline() {
  if (_isBrowser["default"] && typeof navigator.onLine !== 'undefined') {
    return navigator.onLine;
  }
  return true;
}