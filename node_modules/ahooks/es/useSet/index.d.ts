declare function useSet<K>(initialValue?: Iterable<K>): readonly [Set<K>, {
    readonly add: (key: K) => void;
    readonly remove: (key: K) => void;
    readonly reset: () => void;
}];
export default useSet;
