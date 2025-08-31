import { BaseEditor, Editor, Node, Path, Point, Range } from 'slate';
import { TextDiff } from '../utils/diff-text';
import { DOMNode, DOMPoint, DOMRange, DOMSelection, DOMStaticRange } from '../utils/dom';
import { Key } from '../utils/key';
/**
 * A DOM-specific version of the `Editor` interface.
 */
export interface DOMEditor extends BaseEditor {
    hasEditableTarget: (editor: DOMEditor, target: EventTarget | null) => target is DOMNode;
    hasRange: (editor: DOMEditor, range: Range) => boolean;
    hasSelectableTarget: (editor: DOMEditor, target: EventTarget | null) => boolean;
    hasTarget: (editor: DOMEditor, target: EventTarget | null) => target is DOMNode;
    insertData: (data: DataTransfer) => void;
    insertFragmentData: (data: DataTransfer) => boolean;
    insertTextData: (data: DataTransfer) => boolean;
    isTargetInsideNonReadonlyVoid: (editor: DOMEditor, target: EventTarget | null) => boolean;
    setFragmentData: (data: DataTransfer, originEvent?: 'drag' | 'copy' | 'cut') => void;
}
export interface DOMEditorInterface {
    /**
     * Experimental and android specific: Get pending diffs
     */
    androidPendingDiffs: (editor: Editor) => TextDiff[] | undefined;
    /**
     * Experimental and android specific: Flush all pending diffs and cancel composition at the next possible time.
     */
    androidScheduleFlush: (editor: Editor) => void;
    /**
     * Blur the editor.
     */
    blur: (editor: DOMEditor) => void;
    /**
     * Deselect the editor.
     */
    deselect: (editor: DOMEditor) => void;
    /**
     * Find the DOM node that implements DocumentOrShadowRoot for the editor.
     */
    findDocumentOrShadowRoot: (editor: DOMEditor) => Document | ShadowRoot;
    /**
     * Get the target range from a DOM `event`.
     */
    findEventRange: (editor: DOMEditor, event: any) => Range;
    /**
     * Find a key for a Slate node.
     */
    findKey: (editor: DOMEditor, node: Node) => Key;
    /**
     * Find the path of Slate node.
     */
    findPath: (editor: DOMEditor, node: Node) => Path;
    /**
     * Focus the editor.
     */
    focus: (editor: DOMEditor, options?: {
        retries: number;
    }) => void;
    /**
     * Return the host window of the current editor.
     */
    getWindow: (editor: DOMEditor) => Window;
    /**
     * Check if a DOM node is within the editor.
     */
    hasDOMNode: (editor: DOMEditor, target: DOMNode, options?: {
        editable?: boolean;
    }) => boolean;
    /**
     * Check if the target is editable and in the editor.
     */
    hasEditableTarget: (editor: DOMEditor, target: EventTarget | null) => target is DOMNode;
    /**
     *
     */
    hasRange: (editor: DOMEditor, range: Range) => boolean;
    /**
     * Check if the target can be selectable
     */
    hasSelectableTarget: (editor: DOMEditor, target: EventTarget | null) => boolean;
    /**
     * Check if the target is in the editor.
     */
    hasTarget: (editor: DOMEditor, target: EventTarget | null) => target is DOMNode;
    /**
     * Insert data from a `DataTransfer` into the editor.
     */
    insertData: (editor: DOMEditor, data: DataTransfer) => void;
    /**
     * Insert fragment data from a `DataTransfer` into the editor.
     */
    insertFragmentData: (editor: DOMEditor, data: DataTransfer) => boolean;
    /**
     * Insert text data from a `DataTransfer` into the editor.
     */
    insertTextData: (editor: DOMEditor, data: DataTransfer) => boolean;
    /**
     * Check if the user is currently composing inside the editor.
     */
    isComposing: (editor: DOMEditor) => boolean;
    /**
     * Check if the editor is focused.
     */
    isFocused: (editor: DOMEditor) => boolean;
    /**
     * Check if the editor is in read-only mode.
     */
    isReadOnly: (editor: DOMEditor) => boolean;
    /**
     * Check if the target is inside void and in an non-readonly editor.
     */
    isTargetInsideNonReadonlyVoid: (editor: DOMEditor, target: EventTarget | null) => boolean;
    /**
     * Sets data from the currently selected fragment on a `DataTransfer`.
     */
    setFragmentData: (editor: DOMEditor, data: DataTransfer, originEvent?: 'drag' | 'copy' | 'cut') => void;
    /**
     * Find the native DOM element from a Slate node.
     */
    toDOMNode: (editor: DOMEditor, node: Node) => HTMLElement;
    /**
     * Find a native DOM selection point from a Slate point.
     */
    toDOMPoint: (editor: DOMEditor, point: Point) => DOMPoint;
    /**
     * Find a native DOM range from a Slate `range`.
     *
     * Notice: the returned range will always be ordinal regardless of the direction of Slate `range` due to DOM API limit.
     *
     * there is no way to create a reverse DOM Range using Range.setStart/setEnd
     * according to https://dom.spec.whatwg.org/#concept-range-bp-set.
     */
    toDOMRange: (editor: DOMEditor, range: Range) => DOMRange;
    /**
     * Find a Slate node from a native DOM `element`.
     */
    toSlateNode: (editor: DOMEditor, domNode: DOMNode) => Node;
    /**
     * Find a Slate point from a DOM selection's `domNode` and `domOffset`.
     */
    toSlatePoint: <T extends boolean>(editor: DOMEditor, domPoint: DOMPoint, options: {
        exactMatch: boolean;
        suppressThrow: T;
        /**
         * The direction to search for Slate leaf nodes if `domPoint` is
         * non-editable and non-void.
         */
        searchDirection?: 'forward' | 'backward';
    }) => T extends true ? Point | null : Point;
    /**
     * Find a Slate range from a DOM range or selection.
     */
    toSlateRange: <T extends boolean>(editor: DOMEditor, domRange: DOMRange | DOMStaticRange | DOMSelection, options: {
        exactMatch: boolean;
        suppressThrow: T;
    }) => T extends true ? Range | null : Range;
}
export declare const DOMEditor: DOMEditorInterface;
//# sourceMappingURL=dom-editor.d.ts.map