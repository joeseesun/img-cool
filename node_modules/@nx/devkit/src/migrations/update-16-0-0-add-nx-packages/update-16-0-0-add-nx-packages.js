"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_files_1 = require("../../generators/format-files");
const replace_package_1 = require("../../utils/replace-package");
async function replacePackage(tree) {
    await (0, replace_package_1.replaceNrwlPackageWithNxPackage)(tree, '@nrwl/devkit', '@nx/devkit');
    await (0, format_files_1.formatFiles)(tree);
}
exports.default = replacePackage;
