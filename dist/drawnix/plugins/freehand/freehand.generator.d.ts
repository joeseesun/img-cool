import { Generator } from '@plait/common';
import { Freehand } from './type';
export declare class FreehandGenerator extends Generator<Freehand> {
    protected draw(element: Freehand): SVGGElement | undefined;
    canDraw(element: Freehand): boolean;
}
