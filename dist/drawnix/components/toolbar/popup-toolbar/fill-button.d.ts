import { default as React } from 'react';
import { PlaitBoard } from '@plait/core';
export type PopupFillButtonProps = {
    board: PlaitBoard;
    currentColor: string | undefined;
    title: string;
    children?: React.ReactNode;
};
export declare const PopupFillButton: React.FC<PopupFillButtonProps>;
