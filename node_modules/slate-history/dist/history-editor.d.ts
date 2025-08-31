import { BaseEditor } from 'slate';
import { History } from './history';
/**
 * Weakmaps for attaching state to the editor.
 */
export declare const HISTORY: WeakMap<BaseEditor, History>;
export declare const SAVING: WeakMap<BaseEditor, boolean | undefined>;
export declare const MERGING: WeakMap<BaseEditor, boolean | undefined>;
export declare const SPLITTING_ONCE: WeakMap<BaseEditor, boolean | undefined>;
/**
 * `HistoryEditor` contains helpers for history-enabled editors.
 */
export interface HistoryEditor extends BaseEditor {
    history: History;
    undo: () => void;
    redo: () => void;
    writeHistory: (stack: 'undos' | 'redos', batch: any) => void;
}
export declare const HistoryEditor: {
    /**
     * Check if a value is a `HistoryEditor` object.
     */
    isHistoryEditor(value: any): value is HistoryEditor;
    /**
     * Get the merge flag's current value.
     */
    isMerging(editor: HistoryEditor): boolean | undefined;
    /**
     * Get the splitting once flag's current value.
     */
    isSplittingOnce(editor: HistoryEditor): boolean | undefined;
    setSplittingOnce(editor: HistoryEditor, value: boolean | undefined): void;
    /**
     * Get the saving flag's current value.
     */
    isSaving(editor: HistoryEditor): boolean | undefined;
    /**
     * Redo to the previous saved state.
     */
    redo(editor: HistoryEditor): void;
    /**
     * Undo to the previous saved state.
     */
    undo(editor: HistoryEditor): void;
    /**
     * Apply a series of changes inside a synchronous `fn`, These operations will
     * be merged into the previous history.
     */
    withMerging(editor: HistoryEditor, fn: () => void): void;
    /**
     * Apply a series of changes inside a synchronous `fn`, ensuring that the first
     * operation starts a new batch in the history. Subsequent operations will be
     * merged as usual.
     */
    withNewBatch(editor: HistoryEditor, fn: () => void): void;
    /**
     * Apply a series of changes inside a synchronous `fn`, without merging any of
     * the new operations into previous save point in the history.
     */
    withoutMerging(editor: HistoryEditor, fn: () => void): void;
    /**
     * Apply a series of changes inside a synchronous `fn`, without saving any of
     * their operations into the history.
     */
    withoutSaving(editor: HistoryEditor, fn: () => void): void;
};
//# sourceMappingURL=history-editor.d.ts.map