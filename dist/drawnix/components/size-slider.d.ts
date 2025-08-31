import { default as React } from 'react';
interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
    beforeStart?: () => void;
    afterEnd?: () => void;
}
export declare const SizeSlider: React.FC<SliderProps>;
export {};
