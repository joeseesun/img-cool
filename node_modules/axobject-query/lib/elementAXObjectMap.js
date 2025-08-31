"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AXObjectsMap = _interopRequireDefault(require("./AXObjectsMap"));
var _iterationDecorator = _interopRequireDefault(require("./util/iterationDecorator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
var elementAXObjects = [];
var _iterator = _createForOfIteratorHelper(_AXObjectsMap.default.entries()),
  _step;
try {
  var _loop = function _loop() {
    var _step$value = _slicedToArray(_step.value, 2),
      name = _step$value[0],
      def = _step$value[1];
    var relatedConcepts = def.relatedConcepts;
    if (Array.isArray(relatedConcepts)) {
      relatedConcepts.forEach(function (relation) {
        if (relation.module === 'HTML') {
          var concept = relation.concept;
          if (concept != null) {
            var conceptStr = JSON.stringify(concept);
            var axObjects;
            var index = 0;
            for (; index < elementAXObjects.length; index++) {
              var key = elementAXObjects[index][0];
              if (JSON.stringify(key) === conceptStr) {
                axObjects = elementAXObjects[index][1];
                break;
              }
            }
            if (!Array.isArray(axObjects)) {
              axObjects = [];
            }
            var loc = axObjects.findIndex(function (item) {
              return item === name;
            });
            if (loc === -1) {
              axObjects.push(name);
            }
            if (index < elementAXObjects.length) {
              elementAXObjects.splice(index, 1, [concept, axObjects]);
            } else {
              elementAXObjects.push([concept, axObjects]);
            }
          }
        }
      });
    }
  };
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
function deepAxObjectModelRelationshipConceptAttributeCheck(a, b) {
  if (a === undefined && b !== undefined) {
    return false;
  }
  if (a !== undefined && b === undefined) {
    return false;
  }
  if (a !== undefined && b !== undefined) {
    if (a.length != b.length) {
      return false;
    }

    // dequal checks position equality
    // https://github.com/lukeed/dequal/blob/5ecd990c4c055c4658c64b4bdfc170f219604eea/src/index.js#L17-L22
    for (var i = 0; i < a.length; i++) {
      if (b[i].name !== a[i].name || b[i].value !== a[i].value) {
        return false;
      }
    }
  }
  return true;
}
var elementAXObjectMap = {
  entries: function entries() {
    return elementAXObjects;
  },
  forEach: function forEach(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    for (var _i = 0, _elementAXObjects = elementAXObjects; _i < _elementAXObjects.length; _i++) {
      var _elementAXObjects$_i = _slicedToArray(_elementAXObjects[_i], 2),
        key = _elementAXObjects$_i[0],
        values = _elementAXObjects$_i[1];
      fn.call(thisArg, values, key, elementAXObjects);
    }
  },
  get: function get(key) {
    var item = elementAXObjects.find(function (tuple) {
      return key.name === tuple[0].name && deepAxObjectModelRelationshipConceptAttributeCheck(key.attributes, tuple[0].attributes);
    });
    return item && item[1];
  },
  has: function has(key) {
    return !!elementAXObjectMap.get(key);
  },
  keys: function keys() {
    return elementAXObjects.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        key = _ref2[0];
      return key;
    });
  },
  values: function values() {
    return elementAXObjects.map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        values = _ref4[1];
      return values;
    });
  }
};
var _default = exports.default = (0, _iterationDecorator.default)(elementAXObjectMap, elementAXObjectMap.entries());