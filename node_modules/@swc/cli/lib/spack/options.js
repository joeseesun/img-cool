"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return parseSpackArgs;
    }
});
const _core = require("@swc/core");
const _spack = require("@swc/core/spack");
const _commander = /*#__PURE__*/ _interop_require_default(require("commander"));
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
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
const pkg = require("../../package.json");
const program = new _commander.default.Command();
program.option("--config [path]", "Path to a spack.config.js file to use.");
// TODO: allow using ts. See: https://github.com/swc-project/swc/issues/841
program.option("--mode <development | production | none>", "Mode to use");
program.option("--target [browser | node]", "Target runtime environment");
program.option("--context [path]", `The base directory (absolute path!) for resolving the 'entry'` + ` option. If 'output.pathinfo' is set, the included pathinfo is shortened to this directory`, "The current directory");
program.option("--entry [list]", "List of entries", collect);
// program.option('-W --watch', `Enter watch mode, which rebuilds on file change.`)
program.option("--debug", `Switch loaders to debug mode`);
// program.option('--devtool', `Select a developer tool to enhance debugging.`)
// -d           shortcut for --debug --devtool eval-cheap-module-source-map
//              --output-pathinfo                                          [여부]
// -p           shortcut for --optimize-minimize --define
//              process.env.NODE_ENV="production"                          [여부]
// Module options:
// --module-bind       Bind an extension to a loader                     [문자열]
// --module-bind-post  Bind an extension to a post loader                [문자열]
// --module-bind-pre   Bind an extension to a pre loader                 [문자열]
// Output options:
program.option("-o --output", `The output path and file for compilation assets`);
program.option("--output-path", `The output directory as **absolute path**`);
//   --output-filename             Specifies the name of each output file on disk.
//                                 You must **not** specify an absolute path here!
//                                 The `output.path` option determines the location
//                                 on disk the files are written to, filename is
//                                 used solely for naming the individual files.
//                                                    [string] [default: [name].js]
//   --output-chunk-filename       The filename of non-entry chunks as relative
//                                 path inside the `output.path` directory.
//        [string] [default: filename with [id] instead of [name] or [id] prefixed]
//   --output-source-map-filename  The filename of the SourceMaps for the
//                                 JavaScript files. They are inside the
//                                 `output.path` directory.                [string]
//   --output-public-path          The `publicPath` specifies the public URL
//                                 address of the output files when referenced in a
//                                 browser.                                [string]
//   --output-jsonp-function       The JSONP function used by webpack for async
//                                 loading of chunks.                      [string]
//   --output-pathinfo             Include comments with information about the
//                                 modules.                               [boolean]
//   --output-library              Expose the exports of the entry point as library
//                                                                          [array]
//   --output-library-target       Type of library
//          [string] [choices: "var", "assign", "this", "window", "self", "global",
//       "commonjs", "commonjs2", "commonjs-module", "amd", "umd", "umd2", "jsonp"]
// Advanced options:
//   --records-input-path       Store compiler state to a json file.       [string]
//   --records-output-path      Load compiler state from a json file.      [string]
//   --records-path             Store/Load compiler state from/to a json file. This
//                              will result in persistent ids of modules and
//                              chunks. An absolute path is expected. `recordsPath`
//                              is used for `recordsInputPath` and
//                              `recordsOutputPath` if they left undefined.[string]
//   --define                   Define any free var in the bundle          [string]
//   --target                   Environment to build for                   [string]
//   --cache                    Cache generated modules and chunks to improve
//                              performance for multiple incremental builds.
//                       [boolean] [default: It's enabled by default when watching]
//   --watch-stdin, --stdin     Stop watching when stdin stream has ended [boolean]
//   --watch-aggregate-timeout  Delay the rebuilt after the first change. Value is
//                              a time in ms.                              [number]
//   --watch-poll               Enable polling mode for watching           [string]
//   --hot                      Enables Hot Module Replacement            [boolean]
//   --prefetch                 Prefetch this request (Example: --prefetch
//                              ./file.js)                                 [string]
//   --provide                  Provide these modules as free vars in all modules
//                              (Example: --provide jQuery=jquery)         [string]
//   --labeled-modules          Enables labeled modules                   [boolean]
//   --plugin                   Load this plugin                           [string]
//   --bail                     Report the first error as a hard error instead of
//                              tolerating it.            [boolean] [default: null]
//   --profile                  Capture timing information for each module.
//                                                        [boolean] [default: null]
// Resolving options:
//   --resolve-alias         Redirect module requests                      [string]
//   --resolve-extensions    Redirect module requests                       [array]
//   --resolve-loader-alias  Setup a loader alias for resolving            [string]
// Optimizing options:
//   --optimize-max-chunks      Try to keep the chunk count below a limit
//   --optimize-min-chunk-size  Minimal size for the created chunk
//   --optimize-minimize        Enable minimizing the output. Uses
//                              optimization.minimizer.                   [boolean]
// Stats options:
//   --color, --colors               Force colors on the console
//                                            [boolean] [default: (supports-color)]
//   --no-color, --no-colors         Force no colors on the console       [boolean]
//   --sort-modules-by               Sorts the modules list by property in module
//                                                                         [string]
//   --sort-chunks-by                Sorts the chunks list by property in chunk
//                                                                         [string]
//   --sort-assets-by                Sorts the assets list by property in asset
//                                                                         [string]
//   --hide-modules                  Hides info about modules             [boolean]
//   --display-exclude               Exclude modules in the output         [string]
//   --display-modules               Display even excluded modules in the output
//                                                                        [boolean]
//   --display-max-modules           Sets the maximum number of visible modules in
//                                   output                                [number]
//   --display-chunks                Display chunks in the output         [boolean]
//   --display-entrypoints           Display entry points in the output   [boolean]
//   --display-origins               Display origins of chunks in the output
//                                                                        [boolean]
//   --display-cached                Display also cached modules in the output
//                                                                        [boolean]
//   --display-cached-assets         Display also cached assets in the output
//                                                                        [boolean]
//   --display-reasons               Display reasons about module inclusion in the
//                                   output                               [boolean]
//   --display-depth                 Display distance from entry point for each
//                                   module                               [boolean]
//   --display-used-exports          Display information about used exports in
//                                   modules (Tree Shaking)               [boolean]
//   --display-provided-exports      Display information about exports provided
//                                   from modules                         [boolean]
//   --display-optimization-bailout  Display information about why optimization
//                                   bailed out for modules               [boolean]
//   --display-error-details         Display details about errors         [boolean]
//   --display                       Select display preset
//               [string] [choices: "", "verbose", "detailed", "normal", "minimal",
//                                                           "errors-only", "none"]
//   --verbose                       Show more details                    [boolean]
//   --info-verbosity                Controls the output of lifecycle messaging
//                                   e.g. Started watching files...
//                  [string] [choices: "none", "info", "verbose"] [default: "info"]
//   --build-delimiter               Display custom text after build output[string]
// Options:
//   --silent       Prevent output from being displayed in stdout         [boolean]
//   --json, -j     Prints the result as JSON.                            [boolean]
program.version(`@swc/cli: ${pkg.version}
@swc/core: ${_core.version}`);
async function parseSpackArgs(args) {
    //
    const cmd = program.parse(args);
    const opts = cmd.opts();
    const cliOptions = {
        // watch: !!opts.watch,
        debug: !!opts.debug
    };
    var _opts_config;
    const configOpts = await (0, _spack.compileBundleOptions)((_opts_config = opts.config) !== null && _opts_config !== void 0 ? _opts_config : _path.resolve("spack.config.js"));
    if (opts.entry) {
        configOpts.entry = opts.entry;
    }
    if (opts.mode) {
        configOpts.mode = opts.mode;
    }
    if (opts.target) {
        configOpts.target = opts.target;
    }
    if (!configOpts.output) {
        configOpts.output = {};
    }
    if (!configOpts.output.path) {
        var _opts_outputPath;
        configOpts.output.path = (_opts_outputPath = opts.outputPath) !== null && _opts_outputPath !== void 0 ? _opts_outputPath : "[name].js";
    }
    if (!configOpts.output.name) {
        var _opts_output;
        configOpts.output.name = (_opts_output = opts.output) !== null && _opts_output !== void 0 ? _opts_output : "[name].js";
    }
    // if (!configOpts.output.name) {
    //     configOpts.output.path = opts.outputPath;
    // }
    return {
        cliOptions,
        spackOptions: {
            ...configOpts
        }
    };
}
function collect(value, previousValue) {
    // If the user passed the option with no value, like "babel file.js --presets", do nothing.
    if (typeof value !== "string") return previousValue;
    const values = value.split(",");
    return previousValue ? previousValue.concat(values) : values;
}

//# sourceMappingURL=options.js.map