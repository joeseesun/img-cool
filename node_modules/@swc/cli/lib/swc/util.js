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
    assertCompilationResult: function() {
        return assertCompilationResult;
    },
    compile: function() {
        return compile;
    },
    exists: function() {
        return exists;
    },
    getDest: function() {
        return getDest;
    },
    outputFile: function() {
        return outputFile;
    },
    transform: function() {
        return transform;
    }
});
const _core = /*#__PURE__*/ _interop_require_wildcard(require("@swc/core"));
const _slash = /*#__PURE__*/ _interop_require_default(require("slash"));
const _fs = require("fs");
const _path = require("path");
const _process = require("process");
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
async function exists(path) {
    let pathExists = true;
    try {
        await _fs.promises.access(path);
    } catch (err) {
        pathExists = false;
    }
    return pathExists;
}
async function transform(filename, code, opts, sync, outputPath) {
    opts = {
        filename,
        ...opts
    };
    if (outputPath) {
        opts.outputPath = outputPath;
    }
    if (sync) {
        return _core.transformSync(code, opts);
    }
    return _core.transform(code, opts);
}
async function compile(filename, opts, sync, outputPath) {
    opts = {
        ...opts
    };
    if (outputPath) {
        opts.outputPath = outputPath;
    }
    try {
        const result = sync ? _core.transformFileSync(filename, opts) : await _core.transformFile(filename, opts);
        if (result.map) {
            // TODO: fix this in core
            // https://github.com/swc-project/swc/issues/1388
            const sourceMap = JSON.parse(result.map);
            if (opts.sourceFileName) {
                sourceMap["sources"][0] = opts.sourceFileName;
            }
            if (opts.sourceRoot) {
                sourceMap["sourceRoot"] = opts.sourceRoot;
            }
            result.map = JSON.stringify(sourceMap);
        }
        return result;
    } catch (err) {
        if (!err.message.includes("ignored by .swcrc")) {
            throw err;
        }
    }
}
function outputFile(output, filename, sourceMaps) {
    const destDir = (0, _path.dirname)(filename);
    (0, _fs.mkdirSync)(destDir, {
        recursive: true
    });
    let code = output.code;
    if (output.map && sourceMaps !== "inline") {
        // we've requested for a sourcemap to be written to disk
        const fileDirName = (0, _path.dirname)(filename);
        const mapLoc = filename + ".map";
        code += "\n//# sourceMappingURL=" + (0, _slash.default)((0, _path.relative)(fileDirName, mapLoc));
        (0, _fs.writeFileSync)(mapLoc, output.map);
    }
    (0, _fs.writeFileSync)(filename, code);
}
function assertCompilationResult(result, quiet = false) {
    let compiled = 0;
    let copied = 0;
    let failed = 0;
    for (const value of result.values()){
        if (value instanceof Error) {
            failed++;
        } else if (value === "copied") {
            copied++;
        } else if (value) {
            compiled++;
        }
    }
    if (!quiet && compiled + copied > 0) {
        const copyResult = copied === 0 ? " " : ` (copied ${copied}) `;
        _process.stderr.write(`Successfully compiled ${compiled} ${compiled !== 1 ? "files" : "file"}${copyResult}with swc.\n`);
    }
    if (failed > 0) {
        throw new Error(`Failed to compile ${failed} ${failed !== 1 ? "files" : "file"} with swc.`);
    }
}
function stripComponents(filename) {
    const components = filename.split("/").slice(1);
    if (!components.length) {
        return filename;
    }
    while(components[0] === ".."){
        components.shift();
    }
    return components.join("/");
}
const cwd = process.cwd();
function getDest(filename, outDir, stripLeadingPaths, ext) {
    let base = (0, _slash.default)((0, _path.relative)(cwd, filename));
    if (stripLeadingPaths) {
        base = stripComponents(base);
    }
    if (ext) {
        base = base.replace(/\.\w*$/, ext);
    }
    return (0, _path.join)(outDir, base);
}

//# sourceMappingURL=util.js.map