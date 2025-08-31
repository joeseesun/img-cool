import { ExecutorContext } from '@nx/devkit';
import { VitestExecutorOptions } from './schema';
export declare function vitestExecutor(options: VitestExecutorOptions, context: ExecutorContext): AsyncGenerator<never, {
    success: boolean;
}, unknown>;
export default vitestExecutor;
