import { PlaitElement, Viewport, PlaitPlugin, PlaitBoardOptions, Selection, ThemeColorMode, PlaitTheme } from '@plait/core';
import { BoardChangeData } from './plugins/board';
import { default as React } from 'react';
export type WrapperProps = {
    value: PlaitElement[];
    children: React.ReactNode;
    options: PlaitBoardOptions;
    plugins: PlaitPlugin[];
    viewport?: Viewport;
    theme?: PlaitTheme;
    onChange?: (data: BoardChangeData) => void;
    onSelectionChange?: (selection: Selection | null) => void;
    onValueChange?: (value: PlaitElement[]) => void;
    onViewportChange?: (value: Viewport) => void;
    onThemeChange?: (value: ThemeColorMode) => void;
};
export declare const Wrapper: React.FC<WrapperProps>;
