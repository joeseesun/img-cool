"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureTypescript = void 0;
const devkit_1 = require("@nx/devkit");
const versions_1 = require("../versions");
function ensureTypescript() {
    return (0, devkit_1.ensurePackage)('typescript', versions_1.typescriptVersion);
}
exports.ensureTypescript = ensureTypescript;
