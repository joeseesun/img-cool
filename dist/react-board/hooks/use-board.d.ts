import { ListRender, PlaitBoard } from '@plait/core';
export interface BoardContextValue {
    v: number;
    board: PlaitBoard;
    listRender: ListRender;
}
export declare const BoardContext: import('react').Context<{
    v: number;
    board: PlaitBoard;
    listRender: ListRender;
} | null>;
export declare const useBoard: () => PlaitBoard;
export declare const useListRender: () => ListRender;
