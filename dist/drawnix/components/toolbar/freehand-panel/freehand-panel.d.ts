import { default as React } from 'react';
import { DrawnixPointerType } from '../../../hooks/use-drawnix';
export interface FreehandProps {
    titleKey: string;
    icon: React.ReactNode;
    pointer: DrawnixPointerType;
}
export declare const FREEHANDS: FreehandProps[];
export type FreehandPickerProps = {
    onPointerUp: (pointer: DrawnixPointerType) => void;
};
export declare const FreehandPanel: React.FC<FreehandPickerProps>;
