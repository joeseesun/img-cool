import { PlaitBoard, PlaitPointerType } from '@plait/core';
import { MindPointerType } from '@plait/mind';
import { DrawPointerType } from '@plait/draw';
import { FreehandShape } from '../plugins/freehand/type';
import { Editor } from 'slate';
import { LinkElement } from '@plait/common';
export declare enum DialogType {
    mermaidToDrawnix = "mermaidToDrawnix",
    markdownToDrawnix = "markdownToDrawnix"
}
export type DrawnixPointerType = PlaitPointerType | MindPointerType | DrawPointerType | FreehandShape;
export interface DrawnixBoard extends PlaitBoard {
    appState: DrawnixState;
}
export type LinkState = {
    targetDom: HTMLElement;
    editor: Editor;
    targetElement: LinkElement;
    isEditing: boolean;
    isHovering: boolean;
    isHoveringOrigin: boolean;
};
export type DrawnixState = {
    pointer: DrawnixPointerType;
    isMobile: boolean;
    isPencilMode: boolean;
    openDialogType: DialogType | null;
    openCleanConfirm: boolean;
    linkState?: LinkState | null;
};
export declare const DrawnixContext: import('react').Context<{
    appState: DrawnixState;
    setAppState: (appState: DrawnixState) => void;
} | null>;
export declare const useDrawnix: () => {
    appState: DrawnixState;
    setAppState: (appState: DrawnixState) => void;
};
export declare const useSetPointer: () => (pointer: DrawnixPointerType) => void;
