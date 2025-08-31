"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetWorkspaceContext = exports.updateProjectFiles = exports.getFilesInDirectoryUsingContext = exports.getAllFileDataInContext = exports.updateFilesInContext = exports.hashWithWorkspaceContext = exports.globWithWorkspaceContext = exports.globWithWorkspaceContextSync = exports.getNxWorkspaceFilesFromContext = exports.setupWorkspaceContext = void 0;
const perf_hooks_1 = require("perf_hooks");
const cache_directory_1 = require("./cache-directory");
const is_on_daemon_1 = require("../daemon/is-on-daemon");
const client_1 = require("../daemon/client/client");
let workspaceContext;
function setupWorkspaceContext(workspaceRoot) {
    const { WorkspaceContext } = require('../native');
    perf_hooks_1.performance.mark('workspace-context');
    workspaceContext = new WorkspaceContext(workspaceRoot, (0, cache_directory_1.cacheDirectoryForWorkspace)(workspaceRoot));
    perf_hooks_1.performance.mark('workspace-context:end');
    perf_hooks_1.performance.measure('workspace context init', 'workspace-context', 'workspace-context:end');
}
exports.setupWorkspaceContext = setupWorkspaceContext;
async function getNxWorkspaceFilesFromContext(workspaceRoot, projectRootMap) {
    if ((0, is_on_daemon_1.isOnDaemon)() || !client_1.daemonClient.enabled()) {
        ensureContextAvailable(workspaceRoot);
        return workspaceContext.getWorkspaceFiles(projectRootMap);
    }
    return client_1.daemonClient.getWorkspaceFiles(projectRootMap);
}
exports.getNxWorkspaceFilesFromContext = getNxWorkspaceFilesFromContext;
/**
 * Sync method to get files matching globs from workspace context.
 * NOTE: This method will create the workspace context if it doesn't exist.
 * It should only be used within Nx internal in code paths that **must** be sync.
 * If used in an isolated plugin thread this will cause the workspace context
 * to be recreated which is slow.
 */
function globWithWorkspaceContextSync(workspaceRoot, globs, exclude) {
    ensureContextAvailable(workspaceRoot);
    return workspaceContext.glob(globs, exclude);
}
exports.globWithWorkspaceContextSync = globWithWorkspaceContextSync;
async function globWithWorkspaceContext(workspaceRoot, globs, exclude) {
    if ((0, is_on_daemon_1.isOnDaemon)() || !client_1.daemonClient.enabled()) {
        ensureContextAvailable(workspaceRoot);
        return workspaceContext.glob(globs, exclude);
    }
    else {
        return client_1.daemonClient.glob(globs, exclude);
    }
}
exports.globWithWorkspaceContext = globWithWorkspaceContext;
async function hashWithWorkspaceContext(workspaceRoot, globs, exclude) {
    if ((0, is_on_daemon_1.isOnDaemon)() || !client_1.daemonClient.enabled()) {
        ensureContextAvailable(workspaceRoot);
        return workspaceContext.hashFilesMatchingGlob(globs, exclude);
    }
    return client_1.daemonClient.hashGlob(globs, exclude);
}
exports.hashWithWorkspaceContext = hashWithWorkspaceContext;
function updateFilesInContext(updatedFiles, deletedFiles) {
    return workspaceContext?.incrementalUpdate(updatedFiles, deletedFiles);
}
exports.updateFilesInContext = updateFilesInContext;
async function getAllFileDataInContext(workspaceRoot) {
    if ((0, is_on_daemon_1.isOnDaemon)() || !client_1.daemonClient.enabled()) {
        ensureContextAvailable(workspaceRoot);
        return workspaceContext.allFileData();
    }
    return client_1.daemonClient.getWorkspaceContextFileData();
}
exports.getAllFileDataInContext = getAllFileDataInContext;
async function getFilesInDirectoryUsingContext(workspaceRoot, dir) {
    if ((0, is_on_daemon_1.isOnDaemon)() || !client_1.daemonClient.enabled()) {
        ensureContextAvailable(workspaceRoot);
        return workspaceContext.getFilesInDirectory(dir);
    }
    return client_1.daemonClient.getFilesInDirectory(dir);
}
exports.getFilesInDirectoryUsingContext = getFilesInDirectoryUsingContext;
function updateProjectFiles(projectRootMappings, rustReferences, updatedFiles, deletedFiles) {
    return workspaceContext?.updateProjectFiles(projectRootMappings, rustReferences.projectFiles, rustReferences.globalFiles, updatedFiles, deletedFiles);
}
exports.updateProjectFiles = updateProjectFiles;
function ensureContextAvailable(workspaceRoot) {
    if (!workspaceContext || workspaceContext?.workspaceRoot !== workspaceRoot) {
        setupWorkspaceContext(workspaceRoot);
    }
}
function resetWorkspaceContext() {
    workspaceContext = undefined;
}
exports.resetWorkspaceContext = resetWorkspaceContext;
