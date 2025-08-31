"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNameFromPackageJson = exports.buildProjectFromProjectJson = exports.ProjectJsonProjectsPlugin = void 0;
const node_path_1 = require("node:path");
const to_project_name_1 = require("../../../config/to-project-name");
const fileutils_1 = require("../../../utils/fileutils");
exports.ProjectJsonProjectsPlugin = {
    name: 'nx/core/project-json',
    createNodes: [
        '{project.json,**/project.json}',
        (file, _, { workspaceRoot }) => {
            const json = (0, fileutils_1.readJsonFile)((0, node_path_1.join)(workspaceRoot, file));
            const project = buildProjectFromProjectJson(json, file);
            return {
                projects: {
                    [project.root]: project,
                },
            };
        },
    ],
};
exports.default = exports.ProjectJsonProjectsPlugin;
function buildProjectFromProjectJson(json, path) {
    const packageJsonPath = (0, node_path_1.join)((0, node_path_1.dirname)(path), 'package.json');
    const { name, root, ...rest } = json;
    return {
        name: name ?? readNameFromPackageJson(packageJsonPath) ?? (0, to_project_name_1.toProjectName)(path),
        root: root ?? (0, node_path_1.dirname)(path),
        ...rest,
    };
}
exports.buildProjectFromProjectJson = buildProjectFromProjectJson;
function readNameFromPackageJson(path) {
    try {
        const json = (0, fileutils_1.readJsonFile)(path);
        return json.nx?.name ?? json.name;
    }
    catch {
        return undefined;
    }
}
exports.readNameFromPackageJson = readNameFromPackageJson;
