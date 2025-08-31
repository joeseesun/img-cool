"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _slash = /*#__PURE__*/ _interop_require_default(require("slash"));
const _sourcemap = require("source-map");
const _sources = require("./sources");
const _util = /*#__PURE__*/ _interop_require_wildcard(require("./util"));
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
async function _default({ cliOptions, swcOptions }) {
    async function concatResults(file, ...results) {
        let added = false;
        const map = new _sourcemap.SourceMapGenerator({
            file,
            sourceRoot: swcOptions.sourceRoot
        });
        let code = "";
        let offset = 0;
        for (const result of results){
            code += result.code + "\n";
            if (result.map) {
                added = true;
                const consumer = await new _sourcemap.SourceMapConsumer(result.map);
                const sources = new Set();
                consumer.eachMapping((mapping)=>{
                    sources.add(mapping.source);
                    map.addMapping({
                        generated: {
                            line: mapping.generatedLine + offset,
                            column: mapping.generatedColumn
                        },
                        original: {
                            line: mapping.originalLine,
                            column: mapping.originalColumn
                        },
                        source: mapping.source
                    });
                });
                sources.forEach((source)=>{
                    const content = consumer.sourceContentFor(source, true);
                    if (content !== null) {
                        map.setSourceContent(source, content);
                    }
                });
            }
            offset = code.split("\n").length - 1;
        }
        if (!added) {
            return {
                code
            };
        }
        return {
            code,
            map: JSON.stringify(map)
        };
    }
    async function output(results) {
        const file = cliOptions.sourceMapTarget || _path.default.basename(cliOptions.outFile || "stdout");
        const result = await concatResults(file, ...results);
        if (cliOptions.outFile) {
            _util.outputFile(result, cliOptions.outFile, swcOptions.sourceMaps);
        } else {
            process.stdout.write(result.code + "\n");
            if (result.map) {
                const map = `//#sourceMappingURL=data:application/json;charset=utf-8;base64,${Buffer.from(JSON.stringify(result.map), "utf8").toString("base64")}`;
                process.stdout.write(map);
            }
        }
    }
    async function handle(filename) {
        const sourceFileName = (0, _slash.default)(cliOptions.outFile ? _path.default.relative(_path.default.dirname(cliOptions.outFile), filename) : filename);
        return await _util.compile(filename, {
            ...swcOptions,
            sourceFileName
        }, cliOptions.sync, cliOptions.outFile);
    }
    async function getProgram(previousResults = new Map()) {
        const results = new Map();
        for (const filename of (await (0, _sources.globSources)(cliOptions.filenames, cliOptions.only, cliOptions.ignore, cliOptions.includeDotfiles))){
            if ((0, _sources.isCompilableExtension)(filename, cliOptions.extensions)) {
                results.set(filename, previousResults.get(filename));
            }
        }
        return results;
    }
    async function files() {
        let results = await getProgram();
        for (const filename of results.keys()){
            try {
                const result = await handle(filename);
                if (result) {
                    results.set(filename, result);
                } else {
                    results.delete(filename);
                }
            } catch (err) {
                console.error(err.message);
                results.set(filename, err);
            }
        }
        if (cliOptions.watch) {
            const watcher = await (0, _sources.watchSources)(cliOptions.filenames, cliOptions.includeDotfiles);
            watcher.on("ready", ()=>{
                Promise.resolve().then(async ()=>{
                    _util.assertCompilationResult(results, cliOptions.quiet);
                    await output(results.values());
                    if (!cliOptions.quiet) {
                        console.info("Watching for file changes.");
                    }
                }).catch((err)=>{
                    console.error(err.message);
                });
            });
            watcher.on("add", async (filename)=>{
                if ((0, _sources.isCompilableExtension)(filename, cliOptions.extensions)) {
                    // ensure consistent insertion order when files are added
                    results = await getProgram(results);
                }
            });
            watcher.on("unlink", (filename)=>{
                results.delete(filename);
            });
            for (const type of [
                "add",
                "change"
            ]){
                watcher.on(type, (filename)=>{
                    if (!(0, _sources.isCompilableExtension)(filename, cliOptions.extensions)) {
                        return;
                    }
                    const start = process.hrtime();
                    handle(filename).then(async (result)=>{
                        if (!result) {
                            results.delete(filename);
                            return;
                        }
                        results.set(filename, result);
                        _util.assertCompilationResult(results, true);
                        await output(results.values());
                        if (!cliOptions.quiet) {
                            const [seconds, nanoseconds] = process.hrtime(start);
                            const ms = seconds * 1000 + nanoseconds * 1e-6;
                            const name = _path.default.basename(cliOptions.outFile);
                            console.log(`Compiled ${name} in ${ms.toFixed(2)}ms`);
                        }
                    }).catch((err)=>{
                        console.error(err.message);
                    });
                });
            }
        } else {
            _util.assertCompilationResult(results, cliOptions.quiet);
            await output(results.values());
        }
    }
    async function stdin() {
        let code = "";
        process.stdin.setEncoding("utf8");
        for await (const chunk of process.stdin){
            code += chunk;
        }
        const res = await _util.transform(cliOptions.filename, code, {
            ...swcOptions,
            sourceFileName: "stdin"
        }, cliOptions.sync, undefined);
        output([
            res
        ]);
    }
    if (cliOptions.filenames.length) {
        await files();
    } else {
        await stdin();
    }
}

//# sourceMappingURL=file.js.map