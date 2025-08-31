import { PlaitBoard, Point } from '@plait/core';
import { DataURL } from '../types';
export declare const loadHTMLImageElement: (dataURL: DataURL) => Promise<HTMLImageElement>;
export declare const buildImage: (image: HTMLImageElement, dataURL: DataURL, maxWidth: number) => {
    url: DataURL;
    width: number;
    height: number;
};
export declare const insertImage: (board: PlaitBoard, imageFile: File, startPoint?: Point, isDrop?: boolean) => Promise<void>;
