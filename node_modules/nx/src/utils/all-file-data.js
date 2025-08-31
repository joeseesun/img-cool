"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allFileData = void 0;
const workspace_context_1 = require("./workspace-context");
const workspace_root_1 = require("./workspace-root");
function allFileData() {
    return (0, workspace_context_1.getAllFileDataInContext)(workspace_root_1.workspaceRoot);
}
exports.allFileData = allFileData;
