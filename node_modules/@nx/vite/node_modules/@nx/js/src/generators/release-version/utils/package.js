"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const devkit_1 = require("@nx/devkit");
class Package {
    constructor(packageJson, workspaceRoot, workspaceRelativeLocation) {
        this.packageJson = packageJson;
        this.name = packageJson.name;
        this.version = packageJson.version;
        this.location = (0, devkit_1.joinPathFragments)(workspaceRoot, workspaceRelativeLocation);
    }
    getLocalDependency(depName) {
        if (this.packageJson.dependencies?.[depName]) {
            return {
                collection: 'dependencies',
                spec: this.packageJson.dependencies[depName],
            };
        }
        if (this.packageJson.devDependencies?.[depName]) {
            return {
                collection: 'devDependencies',
                spec: this.packageJson.devDependencies[depName],
            };
        }
        if (this.packageJson.optionalDependencies?.[depName]) {
            return {
                collection: 'optionalDependencies',
                spec: this.packageJson.optionalDependencies[depName],
            };
        }
        return null;
    }
}
exports.Package = Package;
