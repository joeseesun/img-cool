"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStyledModuleDependencies = void 0;
const devkit_1 = require("@nx/devkit");
const styled_1 = require("../utils/styled");
function addStyledModuleDependencies(host, options) {
    const extraDependencies = options.compiler === 'swc'
        ? styled_1.cssInJsDependenciesSwc[options.styledModule]
        : styled_1.cssInJsDependenciesBabel[options.styledModule];
    if (extraDependencies) {
        return (0, devkit_1.addDependenciesToPackageJson)(host, extraDependencies.dependencies, extraDependencies.devDependencies);
    }
    else {
        return () => { };
    }
}
exports.addStyledModuleDependencies = addStyledModuleDependencies;
