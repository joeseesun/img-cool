import { PlaitBoard, PlaitElement } from '@plait/core';
export declare const isClosedElement: (board: PlaitBoard, element: PlaitElement) => boolean;
export declare const getCurrentFill: (board: PlaitBoard, element: PlaitElement) => string;
export declare const getCurrentStrokeColor: (board: PlaitBoard, element: PlaitElement) => string;
export declare const getCurrentFontColor: (board: PlaitBoard, element: PlaitElement) => string | undefined;
