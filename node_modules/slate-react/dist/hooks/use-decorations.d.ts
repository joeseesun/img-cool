/// <reference types="react" />
import { DecoratedRange, Descendant, NodeEntry } from 'slate';
type Callback = () => void;
/**
 * A React context for sharing the `decorate` prop of the editable and
 * subscribing to changes on this prop.
 */
export declare const DecorateContext: import("react").Context<{
    decorate: (entry: NodeEntry) => DecoratedRange[];
    addEventListener: (callback: Callback) => () => void;
}>;
export declare const useDecorations: (node: Descendant, parentDecorations: DecoratedRange[]) => DecoratedRange[];
export declare const useDecorateContext: (decorateProp: (entry: NodeEntry) => DecoratedRange[]) => {
    decorate: (entry: NodeEntry) => DecoratedRange[];
    addEventListener: (callback: Callback) => () => void;
};
export {};
//# sourceMappingURL=use-decorations.d.ts.map