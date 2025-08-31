"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _isBrowser = _interopRequireDefault(require("../utils/isBrowser"));
var useIsomorphicLayoutEffect = _isBrowser["default"] ? _react.useLayoutEffect : _react.useEffect;
var _default = exports["default"] = useIsomorphicLayoutEffect;