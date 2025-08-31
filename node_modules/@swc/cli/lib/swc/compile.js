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
    compile: function() {
        return compile;
    },
    outputResult: function() {
        return outputResult;
    }
});
const _slash = /*#__PURE__*/ _interop_require_default(require("slash"));
const _fs = require("fs");
const _path = require("path");
const _core = require("@swc/core");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { mkdir, stat, writeFile } = _fs.promises;
function withSourceMap(output, options, sourceMapFile, destDir) {
    let dts;
    // TODO: Remove once fixed in core
    if (output.output) {
        const json = JSON.parse(output.output);
        if (json.__swc_isolated_declarations__) {
            dts = json.__swc_isolated_declarations__;
        }
    }
    if (!output.map || options.sourceMaps === "inline") {
        return {
            sourceCode: output.code,
            dts
        };
    }
    // TODO: remove once fixed in core https://github.com/swc-project/swc/issues/1388
    const sourceMap = JSON.parse(output.map);
    if (options.sourceFileName) {
        sourceMap["sources"][0] = options.sourceFileName;
    }
    if (options.sourceRoot) {
        sourceMap["sourceRoot"] = options.sourceRoot;
    }
    output.map = JSON.stringify(sourceMap);
    output.code += `\n//# sourceMappingURL=${(0, _slash.default)((0, _path.relative)(destDir, sourceMapFile))}`;
    return {
        sourceMap: output.map,
        sourceCode: output.code,
        dts
    };
}
async function outputResult({ output, sourceFile, destFile, destDtsFile, destSourcemapFile, options }) {
    const destDir = (0, _path.dirname)(destFile);
    const { sourceMap, sourceCode, dts } = withSourceMap(output, options, destSourcemapFile, destDir);
    await mkdir(destDir, {
        recursive: true
    });
    const { mode } = await stat(sourceFile);
    const dtsPromise = dts ? writeFile(destDtsFile, dts, {
        mode
    }) : Promise.resolve();
    const sourceMapPromise = sourceMap ? writeFile(destSourcemapFile, sourceMap, {
        mode
    }) : Promise.resolve();
    await Promise.all([
        writeFile(destFile, sourceCode, {
            mode
        }),
        dtsPromise,
        sourceMapPromise
    ]);
}
async function compile(filename, opts, sync, outputPath) {
    const options = {
        ...opts
    };
    if (outputPath) {
        options.outputPath = outputPath;
    }
    try {
        const result = sync ? (0, _core.transformFileSync)(filename, options) : await (0, _core.transformFile)(filename, options);
        return result;
    } catch (err) {
        if (!err.message.includes("ignored by .swcrc")) {
            throw err;
        }
    }
}

//# sourceMappingURL=compile.js.map