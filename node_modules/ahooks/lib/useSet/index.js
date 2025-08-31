"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _tslib = require("tslib");
var _react = require("react");
var _useMemoizedFn = _interopRequireDefault(require("../useMemoizedFn"));
function useSet(initialValue) {
  var getInitValue = function getInitValue() {
    return new Set(initialValue);
  };
  var _a = (0, _tslib.__read)((0, _react.useState)(getInitValue), 2),
    set = _a[0],
    setSet = _a[1];
  var add = function add(key) {
    if (set.has(key)) {
      return;
    }
    setSet(function (prevSet) {
      var temp = new Set(prevSet);
      temp.add(key);
      return temp;
    });
  };
  var remove = function remove(key) {
    if (!set.has(key)) {
      return;
    }
    setSet(function (prevSet) {
      var temp = new Set(prevSet);
      temp["delete"](key);
      return temp;
    });
  };
  var reset = function reset() {
    return setSet(getInitValue());
  };
  return [set, {
    add: (0, _useMemoizedFn["default"])(add),
    remove: (0, _useMemoizedFn["default"])(remove),
    reset: (0, _useMemoizedFn["default"])(reset)
  }];
}
var _default = exports["default"] = useSet;