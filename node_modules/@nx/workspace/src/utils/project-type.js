"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRootDir = exports.ProjectType = void 0;
var ProjectType;
(function (ProjectType) {
    ProjectType["Application"] = "application";
    ProjectType["Library"] = "library";
})(ProjectType || (exports.ProjectType = ProjectType = {}));
function projectRootDir(projectType) {
    if (projectType == ProjectType.Application) {
        return 'apps';
    }
    else if (projectType == ProjectType.Library) {
        return 'libs';
    }
}
exports.projectRootDir = projectRootDir;
