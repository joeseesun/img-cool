import { default as React } from 'react';
export type ColorPickerProps = {
    onColorChange: (color: string) => void;
    onOpacityChange: (opacity: number) => void;
    currentColor?: string;
};
export declare const ColorPicker: React.ForwardRefExoticComponent<ColorPickerProps & React.RefAttributes<unknown>>;
