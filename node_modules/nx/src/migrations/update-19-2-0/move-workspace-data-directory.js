"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGitIgnore = exports.updatePrettierIgnore = void 0;
async function moveGraphCacheDirectory(tree) {
    updateGitIgnore(tree);
    updatePrettierIgnore(tree);
}
exports.default = moveGraphCacheDirectory;
function updatePrettierIgnore(tree) {
    if (tree.exists('.prettierignore')) {
        const ignored = tree.read('.prettierignore', 'utf-8');
        if (!ignored?.includes('.nx/workspace-data')) {
            tree.write('.prettierignore', [ignored, '/.nx/workspace-data'].join('\n'));
        }
    }
}
exports.updatePrettierIgnore = updatePrettierIgnore;
function updateGitIgnore(tree) {
    const gitignore = tree.read('.gitignore', 'utf-8');
    if (!gitignore) {
        return;
    }
    const includesNxWorkspaceData = gitignore.includes('.nx/workspace-data');
    if (includesNxWorkspaceData) {
        return;
    }
    const includesNxCache = gitignore.includes('.nx/cache');
    if (!includesNxCache) {
        return;
    }
    const updatedGitignore = gitignore.replace('.nx/cache', ['.nx/cache', '.nx/workspace-data'].join('\n'));
    tree.write('.gitignore', updatedGitignore);
}
exports.updateGitIgnore = updateGitIgnore;
