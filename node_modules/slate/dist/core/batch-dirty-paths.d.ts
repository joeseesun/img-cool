import { Editor } from '../interfaces/editor';
export declare const isBatchingDirtyPaths: (editor: Editor) => boolean;
export declare const batchDirtyPaths: (editor: Editor, fn: () => void, update: () => void) => void;
//# sourceMappingURL=batch-dirty-paths.d.ts.map