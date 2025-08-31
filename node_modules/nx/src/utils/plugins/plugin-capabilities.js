"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPluginCapabilities = exports.getPluginCapabilities = void 0;
const chalk = require("chalk");
const path_1 = require("path");
const plugins_1 = require("../../project-graph/plugins");
const loader_1 = require("../../project-graph/plugins/loader");
const fileutils_1 = require("../fileutils");
const installation_directory_1 = require("../installation-directory");
const output_1 = require("../output");
const package_manager_1 = require("../package-manager");
const workspace_root_1 = require("../workspace-root");
const shared_1 = require("./shared");
function tryGetCollection(packageJsonPath, collectionFile, propName) {
    if (!collectionFile) {
        return null;
    }
    try {
        const collectionFilePath = (0, path_1.join)((0, path_1.dirname)(packageJsonPath), collectionFile);
        return (0, fileutils_1.readJsonFile)(collectionFilePath)[propName];
    }
    catch {
        return null;
    }
}
async function getPluginCapabilities(workspaceRoot, pluginName, projects, includeRuntimeCapabilities = false) {
    try {
        const { json: packageJson, path: packageJsonPath } = await (0, plugins_1.readPluginPackageJson)(pluginName, projects, (0, installation_directory_1.getNxRequirePaths)(workspaceRoot));
        const pluginModule = includeRuntimeCapabilities
            ? await tryGetModule(packageJson, workspaceRoot)
            : {};
        return {
            name: pluginName,
            generators: {
                ...tryGetCollection(packageJsonPath, packageJson.schematics, 'schematics'),
                ...tryGetCollection(packageJsonPath, packageJson.generators, 'schematics'),
                ...tryGetCollection(packageJsonPath, packageJson.schematics, 'generators'),
                ...tryGetCollection(packageJsonPath, packageJson.generators, 'generators'),
            },
            executors: {
                ...tryGetCollection(packageJsonPath, packageJson.builders, 'builders'),
                ...tryGetCollection(packageJsonPath, packageJson.executors, 'builders'),
                ...tryGetCollection(packageJsonPath, packageJson.builders, 'executors'),
                ...tryGetCollection(packageJsonPath, packageJson.executors, 'executors'),
            },
            projectGraphExtension: pluginModule &&
                ('processProjectGraph' in pluginModule ||
                    'createNodes' in pluginModule ||
                    'createDependencies' in pluginModule),
            projectInference: pluginModule &&
                ('projectFilePatterns' in pluginModule ||
                    'createNodes' in pluginModule),
        };
    }
    catch {
        return null;
    }
}
exports.getPluginCapabilities = getPluginCapabilities;
async function tryGetModule(packageJson, workspaceRoot) {
    try {
        if (packageJson.generators ??
            packageJson.executors ??
            packageJson['nx-migrations'] ??
            packageJson['schematics'] ??
            packageJson['builders']) {
            const [pluginPromise] = (0, loader_1.loadNxPlugin)(packageJson.name, workspaceRoot);
            const plugin = await pluginPromise;
            return plugin;
        }
        else {
            return {
                name: packageJson.name,
            };
        }
    }
    catch {
        return null;
    }
}
async function listPluginCapabilities(pluginName, projects) {
    const plugin = await getPluginCapabilities(workspace_root_1.workspaceRoot, pluginName, projects);
    if (!plugin) {
        const pmc = (0, package_manager_1.getPackageManagerCommand)();
        output_1.output.note({
            title: `${pluginName} is not currently installed`,
            bodyLines: [
                `Use "${pmc.addDev} ${pluginName}" to install the plugin.`,
                `After that, use "${pmc.exec} nx g ${pluginName}:init" to add the required peer deps and initialize the plugin.`,
            ],
        });
        return;
    }
    const hasBuilders = (0, shared_1.hasElements)(plugin.executors);
    const hasGenerators = (0, shared_1.hasElements)(plugin.generators);
    const hasProjectGraphExtension = !!plugin.projectGraphExtension;
    const hasProjectInference = !!plugin.projectInference;
    if (!hasBuilders &&
        !hasGenerators &&
        !hasProjectGraphExtension &&
        !hasProjectInference) {
        output_1.output.warn({ title: `No capabilities found in ${pluginName}` });
        return;
    }
    const bodyLines = [];
    if (hasGenerators) {
        bodyLines.push(chalk.bold(chalk.green('GENERATORS')));
        bodyLines.push('');
        bodyLines.push(...Object.keys(plugin.generators).map((name) => `${chalk.bold(name)} : ${plugin.generators[name].description}`));
        if (hasBuilders) {
            bodyLines.push('');
        }
    }
    if (hasBuilders) {
        bodyLines.push(chalk.bold(chalk.green('EXECUTORS/BUILDERS')));
        bodyLines.push('');
        bodyLines.push(...Object.keys(plugin.executors).map((name) => `${chalk.bold(name)} : ${resolveExecutorDescription(plugin.executors[name], projects)}`));
    }
    if (hasProjectGraphExtension) {
        bodyLines.push(`✔️  Project Graph Extension`);
    }
    if (hasProjectInference) {
        bodyLines.push(`✔️  Project Inference`);
    }
    output_1.output.log({
        title: `Capabilities in ${plugin.name}:`,
        bodyLines,
    });
}
exports.listPluginCapabilities = listPluginCapabilities;
function resolveExecutorDescription(executorJsonEntry, projects) {
    try {
        if (typeof executorJsonEntry === 'string') {
            // it points to another executor, resolve it
            const [pkgName, executor] = executorJsonEntry.split(':');
            const collection = loadExecutorsCollection(workspace_root_1.workspaceRoot, pkgName, projects);
            return resolveExecutorDescription(collection[executor], projects);
        }
        return executorJsonEntry.description;
    }
    catch {
        return 'No description available';
    }
}
function loadExecutorsCollection(workspaceRoot, pluginName, projects) {
    const { json: packageJson, path: packageJsonPath } = (0, plugins_1.readPluginPackageJson)(pluginName, projects, (0, installation_directory_1.getNxRequirePaths)(workspaceRoot));
    return {
        ...tryGetCollection(packageJsonPath, packageJson.builders, 'builders'),
        ...tryGetCollection(packageJsonPath, packageJson.executors, 'builders'),
        ...tryGetCollection(packageJsonPath, packageJson.builders, 'executors'),
        ...tryGetCollection(packageJsonPath, packageJson.executors, 'executors'),
    };
}
