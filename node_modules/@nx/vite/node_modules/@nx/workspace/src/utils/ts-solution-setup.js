"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectType = getProjectType;
const devkit_1 = require("@nx/devkit");
// This is copied from `@nx/js` to avoid circular dependencies.
function getProjectType(tree, projectRoot, projectType) {
    if (projectType)
        return projectType;
    if ((0, devkit_1.joinPathFragments)(projectRoot, 'tsconfig.lib.json'))
        return 'library';
    if ((0, devkit_1.joinPathFragments)(projectRoot, 'tsconfig.app.json'))
        return 'application';
    // If there are no exports, assume it is an application since both buildable and non-buildable libraries have exports.
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectRoot, 'package.json');
    const packageJson = tree.exists(packageJsonPath)
        ? (0, devkit_1.readJson)(tree, (0, devkit_1.joinPathFragments)(projectRoot, 'package.json'))
        : null;
    if (!packageJson?.exports)
        return 'application';
    return 'library';
}
