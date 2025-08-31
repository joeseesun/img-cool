"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSwcRegisterDependencies = exports.addSwcDependencies = void 0;
const devkit_1 = require("@nx/devkit");
const versions_1 = require("../versions");
function addSwcDependencies(tree) {
    return (0, devkit_1.addDependenciesToPackageJson)(tree, {
        '@swc/helpers': versions_1.swcHelpersVersion,
    }, {
        '@swc/core': versions_1.swcCoreVersion,
        '@swc/cli': versions_1.swcCliVersion,
    });
}
exports.addSwcDependencies = addSwcDependencies;
function addSwcRegisterDependencies(tree) {
    return (0, devkit_1.addDependenciesToPackageJson)(tree, {}, { '@swc-node/register': versions_1.swcNodeVersion, '@swc/core': versions_1.swcCoreVersion });
}
exports.addSwcRegisterDependencies = addSwcRegisterDependencies;
