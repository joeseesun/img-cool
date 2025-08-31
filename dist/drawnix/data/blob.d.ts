import { PlaitBoard } from '@plait/core';
import { IMAGE_MIME_TYPES, MIME_TYPES } from '../constants';
import { ValueOf } from '../utils/utility-types';
import { DataURL } from '../types';
export declare const loadFromBlob: (board: PlaitBoard, blob: Blob | File) => Promise<import('./types').DrawnixExportedData>;
export declare const createFile: (blob: File | Blob | ArrayBuffer, mimeType: ValueOf<typeof MIME_TYPES>, name: string | undefined) => File;
export declare const blobToArrayBuffer: (blob: Blob) => Promise<ArrayBuffer>;
export declare const normalizeFile: (file: File) => Promise<File>;
export declare const parseFileContents: (blob: Blob | File) => Promise<string>;
export declare const getDataURL: (file: Blob | File) => Promise<DataURL>;
export declare const isSupportedImageFileType: (type: string | null | undefined) => boolean;
export declare const isSupportedImageFile: (blob: Blob | null | undefined) => blob is Blob & {
    type: ValueOf<typeof IMAGE_MIME_TYPES>;
};
