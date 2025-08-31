"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenedCloudUrl = void 0;
const devkit_exports_1 = require("../../devkit-exports");
const git_utils_1 = require("../../utils/git-utils");
async function shortenedCloudUrl(installationSource, accessToken, github) {
    const githubSlug = (0, git_utils_1.getGithubSlugOrNull)();
    const apiUrl = removeTrailingSlash(process.env.NX_CLOUD_API || process.env.NRWL_API || `https://cloud.nx.app`);
    const installationSupportsGitHub = await getInstallationSupportsGitHub(apiUrl);
    const usesGithub = (githubSlug || github) &&
        (apiUrl.includes('cloud.nx.app') ||
            apiUrl.includes('eu.nx.app') ||
            installationSupportsGitHub);
    const source = getSource(installationSource);
    try {
        const response = await require('axios').post(`${apiUrl}/nx-cloud/onboarding`, {
            type: usesGithub ? 'GITHUB' : 'MANUAL',
            source,
            accessToken: usesGithub ? null : accessToken,
            selectedRepositoryName: githubSlug,
        });
        if (!response?.data || response.data.message) {
            throw new Error(response?.data?.message ?? 'Failed to shorten Nx Cloud URL');
        }
        return `${apiUrl}/connect/${response.data}`;
    }
    catch (e) {
        devkit_exports_1.logger.verbose(`Failed to shorten Nx Cloud URL.
    ${e}`);
        return getURLifShortenFailed(usesGithub, githubSlug, apiUrl, accessToken, source);
    }
}
exports.shortenedCloudUrl = shortenedCloudUrl;
function removeTrailingSlash(apiUrl) {
    return apiUrl[apiUrl.length - 1] === '/' ? apiUrl.slice(0, -1) : apiUrl;
}
function getSource(installationSource) {
    if (installationSource.includes('nx-init')) {
        return 'nx-init';
    }
    else if (installationSource.includes('nx-connect')) {
        return 'nx-connect';
    }
    else if (installationSource.includes('create-nx-workspace')) {
        return 'create-nx-workspace';
    }
    else {
        return 'other';
    }
}
function getURLifShortenFailed(usesGithub, githubSlug, apiUrl, accessToken, source) {
    if (usesGithub) {
        if (githubSlug) {
            return `${apiUrl}/setup/connect-workspace/vcs?provider=GITHUB&selectedRepositoryName=${encodeURIComponent(githubSlug)}&source=${source}`;
        }
        else {
            return `${apiUrl}/setup/connect-workspace/vcs?provider=GITHUB&source=${source}`;
        }
    }
    return `${apiUrl}/setup/connect-workspace/manual?accessToken=${accessToken}&source=${source}`;
}
async function getInstallationSupportsGitHub(apiUrl) {
    try {
        const response = await require('axios').get(`${apiUrl}/vcs-integrations`);
        if (!response?.data || response.data.message) {
            throw new Error(response?.data?.message ?? 'Failed to shorten Nx Cloud URL');
        }
        return !!response.data.github;
    }
    catch (e) {
        if (process.env.NX_VERBOSE_LOGGING) {
            devkit_exports_1.logger.warn(`Failed to access vcs-integrations endpoint.
    ${e}`);
        }
        return false;
    }
}
