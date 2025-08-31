"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPossibleWarnings = void 0;
const chalk = require("chalk");
const devkit_1 = require("@nx/devkit");
function showPossibleWarnings(tree, options) {
    if (options.style === 'styled-jsx' && options.compiler === 'swc') {
        devkit_1.logger.warn(`styled-jsx may not work with SWC. Try using ${chalk.bold('nx g @nx/react:app --compiler=babel')} instead.`);
    }
}
exports.showPossibleWarnings = showPossibleWarnings;
