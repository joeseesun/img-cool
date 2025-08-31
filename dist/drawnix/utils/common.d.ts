import { PlaitBoard, ToImageOptions } from '@plait/core';
export declare const isPromiseLike: (value: any) => value is Promise<any>;
export declare const composeEventHandlers: <E>(originalEventHandler?: (event: E) => void, ourEventHandler?: (event: E) => void, { checkForDefaultPrevented }?: {
    checkForDefaultPrevented?: boolean | undefined;
}) => (event: E) => void;
export declare const base64ToBlob: (base64: string) => Blob;
export declare const boardToImage: (board: PlaitBoard, options?: ToImageOptions) => Promise<string | undefined>;
export declare function download(blob: Blob | MediaSource, filename: string): void;
export declare const splitRows: <T>(shapes: T[], cols: number) => T[][];
export declare const getShortcutKey: (shortcut: string) => string;
