"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTmpSwcrc = generateTmpSwcrc;
const devkit_1 = require("@nx/devkit");
function generateTmpSwcrc(inlineProjectGraph, swcrcPath, tmpSwcrcPath) {
    const swcrc = (0, devkit_1.readJsonFile)(swcrcPath);
    swcrc['exclude'] ??= [];
    if (!Array.isArray(swcrc['exclude'])) {
        swcrc['exclude'] = [swcrc['exclude']];
    }
    swcrc['exclude'] = swcrc['exclude'].concat(Object.values(inlineProjectGraph.externals).map((external) => `${external.root}/**/.*.ts$`), 'node_modules/**/*.ts$');
    (0, devkit_1.writeJsonFile)(tmpSwcrcPath, swcrc);
    return tmpSwcrcPath;
}
