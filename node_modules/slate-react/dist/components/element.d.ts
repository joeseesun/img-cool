import React from 'react';
import { JSX } from 'react';
import { Element as SlateElement, DecoratedRange } from 'slate';
import { RenderChunkProps, RenderElementProps, RenderLeafProps, RenderPlaceholderProps, RenderTextProps } from './editable';
/**
 * Element.
 */
declare const Element: (props: {
    decorations: DecoratedRange[];
    element: SlateElement;
    renderElement?: ((props: RenderElementProps) => JSX.Element) | undefined;
    renderChunk?: ((props: RenderChunkProps) => JSX.Element) | undefined;
    renderPlaceholder: (props: RenderPlaceholderProps) => JSX.Element;
    renderText?: ((props: RenderTextProps) => JSX.Element) | undefined;
    renderLeaf?: ((props: RenderLeafProps) => JSX.Element) | undefined;
}) => JSX.Element;
declare const MemoizedElement: React.MemoExoticComponent<(props: {
    decorations: DecoratedRange[];
    element: SlateElement;
    renderElement?: ((props: RenderElementProps) => JSX.Element) | undefined;
    renderChunk?: ((props: RenderChunkProps) => JSX.Element) | undefined;
    renderPlaceholder: (props: RenderPlaceholderProps) => JSX.Element;
    renderText?: ((props: RenderTextProps) => JSX.Element) | undefined;
    renderLeaf?: ((props: RenderLeafProps) => JSX.Element) | undefined;
}) => JSX.Element>;
/**
 * The default element renderer.
 */
export declare const DefaultElement: (props: RenderElementProps) => JSX.Element;
export default MemoizedElement;
//# sourceMappingURL=element.d.ts.map