import { PlaitBoard } from '@plait/core';
import { DrawnixState } from '../hooks/use-drawnix';
export declare const buildDrawnixHotkeyPlugin: (updateAppState: (appState: Partial<DrawnixState>) => void) => (board: PlaitBoard) => PlaitBoard;
