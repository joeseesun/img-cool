"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ciWorkflowGenerator = ciWorkflowGenerator;
const devkit_1 = require("@nx/devkit");
const default_base_1 = require("../../utilities/default-base");
const path_1 = require("path");
const nx_cloud_utils_1 = require("nx/src/utils/nx-cloud-utils");
const ts_solution_setup_1 = require("../../utilities/typescript/ts-solution-setup");
async function ciWorkflowGenerator(tree, schema) {
    const ci = schema.ci;
    const options = normalizeOptions(schema, tree);
    const nxJson = (0, devkit_1.readJson)(tree, 'nx.json');
    if (ci === 'bitbucket-pipelines' && defaultBranchNeedsOriginPrefix(nxJson)) {
        appendOriginPrefix(nxJson);
    }
    (0, devkit_1.generateFiles)(tree, (0, path_1.join)(__dirname, 'files', ci), '', options);
    addWorkflowFileToSharedGlobals(nxJson, schema.ci, options.workflowFileName);
    (0, devkit_1.writeJson)(tree, 'nx.json', nxJson);
    await (0, devkit_1.formatFiles)(tree);
}
function normalizeOptions(options, tree) {
    const { name: workflowName, fileName: workflowFileName } = (0, devkit_1.names)(options.name);
    const packageManager = (0, devkit_1.detectPackageManager)();
    const { exec: packageManagerPrefix, ciInstall: packageManagerInstall, dlx: packageManagerPreInstallPrefix, } = (0, devkit_1.getPackageManagerCommand)(packageManager);
    let nxCloudHost = 'nx.app';
    try {
        const nxCloudUrl = (0, nx_cloud_utils_1.getNxCloudUrl)((0, devkit_1.readJson)(tree, 'nx.json'));
        nxCloudHost = new URL(nxCloudUrl).host;
    }
    catch { }
    const packageJson = (0, devkit_1.readJson)(tree, 'package.json');
    const allDependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
    };
    const hasCypress = allDependencies['@nx/cypress'];
    const hasPlaywright = allDependencies['@nx/playwright'];
    const hasE2E = hasCypress || hasPlaywright;
    const hasTypecheck = (0, ts_solution_setup_1.isUsingTsSolutionSetup)(tree);
    const connectedToCloud = (0, nx_cloud_utils_1.isNxCloudUsed)((0, devkit_1.readJson)(tree, 'nx.json'));
    return {
        workflowName,
        workflowFileName,
        packageManager,
        packageManagerInstall,
        packageManagerPrefix,
        packageManagerPreInstallPrefix,
        mainBranch: (0, default_base_1.deduceDefaultBase)(),
        hasCypress,
        hasE2E,
        hasPlaywright,
        hasTypecheck,
        nxCloudHost,
        tmpl: '',
        connectedToCloud,
    };
}
function defaultBranchNeedsOriginPrefix(nxJson) {
    const base = nxJson.defaultBase ?? nxJson.affected?.defaultBase;
    return !base?.startsWith('origin/');
}
function appendOriginPrefix(nxJson) {
    if (nxJson?.affected?.defaultBase) {
        nxJson.affected.defaultBase = `origin/${nxJson.affected.defaultBase}`;
    }
    if (nxJson.defaultBase || !nxJson.affected) {
        nxJson.defaultBase = `origin/${nxJson.defaultBase ?? (0, default_base_1.deduceDefaultBase)()}`;
    }
}
const ciWorkflowInputs = {
    azure: 'azure-pipelines.yml',
    'bitbucket-pipelines': 'bitbucket-pipelines.yml',
    circleci: '.circleci/config.yml',
    github: '.github/workflows/',
    gitlab: '.gitlab-ci.yml',
};
function addWorkflowFileToSharedGlobals(nxJson, ci, workflowFileName) {
    let input = `{workspaceRoot}/${ciWorkflowInputs[ci]}`;
    if (ci === 'github')
        input += `${workflowFileName}.yml`;
    nxJson.namedInputs ??= {};
    nxJson.namedInputs.sharedGlobals ??= [];
    nxJson.namedInputs.sharedGlobals.push(input);
    // Ensure 'default' named input exists and includes 'sharedGlobals'
    if (!nxJson.namedInputs.default) {
        nxJson.namedInputs.default = ['sharedGlobals'];
    }
    else if (Array.isArray(nxJson.namedInputs.default) &&
        !nxJson.namedInputs.default.includes('sharedGlobals')) {
        nxJson.namedInputs.default.push('sharedGlobals');
    }
}
