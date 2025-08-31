import { PlaitBoard } from '@plait/core';
import { default as React } from 'react';
export type PlaitBoardProps = {
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    afterInit?: (board: PlaitBoard) => void;
};
export declare const Board: React.FC<PlaitBoardProps>;
