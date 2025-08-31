import React from 'react';
import { JSX } from 'react';
import { Element, LeafPosition, Text } from 'slate';
import { RenderLeafProps, RenderPlaceholderProps } from './editable';
declare const MemoizedLeaf: React.MemoExoticComponent<(props: {
    isLast: boolean;
    leaf: Text;
    parent: Element;
    renderPlaceholder: (props: RenderPlaceholderProps) => JSX.Element;
    renderLeaf?: ((props: RenderLeafProps) => JSX.Element) | undefined;
    text: Text;
    leafPosition?: LeafPosition | undefined;
}) => JSX.Element>;
export declare const DefaultLeaf: (props: RenderLeafProps) => JSX.Element;
export default MemoizedLeaf;
//# sourceMappingURL=leaf.d.ts.map