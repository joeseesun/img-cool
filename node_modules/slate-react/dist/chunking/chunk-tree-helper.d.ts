import { ChunkTree, ChunkLeaf } from './types';
export interface ChunkTreeHelperOptions {
    chunkSize: number;
    debug?: boolean;
}
/**
 * Traverse and modify a chunk tree
 */
export declare class ChunkTreeHelper {
    /**
     * The root of the chunk tree
     */
    private root;
    /**
     * The ideal size of a chunk
     */
    private chunkSize;
    /**
     * Whether debug mode is enabled
     *
     * If enabled, the pointer state will be checked for internal consistency
     * after each mutating operation.
     */
    private debug;
    /**
     * Whether the traversal has reached the end of the chunk tree
     *
     * When this is true, the pointerChunk and pointerIndex point to the last
     * top-level node in the chunk tree, although pointerNode returns null.
     */
    private reachedEnd;
    /**
     * The chunk containing the current node
     */
    private pointerChunk;
    /**
     * The index of the current node within pointerChunk
     *
     * Can be -1 to indicate that the pointer is before the start of the tree.
     */
    private pointerIndex;
    /**
     * Similar to a Slate path; tracks the path of pointerChunk relative to the
     * root.
     *
     * Used to move the pointer from the current chunk to the parent chunk more
     * efficiently.
     */
    private pointerIndexStack;
    /**
     * Indexing the current chunk's children has a slight time cost, which adds up
     * when traversing very large trees, so the current node is cached.
     *
     * A value of undefined means that the current node is not cached. This
     * property must be set to undefined whenever the pointer is moved, unless
     * the pointer is guaranteed to point to the same node that it did previously.
     */
    private cachedPointerNode;
    constructor(chunkTree: ChunkTree, { chunkSize, debug }: ChunkTreeHelperOptions);
    /**
     * Move the pointer to the next leaf in the chunk tree
     */
    readLeaf(): ChunkLeaf | null;
    /**
     * Move the pointer to the previous leaf in the chunk tree
     */
    returnToPreviousLeaf(): void;
    /**
     * Insert leaves before the current leaf, leaving the pointer unchanged
     */
    insertBefore(leaves: ChunkLeaf[]): void;
    /**
     * Insert leaves after the current leaf, leaving the pointer on the last
     * inserted leaf
     *
     * The insertion algorithm first checks for any chunk we're currently at the
     * end of that can receive additional leaves. Next, it tries to insert leaves
     * at the starts of any subsequent chunks.
     *
     * Any remaining leaves are passed to rawInsertAfter to be chunked and
     * inserted at the highest possible level.
     */
    insertAfter(leaves: ChunkLeaf[]): void;
    /**
     * Remove the current node and decrement the pointer, deleting any ancestor
     * chunk that becomes empty as a result
     */
    remove(): void;
    /**
     * Add the current chunk and all ancestor chunks to the list of modified
     * chunks
     */
    invalidateChunk(): void;
    /**
     * Whether the pointer is at the start of the tree
     */
    private get atStart();
    /**
     * The siblings of the current node
     */
    private get pointerSiblings();
    /**
     * Get the current node (uncached)
     *
     * If the pointer is at the start or end of the document, returns null.
     *
     * Usually, the current node is a chunk leaf, although it can be a chunk
     * while insertions are in progress.
     */
    private getPointerNode;
    /**
     * Cached getter for the current node
     */
    private get pointerNode();
    /**
     * Get the path of a chunk relative to the root, returning null if the chunk
     * is not connected to the root
     */
    private getChunkPath;
    /**
     * Save the current pointer to be restored later
     */
    private savePointer;
    /**
     * Restore the pointer to a previous state
     */
    private restorePointer;
    /**
     * Assuming the current node is a chunk, move the pointer into that chunk
     *
     * @param end If true, place the pointer on the last node of the chunk.
     * Otherwise, place the pointer on the first node.
     */
    private enterChunk;
    /**
     * Assuming the current node is a chunk, move the pointer into that chunk
     * repeatedly until the current node is a leaf
     *
     * @param end If true, place the pointer on the last node of the chunk.
     * Otherwise, place the pointer on the first node.
     */
    private enterChunkUntilLeaf;
    /**
     * Move the pointer to the parent chunk
     */
    private exitChunk;
    /**
     * Insert leaves immediately after the current node, leaving the pointer on
     * the last inserted leaf
     *
     * Leaves are chunked according to the number of nodes already in the parent
     * plus the number of nodes being inserted, or the minimum depth if larger
     */
    private rawInsertAfter;
    /**
     * If debug mode is enabled, ensure that the state is internally consistent
     */
    private validateState;
}
//# sourceMappingURL=chunk-tree-helper.d.ts.map