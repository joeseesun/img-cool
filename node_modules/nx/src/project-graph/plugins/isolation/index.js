"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadNxPluginInIsolation = void 0;
const workspace_root_1 = require("../../../utils/workspace-root");
const plugin_pool_1 = require("./plugin-pool");
/**
 * Used to ensure 1 plugin : 1 worker
 */
const remotePluginCache = new Map();
function loadNxPluginInIsolation(plugin, root = workspace_root_1.workspaceRoot) {
    const cacheKey = JSON.stringify(plugin);
    if (remotePluginCache.has(cacheKey)) {
        return [remotePluginCache.get(cacheKey), () => { }];
    }
    const loadingPlugin = (0, plugin_pool_1.loadRemoteNxPlugin)(plugin, root);
    remotePluginCache.set(cacheKey, loadingPlugin);
    // We clean up plugin workers when Nx process completes.
    return [loadingPlugin, () => { }];
}
exports.loadNxPluginInIsolation = loadNxPluginInIsolation;
