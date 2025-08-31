"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _isBrowser = _interopRequireDefault(require("../../../utils/isBrowser"));
var _isDocumentVisible = _interopRequireDefault(require("./isDocumentVisible"));
var _isOnline = _interopRequireDefault(require("./isOnline"));
// from swr

var listeners = [];
function subscribe(listener) {
  listeners.push(listener);
  return function unsubscribe() {
    var index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}
if (_isBrowser["default"]) {
  var revalidate = function revalidate() {
    if (!(0, _isDocumentVisible["default"])() || !(0, _isOnline["default"])()) return;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
  };
  window.addEventListener('visibilitychange', revalidate, false);
  window.addEventListener('focus', revalidate, false);
}
var _default = exports["default"] = subscribe;