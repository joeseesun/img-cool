"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCwd = exports.determineProjectNameAndRootOptions = void 0;
const enquirer_1 = require("enquirer");
const path_1 = require("path");
const get_workspace_layout_1 = require("../utils/get-workspace-layout");
const names_1 = require("../utils/names");
const devkit_exports_1 = require("nx/src/devkit-exports");
async function determineProjectNameAndRootOptions(tree, options) {
    if (!options.projectNameAndRootFormat &&
        (process.env.NX_INTERACTIVE !== 'true' || !isTTY())) {
        options.projectNameAndRootFormat = 'derived';
    }
    validateName(options.name, options.projectNameAndRootFormat);
    const formats = getProjectNameAndRootFormats(tree, options);
    const format = options.projectNameAndRootFormat ?? (await determineFormat(formats));
    if (format === 'derived' && options.callingGenerator) {
        logDeprecationMessage(options.callingGenerator, formats);
    }
    return {
        ...formats[format],
        projectNameAndRootFormat: format,
    };
}
exports.determineProjectNameAndRootOptions = determineProjectNameAndRootOptions;
function validateName(name, projectNameAndRootFormat) {
    if (projectNameAndRootFormat === 'derived' && name.startsWith('@')) {
        throw new Error(`The project name "${name}" cannot start with "@" when the "projectNameAndRootFormat" is "derived".`);
    }
    /**
     * Matches two types of project names:
     *
     * 1. Valid npm package names (e.g., '@scope/name' or 'name').
     * 2. Names starting with a letter and can contain any character except whitespace and ':'.
     *
     * The second case is to support the legacy behavior (^[a-zA-Z].*$) with the difference
     * that it doesn't allow the ":" character. It was wrong to allow it because it would
     * conflict with the notation for tasks.
     */
    const pattern = '(?:^@[a-zA-Z0-9-*~][a-zA-Z0-9-*._~]*\\/[a-zA-Z0-9-~][a-zA-Z0-9-._~]*|^[a-zA-Z][^:]*)$';
    const validationRegex = new RegExp(pattern);
    if (!validationRegex.test(name)) {
        throw new Error(`The project name should match the pattern "${pattern}". The provided value "${name}" does not match.`);
    }
}
function logDeprecationMessage(callingGenerator, formats) {
    devkit_exports_1.logger.warn((0, devkit_exports_1.stripIndents) `
    In Nx 20, generating projects will no longer derive the name and root.
    Please provide the exact project name and root in the future.
    Example: nx g ${callingGenerator} ${formats['derived'].projectName} --directory ${formats['derived'].projectRoot}
  `);
}
async function determineFormat(formats) {
    if (!formats.derived) {
        return 'as-provided';
    }
    const asProvidedDescription = `As provided:
    Name: ${formats['as-provided'].projectName}
    Root: ${formats['as-provided'].projectRoot}`;
    const asProvidedSelectedValue = `${formats['as-provided'].projectName} @ ${formats['as-provided'].projectRoot}`;
    const derivedDescription = `Derived:
    Name: ${formats['derived'].projectName}
    Root: ${formats['derived'].projectRoot}`;
    const derivedSelectedValue = `${formats['derived'].projectName} @ ${formats['derived'].projectRoot}`;
    if (asProvidedSelectedValue === derivedSelectedValue) {
        return 'as-provided';
    }
    const result = await (0, enquirer_1.prompt)({
        type: 'select',
        name: 'format',
        message: 'What should be the project name and where should it be generated?',
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
function getProjectNameAndRootFormats(tree, options) {
    const directory = options.directory
        ? (0, devkit_exports_1.normalizePath)(options.directory.replace(/^\.?\//, ''))
        : undefined;
    const { name: asProvidedParsedName, directory: asProvidedParsedDirectory } = parseNameForAsProvided(options.name);
    if (asProvidedParsedDirectory && directory) {
        throw new Error(`You can't specify both a directory (${options.directory}) and a name with a directory path (${options.name}). ` +
            `Please specify either a directory or a name with a directory path.`);
    }
    const asProvidedOptions = getAsProvidedOptions(tree, {
        ...options,
        directory: directory ?? asProvidedParsedDirectory,
        name: asProvidedParsedName,
    });
    if (options.projectNameAndRootFormat === 'as-provided') {
        return {
            'as-provided': asProvidedOptions,
            derived: undefined,
        };
    }
    if (asProvidedOptions.projectName.startsWith('@')) {
        if (!options.projectNameAndRootFormat) {
            devkit_exports_1.output.warn({
                title: `The provided name "${options.name}" contains a scoped project name and this is not supported by the "${options.callingGenerator}" when using the "derived" format.`,
                bodyLines: [
                    `The generator will try to generate the project "${asProvidedOptions.projectName}" using the "as-provided" format at "${asProvidedOptions.projectRoot}".`,
                ],
            });
            return {
                'as-provided': asProvidedOptions,
                derived: undefined,
            };
        }
        throw new Error(`The provided name "${options.name}" contains a scoped project name and this is not supported by the "${options.callingGenerator}" when using the "derived" format. ` +
            `Please provide a name without "@" or use the "as-provided" format.`);
    }
    const { name: derivedParsedName, directory: derivedParsedDirectory } = parseNameForDerived(options.name);
    const derivedOptions = getDerivedOptions(tree, {
        ...options,
        directory: directory ?? derivedParsedDirectory,
        name: derivedParsedName,
    });
    return {
        'as-provided': asProvidedOptions,
        derived: derivedOptions,
    };
}
function getAsProvidedOptions(tree, options) {
    let projectSimpleName;
    let projectFileName;
    if (options.name.startsWith('@')) {
        const [_scope, ...rest] = options.name.split('/');
        projectFileName = rest.join('-');
        projectSimpleName = rest.pop();
    }
    else {
        projectSimpleName = options.name;
        projectFileName = options.name;
    }
    let projectRoot;
    const relativeCwd = getRelativeCwd();
    if (options.directory) {
        // append the directory to the current working directory if it doesn't start with it
        if (options.directory === relativeCwd ||
            options.directory.startsWith(`${relativeCwd}/`)) {
            projectRoot = options.directory;
        }
        else {
            projectRoot = (0, devkit_exports_1.joinPathFragments)(relativeCwd, options.directory);
        }
    }
    else if (options.rootProject) {
        projectRoot = '.';
    }
    else {
        projectRoot = relativeCwd;
        // append the project name to the current working directory if it doesn't end with it
        if (!relativeCwd.endsWith(options.name)) {
            projectRoot = (0, devkit_exports_1.joinPathFragments)(relativeCwd, options.name);
        }
    }
    let importPath = undefined;
    if (options.projectType === 'library') {
        importPath = options.importPath;
        if (!importPath) {
            if (options.name.startsWith('@')) {
                importPath = options.name;
            }
            else {
                const npmScope = getNpmScope(tree);
                importPath =
                    projectRoot === '.'
                        ? (0, devkit_exports_1.readJson)(tree, 'package.json').name ??
                            getImportPath(npmScope, options.name)
                        : getImportPath(npmScope, options.name);
            }
        }
    }
    return {
        projectName: options.name,
        names: {
            projectSimpleName,
            projectFileName,
        },
        importPath,
        projectRoot,
    };
}
function getDerivedOptions(tree, options) {
    const name = (0, names_1.names)(options.name).fileName;
    let { projectDirectory, layoutDirectory } = getDirectories(tree, options.directory, options.projectType);
    const projectDirectoryWithoutLayout = projectDirectory
        ? `${(0, names_1.names)(projectDirectory).fileName}/${name}`
        : options.rootProject
            ? '.'
            : name;
    // the project name uses the directory without the layout directory
    const projectName = projectDirectoryWithoutLayout === '.'
        ? name
        : projectDirectoryWithoutLayout.replace(/\//g, '-');
    const projectSimpleName = name;
    let projectRoot = projectDirectoryWithoutLayout;
    if (projectDirectoryWithoutLayout !== '.') {
        // prepend the layout directory
        projectRoot = (0, devkit_exports_1.joinPathFragments)(layoutDirectory, projectRoot);
    }
    let importPath;
    if (options.projectType === 'library') {
        importPath = options.importPath;
        if (!importPath) {
            const npmScope = getNpmScope(tree);
            importPath =
                projectRoot === '.'
                    ? (0, devkit_exports_1.readJson)(tree, 'package.json').name ??
                        getImportPath(npmScope, projectName)
                    : getImportPath(npmScope, projectDirectoryWithoutLayout);
        }
    }
    return {
        projectName,
        names: {
            projectSimpleName,
            projectFileName: projectName,
        },
        importPath,
        projectRoot,
    };
}
function getDirectories(tree, directory, projectType) {
    let { projectDirectory, layoutDirectory } = (0, get_workspace_layout_1.extractLayoutDirectory)(directory);
    if (!layoutDirectory) {
        const { appsDir, libsDir } = (0, get_workspace_layout_1.getWorkspaceLayout)(tree);
        layoutDirectory = projectType === 'application' ? appsDir : libsDir;
    }
    return { projectDirectory, layoutDirectory };
}
function getImportPath(npmScope, name) {
    return npmScope ? `${npmScope === '@' ? '' : '@'}${npmScope}/${name}` : name;
}
function getNpmScope(tree) {
    const { name } = tree.exists('package.json')
        ? (0, devkit_exports_1.readJson)(tree, 'package.json')
        : { name: null };
    return name?.startsWith('@') ? name.split('/')[0].substring(1) : undefined;
}
function isTTY() {
    return !!process.stdout.isTTY && process.env['CI'] !== 'true';
}
/**
 * When running a script with the package manager (e.g. `npm run`), the package manager will
 * traverse the directory tree upwards until it finds a `package.json` and will set `process.cwd()`
 * to the folder where it found it. The actual working directory is stored in the INIT_CWD
 * environment variable (see here: https://docs.npmjs.com/cli/v9/commands/npm-run-script#description).
 */
function getCwd() {
    return process.env.INIT_CWD?.startsWith(devkit_exports_1.workspaceRoot)
        ? process.env.INIT_CWD
        : process.cwd();
}
function getRelativeCwd() {
    return (0, devkit_exports_1.normalizePath)((0, path_1.relative)(devkit_exports_1.workspaceRoot, getCwd())).replace(/\/$/, '');
}
/**
 * Function for setting cwd during testing
 */
function setCwd(path) {
    process.env.INIT_CWD = (0, path_1.join)(devkit_exports_1.workspaceRoot, path);
}
exports.setCwd = setCwd;
function parseNameForAsProvided(rawName) {
    const directory = (0, devkit_exports_1.normalizePath)(rawName);
    if (rawName.includes('@')) {
        const index = directory.lastIndexOf('@');
        if (index === 0) {
            return { name: rawName, directory: undefined };
        }
        const name = directory.substring(index);
        return { name, directory };
    }
    if (rawName.includes('/')) {
        const index = directory.lastIndexOf('/');
        const name = directory.substring(index + 1);
        return { name, directory };
    }
    return { name: rawName, directory: undefined };
}
function parseNameForDerived(rawName) {
    const parsedName = (0, devkit_exports_1.normalizePath)(rawName).split('/');
    const name = parsedName.pop();
    const directory = parsedName.length ? parsedName.join('/') : undefined;
    return { name, directory };
}
