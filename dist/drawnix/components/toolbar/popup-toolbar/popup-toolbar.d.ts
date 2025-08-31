import { PlaitBoard, PlaitElement } from '@plait/core';
import { MindElement } from '@plait/mind';
import { PlaitDrawElement } from '@plait/draw';
import { CustomText } from '@plait/common';
export declare const PopupToolbar: () => import("react/jsx-runtime").JSX.Element;
export declare const getMindElementState: (board: PlaitBoard, element: MindElement) => {
    fill: string | undefined;
    strokeColor: any;
    marks: Omit<CustomText, "text">;
};
export declare const getDrawElementState: (board: PlaitBoard, element: PlaitDrawElement) => {
    fill: any;
    strokeColor: any;
    marks: Omit<CustomText, "text">;
    source: any;
    target: any;
};
export declare const getElementState: (board: PlaitBoard) => {
    fill: string | undefined;
    strokeColor: any;
    marks: Omit<CustomText, "text">;
} | {
    fill: any;
    strokeColor: any;
    marks: Omit<CustomText, "text">;
    source: any;
    target: any;
};
export declare const hasFillProperty: (board: PlaitBoard, element: PlaitElement) => boolean;
export declare const hasStrokeProperty: (board: PlaitBoard, element: PlaitElement) => boolean;
export declare const hasStrokeStyleProperty: (board: PlaitBoard, element: PlaitElement) => boolean;
export declare const hasTextProperty: (board: PlaitBoard, element: PlaitElement) => boolean;
export declare const getColorPropertyValue: (color: string) => string | null;
