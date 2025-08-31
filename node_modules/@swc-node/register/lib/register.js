"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.compile = exports.AVAILABLE_EXTENSION_PATTERN = exports.AVAILABLE_TS_EXTENSION_PATTERN = void 0;
const core_1 = require("@swc-node/core");
const sourcemap_support_1 = require("@swc-node/sourcemap-support");
const pirates_1 = require("pirates");
const ts = __importStar(require("typescript"));
const read_default_tsconfig_1 = require("./read-default-tsconfig");
const DEFAULT_EXTENSIONS = [
    ts.Extension.Js,
    ts.Extension.Ts,
    ts.Extension.Jsx,
    ts.Extension.Tsx,
    ts.Extension.Mjs,
    ts.Extension.Mts,
    ts.Extension.Cjs,
    ts.Extension.Cts,
    '.es6',
    '.es',
];
exports.AVAILABLE_TS_EXTENSION_PATTERN = new RegExp(`((?<!\\.d)(${[ts.Extension.Ts, ts.Extension.Tsx, ts.Extension.Mts, ts.Extension.Cts].map((ext) => ext.replace(/^\./, '\\.')).join('|')}))$`, 'i');
exports.AVAILABLE_EXTENSION_PATTERN = new RegExp(`((?<!\\.d)(${DEFAULT_EXTENSIONS.map((ext) => ext.replace(/^\./, '\\.')).join('|')}))$`, 'i');
const injectInlineSourceMap = ({ filename, code, map, }) => {
    if (map) {
        sourcemap_support_1.SourcemapMap.set(filename, map);
        const base64Map = Buffer.from(map, 'utf8').toString('base64');
        const sourceMapContent = `//# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64Map}`;
        return `${code}\n${sourceMapContent}`;
    }
    return code;
};
function compile(sourcecode, filename, options, async = false) {
    if ((filename.includes('node_modules') && !exports.AVAILABLE_TS_EXTENSION_PATTERN.test(filename)) ||
        !exports.AVAILABLE_EXTENSION_PATTERN.test(filename)) {
        return sourcecode;
    }
    if (options && typeof options.fallbackToTs === 'function' && options.fallbackToTs(filename)) {
        delete options.fallbackToTs;
        const { outputText, sourceMapText } = ts.transpileModule(sourcecode, {
            fileName: filename,
            compilerOptions: options,
        });
        return injectInlineSourceMap({ filename, code: outputText, map: sourceMapText });
    }
    let swcRegisterConfig;
    if (process.env.SWCRC) {
        // when SWCRC environment variable is set to true it will use swcrc file
        swcRegisterConfig = {
            swc: {
                swcrc: true,
            },
        };
    }
    else {
        swcRegisterConfig = (0, read_default_tsconfig_1.tsCompilerOptionsToSwcConfig)(options, filename);
    }
    if (async) {
        return (0, core_1.transform)(sourcecode, filename, swcRegisterConfig).then(({ code, map }) => {
            return injectInlineSourceMap({ filename, code, map });
        });
    }
    else {
        const { code, map } = (0, core_1.transformSync)(sourcecode, filename, swcRegisterConfig);
        return injectInlineSourceMap({ filename, code, map });
    }
}
exports.compile = compile;
function register(options = {}, hookOpts = {}) {
    if (!process.env.SWCRC) {
        options = Object.keys(options).length ? options : (0, read_default_tsconfig_1.readDefaultTsConfig)();
    }
    options.module = ts.ModuleKind.CommonJS;
    (0, sourcemap_support_1.installSourceMapSupport)();
    return (0, pirates_1.addHook)((code, filename) => compile(code, filename, options), {
        exts: DEFAULT_EXTENSIONS,
        ...hookOpts,
    });
}
exports.register = register;
//# sourceMappingURL=register.js.map