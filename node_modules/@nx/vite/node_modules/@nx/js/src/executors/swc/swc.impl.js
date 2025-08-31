"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swcExecutor = swcExecutor;
const devkit_1 = require("@nx/devkit");
const tinyglobby_1 = require("tinyglobby");
const node_fs_1 = require("node:fs");
const path_1 = require("path");
const assets_1 = require("../../utils/assets");
const assets_2 = require("../../utils/assets/assets");
const check_dependencies_1 = require("../../utils/check-dependencies");
const compiler_helper_dependency_1 = require("../../utils/compiler-helper-dependency");
const inline_1 = require("../../utils/inline");
const package_json_1 = require("../../utils/package-json");
const compile_swc_1 = require("../../utils/swc/compile-swc");
const get_swcrc_path_1 = require("../../utils/swc/get-swcrc-path");
const inline_2 = require("../../utils/swc/inline");
const ts_solution_setup_1 = require("../../utils/typescript/ts-solution-setup");
function normalizeOptions(options, root, sourceRoot, projectRoot) {
    const isTsSolutionSetup = (0, ts_solution_setup_1.isUsingTsSolutionSetup)();
    if (isTsSolutionSetup) {
        if (options.generateLockfile) {
            throw new Error(`Setting 'generateLockfile: true' is not supported with the current TypeScript setup. Unset the 'generateLockfile' option and try again.`);
        }
        if (options.generateExportsField) {
            throw new Error(`Setting 'generateExportsField: true' is not supported with the current TypeScript setup. Set 'exports' field in the 'package.json' file at the project root and unset the 'generateExportsField' option.`);
        }
        if (options.additionalEntryPoints?.length) {
            throw new Error(`Setting 'additionalEntryPoints' is not supported with the current TypeScript setup. Set additional entry points in the 'package.json' file at the project root and unset the 'additionalEntryPoints' option.`);
        }
    }
    const outputPath = (0, path_1.join)(root, options.outputPath);
    options.skipTypeCheck ??= !isTsSolutionSetup;
    if (options.watch == null) {
        options.watch = false;
    }
    // TODO: put back when inlining story is more stable
    // if (options.external == null) {
    //   options.external = 'all';
    // } else if (Array.isArray(options.external) && options.external.length === 0) {
    //   options.external = 'none';
    // }
    if (Array.isArray(options.external) && options.external.length > 0) {
        const firstItem = options.external[0];
        if (firstItem === 'all' || firstItem === 'none') {
            options.external = firstItem;
        }
    }
    const files = (0, assets_2.assetGlobsToFiles)(options.assets, root, outputPath);
    // Always execute from root of project, same as with SWC CLI.
    const swcCwd = (0, path_1.join)(root, projectRoot);
    const { swcrcPath, tmpSwcrcPath } = (0, get_swcrc_path_1.getSwcrcPath)(options, root, projectRoot);
    const swcCliOptions = {
        srcPath: projectRoot,
        destPath: (0, path_1.relative)(swcCwd, outputPath),
        swcCwd,
        swcrcPath,
        stripLeadingPaths: Boolean(options.stripLeadingPaths),
    };
    return {
        ...options,
        mainOutputPath: (0, path_1.resolve)(outputPath, options.main.replace(`${projectRoot}/`, '').replace('.ts', '.js')),
        files,
        root,
        sourceRoot,
        projectRoot,
        originalProjectRoot: projectRoot,
        outputPath,
        tsConfig: (0, path_1.join)(root, options.tsConfig),
        swcCliOptions,
        tmpSwcrcPath,
        isTsSolutionSetup: isTsSolutionSetup,
    };
}
async function* swcExecutor(_options, context) {
    const { sourceRoot, root } = context.projectsConfigurations.projects[context.projectName];
    const options = normalizeOptions(_options, context.root, sourceRoot, root);
    let swcHelperDependency;
    let inlineProjectGraph;
    if (!options.isTsSolutionSetup) {
        const { tmpTsConfig, dependencies } = (0, check_dependencies_1.checkDependencies)(context, options.tsConfig);
        if (tmpTsConfig) {
            options.tsConfig = tmpTsConfig;
        }
        swcHelperDependency = (0, compiler_helper_dependency_1.getHelperDependency)(compiler_helper_dependency_1.HelperDependency.swc, options.swcCliOptions.swcrcPath, dependencies, context.projectGraph);
        if (swcHelperDependency) {
            dependencies.push(swcHelperDependency);
        }
        inlineProjectGraph = (0, inline_1.handleInliningBuild)(context, options, options.tsConfig);
        if (!(0, inline_1.isInlineGraphEmpty)(inlineProjectGraph)) {
            if (options.stripLeadingPaths) {
                throw new Error(`Cannot use --strip-leading-paths with inlining.`);
            }
            options.projectRoot = '.'; // set to root of workspace to include other libs for type check
            // remap paths for SWC compilation
            options.inline = true;
            options.swcCliOptions.swcCwd = '.';
            options.swcCliOptions.srcPath = options.swcCliOptions.swcCwd;
            options.swcCliOptions.destPath = (0, path_1.join)(options.swcCliOptions.destPath.split((0, path_1.normalize)('../')).at(-1), options.swcCliOptions.srcPath);
            // tmp swcrc with dependencies to exclude
            // - buildable libraries
            // - other libraries that are not dependent on the current project
            options.swcCliOptions.swcrcPath = (0, inline_2.generateTmpSwcrc)(inlineProjectGraph, options.swcCliOptions.swcrcPath, options.tmpSwcrcPath);
        }
    }
    function determineModuleFormatFromSwcrc(absolutePathToSwcrc) {
        const swcrc = (0, devkit_1.readJsonFile)(absolutePathToSwcrc);
        return swcrc.module?.type?.startsWith('es') ? 'esm' : 'cjs';
    }
    if (options.watch) {
        let disposeFn;
        process.on('SIGINT', () => disposeFn());
        process.on('SIGTERM', () => disposeFn());
        return yield* (0, compile_swc_1.compileSwcWatch)(context, options, async () => {
            const assetResult = await (0, assets_1.copyAssets)(options, context);
            let packageJsonResult;
            if (!options.isTsSolutionSetup) {
                packageJsonResult = await (0, package_json_1.copyPackageJson)({
                    ...options,
                    additionalEntryPoints: createEntryPoints(options, context),
                    format: [
                        determineModuleFormatFromSwcrc(options.swcCliOptions.swcrcPath),
                    ],
                }, context);
            }
            removeTmpSwcrc(options.swcCliOptions.swcrcPath);
            disposeFn = () => {
                assetResult?.stop();
                packageJsonResult?.stop();
            };
        });
    }
    else {
        return yield (0, compile_swc_1.compileSwc)(context, options, async () => {
            await (0, assets_1.copyAssets)(options, context);
            if (!options.isTsSolutionSetup) {
                await (0, package_json_1.copyPackageJson)({
                    ...options,
                    additionalEntryPoints: createEntryPoints(options, context),
                    format: [
                        determineModuleFormatFromSwcrc(options.swcCliOptions.swcrcPath),
                    ],
                    extraDependencies: swcHelperDependency ? [swcHelperDependency] : [],
                }, context);
                (0, inline_1.postProcessInlinedDependencies)(options.outputPath, options.originalProjectRoot, inlineProjectGraph);
            }
            removeTmpSwcrc(options.swcCliOptions.swcrcPath);
        });
    }
}
function removeTmpSwcrc(swcrcPath) {
    if (swcrcPath.includes((0, path_1.normalize)('tmp/')) &&
        swcrcPath.includes('.generated.swcrc')) {
        (0, node_fs_1.rmSync)((0, path_1.dirname)(swcrcPath), { recursive: true, force: true });
    }
}
function createEntryPoints(options, context) {
    if (!options.additionalEntryPoints?.length)
        return [];
    return (0, tinyglobby_1.globSync)(options.additionalEntryPoints, {
        cwd: context.root,
        expandDirectories: false,
    });
}
exports.default = swcExecutor;
