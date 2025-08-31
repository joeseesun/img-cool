import { Editor, Descendant } from 'slate';
import { Key } from 'slate-dom';
import { ChunkLeaf } from './types';
/**
 * Traverse an array of children, providing helpers useful for reconciling the
 * children array with a chunk tree
 */
export declare class ChildrenHelper {
    private editor;
    private children;
    /**
     * Sparse array of Slate node keys, each index corresponding to an index in
     * the children array
     *
     * Fetching the key for a Slate node is expensive, so we cache them here.
     */
    private cachedKeys;
    /**
     * The index of the next node to be read in the children array
     */
    pointerIndex: number;
    constructor(editor: Editor, children: Descendant[]);
    /**
     * Read a given number of nodes, advancing the pointer by that amount
     */
    read(n: number): Descendant[];
    /**
     * Get the remaining children without advancing the pointer
     *
     * @param [maxChildren] Limit the number of children returned.
     */
    remaining(maxChildren?: number): Descendant[];
    /**
     * Whether all children have been read
     */
    get reachedEnd(): boolean;
    /**
     * Determine whether a node with a given key appears in the unread part of the
     * children array, and return its index relative to the current pointer if so
     *
     * Searching for the node object itself using indexOf is most efficient, but
     * will fail to locate nodes that have been modified. In this case, nodes
     * should be identified by their keys instead.
     *
     * Searching an array of keys using indexOf is very inefficient since fetching
     * the keys for all children in advance is very slow. Insead, if the node
     * search fails to return a value, fetch the keys of each remaining child one
     * by one and compare it to the known key.
     */
    lookAhead(node: Descendant, key: Key): number;
    /**
     * Convert an array of Slate nodes to an array of chunk leaves, each
     * containing the node and its key
     */
    toChunkLeaves(nodes: Descendant[], startIndex: number): ChunkLeaf[];
    /**
     * Get the key for a Slate node, cached using the node's index
     */
    private findKey;
}
//# sourceMappingURL=children-helper.d.ts.map