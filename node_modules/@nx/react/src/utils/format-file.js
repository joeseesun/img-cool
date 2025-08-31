"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFile = void 0;
const prettier_1 = require("prettier");
const devkit_1 = require("@nx/devkit");
function formatFile(content, ...values) {
    return (0, prettier_1.format)((0, devkit_1.stripIndents)(content, values), {
        singleQuote: true,
        parser: 'typescript',
    });
}
exports.formatFile = formatFile;
