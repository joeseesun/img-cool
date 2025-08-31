import { default as React } from 'react';
import { ArrowLineShape, DrawPointerType } from '@plait/draw';
export interface ArrowProps {
    icon: React.ReactNode;
    title: string;
    pointer: ArrowLineShape;
}
export type ArrowPickerProps = {
    onPointerUp: (pointer: DrawPointerType) => void;
};
export declare const ArrowPicker: React.FC<ArrowPickerProps>;
