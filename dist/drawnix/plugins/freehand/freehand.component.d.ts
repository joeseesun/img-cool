import { PlaitBoard, PlaitPluginElementContext, OnContextChanged } from '@plait/core';
import { ActiveGenerator, CommonElementFlavour } from '@plait/common';
import { Freehand } from './type';
import { FreehandGenerator } from './freehand.generator';
export declare class FreehandComponent extends CommonElementFlavour<Freehand, PlaitBoard> implements OnContextChanged<Freehand, PlaitBoard> {
    constructor();
    activeGenerator: ActiveGenerator<Freehand>;
    generator: FreehandGenerator;
    initializeGenerator(): void;
    initialize(): void;
    onContextChanged(value: PlaitPluginElementContext<Freehand, PlaitBoard>, previous: PlaitPluginElementContext<Freehand, PlaitBoard>): void;
    destroy(): void;
}
