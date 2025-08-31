declare const useLocalStorageState: <T>(key: string, options?: import("../createUseStorageState").Options<T>) => readonly [T | undefined, (value?: import("../createUseStorageState").SetState<T>) => void];
export default useLocalStorageState;
