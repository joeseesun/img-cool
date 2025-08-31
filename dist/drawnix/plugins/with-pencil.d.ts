import { PlaitBoard } from '@plait/core';
import { DrawnixState } from '../hooks/use-drawnix';
export declare const isPencilMode: (board: PlaitBoard) => boolean;
export declare const setIsPencilMode: (board: PlaitBoard, isPencilMode: boolean) => void;
export declare const buildPencilPlugin: (updateAppState: (appState: Partial<DrawnixState>) => void) => (board: PlaitBoard) => PlaitBoard;
