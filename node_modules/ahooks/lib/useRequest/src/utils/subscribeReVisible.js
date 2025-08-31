"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _isBrowser = _interopRequireDefault(require("../../../utils/isBrowser"));
var _isDocumentVisible = _interopRequireDefault(require("./isDocumentVisible"));
var listeners = [];
function subscribe(listener) {
  listeners.push(listener);
  return function unsubscribe() {
    var index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}
if (_isBrowser["default"]) {
  var revalidate = function revalidate() {
    if (!(0, _isDocumentVisible["default"])()) return;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
  };
  window.addEventListener('visibilitychange', revalidate, false);
}
var _default = exports["default"] = subscribe;