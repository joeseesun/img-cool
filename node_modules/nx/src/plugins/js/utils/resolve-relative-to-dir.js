"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveRelativeToDir = void 0;
/**
 * NOTE: This function is in its own file because it is not possible to mock
 * require.resolve directly in jest https://github.com/jestjs/jest/issues/9543
 */
function resolveRelativeToDir(path, relativeToDir) {
    try {
        return require.resolve(path, {
            paths: [relativeToDir],
        });
    }
    catch {
        return null;
    }
}
exports.resolveRelativeToDir = resolveRelativeToDir;
