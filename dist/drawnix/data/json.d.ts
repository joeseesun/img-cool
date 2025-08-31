import { PlaitBoard } from '@plait/core';
import { DrawnixExportedData } from './types';
export declare const getDefaultName: () => string;
export declare const saveAsJSON: (board: PlaitBoard, name?: string) => Promise<{
    fileHandle: FileSystemFileHandle | null;
}>;
export declare const loadFromJSON: (board: PlaitBoard) => Promise<DrawnixExportedData>;
export declare const isValidDrawnixData: (data?: any) => data is DrawnixExportedData;
export declare const serializeAsJSON: (board: PlaitBoard) => string;
