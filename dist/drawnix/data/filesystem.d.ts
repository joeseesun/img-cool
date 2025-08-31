import { FileSystemHandle, supported as nativeFileSystemSupported } from 'browser-fs-access';
import { MIME_TYPES } from '../constants';
type FILE_EXTENSION = Exclude<keyof typeof MIME_TYPES, 'binary'>;
export declare const fileOpen: <M extends boolean | undefined = false>(opts: {
    extensions?: FILE_EXTENSION[];
    description: string;
    multiple?: M;
}) => Promise<M extends false | undefined ? File : File[]>;
export declare const fileSave: (blob: Blob | Promise<Blob>, opts: {
    /** supply without the extension */
    name: string;
    /** file extension */
    extension: FILE_EXTENSION;
    description: string;
    /** existing FileSystemHandle */
    fileHandle?: FileSystemHandle | null;
}) => Promise<FileSystemFileHandle | null>;
export type { FileSystemHandle };
export { nativeFileSystemSupported };
