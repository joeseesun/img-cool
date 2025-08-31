"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportPath = void 0;
const get_npm_scope_1 = require("./package-json/get-npm-scope");
/**
 * Prefixes project name with npm scope
 */
function getImportPath(tree, projectDirectory) {
    const npmScope = (0, get_npm_scope_1.getNpmScope)(tree);
    return npmScope
        ? `${npmScope === '@' ? '' : '@'}${npmScope}/${projectDirectory}`
        : projectDirectory;
}
exports.getImportPath = getImportPath;
