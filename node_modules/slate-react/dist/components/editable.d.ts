import React from 'react';
import { JSX } from 'react';
import { Element, NodeEntry, Text, DecoratedRange, LeafPosition } from 'slate';
import { ReactEditor } from '../plugin/react-editor';
import { DOMRange } from 'slate-dom';
/**
 * `RenderElementProps` are passed to the `renderElement` handler.
 */
export interface RenderElementProps {
    children: any;
    element: Element;
    attributes: {
        'data-slate-node': 'element';
        'data-slate-inline'?: true;
        'data-slate-void'?: true;
        dir?: 'rtl';
        ref: any;
    };
}
/**
 * `RenderChunkProps` are passed to the `renderChunk` handler
 */
export interface RenderChunkProps {
    highest: boolean;
    lowest: boolean;
    children: any;
    attributes: {
        'data-slate-chunk': true;
    };
}
/**
 * `RenderLeafProps` are passed to the `renderLeaf` handler.
 */
export interface RenderLeafProps {
    children: any;
    /**
     * The leaf node with any applied decorations.
     * If no decorations are applied, it will be identical to the `text` property.
     */
    leaf: Text;
    text: Text;
    attributes: {
        'data-slate-leaf': true;
    };
    /**
     * The position of the leaf within the Text node, only present when the text node is split by decorations.
     */
    leafPosition?: LeafPosition;
}
/**
 * `RenderTextProps` are passed to the `renderText` handler.
 */
export interface RenderTextProps {
    text: Text;
    children: any;
    attributes: {
        'data-slate-node': 'text';
        ref: any;
    };
}
/**
 * `EditableProps` are passed to the `<Editable>` component.
 */
export type EditableProps = {
    decorate?: (entry: NodeEntry) => DecoratedRange[];
    onDOMBeforeInput?: (event: InputEvent) => void;
    placeholder?: string;
    readOnly?: boolean;
    role?: string;
    style?: React.CSSProperties;
    renderElement?: (props: RenderElementProps) => JSX.Element;
    renderChunk?: (props: RenderChunkProps) => JSX.Element;
    renderLeaf?: (props: RenderLeafProps) => JSX.Element;
    renderText?: (props: RenderTextProps) => JSX.Element;
    renderPlaceholder?: (props: RenderPlaceholderProps) => JSX.Element;
    scrollSelectionIntoView?: (editor: ReactEditor, domRange: DOMRange) => void;
    as?: React.ElementType;
    disableDefaultStyles?: boolean;
} & React.TextareaHTMLAttributes<HTMLDivElement>;
/**
 * Editable.
 */
export declare const Editable: React.ForwardRefExoticComponent<{
    decorate?: ((entry: NodeEntry) => DecoratedRange[]) | undefined;
    onDOMBeforeInput?: ((event: InputEvent) => void) | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    role?: string | undefined;
    style?: React.CSSProperties | undefined;
    renderElement?: ((props: RenderElementProps) => JSX.Element) | undefined;
    renderChunk?: ((props: RenderChunkProps) => JSX.Element) | undefined;
    renderLeaf?: ((props: RenderLeafProps) => JSX.Element) | undefined;
    renderText?: ((props: RenderTextProps) => JSX.Element) | undefined;
    renderPlaceholder?: ((props: RenderPlaceholderProps) => JSX.Element) | undefined;
    scrollSelectionIntoView?: ((editor: ReactEditor, domRange: DOMRange) => void) | undefined;
    as?: React.ElementType<any> | undefined;
    disableDefaultStyles?: boolean | undefined;
} & React.TextareaHTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * The props that get passed to renderPlaceholder
 */
export type RenderPlaceholderProps = {
    children: any;
    attributes: {
        'data-slate-placeholder': boolean;
        dir?: 'rtl';
        contentEditable: boolean;
        ref: React.RefCallback<any>;
        style: React.CSSProperties;
    };
};
/**
 * The default placeholder element
 */
export declare const DefaultPlaceholder: ({ attributes, children, }: RenderPlaceholderProps) => JSX.Element;
/**
 * A default memoized decorate function.
 */
export declare const defaultDecorate: (entry: NodeEntry) => DecoratedRange[];
/**
 * Check if an event is overrided by a handler.
 */
export declare const isEventHandled: <EventType extends React.SyntheticEvent<unknown, unknown>>(event: EventType, handler?: ((event: EventType) => void | boolean) | undefined) => boolean;
/**
 * Check if the event's target is an input element
 */
export declare const isDOMEventTargetInput: <EventType extends React.SyntheticEvent<unknown, unknown>>(event: EventType) => boolean;
/**
 * Check if a DOM event is overrided by a handler.
 */
export declare const isDOMEventHandled: <E extends Event>(event: E, handler?: ((event: E) => void | boolean) | undefined) => boolean;
//# sourceMappingURL=editable.d.ts.map