import { Ancestor, Editor } from 'slate';
import { Key } from 'slate-dom';
import { ChunkTree } from './types';
import { ReconcileOptions } from './reconcile-children';
export declare const KEY_TO_CHUNK_TREE: WeakMap<Key, ChunkTree>;
/**
 * Get or create the chunk tree for a Slate node
 *
 * If the reconcile option is provided, the chunk tree will be updated to
 * match the current children of the node. The children are chunked
 * automatically using the given chunk size.
 */
export declare const getChunkTreeForNode: (editor: Editor, node: Ancestor, options?: {
    reconcile?: Omit<ReconcileOptions, 'chunkTree' | 'children'> | false;
}) => ChunkTree;
//# sourceMappingURL=get-chunk-tree-for-node.d.ts.map