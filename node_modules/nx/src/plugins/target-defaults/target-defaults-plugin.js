"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetInfo = exports.TargetDefaultsPlugin = void 0;
const minimatch_1 = require("minimatch");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const fileutils_1 = require("../../utils/fileutils");
const globs_1 = require("../../utils/globs");
const package_json_1 = require("../../utils/package-json");
const package_json_workspaces_1 = require("../package-json-workspaces");
const symbols_1 = require("./symbols");
exports.TargetDefaultsPlugin = {
    name: 'nx/core/target-defaults',
    createNodes: [
        '{package.json,**/package.json,project.json,**/project.json}',
        (configFile, _, ctx) => {
            const fileName = (0, node_path_1.basename)(configFile);
            const root = (0, node_path_1.dirname)(configFile);
            const packageManagerWorkspacesGlob = (0, globs_1.combineGlobPatterns)((0, package_json_workspaces_1.getGlobPatternsFromPackageManagerWorkspaces)(ctx.workspaceRoot));
            // Only process once if package.json + project.json both exist
            if (fileName === 'package.json' &&
                (0, node_fs_1.existsSync)((0, node_path_1.join)(ctx.workspaceRoot, root, 'project.json'))) {
                return {};
            }
            else if (fileName === 'package.json' &&
                !(0, minimatch_1.minimatch)(configFile, packageManagerWorkspacesGlob)) {
                return {};
            }
            // If no target defaults, this does nothing
            const targetDefaults = ctx.nxJsonConfiguration?.targetDefaults;
            if (!targetDefaults) {
                return {};
            }
            const projectJson = readJsonOrNull((0, node_path_1.join)(ctx.workspaceRoot, root, 'project.json'));
            const packageJson = readJsonOrNull((0, node_path_1.join)(ctx.workspaceRoot, root, 'package.json'));
            const packageJsonTargets = (0, package_json_1.readTargetsFromPackageJson)(packageJson);
            const projectDefinedTargets = new Set([
                ...Object.keys(projectJson?.targets ?? {}),
                ...(packageJson ? Object.keys(packageJsonTargets) : []),
            ]);
            const executorToTargetMap = getExecutorToTargetMap(packageJsonTargets, projectJson?.targets);
            const modifiedTargets = {};
            for (const defaultSpecifier in targetDefaults) {
                const targetNames = executorToTargetMap.get(defaultSpecifier) ?? new Set();
                targetNames.add(defaultSpecifier);
                for (const targetName of targetNames) {
                    // Prevents `build` from overwriting `@nx/js:tsc` if both are present
                    // and build is specified later in the ordering.
                    if (!modifiedTargets[targetName] || targetName !== defaultSpecifier) {
                        const defaults = JSON.parse(JSON.stringify(targetDefaults[defaultSpecifier]));
                        modifiedTargets[targetName] = {
                            ...getTargetInfo(targetName, projectJson?.targets, packageJsonTargets),
                            ...defaults,
                        };
                    }
                    // TODO: Remove this after we figure out a way to define new targets
                    // in target defaults
                    if (!projectDefinedTargets.has(targetName)) {
                        modifiedTargets[targetName][symbols_1.ONLY_MODIFIES_EXISTING_TARGET] = true;
                    }
                }
            }
            return {
                projects: {
                    [root]: {
                        targets: modifiedTargets,
                    },
                },
                [symbols_1.OVERRIDE_SOURCE_FILE]: 'nx.json',
            };
        },
    ],
};
exports.default = exports.TargetDefaultsPlugin;
function getExecutorToTargetMap(packageJsonTargets, projectJsonTargets) {
    const executorToTargetMap = new Map();
    const targets = Object.keys({
        ...projectJsonTargets,
        ...packageJsonTargets,
    });
    for (const target of targets) {
        const executor = getTargetExecutor(target, projectJsonTargets, packageJsonTargets);
        const targetsForExecutor = executorToTargetMap.get(executor) ?? new Set();
        targetsForExecutor.add(target);
        executorToTargetMap.set(executor, targetsForExecutor);
    }
    return executorToTargetMap;
}
function readJsonOrNull(path) {
    if ((0, node_fs_1.existsSync)(path)) {
        return (0, fileutils_1.readJsonFile)(path);
    }
    else {
        return null;
    }
}
/**
 * This fn gets target info that would make a target uniquely compatible
 * with what is described by project.json or package.json. As the merge process
 * for config happens, without this, the target defaults may be compatible
 * with a config from a plugin and then that combined target be incompatible
 * with the project json configuration resulting in the target default values
 * being scrapped. By adding enough information from the project.json / package.json,
 * we can make sure that the target after merging is compatible with the defined target.
 */
function getTargetInfo(target, projectJsonTargets, packageJsonTargets) {
    const projectJsonTarget = projectJsonTargets?.[target];
    const packageJsonTarget = packageJsonTargets?.[target];
    const executor = getTargetExecutor(target, projectJsonTargets, packageJsonTargets);
    const targetOptions = {
        ...packageJsonTarget?.options,
        ...projectJsonTarget?.options,
    };
    const metadata = {
        ...packageJsonTarget?.metadata,
        ...projectJsonTarget?.metadata,
    };
    if (projectJsonTarget?.command) {
        return {
            command: projectJsonTarget?.command,
            metadata,
        };
    }
    if (executor === 'nx:run-commands') {
        if (targetOptions?.command) {
            return {
                executor: 'nx:run-commands',
                options: {
                    command: targetOptions?.command,
                },
                metadata,
            };
        }
        else if (targetOptions?.commands) {
            return {
                executor: 'nx:run-commands',
                options: {
                    commands: targetOptions.commands,
                },
                metadata,
            };
        }
        return {
            executor: 'nx:run-commands',
            metadata,
        };
    }
    if (executor === 'nx:run-script') {
        return {
            executor: 'nx:run-script',
            options: {
                script: targetOptions?.script ?? target,
            },
            metadata,
        };
    }
    if (executor) {
        return { executor };
    }
    return {};
}
exports.getTargetInfo = getTargetInfo;
function getTargetExecutor(target, projectJsonTargets, packageJsonTargets) {
    const projectJsonTargetConfiguration = projectJsonTargets?.[target];
    const packageJsonTargetConfiguration = packageJsonTargets?.[target];
    if (!projectJsonTargetConfiguration && packageJsonTargetConfiguration) {
        return packageJsonTargetConfiguration?.executor;
    }
    if (projectJsonTargetConfiguration?.executor) {
        return projectJsonTargetConfiguration.executor;
    }
    if (projectJsonTargetConfiguration?.command) {
        return 'nx:run-commands';
    }
    return null;
}
