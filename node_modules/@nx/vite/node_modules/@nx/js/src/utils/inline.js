"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInlineGraphEmpty = isInlineGraphEmpty;
exports.handleInliningBuild = handleInliningBuild;
exports.postProcessInlinedDependencies = postProcessInlinedDependencies;
exports.getRootTsConfigPath = getRootTsConfigPath;
const devkit_1 = require("@nx/devkit");
const node_fs_1 = require("node:fs");
const path_1 = require("path");
function isInlineGraphEmpty(inlineGraph) {
    return Object.keys(inlineGraph.nodes).length === 0;
}
function handleInliningBuild(context, options, tsConfigPath, projectName = context.projectName) {
    const tsConfigJson = (0, devkit_1.readJsonFile)(tsConfigPath);
    const pathAliases = tsConfigJson['compilerOptions']?.['paths'] || readBasePathAliases(context);
    const inlineGraph = createInlineGraph(context, options, pathAliases, projectName);
    if (isInlineGraphEmpty(inlineGraph)) {
        return inlineGraph;
    }
    buildInlineGraphExternals(context, inlineGraph, pathAliases);
    return inlineGraph;
}
function postProcessInlinedDependencies(outputPath, parentOutputPath, inlineGraph) {
    if (isInlineGraphEmpty(inlineGraph)) {
        return;
    }
    const parentDistPath = (0, path_1.join)(outputPath, parentOutputPath);
    const markedForDeletion = new Set();
    // move parentOutput
    movePackage(parentDistPath, outputPath);
    markedForDeletion.add(parentDistPath);
    const inlinedDepsDestOutputRecord = {};
    // move inlined outputs
    for (const inlineDependenciesNames of Object.values(inlineGraph.dependencies)) {
        for (const inlineDependenciesName of inlineDependenciesNames) {
            const inlineDependency = inlineGraph.nodes[inlineDependenciesName];
            const depOutputPath = inlineDependency.buildOutputPath ||
                (0, path_1.join)(outputPath, inlineDependency.root);
            const destDepOutputPath = (0, path_1.join)(outputPath, inlineDependency.name);
            const isBuildable = !!inlineDependency.buildOutputPath;
            if (isBuildable) {
                (0, node_fs_1.cpSync)(depOutputPath, destDepOutputPath, { recursive: true });
            }
            else {
                movePackage(depOutputPath, destDepOutputPath);
                markedForDeletion.add(depOutputPath);
            }
            // TODO: hard-coded "src"
            inlinedDepsDestOutputRecord[inlineDependency.pathAlias] =
                destDepOutputPath + '/src';
        }
    }
    markedForDeletion.forEach((path) => (0, node_fs_1.rmSync)(path, { recursive: true, force: true }));
    updateImports(outputPath, inlinedDepsDestOutputRecord);
}
function readBasePathAliases(context) {
    return (0, devkit_1.readJsonFile)(getRootTsConfigPath(context))?.['compilerOptions']['paths'];
}
function getRootTsConfigPath(context) {
    for (const tsConfigName of ['tsconfig.base.json', 'tsconfig.json']) {
        const tsConfigPath = (0, path_1.join)(context.root, tsConfigName);
        if ((0, node_fs_1.existsSync)(tsConfigPath)) {
            return tsConfigPath;
        }
    }
    throw new Error('Could not find a root tsconfig.json or tsconfig.base.json file.');
}
function emptyInlineGraph() {
    return { nodes: {}, externals: {}, dependencies: {} };
}
function projectNodeToInlineProjectNode(projectNode, pathAlias = '', buildOutputPath = '') {
    return {
        name: projectNode.name,
        root: projectNode.data.root,
        sourceRoot: projectNode.data.sourceRoot,
        pathAlias,
        buildOutputPath,
    };
}
function createInlineGraph(context, options, pathAliases, projectName, inlineGraph = emptyInlineGraph()) {
    if (options.external == null)
        return inlineGraph;
    const projectDependencies = context.projectGraph.dependencies[projectName] || [];
    if (projectDependencies.length === 0)
        return inlineGraph;
    if (!inlineGraph.nodes[projectName]) {
        inlineGraph.nodes[projectName] = projectNodeToInlineProjectNode(context.projectGraph.nodes[projectName]);
    }
    const implicitDependencies = context.projectGraph.nodes[projectName].data.implicitDependencies || [];
    for (const projectDependency of projectDependencies) {
        // skip npm packages
        if (projectDependency.target.startsWith('npm')) {
            continue;
        }
        // skip implicitDependencies
        if (implicitDependencies.includes(projectDependency.target)) {
            continue;
        }
        const pathAlias = getPathAliasForPackage(context.projectGraph.nodes[projectDependency.target], pathAliases);
        const buildOutputPath = getBuildOutputPath(projectDependency.target, context, options);
        const shouldInline = 
        /**
         * if all buildable libraries are marked as external,
         * then push the project dependency that doesn't have a build target
         */
        (options.external === 'all' && !buildOutputPath) ||
            /**
             * if all buildable libraries are marked as internal,
             * then push every project dependency to be inlined
             */
            options.external === 'none' ||
            /**
             * if some buildable libraries are marked as external,
             * then push the project dependency that IS NOT marked as external OR doesn't have a build target
             */
            (Array.isArray(options.external) &&
                options.external.length > 0 &&
                !options.external.includes(projectDependency.target)) ||
            !buildOutputPath;
        if (shouldInline) {
            inlineGraph.dependencies[projectName] ??= [];
            inlineGraph.dependencies[projectName].push(projectDependency.target);
        }
        inlineGraph.nodes[projectDependency.target] =
            projectNodeToInlineProjectNode(context.projectGraph.nodes[projectDependency.target], pathAlias, buildOutputPath);
        if (context.projectGraph.dependencies[projectDependency.target].length > 0) {
            inlineGraph = createInlineGraph(context, options, pathAliases, projectDependency.target, inlineGraph);
        }
    }
    return inlineGraph;
}
function buildInlineGraphExternals(context, inlineProjectGraph, pathAliases) {
    const allNodes = { ...context.projectGraph.nodes };
    for (const [parent, dependencies] of Object.entries(inlineProjectGraph.dependencies)) {
        if (allNodes[parent]) {
            delete allNodes[parent];
        }
        for (const dependencyName of dependencies) {
            const dependencyNode = inlineProjectGraph.nodes[dependencyName];
            // buildable is still external even if it is a dependency
            if (dependencyNode.buildOutputPath) {
                continue;
            }
            if (allNodes[dependencyName]) {
                delete allNodes[dependencyName];
            }
        }
    }
    for (const [projectName, projectNode] of Object.entries(allNodes)) {
        if (!inlineProjectGraph.externals[projectName]) {
            inlineProjectGraph.externals[projectName] =
                projectNodeToInlineProjectNode(projectNode, getPathAliasForPackage(projectNode, pathAliases));
        }
    }
}
function movePackage(from, to) {
    if (from === to)
        return;
    (0, node_fs_1.cpSync)(from, to, { recursive: true });
}
function updateImports(destOutputPath, inlinedDepsDestOutputRecord) {
    const pathAliases = Object.keys(inlinedDepsDestOutputRecord);
    if (pathAliases.length == 0) {
        return;
    }
    const importRegex = new RegExp(pathAliases.map((pathAlias) => `["'](${pathAlias})["']`).join('|'), 'g');
    recursiveUpdateImport(destOutputPath, importRegex, inlinedDepsDestOutputRecord);
}
function recursiveUpdateImport(dirPath, importRegex, inlinedDepsDestOutputRecord, rootParentDir) {
    const files = (0, node_fs_1.readdirSync)(dirPath, { withFileTypes: true });
    for (const file of files) {
        // only check .js and .d.ts files
        if (file.isFile() &&
            (file.name.endsWith('.js') || file.name.endsWith('.d.ts'))) {
            const filePath = (0, path_1.join)(dirPath, file.name);
            const fileContent = (0, node_fs_1.readFileSync)(filePath, 'utf-8');
            const updatedContent = fileContent.replace(importRegex, (matched) => {
                const result = matched.replace(/['"]/g, '');
                // If a match is the same as the rootParentDir, we're checking its own files so we return the matched as in no changes.
                if (result === rootParentDir || !inlinedDepsDestOutputRecord[result])
                    return matched;
                const importPath = `"${(0, path_1.relative)(dirPath, inlinedDepsDestOutputRecord[result])}"`;
                return (0, devkit_1.normalizePath)(importPath);
            });
            (0, node_fs_1.writeFileSync)(filePath, updatedContent);
        }
        else if (file.isDirectory()) {
            recursiveUpdateImport((0, path_1.join)(dirPath, file.name), importRegex, inlinedDepsDestOutputRecord, rootParentDir || file.name);
        }
    }
}
function getPathAliasForPackage(packageNode, pathAliases) {
    if (!packageNode)
        return '';
    for (const [alias, paths] of Object.entries(pathAliases)) {
        if (paths.some((path) => path.includes(packageNode.data.root))) {
            return alias;
        }
    }
    return '';
}
function getBuildOutputPath(projectName, context, options) {
    const projectTargets = context.projectGraph.nodes[projectName]?.data?.targets;
    if (!projectTargets)
        return '';
    const buildTarget = options.externalBuildTargets.find((buildTarget) => projectTargets[buildTarget]);
    return buildTarget ? projectTargets[buildTarget].options['outputPath'] : '';
}
