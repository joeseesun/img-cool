"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _dir = /*#__PURE__*/ _interop_require_default(require("./dir"));
const _file = /*#__PURE__*/ _interop_require_default(require("./file"));
const _options = /*#__PURE__*/ _interop_require_wildcard(require("./options"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
(0, _options.initProgram)();
const opts = (0, _options.default)(process.argv);
const fn = opts.cliOptions.outDir ? _dir.default : _file.default;
process.on("uncaughtException", function(err) {
    console.error(err);
    process.exit(1);
});
fn(opts).catch((err)=>{
    console.error(err);
    process.exit(1);
});

//# sourceMappingURL=bin.js.map