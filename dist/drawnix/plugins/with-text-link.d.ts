import { PlaitBoard } from '@plait/core';
import { DrawnixState } from '../hooks/use-drawnix';
export declare const isHovering: (board: PlaitBoard) => boolean | null | undefined;
export declare const isHoveringOrigin: (board: PlaitBoard) => boolean | null | undefined;
export declare const isEditing: (board: PlaitBoard) => boolean | null | undefined;
export declare const buildTextLinkPlugin: (updateAppState: (appState: Partial<DrawnixState>) => void) => (board: PlaitBoard) => PlaitBoard;
