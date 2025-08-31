export default function useHistoryTravel<T>(initialValue?: T, maxLength?: number): {
    value: T | undefined;
    backLength: number;
    forwardLength: number;
    setValue: (val: T) => void;
    go: (step: number) => void;
    back: () => void;
    forward: () => void;
    reset: (...params: any[]) => void;
};
