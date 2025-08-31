import { ExecutorContext } from '@nx/devkit';
import { ViteDevServerExecutorOptions } from './schema';
export declare function viteDevServerExecutor(options: ViteDevServerExecutorOptions, context: ExecutorContext): AsyncGenerator<{
    success: boolean;
    baseUrl: string;
}>;
export default viteDevServerExecutor;
