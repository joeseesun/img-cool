/// <reference types="react" />
import { Editor } from 'slate';
type Callback = () => void;
export interface SlateSelectorOptions {
    /**
     * If true, defer calling the selector function until after `Editable` has
     * finished rendering. This ensures that `ReactEditor.findPath` won't return
     * an outdated path if called inside the selector.
     */
    deferred?: boolean;
}
/**
 * A React context for sharing the editor selector context in a way to control
 * re-renders.
 */
export declare const SlateSelectorContext: import("react").Context<{
    addEventListener: (callback: Callback, options?: SlateSelectorOptions) => () => void;
    flushDeferred: () => void;
}>;
/**
 * Use redux style selectors to prevent re-rendering on every keystroke.
 *
 * Bear in mind re-rendering can only prevented if the returned value is a value
 * type or for reference types (e.g. objects and arrays) add a custom equality
 * function.
 *
 * If `selector` is memoized using `useCallback`, then it will only be called
 * when it or the editor state changes. Otherwise, `selector` will be called
 * every time the component renders.
 *
 * @example
 * const isSelectionActive = useSlateSelector(editor => Boolean(editor.selection))
 */
export declare function useSlateSelector<T>(selector: (editor: Editor) => T, equalityFn?: (a: T | null, b: T) => boolean, { deferred }?: SlateSelectorOptions): T;
/**
 * Create selector context with editor updating on every editor change
 */
export declare function useSelectorContext(): {
    selectorContext: {
        addEventListener: (callbackProp: Callback, { deferred }?: SlateSelectorOptions) => () => void;
        flushDeferred: () => void;
    };
    onChange: () => void;
};
export declare function useFlushDeferredSelectorsOnRender(): void;
export {};
//# sourceMappingURL=use-slate-selector.d.ts.map