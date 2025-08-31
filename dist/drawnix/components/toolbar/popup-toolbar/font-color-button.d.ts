import { default as React, ReactNode } from 'react';
import { PlaitBoard } from '@plait/core';
export type PopupFontColorButtonProps = {
    board: PlaitBoard;
    currentColor: string | undefined;
    fontColorIcon: ReactNode;
    title: string;
};
export declare const PopupFontColorButton: React.FC<PopupFontColorButtonProps>;
