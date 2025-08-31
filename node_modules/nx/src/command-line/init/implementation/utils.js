"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMonorepo = exports.printFinalMessage = exports.markPackageJsonAsNxProject = exports.markRootPackageJsonAsNxProjectLegacy = exports.addVsCodeRecommendedExtensions = exports.initCloud = exports.runInstall = exports.updateGitIgnore = exports.addDepsToPackageJson = exports.createNxJsonFile = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const child_process_2 = require("../../../utils/child-process");
const fileutils_1 = require("../../../utils/fileutils");
const output_1 = require("../../../utils/output");
const package_manager_1 = require("../../../utils/package-manager");
const path_2 = require("../../../utils/path");
const versions_1 = require("../../../utils/versions");
const fs_1 = require("fs");
function createNxJsonFile(repoRoot, topologicalTargets, cacheableOperations, scriptOutputs) {
    const nxJsonPath = (0, path_2.joinPathFragments)(repoRoot, 'nx.json');
    let nxJson = {};
    try {
        nxJson = (0, fileutils_1.readJsonFile)(nxJsonPath);
        // eslint-disable-next-line no-empty
    }
    catch { }
    nxJson.$schema = './node_modules/nx/schemas/nx-schema.json';
    nxJson.targetDefaults ??= {};
    if (topologicalTargets.length > 0) {
        for (const scriptName of topologicalTargets) {
            nxJson.targetDefaults[scriptName] ??= {};
            nxJson.targetDefaults[scriptName] = { dependsOn: [`^${scriptName}`] };
        }
    }
    for (const [scriptName, output] of Object.entries(scriptOutputs)) {
        if (!output) {
            // eslint-disable-next-line no-continue
            continue;
        }
        nxJson.targetDefaults[scriptName] ??= {};
        nxJson.targetDefaults[scriptName].outputs = [`{projectRoot}/${output}`];
    }
    for (const target of cacheableOperations) {
        nxJson.targetDefaults[target] ??= {};
        nxJson.targetDefaults[target].cache ??= true;
    }
    if (Object.keys(nxJson.targetDefaults).length === 0) {
        delete nxJson.targetDefaults;
    }
    nxJson.defaultBase ??= deduceDefaultBase();
    (0, fileutils_1.writeJsonFile)(nxJsonPath, nxJson);
}
exports.createNxJsonFile = createNxJsonFile;
function deduceDefaultBase() {
    try {
        (0, child_process_1.execSync)(`git rev-parse --verify main`, {
            stdio: ['ignore', 'ignore', 'ignore'],
        });
        return 'main';
    }
    catch {
        try {
            (0, child_process_1.execSync)(`git rev-parse --verify dev`, {
                stdio: ['ignore', 'ignore', 'ignore'],
            });
            return 'dev';
        }
        catch {
            try {
                (0, child_process_1.execSync)(`git rev-parse --verify develop`, {
                    stdio: ['ignore', 'ignore', 'ignore'],
                });
                return 'develop';
            }
            catch {
                try {
                    (0, child_process_1.execSync)(`git rev-parse --verify next`, {
                        stdio: ['ignore', 'ignore', 'ignore'],
                    });
                    return 'next';
                }
                catch {
                    return 'master';
                }
            }
        }
    }
}
function addDepsToPackageJson(repoRoot, additionalPackages) {
    const path = (0, path_2.joinPathFragments)(repoRoot, `package.json`);
    const json = (0, fileutils_1.readJsonFile)(path);
    if (!json.devDependencies)
        json.devDependencies = {};
    json.devDependencies['nx'] = versions_1.nxVersion;
    if (additionalPackages) {
        for (const p of additionalPackages) {
            json.devDependencies[p] = versions_1.nxVersion;
        }
    }
    (0, fileutils_1.writeJsonFile)(path, json);
}
exports.addDepsToPackageJson = addDepsToPackageJson;
function updateGitIgnore(root) {
    const ignorePath = (0, path_1.join)(root, '.gitignore');
    try {
        let contents = (0, fs_1.readFileSync)(ignorePath, 'utf-8');
        const lines = contents.split('\n');
        let sepIncluded = false;
        if (!contents.includes('.nx/cache')) {
            if (!sepIncluded) {
                lines.push('\n');
                sepIncluded = true;
            }
            lines.push('.nx/cache');
        }
        if (!contents.includes('.nx/workspace-data')) {
            if (!sepIncluded) {
                lines.push('\n');
                sepIncluded = true;
            }
            lines.push('.nx/workspace-data');
        }
        (0, fs_1.writeFileSync)(ignorePath, lines.join('\n'), 'utf-8');
    }
    catch { }
}
exports.updateGitIgnore = updateGitIgnore;
function runInstall(repoRoot, pmc = (0, package_manager_1.getPackageManagerCommand)()) {
    (0, child_process_1.execSync)(pmc.install, { stdio: [0, 1, 2], cwd: repoRoot });
}
exports.runInstall = runInstall;
function initCloud(repoRoot, installationSource) {
    (0, child_process_2.runNxSync)(`g nx:connect-to-nx-cloud --installationSource=${installationSource} --quiet --no-interactive`, {
        stdio: [0, 1, 2],
        cwd: repoRoot,
    });
}
exports.initCloud = initCloud;
function addVsCodeRecommendedExtensions(repoRoot, extensions) {
    const vsCodeExtensionsPath = (0, path_1.join)(repoRoot, '.vscode/extensions.json');
    if ((0, fileutils_1.fileExists)(vsCodeExtensionsPath)) {
        const vsCodeExtensionsJson = (0, fileutils_1.readJsonFile)(vsCodeExtensionsPath);
        vsCodeExtensionsJson.recommendations ??= [];
        extensions.forEach((extension) => {
            if (!vsCodeExtensionsJson.recommendations.includes(extension)) {
                vsCodeExtensionsJson.recommendations.push(extension);
            }
        });
        (0, fileutils_1.writeJsonFile)(vsCodeExtensionsPath, vsCodeExtensionsJson);
    }
    else {
        (0, fileutils_1.writeJsonFile)(vsCodeExtensionsPath, { recommendations: extensions });
    }
}
exports.addVsCodeRecommendedExtensions = addVsCodeRecommendedExtensions;
function markRootPackageJsonAsNxProjectLegacy(repoRoot, cacheableScripts, pmc) {
    const json = (0, fileutils_1.readJsonFile)((0, path_2.joinPathFragments)(repoRoot, `package.json`));
    json.nx = {};
    for (let script of cacheableScripts) {
        const scriptDefinition = json.scripts[script];
        if (!scriptDefinition) {
            continue;
        }
        if (scriptDefinition.includes('&&') || scriptDefinition.includes('||')) {
            let backingScriptName = `_${script}`;
            json.scripts[backingScriptName] = scriptDefinition;
            json.scripts[script] = `nx exec -- ${pmc.run(backingScriptName, '')}`;
        }
        else {
            json.scripts[script] = `nx exec -- ${json.scripts[script]}`;
        }
    }
    (0, fileutils_1.writeJsonFile)(`package.json`, json);
}
exports.markRootPackageJsonAsNxProjectLegacy = markRootPackageJsonAsNxProjectLegacy;
function markPackageJsonAsNxProject(packageJsonPath) {
    const json = (0, fileutils_1.readJsonFile)(packageJsonPath);
    if (!json.scripts) {
        return;
    }
    json.nx = {};
    (0, fileutils_1.writeJsonFile)(packageJsonPath, json);
}
exports.markPackageJsonAsNxProject = markPackageJsonAsNxProject;
function printFinalMessage({ learnMoreLink, }) {
    const pmc = (0, package_manager_1.getPackageManagerCommand)();
    output_1.output.success({
        title: '🎉 Done!',
        bodyLines: [
            `- Run "${pmc.exec} nx run-many -t build" to run the build target for every project in the workspace. Run it again to replay the cached computation. https://nx.dev/features/cache-task-results`,
            `- Run "${pmc.exec} nx graph" to see the graph of projects and tasks in your workspace. https://nx.dev/core-features/explore-graph`,
            learnMoreLink ? `- Learn more at ${learnMoreLink}.` : undefined,
        ].filter(Boolean),
    });
}
exports.printFinalMessage = printFinalMessage;
function isMonorepo(packageJson) {
    if (!!packageJson.workspaces)
        return true;
    if ((0, fs_1.existsSync)('pnpm-workspace.yaml') || (0, fs_1.existsSync)('pnpm-workspace.yml'))
        return true;
    if ((0, fs_1.existsSync)('lerna.json'))
        return true;
    return false;
}
exports.isMonorepo = isMonorepo;
