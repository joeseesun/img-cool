"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    globSources: function() {
        return globSources;
    },
    isCompilableExtension: function() {
        return isCompilableExtension;
    },
    requireChokidar: function() {
        return requireChokidar;
    },
    splitCompilableAndCopyable: function() {
        return splitCompilableAndCopyable;
    },
    watchSources: function() {
        return watchSources;
    }
});
const _fastglob = /*#__PURE__*/ _interop_require_default(require("fast-glob"));
const _slash = /*#__PURE__*/ _interop_require_default(require("slash"));
const _fs = require("fs");
const _path = require("path");
const _minimatch = require("minimatch");
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
async function globSources(sources, only, ignore, includeDotfiles = false) {
    const globConfig = {
        dot: includeDotfiles,
        ignore
    };
    const files = await Promise.all(sources.filter((source)=>includeDotfiles || source === "." || !(0, _path.basename)(source).startsWith(".")).map((source)=>{
        return new Promise((resolve)=>{
            (0, _fs.stat)(source, (err, stat)=>{
                if (err) {
                    resolve([]);
                    return;
                }
                if (!stat.isDirectory()) {
                    resolve([
                        source
                    ]);
                } else {
                    (0, _fastglob.default)((0, _slash.default)((0, _path.join)(source, "**")), globConfig).then((matches)=>resolve(matches)).catch(()=>resolve([]));
                }
            });
        });
    }));
    const f = files.flat().filter((filename)=>{
        return !only || only.length === 0 || only.some((only)=>(0, _minimatch.minimatch)((0, _slash.default)(filename), only));
    });
    return Array.from(new Set(f));
}
function isCompilableExtension(filename, allowedExtension) {
    const ext = (0, _path.extname)(filename);
    return allowedExtension.includes(ext);
}
function splitCompilableAndCopyable(files, allowedExtension, copyFiles) {
    const compilable = [];
    const copyable = [];
    for (const file of files){
        const isCompilable = isCompilableExtension(file, allowedExtension);
        if (isCompilable) {
            compilable.push(file);
        } else if (copyFiles) {
            copyable.push(file);
        }
    }
    return [
        compilable,
        copyable
    ];
}
async function requireChokidar() {
    try {
        const { default: chokidar } = await Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("chokidar")));
        return chokidar;
    } catch (err) {
        console.error("The optional dependency chokidar is not installed and is required for " + "--watch. Chokidar is likely not supported on your platform.");
        throw err;
    }
}
async function watchSources(sources, includeDotfiles = false) {
    const chokidar = await requireChokidar();
    return chokidar.watch(sources, {
        ignored: includeDotfiles ? undefined : (filename)=>(0, _path.basename)(filename).startsWith("."),
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 50,
            pollInterval: 10
        }
    });
}

//# sourceMappingURL=sources.js.map