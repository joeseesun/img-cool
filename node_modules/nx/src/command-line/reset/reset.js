"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetHandler = void 0;
const fs_extra_1 = require("fs-extra");
const client_1 = require("../../daemon/client/client");
const cache_directory_1 = require("../../utils/cache-directory");
const output_1 = require("../../utils/output");
const native_file_cache_location_1 = require("../../native/native-file-cache-location");
// Wait at max 5 seconds before giving up on a failing operation.
const INCREMENTAL_BACKOFF_MAX_DURATION = 5000;
// If an operation fails, wait 100ms before first retry.
const INCREMENTAL_BACKOFF_FIRST_DELAY = 100;
async function resetHandler(args) {
    let errors = [];
    const all = args.onlyDaemon === undefined &&
        args.onlyCache === undefined &&
        args.onlyWorkspaceData === undefined;
    const startupMessage = all
        ? 'Resetting the Nx cache and stopping the daemon.'
        : 'Resetting:';
    const bodyLines = [];
    if (!all) {
        if (args.onlyDaemon) {
            bodyLines.push('- Nx Daemon');
        }
        if (args.onlyCache) {
            bodyLines.push('- Cache directory');
        }
        if (args.onlyWorkspaceData) {
            bodyLines.push('- Workspace data directory');
        }
    }
    output_1.output.note({ title: startupMessage, bodyLines });
    if (all || args.onlyDaemon) {
        try {
            await killDaemon();
        }
        catch {
            errors.push('Failed to stop the Nx Daemon.');
        }
    }
    if (all || args.onlyCache) {
        try {
            await cleanupCacheEntries();
        }
        catch {
            errors.push('Failed to clean up the cache directory.');
        }
    }
    if (all || args.onlyWorkspaceData) {
        try {
            await cleanupNativeFileCache();
        }
        catch {
            errors.push('Failed to clean up the native file cache.');
        }
        try {
            await cleanupWorkspaceData();
        }
        catch {
            errors.push('Failed to clean up the workspace data directory.');
        }
    }
    if (errors.length > 0) {
        output_1.output.error({
            title: 'Failed to reset the Nx workspace.',
            bodyLines: errors,
        });
        process.exit(1);
    }
    else {
        output_1.output.success({
            title: 'Successfully reset the Nx workspace.',
        });
    }
}
exports.resetHandler = resetHandler;
function killDaemon() {
    return client_1.daemonClient.stop();
}
function cleanupCacheEntries() {
    return incrementalBackoff(INCREMENTAL_BACKOFF_FIRST_DELAY, INCREMENTAL_BACKOFF_MAX_DURATION, () => {
        (0, fs_extra_1.rmSync)(cache_directory_1.cacheDir, { recursive: true, force: true });
    });
}
function cleanupNativeFileCache() {
    return incrementalBackoff(INCREMENTAL_BACKOFF_FIRST_DELAY, INCREMENTAL_BACKOFF_MAX_DURATION, () => {
        (0, fs_extra_1.rmSync)((0, native_file_cache_location_1.getNativeFileCacheLocation)(), { recursive: true, force: true });
    });
}
function cleanupWorkspaceData() {
    return incrementalBackoff(INCREMENTAL_BACKOFF_FIRST_DELAY, INCREMENTAL_BACKOFF_MAX_DURATION, () => {
        (0, fs_extra_1.rmSync)(cache_directory_1.workspaceDataDirectory, { recursive: true, force: true });
    });
}
async function incrementalBackoff(ms, maxDuration, callback) {
    try {
        callback();
    }
    catch (e) {
        if (ms < maxDuration) {
            await sleep(ms);
            await incrementalBackoff(ms * 2, maxDuration, callback);
        }
        else {
            throw e;
        }
    }
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
