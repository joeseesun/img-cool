"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceNodes = void 0;
/**
 * @deprecated This function will be removed from @nx/workspace in version 17. Prefer importing from @nx/js.
 */
function getSourceNodes(sourceFile) {
    const nodes = [sourceFile];
    const result = [];
    while (nodes.length > 0) {
        const node = nodes.shift();
        if (node) {
            result.push(node);
            if (node.getChildCount(sourceFile) >= 0) {
                nodes.unshift(...node.getChildren());
            }
        }
    }
    return result;
}
exports.getSourceNodes = getSourceNodes;
