"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCwd = exports.getRelativeCwd = exports.determineArtifactNameAndDirectoryOptions = void 0;
const enquirer_1 = require("enquirer");
const path_1 = require("path");
const names_1 = require("../utils/names");
const devkit_exports_1 = require("nx/src/devkit-exports");
const devkit_internals_1 = require("nx/src/devkit-internals");
async function determineArtifactNameAndDirectoryOptions(tree, options) {
    if (!options.nameAndDirectoryFormat &&
        (process.env.NX_INTERACTIVE !== 'true' || !isTTY())) {
        options.nameAndDirectoryFormat = 'derived';
    }
    const formats = getNameAndDirectoryOptionFormats(tree, options);
    const format = options.nameAndDirectoryFormat ?? (await determineFormat(formats, options));
    validateResolvedProject(tree, formats[format]?.project, options, formats[format]?.directory);
    if (format === 'derived' && options.callingGenerator) {
        logDeprecationMessage(options, formats);
    }
    return {
        ...formats[format],
        nameAndDirectoryFormat: format,
    };
}
exports.determineArtifactNameAndDirectoryOptions = determineArtifactNameAndDirectoryOptions;
async function determineFormat(formats, options) {
    if (!formats.derived) {
        return 'as-provided';
    }
    const asProvidedDescription = `As provided: ${formats['as-provided'].filePath}`;
    const asProvidedSelectedValue = formats['as-provided'].filePath;
    const derivedDescription = `Derived:     ${formats['derived'].filePath}`;
    const derivedSelectedValue = formats['derived'].filePath;
    if (asProvidedSelectedValue === derivedSelectedValue) {
        return 'as-provided';
    }
    const result = await (0, enquirer_1.prompt)({
        type: 'select',
        name: 'format',
        message: `Where should the ${options.artifactType} be generated?`,
        choices: [
            {
                message: asProvidedDescription,
                name: asProvidedSelectedValue,
            },
            {
                message: derivedDescription,
                name: derivedSelectedValue,
            },
        ],
        initial: 0,
    }).then(({ format }) => format === asProvidedSelectedValue ? 'as-provided' : 'derived');
    return result;
}
function logDeprecationMessage(options, formats) {
    devkit_exports_1.logger.warn(`
In Nx 20, generating a ${options.artifactType} will no longer support providing a project and deriving the directory.
Please provide the exact directory in the future.
Example: nx g ${options.callingGenerator} ${formats['derived'].artifactName} --directory ${formats['derived'].directory}
NOTE: The example above assumes the command is being run from the workspace root. If the command is being run from a subdirectory, the directory option should be adjusted accordingly.
`);
}
function getNameAndDirectoryOptionFormats(tree, options) {
    const directory = options.directory
        ? (0, devkit_exports_1.normalizePath)(options.directory.replace(/^\.?\//, ''))
        : undefined;
    const fileExtension = options.fileExtension ?? 'ts';
    const { name: extractedName, directory: extractedDirectory } = extractNameAndDirectoryFromName(options.name);
    if (extractedDirectory && directory) {
        throw new Error(`You can't specify both a directory (${options.directory}) and a name with a directory path (${options.name}). ` +
            `Please specify either a directory or a name with a directory path.`);
    }
    const asProvidedOptions = getAsProvidedOptions(tree, {
        ...options,
        directory: directory ?? extractedDirectory,
        fileExtension,
        name: extractedName,
    });
    if (!options.project) {
        validateResolvedProject(tree, asProvidedOptions.project, options, asProvidedOptions.directory);
    }
    if (options.nameAndDirectoryFormat === 'as-provided') {
        return {
            'as-provided': asProvidedOptions,
            derived: undefined,
        };
    }
    if (options.disallowPathInNameForDerived && options.name.includes('/')) {
        if (!options.nameAndDirectoryFormat) {
            devkit_exports_1.output.warn({
                title: `The provided name "${options.name}" contains a path and this is not supported by the "${options.callingGenerator}" when using the "derived" format.`,
                bodyLines: [
                    `The generator will try to generate the ${options.artifactType} using the "as-provided" format at "${asProvidedOptions.filePath}".`,
                ],
            });
            return {
                'as-provided': asProvidedOptions,
                derived: undefined,
            };
        }
        throw new Error(`The provided name "${options.name}" contains a path and this is not supported by the "${options.callingGenerator}" when using the "derived" format. ` +
            `Please provide a name without a path or use the "as-provided" format.`);
    }
    const derivedOptions = getDerivedOptions(tree, {
        ...options,
        directory,
        fileExtension,
        name: extractedName,
    }, asProvidedOptions, !options.disallowPathInNameForDerived && extractedDirectory
        ? extractedDirectory
        : undefined);
    return {
        'as-provided': asProvidedOptions,
        derived: derivedOptions,
    };
}
function getAsProvidedOptions(tree, options) {
    const relativeCwd = getRelativeCwd();
    let asProvidedDirectory;
    if (options.directory) {
        // append the directory to the current working directory if it doesn't start with it
        if (options.directory === relativeCwd ||
            options.directory.startsWith(`${relativeCwd}/`)) {
            asProvidedDirectory = options.directory;
        }
        else {
            asProvidedDirectory = (0, devkit_exports_1.joinPathFragments)(relativeCwd, options.directory);
        }
    }
    else {
        asProvidedDirectory = relativeCwd;
    }
    const asProvidedProject = findProjectFromPath(tree, asProvidedDirectory);
    const asProvidedFileName = options.fileName ??
        (options.suffix ? `${options.name}.${options.suffix}` : options.name);
    const asProvidedFilePath = (0, devkit_exports_1.joinPathFragments)(asProvidedDirectory, `${asProvidedFileName}.${options.fileExtension}`);
    return {
        artifactName: options.name,
        directory: asProvidedDirectory,
        fileName: asProvidedFileName,
        filePath: asProvidedFilePath,
        project: asProvidedProject,
    };
}
function getDerivedOptions(tree, options, asProvidedOptions, extractedDirectory) {
    const projects = (0, devkit_exports_1.getProjects)(tree);
    if (options.project && !projects.has(options.project)) {
        throw new Error(`The provided project "${options.project}" does not exist! Please provide an existing project name.`);
    }
    const projectName = options.project ?? asProvidedOptions.project;
    const project = projects.get(projectName);
    const derivedName = options.name;
    const baseDirectory = options.directory
        ? (0, names_1.names)(options.directory).fileName
        : (0, devkit_exports_1.joinPathFragments)(project.sourceRoot ?? (0, devkit_exports_1.joinPathFragments)(project.root, 'src'), project.projectType === 'application' ? 'app' : 'lib', extractedDirectory ?? '');
    const derivedDirectory = typeof options.derivedDirectory === 'string'
        ? (0, devkit_exports_1.joinPathFragments)(project.sourceRoot ?? project.root, options.derivedDirectory, options.flat
            ? ''
            : options.pascalCaseDirectory
                ? (0, names_1.names)(derivedName).className
                : (0, names_1.names)(derivedName).fileName)
        : options.flat
            ? (0, devkit_exports_1.normalizePath)(baseDirectory)
            : (0, devkit_exports_1.joinPathFragments)(baseDirectory, options.pascalCaseDirectory
                ? (0, names_1.names)(derivedName).className
                : (0, names_1.names)(derivedName).fileName);
    if (options.directory &&
        !isDirectoryUnderProjectRoot(derivedDirectory, project.root)) {
        if (!options.nameAndDirectoryFormat) {
            devkit_exports_1.output.warn({
                title: `The provided directory "${options.directory}" is not under the provided project root "${project.root}".`,
                bodyLines: [
                    `The generator will try to generate the ${options.artifactType} using the "as-provided" format.`,
                    `With the "as-provided" format, the "project" option is ignored and the ${options.artifactType} will be generated at "${asProvidedOptions.filePath}" (<cwd>/<provided directory>).`,
                ],
            });
            return undefined;
        }
        throw new Error(`The provided directory "${options.directory}" is not under the provided project root "${project.root}". ` +
            `Please provide a directory that is under the provided project root or use the "as-provided" format and only provide the directory.`);
    }
    let derivedFileName = options.fileName;
    if (!derivedFileName) {
        derivedFileName = options.suffix
            ? `${derivedName}.${options.suffix}`
            : derivedName;
        derivedFileName = options.pascalCaseFile
            ? (0, names_1.names)(derivedFileName).className
            : (0, names_1.names)(derivedFileName).fileName;
    }
    const derivedFilePath = (0, devkit_exports_1.joinPathFragments)(derivedDirectory, `${derivedFileName}.${options.fileExtension}`);
    return {
        artifactName: derivedName,
        directory: derivedDirectory,
        fileName: derivedFileName,
        filePath: derivedFilePath,
        project: projectName,
    };
}
function validateResolvedProject(tree, project, options, normalizedDirectory) {
    if (project) {
        return;
    }
    if (options.directory) {
        throw new Error(`The provided directory resolved relative to the current working directory "${normalizedDirectory}" does not exist under any project root. ` +
            `Please make sure to navigate to a location or provide a directory that exists under a project root.`);
    }
    throw new Error(`The current working directory "${getRelativeCwd() || '.'}" does not exist under any project root. ` +
        `Please make sure to navigate to a location or provide a directory that exists under a project root.`);
}
function findProjectFromPath(tree, path) {
    const projectConfigurations = {};
    const projects = (0, devkit_exports_1.getProjects)(tree);
    for (const [projectName, project] of projects) {
        projectConfigurations[projectName] = project;
    }
    const projectRootMappings = (0, devkit_internals_1.createProjectRootMappingsFromProjectConfigurations)(projectConfigurations);
    return (0, devkit_internals_1.findProjectForPath)(path, projectRootMappings);
}
function isDirectoryUnderProjectRoot(directory, projectRoot) {
    const normalizedDirectory = (0, devkit_exports_1.joinPathFragments)(devkit_exports_1.workspaceRoot, directory);
    const normalizedProjectRoot = (0, devkit_exports_1.joinPathFragments)(devkit_exports_1.workspaceRoot, projectRoot).replace(/\/$/, '');
    return (normalizedDirectory === normalizedProjectRoot ||
        normalizedDirectory.startsWith(`${normalizedProjectRoot}/`));
}
function isTTY() {
    return !!process.stdout.isTTY && process.env['CI'] !== 'true';
}
function getRelativeCwd() {
    return (0, devkit_exports_1.normalizePath)((0, path_1.relative)(devkit_exports_1.workspaceRoot, getCwd()));
}
exports.getRelativeCwd = getRelativeCwd;
/**
 * Function for setting cwd during testing
 */
function setCwd(path) {
    process.env.INIT_CWD = (0, path_1.join)(devkit_exports_1.workspaceRoot, path);
}
exports.setCwd = setCwd;
function getCwd() {
    return process.env.INIT_CWD?.startsWith(devkit_exports_1.workspaceRoot)
        ? process.env.INIT_CWD
        : process.cwd();
}
function extractNameAndDirectoryFromName(rawName) {
    const parsedName = (0, devkit_exports_1.normalizePath)(rawName).split('/');
    const name = parsedName.pop();
    const directory = parsedName.length ? parsedName.join('/') : undefined;
    return { name, directory };
}
