"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssInJsDependenciesSwc = exports.cssInJsDependenciesBabel = void 0;
const versions_1 = require("./versions");
exports.cssInJsDependenciesBabel = {
    'styled-components': {
        dependencies: {
            'react-is': versions_1.reactIsVersion,
            'styled-components': versions_1.styledComponentsVersion,
        },
        devDependencies: {
            '@types/styled-components': versions_1.typesStyledComponentsVersion,
            '@types/react-is': versions_1.typesReactIsVersion,
            'babel-plugin-styled-components': versions_1.babelPluginStyledComponentsVersion,
        },
    },
    '@emotion/styled': {
        dependencies: {
            '@emotion/styled': versions_1.emotionStyledVersion,
            '@emotion/react': versions_1.emotionReactVersion,
        },
        devDependencies: {
            '@emotion/babel-plugin': versions_1.emotionBabelPlugin,
        },
    },
    'styled-jsx': {
        dependencies: {
            'styled-jsx': versions_1.styledJsxVersion,
        },
        devDependencies: {},
    },
};
exports.cssInJsDependenciesSwc = {
    'styled-components': {
        dependencies: {
            'react-is': versions_1.reactIsVersion,
            'styled-components': versions_1.styledComponentsVersion,
        },
        devDependencies: {
            '@types/styled-components': versions_1.typesStyledComponentsVersion,
            '@types/react-is': versions_1.typesReactIsVersion,
            '@swc/plugin-styled-components': versions_1.swcPluginStyledComponentsVersion,
        },
    },
    '@emotion/styled': {
        dependencies: {
            '@emotion/styled': versions_1.emotionStyledVersion,
            '@emotion/react': versions_1.emotionReactVersion,
        },
        devDependencies: {
            '@swc/plugin-emotion': versions_1.swcPluginEmotionVersion,
        },
    },
    'styled-jsx': {
        dependencies: {
            'styled-jsx': versions_1.styledJsxVersion,
        },
        devDependencies: {
            '@swc/plugin-styled-jsx': versions_1.swcPluginStyledJsxVersion,
        },
    },
};
