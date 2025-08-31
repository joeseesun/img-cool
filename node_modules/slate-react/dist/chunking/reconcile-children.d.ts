import { Editor, Descendant } from 'slate';
import { ChunkTree } from './types';
import { ChunkTreeHelperOptions } from './chunk-tree-helper';
export interface ReconcileOptions extends ChunkTreeHelperOptions {
    chunkTree: ChunkTree;
    children: Descendant[];
    chunkSize: number;
    rerenderChildren?: number[];
    onInsert?: (node: Descendant, index: number) => void;
    onUpdate?: (node: Descendant, index: number) => void;
    onIndexChange?: (node: Descendant, index: number) => void;
    debug?: boolean;
}
/**
 * Update the chunk tree to match the children array, inserting, removing and
 * updating differing nodes
 */
export declare const reconcileChildren: (editor: Editor, { chunkTree, children, chunkSize, rerenderChildren, onInsert, onUpdate, onIndexChange, debug, }: ReconcileOptions) => void;
//# sourceMappingURL=reconcile-children.d.ts.map