import { default as React } from 'react';
import { ArrowLineHandle } from '@plait/draw';
export type ArrowMarkerPickerProps = {
    end: 'source' | 'target';
    property: ArrowLineHandle;
};
export declare const ArrowMarkerPicker: React.FC<ArrowMarkerPickerProps>;
