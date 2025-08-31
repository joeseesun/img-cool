"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTag = exports.findClosestOpening = exports.findDefaultExport = exports.findElements = exports.findComponentImportPath = exports.findMainRenderStatement = void 0;
// Exported schematics development outside of Nx. e.g. workspace schematics
var ast_utils_1 = require("./src/utils/ast-utils");
Object.defineProperty(exports, "findMainRenderStatement", { enumerable: true, get: function () { return ast_utils_1.findMainRenderStatement; } });
Object.defineProperty(exports, "findComponentImportPath", { enumerable: true, get: function () { return ast_utils_1.findComponentImportPath; } });
Object.defineProperty(exports, "findElements", { enumerable: true, get: function () { return ast_utils_1.findElements; } });
Object.defineProperty(exports, "findDefaultExport", { enumerable: true, get: function () { return ast_utils_1.findDefaultExport; } });
Object.defineProperty(exports, "findClosestOpening", { enumerable: true, get: function () { return ast_utils_1.findClosestOpening; } });
Object.defineProperty(exports, "isTag", { enumerable: true, get: function () { return ast_utils_1.isTag; } });
