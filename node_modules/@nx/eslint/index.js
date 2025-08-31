"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRulesRequiringTypeChecking = exports.Linter = exports.lintInitGenerator = exports.lintProjectGenerator = void 0;
var lint_project_1 = require("./src/generators/lint-project/lint-project");
Object.defineProperty(exports, "lintProjectGenerator", { enumerable: true, get: function () { return lint_project_1.lintProjectGenerator; } });
var init_1 = require("./src/generators/init/init");
Object.defineProperty(exports, "lintInitGenerator", { enumerable: true, get: function () { return init_1.lintInitGenerator; } });
var linter_1 = require("./src/generators/utils/linter");
Object.defineProperty(exports, "Linter", { enumerable: true, get: function () { return linter_1.Linter; } });
// @nx/angular needs it for the Angular CLI workspace migration to Nx to
// infer whether a config is using type aware rules and set the
// `hasTypeAwareRules` option of the `@nx/eslint:lint` executor.
var rules_requiring_type_checking_1 = require("./src/utils/rules-requiring-type-checking");
Object.defineProperty(exports, "hasRulesRequiringTypeChecking", { enumerable: true, get: function () { return rules_requiring_type_checking_1.hasRulesRequiringTypeChecking; } });
