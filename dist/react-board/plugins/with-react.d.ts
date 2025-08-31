import { PlaitTextBoard } from '@plait/common';
import { PlaitBoard } from '@plait/core';
import { ReactBoard } from './board';
export declare const withReact: (board: PlaitBoard & PlaitTextBoard) => PlaitBoard & PlaitTextBoard & ReactBoard;
