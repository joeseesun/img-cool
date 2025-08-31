"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupPlugins = exports.getPlugins = void 0;
const nx_json_1 = require("../../config/nx-json");
const internal_api_1 = require("../../project-graph/plugins/internal-api");
const workspace_root_1 = require("../../utils/workspace-root");
let loadedPlugins;
let cleanup;
async function getPlugins() {
    if (loadedPlugins) {
        return loadedPlugins;
    }
    const pluginsConfiguration = (0, nx_json_1.readNxJson)().plugins ?? [];
    const [result, cleanupFn] = await (0, internal_api_1.loadNxPlugins)(pluginsConfiguration, workspace_root_1.workspaceRoot);
    cleanup = cleanupFn;
    loadedPlugins = result;
    return result;
}
exports.getPlugins = getPlugins;
function cleanupPlugins() {
    cleanup();
}
exports.cleanupPlugins = cleanupPlugins;
