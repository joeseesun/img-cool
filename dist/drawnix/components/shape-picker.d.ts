import { default as React } from 'react';
import { DrawPointerType } from '@plait/draw';
export interface ShapeProps {
    icon: React.ReactNode;
    title: string;
    pointer: DrawPointerType;
}
export type ShapePickerProps = {
    onPointerUp: (pointer: DrawPointerType) => void;
};
export declare const ShapePicker: React.FC<ShapePickerProps>;
