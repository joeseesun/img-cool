import { Point } from '@plait/core';
import { PlaitCustomGeometry } from '@plait/draw';
export declare const FreehandThemeColors: {
    default: {
        strokeColor: string;
        fill: string;
    };
    colorful: {
        strokeColor: string;
        fill: string;
    };
    soft: {
        strokeColor: string;
        fill: string;
    };
    retro: {
        strokeColor: string;
        fill: string;
    };
    dark: {
        strokeColor: string;
        fill: string;
    };
    starry: {
        strokeColor: string;
        fill: string;
    };
};
export declare enum FreehandShape {
    eraser = "eraser",
    nibPen = "nibPen",
    feltTipPen = "feltTipPen",
    artisticBrush = "artisticBrush",
    markerHighlight = "markerHighlight"
}
export declare const FREEHAND_TYPE = "freehand";
export type Freehand = PlaitCustomGeometry<typeof FREEHAND_TYPE, Point[], FreehandShape>;
export declare const Freehand: {
    isFreehand: (value: any) => value is Freehand;
};
