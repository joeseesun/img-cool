"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = exports.resolve = void 0;
const url_1 = require("url");
const typescript_1 = __importDefault(require("typescript"));
// @ts-expect-error
const read_default_tsconfig_js_1 = require("../lib/read-default-tsconfig.js");
// @ts-expect-error
const register_js_1 = require("../lib/register.js");
const tsconfig = (0, read_default_tsconfig_js_1.readDefaultTsConfig)();
tsconfig.module = typescript_1.default.ModuleKind.ESNext;
const moduleResolutionCache = typescript_1.default.createModuleResolutionCache(typescript_1.default.sys.getCurrentDirectory(), (x) => x, tsconfig);
const host = {
    fileExists: typescript_1.default.sys.fileExists,
    readFile: typescript_1.default.sys.readFile,
};
const resolve = async (specifier, context, nextResolve) => {
    if (!register_js_1.AVAILABLE_EXTENSION_PATTERN.test(specifier)) {
        return nextResolve(specifier);
    }
    // entrypoint
    if (!context.parentURL) {
        return {
            importAttributes: {
                ...context.importAttributes,
                swc: 'entrypoint',
            },
            url: specifier,
            shortCircuit: true,
        };
    }
    const { resolvedModule } = typescript_1.default.resolveModuleName(specifier.startsWith('file:') ? (0, url_1.fileURLToPath)(specifier) : specifier, (0, url_1.fileURLToPath)(context.parentURL), tsconfig, host, moduleResolutionCache);
    // local project file
    if (resolvedModule &&
        (!resolvedModule.resolvedFileName.includes('/node_modules/') ||
            register_js_1.AVAILABLE_TS_EXTENSION_PATTERN.test(resolvedModule.resolvedFileName))) {
        return {
            url: (0, url_1.pathToFileURL)(resolvedModule.resolvedFileName).href,
            shortCircuit: true,
            importAttributes: {
                ...context.importAttributes,
                swc: resolvedModule.resolvedFileName,
            },
        };
    }
    // files could not resolved by typescript
    return nextResolve(specifier);
};
exports.resolve = resolve;
const tsconfigForSWCNode = {
    ...tsconfig,
    paths: undefined,
    baseUrl: undefined,
};
const load = async (url, context, nextLoad) => {
    const swcAttribute = context.importAttributes.swc;
    if (swcAttribute) {
        delete context.importAttributes.swc;
        const { source } = await nextLoad(url, {
            ...context,
            format: 'ts',
        });
        const code = !source || typeof source === 'string' ? source : Buffer.from(source).toString();
        const compiled = await (0, register_js_1.compile)(code, (0, url_1.fileURLToPath)(url), tsconfigForSWCNode, true);
        return {
            format: 'module',
            source: compiled,
            shortCircuit: true,
        };
    }
    else {
        return nextLoad(url, context);
    }
};
exports.load = load;
//# sourceMappingURL=esm.mjs.map