import { Editor } from 'slate';
/**
 * Get the current editor object and re-render whenever it changes.
 */
export declare const useSlate: () => Editor;
/**
 * Get the current editor object and its version, which increments on every
 * change.
 *
 * @deprecated The `v` counter is no longer used except for this hook, and may
 * be removed in a future version.
 */
export declare const useSlateWithV: () => {
    editor: Editor;
    v: number;
};
//# sourceMappingURL=use-slate.d.ts.map