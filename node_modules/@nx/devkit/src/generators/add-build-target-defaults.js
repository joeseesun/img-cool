"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBuildTargetDefaults = void 0;
const devkit_exports_1 = require("nx/src/devkit-exports");
function addBuildTargetDefaults(tree, executorName, buildTargetName = 'build') {
    const nxJson = (0, devkit_exports_1.readNxJson)(tree);
    nxJson.targetDefaults ??= {};
    nxJson.targetDefaults[executorName] ??= {
        cache: true,
        dependsOn: [`^${buildTargetName}`],
        inputs: nxJson.namedInputs && 'production' in nxJson.namedInputs
            ? ['production', '^production']
            : ['default', '^default'],
    };
    (0, devkit_exports_1.updateNxJson)(tree, nxJson);
}
exports.addBuildTargetDefaults = addBuildTargetDefaults;
