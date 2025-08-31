type noop = (this: any, ...args: any[]) => any;
declare function useMemoizedFn<T extends noop>(fn: T): T;
export default useMemoizedFn;
