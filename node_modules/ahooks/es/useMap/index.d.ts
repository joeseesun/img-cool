declare function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>): readonly [Map<K, T>, {
    readonly set: (key: K, entry: T) => void;
    readonly setAll: (newMap: Iterable<readonly [K, T]>) => void;
    readonly remove: (key: K) => void;
    readonly reset: () => void;
    readonly get: (key: K) => T | undefined;
}];
export default useMap;
