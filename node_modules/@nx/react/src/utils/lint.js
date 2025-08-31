"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendReactEslintJson = exports.extraEslintDependencies = void 0;
const versions_1 = require("./versions");
exports.extraEslintDependencies = {
    dependencies: {},
    devDependencies: {
        'eslint-plugin-import': versions_1.eslintPluginImportVersion,
        'eslint-plugin-jsx-a11y': versions_1.eslintPluginJsxA11yVersion,
        'eslint-plugin-react': versions_1.eslintPluginReactVersion,
        'eslint-plugin-react-hooks': versions_1.eslintPluginReactHooksVersion,
    },
};
/**
 * @deprecated Use `addExtendsToLintConfig` from `@nx/eslint` instead.
 */
const extendReactEslintJson = (json) => {
    const { extends: pluginExtends, ...config } = json;
    return {
        extends: ['plugin:@nx/react', ...(pluginExtends || [])],
        ...config,
    };
};
exports.extendReactEslintJson = extendReactEslintJson;
