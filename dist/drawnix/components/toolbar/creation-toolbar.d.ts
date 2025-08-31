import { PlaitBoard } from '@plait/core';
import { DrawnixPointerType } from '../../hooks/use-drawnix';
export declare enum PopupKey {
    'shape' = "shape",
    'arrow' = "arrow",
    'freehand' = "freehand"
}
type AppToolButtonProps = {
    titleKey?: keyof typeof import('../../i18n').Translations;
    name?: string;
    icon: React.ReactNode;
    pointer?: DrawnixPointerType;
    key?: PopupKey | 'image' | 'extra-tools';
};
export declare const BUTTONS: AppToolButtonProps[];
export declare const isArrowLinePointer: (board: PlaitBoard) => boolean;
export declare const isShapePointer: (board: PlaitBoard) => boolean;
export declare const CreationToolbar: () => import("react/jsx-runtime").JSX.Element;
export {};
