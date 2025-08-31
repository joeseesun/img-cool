"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetFilesInDirectory = void 0;
const workspace_context_1 = require("../../utils/workspace-context");
const workspace_root_1 = require("../../utils/workspace-root");
async function handleGetFilesInDirectory(dir) {
    const files = await (0, workspace_context_1.getFilesInDirectoryUsingContext)(workspace_root_1.workspaceRoot, dir);
    return {
        response: JSON.stringify(files),
        description: 'handleNxWorkspaceFiles',
    };
}
exports.handleGetFilesInDirectory = handleGetFilesInDirectory;
