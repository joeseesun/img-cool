import { default as React } from 'react';
import { PlaitBoard } from '@plait/core';
export type PopupStrokeButtonProps = {
    board: PlaitBoard;
    currentColor: string | undefined;
    title: string;
    hasStrokeStyle: boolean;
    children?: React.ReactNode;
};
export declare const PopupStrokeButton: React.FC<PopupStrokeButtonProps>;
