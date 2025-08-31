export declare function waitForPortOpen(port: number, options?: {
    host?: string;
    retries?: number;
    retryDelay?: number;
}): Promise<void>;
