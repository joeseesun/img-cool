"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultPluginsSync = void 0;
const angular_json_1 = require("../adapter/angular-json");
const project_json_1 = require("../plugins/project-json/build-nodes/project-json");
const target_defaults_plugin_1 = require("../plugins/target-defaults/target-defaults-plugin");
const PackageJsonWorkspacesPlugin = require("../plugins/package-json-workspaces");
/**
 * @todo(@agentender) v20: Remove this fn when we remove readWorkspaceConfig
 */
function getDefaultPluginsSync(root) {
    const plugins = [
        require('../plugins/js'),
        ...((0, angular_json_1.shouldMergeAngularProjects)(root, false)
            ? [require('../adapter/angular-json').NxAngularJsonPlugin]
            : []),
        target_defaults_plugin_1.default,
        PackageJsonWorkspacesPlugin,
        project_json_1.default,
    ];
    return plugins;
}
exports.getDefaultPluginsSync = getDefaultPluginsSync;
