"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToNxCloud = void 0;
const child_process_1 = require("child_process");
const node_url_1 = require("node:url");
const output_1 = require("../../../utils/output");
const json_1 = require("../../../generators/utils/json");
const nx_json_1 = require("../../../generators/utils/nx-json");
const format_changed_files_with_prettier_if_available_1 = require("../../../generators/internal-utils/format-changed-files-with-prettier-if-available");
const url_shorten_1 = require("../../utilities/url-shorten");
function printCloudConnectionDisabledMessage() {
    output_1.output.error({
        title: `Connections to Nx Cloud are disabled for this workspace`,
        bodyLines: [
            `This was an intentional decision by someone on your team.`,
            `Nx Cloud cannot and will not be enabled.`,
            ``,
            `To allow connections to Nx Cloud again, remove the 'neverConnectToCloud'`,
            `property in nx.json.`,
        ],
    });
}
function getRootPackageName(tree) {
    let packageJson;
    try {
        packageJson = (0, json_1.readJson)(tree, 'package.json');
    }
    catch (e) { }
    return packageJson?.name ?? 'my-workspace';
}
function removeTrailingSlash(apiUrl) {
    return apiUrl[apiUrl.length - 1] === '/'
        ? apiUrl.substr(0, apiUrl.length - 1)
        : apiUrl;
}
function getNxInitDate() {
    try {
        const nxInitIso = (0, child_process_1.execSync)('git log --diff-filter=A --follow --format=%aI -- nx.json | tail -1', { stdio: 'pipe' })
            .toString()
            .trim();
        const nxInitDate = new Date(nxInitIso);
        return nxInitDate.toISOString();
    }
    catch (e) {
        return null;
    }
}
async function createNxCloudWorkspace(workspaceName, installationSource, nxInitDate) {
    const apiUrl = removeTrailingSlash(process.env.NX_CLOUD_API || process.env.NRWL_API || `https://cloud.nx.app`);
    const response = await require('axios').post(`${apiUrl}/nx-cloud/create-org-and-workspace`, {
        workspaceName,
        installationSource,
        nxInitDate,
    });
    if (response.data.message) {
        throw new Error(response.data.message);
    }
    return response.data;
}
async function printSuccessMessage(url, token, installationSource, github) {
    if (process.env.NX_NEW_CLOUD_ONBOARDING !== 'true') {
        let origin = 'https://nx.app';
        try {
            origin = new node_url_1.URL(url).origin;
        }
        catch (e) { }
        output_1.output.note({
            title: `Your Nx Cloud workspace is public`,
            bodyLines: [
                `To restrict access, connect it to your Nx Cloud account:`,
                `- Push your changes`,
                `- Login at ${origin} to connect your repository`,
            ],
        });
    }
    else {
        const connectCloudUrl = await (0, url_shorten_1.shortenedCloudUrl)(installationSource, token, github);
        output_1.output.note({
            title: `Your Nx Cloud workspace is ready.`,
            bodyLines: [
                `To claim it, connect it to your Nx Cloud account:`,
                `- Commit and push your changes.`,
                `- Create a pull request for the changes.`,
                `- Go to the following URL to connect your workspace to Nx Cloud: 
        
        ${connectCloudUrl}`,
            ],
        });
    }
}
function addNxCloudOptionsToNxJson(tree, nxJson, token) {
    nxJson ??= {
        extends: 'nx/presets/npm.json',
    };
    nxJson.nxCloudAccessToken = token;
    const overrideUrl = process.env.NX_CLOUD_API || process.env.NRWL_API;
    if (overrideUrl) {
        nxJson.nxCloudUrl = overrideUrl;
    }
    (0, nx_json_1.updateNxJson)(tree, nxJson);
}
async function connectToNxCloud(tree, schema) {
    schema.installationSource ??= 'user';
    const nxJson = (0, nx_json_1.readNxJson)(tree);
    if (nxJson?.neverConnectToCloud) {
        return () => {
            printCloudConnectionDisabledMessage();
        };
    }
    else {
        // TODO: Change to using loading light client when that is enabled by default
        const r = await createNxCloudWorkspace(getRootPackageName(tree), schema.installationSource, getNxInitDate());
        addNxCloudOptionsToNxJson(tree, nxJson, r.token);
        await (0, format_changed_files_with_prettier_if_available_1.formatChangedFilesWithPrettierIfAvailable)(tree, {
            silent: schema.hideFormatLogs,
        });
        return async () => await printSuccessMessage(r.url, r.token, schema.installationSource, schema.github);
    }
}
exports.connectToNxCloud = connectToNxCloud;
exports.default = connectToNxCloud;
