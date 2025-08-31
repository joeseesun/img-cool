import { default as React } from 'react';
import { PlaitBoard } from '@plait/core';
import { ArrowLineHandle } from '@plait/draw';
export type ArrowMarkButtonProps = {
    board: PlaitBoard;
    endProperty?: ArrowLineHandle;
    children?: React.ReactNode;
    end: 'source' | 'target';
};
export declare const ArrowMarkButton: React.FC<ArrowMarkButtonProps>;
