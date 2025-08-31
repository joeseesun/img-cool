"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeJs = void 0;
function maybeJs(options, path) {
    return options.js && (path.endsWith('.ts') || path.endsWith('.tsx'))
        ? path.replace(/\.tsx?$/, '.js')
        : path;
}
exports.maybeJs = maybeJs;
