export interface Options {
    min?: number;
    max?: number;
}
export interface Actions {
    inc: (delta?: number) => void;
    dec: (delta?: number) => void;
    set: (value: number | ((c: number) => number)) => void;
    reset: () => void;
}
export type ValueParam = number | ((c: number) => number);
declare function useCounter(initialValue?: number, options?: Options): readonly [number, {
    readonly inc: (delta?: number) => void;
    readonly dec: (delta?: number) => void;
    readonly set: (value: ValueParam) => void;
    readonly reset: () => void;
}];
export default useCounter;
