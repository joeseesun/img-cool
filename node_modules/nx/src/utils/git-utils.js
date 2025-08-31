"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestCommitSha = exports.commitChanges = exports.extractUserAndRepoFromGitHubUrl = exports.getGithubSlugOrNull = void 0;
const child_process_1 = require("child_process");
function getGithubSlugOrNull() {
    try {
        const gitRemote = (0, child_process_1.execSync)('git remote -v').toString();
        return extractUserAndRepoFromGitHubUrl(gitRemote);
    }
    catch (e) {
        return null;
    }
}
exports.getGithubSlugOrNull = getGithubSlugOrNull;
function extractUserAndRepoFromGitHubUrl(gitRemotes) {
    const regex = /^\s*(\w+)\s+(git@github\.com:|https:\/\/github\.com\/)([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\.git/gm;
    let firstGitHubUrl = null;
    let match;
    while ((match = regex.exec(gitRemotes)) !== null) {
        const remoteName = match[1];
        const url = match[2] + match[3] + '/' + match[4] + '.git';
        if (remoteName === 'origin') {
            return parseGitHubUrl(url);
        }
        if (!firstGitHubUrl) {
            firstGitHubUrl = url;
        }
    }
    return firstGitHubUrl ? parseGitHubUrl(firstGitHubUrl) : null;
}
exports.extractUserAndRepoFromGitHubUrl = extractUserAndRepoFromGitHubUrl;
function parseGitHubUrl(url) {
    const sshPattern = /git@github\.com:([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\.git/;
    const httpsPattern = /https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\.git/;
    let match = url.match(sshPattern) || url.match(httpsPattern);
    if (match) {
        return `${match[1]}/${match[2]}`;
    }
    return null;
}
function commitChanges(commitMessage) {
    try {
        (0, child_process_1.execSync)('git add -A', { encoding: 'utf8', stdio: 'pipe' });
        (0, child_process_1.execSync)('git commit --no-verify -F -', {
            encoding: 'utf8',
            stdio: 'pipe',
            input: commitMessage,
        });
    }
    catch (err) {
        throw new Error(`Error committing changes:\n${err.stderr}`);
    }
    return getLatestCommitSha();
}
exports.commitChanges = commitChanges;
function getLatestCommitSha() {
    try {
        return (0, child_process_1.execSync)('git rev-parse HEAD', {
            encoding: 'utf8',
            stdio: 'pipe',
        }).trim();
    }
    catch {
        return null;
    }
}
exports.getLatestCommitSha = getLatestCommitSha;
