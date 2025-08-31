import { Ancestor, DecoratedRange, Editor, Range } from 'slate';
export declare const shallowCompare: (obj1: {
    [key: string]: unknown;
}, obj2: {
    [key: string]: unknown;
}) => boolean;
/**
 * Check if a list of decorator ranges are equal to another.
 *
 * PERF: this requires the two lists to also have the ranges inside them in the
 * same order, but this is an okay constraint for us since decorations are
 * kept in order, and the odd case where they aren't is okay to re-render for.
 */
export declare const isElementDecorationsEqual: (list: Range[] | null, another: Range[] | null) => boolean;
/**
 * Check if a list of decorator ranges are equal to another.
 *
 * PERF: this requires the two lists to also have the ranges inside them in the
 * same order, but this is an okay constraint for us since decorations are
 * kept in order, and the odd case where they aren't is okay to re-render for.
 */
export declare const isTextDecorationsEqual: (list: Range[] | null, another: Range[] | null) => boolean;
/**
 * Split and group decorations by each child of a node.
 *
 * @returns An array with length equal to that of `node.children`. Each index
 * corresponds to a child of `node`, and the value is an array of decorations
 * for that child.
 */
export declare const splitDecorationsByChild: (editor: Editor, node: Ancestor, decorations: DecoratedRange[]) => DecoratedRange[][];
//# sourceMappingURL=range-list.d.ts.map