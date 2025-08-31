import { PlaitBoard } from '@plait/core';
declare global {
    interface Window {
        __drawnix_ai_image_handler?: {
            showMenu: (board: PlaitBoard, position: {
                x: number;
                y: number;
            }) => void;
        };
    }
}
export declare const withAIImagePlugin: (board: PlaitBoard) => {
    viewport: import('@plait/core').BaseViewport;
    children: import('@plait/core').PlaitElement[];
    theme: import('@plait/core').PlaitTheme;
    operations: import('@plait/core').PlaitOperation[];
    selection: import('@plait/core').Selection | null;
    pointer: string;
    history: import('@plait/core').PlaitHistory;
    options: import('@plait/core').PlaitBoardOptions;
    undo: () => void;
    redo: () => void;
    apply: (operation: import('@plait/core').PlaitOperation) => void;
    onChange: () => void;
    afterChange: () => void;
    drawSelectionRectangle: () => SVGGElement | null;
    mousedown: (event: MouseEvent) => void;
    mousemove: (event: MouseEvent) => void;
    mouseleave: (event: MouseEvent) => void;
    mouseup: (event: MouseEvent) => void;
    globalMousemove: (event: MouseEvent) => void;
    globalMouseup: (event: MouseEvent) => void;
    keyDown: (event: KeyboardEvent) => void;
    globalKeyDown: (event: KeyboardEvent) => void;
    keyUp: (event: KeyboardEvent) => void;
    buildFragment: (clipboardContext: import('@plait/core').WritableClipboardContext | null, rectangle: import('@plait/core').RectangleClient | null, operationType: import('@plait/core').WritableClipboardOperationType, originData?: import('@plait/core').PlaitElement[] | undefined) => import('@plait/core').WritableClipboardContext | null;
    insertFragment: (clipboardData: import('@plait/core').ClipboardData | null, targetPoint: import('@plait/core').Point, operationType?: import('@plait/core').WritableClipboardOperationType | undefined) => void;
    deleteFragment: (data: import('@plait/core').PlaitElement[]) => void;
    getDeletedFragment: (data: import('@plait/core').PlaitElement[]) => import('@plait/core').PlaitElement[];
    getRelatedFragment: (data: import('@plait/core').PlaitElement[], originData?: import('@plait/core').PlaitElement[] | undefined) => import('@plait/core').PlaitElement[];
    dblClick: (event: MouseEvent) => void;
    normalizeElement: (context: import('@plait/core').PlaitPluginElementContext<import('@plait/core').PlaitElement, PlaitBoard>) => void;
    drawElement: (context: import('@plait/core').PlaitPluginElementContext<import('@plait/core').PlaitElement, PlaitBoard>) => import('@plait/core').ComponentType<import('@plait/core').ElementFlavour<import('@plait/core').PlaitElement, PlaitBoard, import('@plait/core').PlaitElementRef>>;
    isRectangleHit: (element: import('@plait/core').PlaitElement, range: import('@plait/core').Selection) => boolean;
    isHit: (element: import('@plait/core').PlaitElement, point: import('@plait/core').Point, isStrict?: boolean | undefined) => boolean;
    isInsidePoint: (element: import('@plait/core').PlaitElement, point: import('@plait/core').Point) => boolean;
    getOneHitElement: (hitElements: import('@plait/core').PlaitElement[]) => import('@plait/core').PlaitElement;
    isRecursion: (element: import('@plait/core').PlaitElement) => boolean;
    isMovable: (element: import('@plait/core').PlaitElement) => boolean;
    getRectangle: (element: import('@plait/core').PlaitElement) => import('@plait/core').RectangleClient | null;
    isWithinSelection: (element: import('@plait/core').PlaitElement) => boolean;
    pathRef: (path: import('@plait/core').Path, options?: import('@plait/core/interfaces/path-ref').PathRefOptions | undefined) => import('@plait/core/interfaces/path-ref').PathRef;
    pathRefs: () => Set<import('@plait/core/interfaces/path-ref').PathRef>;
    applyTheme: (element: import('@plait/core').PlaitElement) => void;
    isAlign: (element: import('@plait/core').PlaitElement) => boolean;
    isImageBindingAllowed: (element: import('@plait/core').PlaitElement) => boolean;
    canAddToGroup: (element: import('@plait/core').PlaitElement) => boolean;
    canSetZIndex: (element: import('@plait/core').PlaitElement) => boolean;
    isExpanded: (element: import('@plait/core').PlaitElement) => boolean;
    pointerDown: (pointer: PointerEvent) => void;
    pointerMove: (pointer: PointerEvent) => void;
    pointerUp: (pointer: PointerEvent) => void;
    pointerCancel: (pointer: PointerEvent) => void;
    pointerOut: (pointer: PointerEvent) => void;
    pointerLeave: (pointer: PointerEvent) => void;
    globalPointerMove: (pointer: PointerEvent) => void;
    globalPointerUp: (pointer: PointerEvent) => void;
    drop: (event: DragEvent) => boolean;
};
export declare function processSelectedImagesWithAI(board: PlaitBoard, prompt: string): Promise<boolean>;
