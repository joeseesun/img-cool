"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePlugins = exports.mergeRules = void 0;
const mergeRules = (...args) => args.reduce((rules, rule) => {
    if (rules.some((includedPlugin) => includedPlugin.constructor.name === rule.constructor.name)) {
        return rules;
    }
    return [...rules, rule];
}, []);
exports.mergeRules = mergeRules;
const mergePlugins = (...args) => args.reduce((plugins, plugin) => {
    if (plugins.some((includedPlugin) => includedPlugin.constructor.name === plugin.constructor.name)) {
        return plugins;
    }
    return [...plugins, plugin];
}, []);
exports.mergePlugins = mergePlugins;
