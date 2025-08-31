"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return handleCompile;
    }
});
const _slash = /*#__PURE__*/ _interop_require_default(require("slash"));
const _path = require("path");
const _constants = require("./constants");
const _util = require("./util");
const _compile = require("./compile");
const _options = require("./options");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function handleCompile(opts) {
    var _opts_outFileExtension;
    const dest = (0, _util.getDest)(opts.filename, opts.outDir, opts.cliOptions.stripLeadingPaths, `.${(_opts_outFileExtension = opts.outFileExtension) !== null && _opts_outFileExtension !== void 0 ? _opts_outFileExtension : _options.DEFAULT_OUT_FILE_EXTENSION}`);
    const sourceFileName = (0, _slash.default)((0, _path.relative)((0, _path.dirname)(dest), opts.filename));
    const options = {
        ...opts.swcOptions,
        sourceFileName
    };
    const result = await (0, _util.compile)(opts.filename, options, opts.sync, dest);
    if (result) {
        const destDts = (0, _util.getDest)(opts.filename, opts.outDir, opts.cliOptions.stripLeadingPaths, `.d.ts`);
        const destSourcemap = dest + ".map";
        await (0, _compile.outputResult)({
            output: result,
            sourceFile: opts.filename,
            destFile: dest,
            destDtsFile: destDts,
            destSourcemapFile: destSourcemap,
            options
        });
        return _constants.CompileStatus.Compiled;
    } else {
        return _constants.CompileStatus.Omitted;
    }
}

//# sourceMappingURL=dirWorker.js.map