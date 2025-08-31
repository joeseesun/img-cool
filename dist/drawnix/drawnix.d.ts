import { BoardChangeData } from '../../react-board/src/index.ts';
import { PlaitBoard, PlaitElement, PlaitTheme, Selection, ThemeColorMode, Viewport } from '@plait/core';
import { default as React } from 'react';
export type DrawnixProps = {
    value: PlaitElement[];
    viewport?: Viewport;
    theme?: PlaitTheme;
    onChange?: (value: BoardChangeData) => void;
    onSelectionChange?: (selection: Selection | null) => void;
    onValueChange?: (value: PlaitElement[]) => void;
    onViewportChange?: (value: Viewport) => void;
    onThemeChange?: (value: ThemeColorMode) => void;
    afterInit?: (board: PlaitBoard) => void;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const Drawnix: React.FC<DrawnixProps>;
