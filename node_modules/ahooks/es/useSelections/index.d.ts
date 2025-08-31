import type { Key } from 'react';
export interface Options<T> {
    defaultSelected?: T[];
    itemKey?: string | ((item: T) => Key);
}
export default function useSelections<T>(items: T[], options?: T[] | Options<T>): {
    readonly selected: T[];
    readonly noneSelected: boolean;
    readonly allSelected: boolean;
    readonly partiallySelected: boolean;
    readonly setSelected: import("react").Dispatch<import("react").SetStateAction<T[]>>;
    readonly isSelected: (item: T) => boolean;
    readonly select: (item: T) => void;
    readonly unSelect: (item: T) => void;
    readonly toggle: (item: T) => void;
    readonly selectAll: () => void;
    readonly unSelectAll: () => void;
    readonly clearAll: () => void;
    readonly toggleAll: () => void;
};
