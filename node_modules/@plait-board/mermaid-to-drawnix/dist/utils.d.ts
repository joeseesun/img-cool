import { Position } from "./interfaces.js";
export declare const entityCodesToText: (input: string) => string;
export declare const getTransformAttr: (el: Element) => {
    transformX: number;
    transformY: number;
};
export declare const encodeEntities: (text: string) => string;
export declare const decodeEntities: (text: string) => string;
interface EdgePositionData {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    reflectionPoints: Position[];
}
export declare const computeEdgePositions: (pathElement: SVGPathElement, offset?: Position) => EdgePositionData;
export {};
