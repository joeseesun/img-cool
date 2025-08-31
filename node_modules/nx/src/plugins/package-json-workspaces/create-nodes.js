"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobPatternsFromPackageManagerWorkspaces = exports.buildProjectConfigurationFromPackageJson = exports.createNodeFromPackageJson = exports.buildPackageJsonWorkspacesMatcher = exports.createNodes = void 0;
const minimatch_1 = require("minimatch");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const nx_json_1 = require("../../config/nx-json");
const to_project_name_1 = require("../../config/to-project-name");
const fileutils_1 = require("../../utils/fileutils");
const globs_1 = require("../../utils/globs");
const logger_1 = require("../../utils/logger");
const output_1 = require("../../utils/output");
const package_json_1 = require("../../utils/package-json");
const path_1 = require("../../utils/path");
exports.createNodes = [
    (0, globs_1.combineGlobPatterns)('package.json', '**/package.json'),
    (p, _, { workspaceRoot }) => {
        const readJson = (f) => (0, fileutils_1.readJsonFile)((0, node_path_1.join)(workspaceRoot, f));
        const matcher = buildPackageJsonWorkspacesMatcher(workspaceRoot, readJson);
        if (matcher(p)) {
            return createNodeFromPackageJson(p, workspaceRoot);
        }
        // The given package.json is not part of the workspaces configuration.
        return {};
    },
];
function buildPackageJsonWorkspacesMatcher(workspaceRoot, readJson) {
    const patterns = getGlobPatternsFromPackageManagerWorkspaces(workspaceRoot, readJson);
    const negativePatterns = patterns.filter((p) => p.startsWith('!'));
    const positivePatterns = patterns.filter((p) => !p.startsWith('!'));
    if (
    // There are some negative patterns
    negativePatterns.length > 0 &&
        // No positive patterns
        (positivePatterns.length === 0 ||
            // Or only a single positive pattern that is the default coming from root package
            (positivePatterns.length === 1 && positivePatterns[0] === 'package.json'))) {
        positivePatterns.push('**/package.json');
    }
    return (p) => positivePatterns.some((positive) => (0, minimatch_1.minimatch)(p, positive)) &&
        /**
         * minimatch will return true if the given p is NOT excluded by the negative pattern.
         *
         * For example if the negative pattern is "!packages/vite", then the given p "packages/vite" will return false,
         * the given p "packages/something-else/package.json" will return true.
         *
         * Therefore, we need to ensure that every negative pattern returns true to validate that the given p is not
         * excluded by any of the negative patterns.
         */
        negativePatterns.every((negative) => (0, minimatch_1.minimatch)(p, negative));
}
exports.buildPackageJsonWorkspacesMatcher = buildPackageJsonWorkspacesMatcher;
function createNodeFromPackageJson(pkgJsonPath, workspaceRoot) {
    const json = (0, fileutils_1.readJsonFile)((0, node_path_1.join)(workspaceRoot, pkgJsonPath));
    const project = buildProjectConfigurationFromPackageJson(json, workspaceRoot, pkgJsonPath, (0, nx_json_1.readNxJson)(workspaceRoot));
    return {
        projects: {
            [project.root]: project,
        },
    };
}
exports.createNodeFromPackageJson = createNodeFromPackageJson;
function buildProjectConfigurationFromPackageJson(packageJson, workspaceRoot, packageJsonPath, nxJson) {
    const normalizedPath = packageJsonPath.split('\\').join('/');
    const projectRoot = (0, node_path_1.dirname)(normalizedPath);
    const siblingProjectJson = tryReadJson((0, node_path_1.join)(workspaceRoot, projectRoot, 'project.json'));
    if (siblingProjectJson) {
        for (const target of Object.keys(siblingProjectJson?.targets ?? {})) {
            delete packageJson.scripts?.[target];
        }
    }
    if (!packageJson.name && projectRoot === '.') {
        throw new Error('Nx requires the root package.json to specify a name if it is being used as an Nx project.');
    }
    let name = packageJson.name ?? (0, to_project_name_1.toProjectName)(normalizedPath);
    const projectType = nxJson?.workspaceLayout?.appsDir != nxJson?.workspaceLayout?.libsDir &&
        nxJson?.workspaceLayout?.appsDir &&
        projectRoot.startsWith(nxJson.workspaceLayout.appsDir)
        ? 'application'
        : 'library';
    return {
        root: projectRoot,
        sourceRoot: projectRoot,
        name,
        projectType,
        ...packageJson.nx,
        targets: (0, package_json_1.readTargetsFromPackageJson)(packageJson),
        metadata: (0, package_json_1.getMetadataFromPackageJson)(packageJson),
    };
}
exports.buildProjectConfigurationFromPackageJson = buildProjectConfigurationFromPackageJson;
/**
 * Get the package.json globs from package manager workspaces
 */
function getGlobPatternsFromPackageManagerWorkspaces(root, readJson = (path) => (0, fileutils_1.readJsonFile)((0, node_path_1.join)(root, path)) // making this an arg allows us to reuse in devkit
) {
    try {
        const patterns = [];
        const packageJson = readJson('package.json');
        patterns.push(...normalizePatterns(Array.isArray(packageJson.workspaces)
            ? packageJson.workspaces
            : packageJson.workspaces?.packages ?? []));
        if ((0, node_fs_1.existsSync)((0, node_path_1.join)(root, 'pnpm-workspace.yaml'))) {
            try {
                const { packages } = (0, fileutils_1.readYamlFile)((0, node_path_1.join)(root, 'pnpm-workspace.yaml'));
                patterns.push(...normalizePatterns(packages || []));
            }
            catch (e) {
                output_1.output.warn({
                    title: `${logger_1.NX_PREFIX} Unable to parse pnpm-workspace.yaml`,
                    bodyLines: [e.toString()],
                });
            }
        }
        if ((0, node_fs_1.existsSync)((0, node_path_1.join)(root, 'lerna.json'))) {
            try {
                const { packages } = readJson('lerna.json');
                patterns.push(...normalizePatterns(packages?.length > 0 ? packages : ['packages/*']));
            }
            catch (e) {
                output_1.output.warn({
                    title: `${logger_1.NX_PREFIX} Unable to parse lerna.json`,
                    bodyLines: [e.toString()],
                });
            }
        }
        // Merge patterns from workspaces definitions
        // TODO(@AgentEnder): update logic after better way to determine root project inclusion
        // Include the root project
        return packageJson.nx ? patterns.concat('package.json') : patterns;
    }
    catch {
        return [];
    }
}
exports.getGlobPatternsFromPackageManagerWorkspaces = getGlobPatternsFromPackageManagerWorkspaces;
function normalizePatterns(patterns) {
    return patterns.map((pattern) => removeRelativePath(pattern.endsWith('/package.json')
        ? pattern
        : (0, path_1.joinPathFragments)(pattern, 'package.json')));
}
function removeRelativePath(pattern) {
    return pattern.startsWith('./') ? pattern.substring(2) : pattern;
}
function tryReadJson(path) {
    try {
        return (0, fileutils_1.readJsonFile)(path);
    }
    catch {
        return null;
    }
}
