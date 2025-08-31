import { ExecutorContext } from '@nx/devkit';
import { VitePreviewServerExecutorOptions } from './schema';
export declare function vitePreviewServerExecutor(options: VitePreviewServerExecutorOptions, context: ExecutorContext): AsyncGenerator<{
    success: boolean;
    baseUrl: any;
}, void, unknown>;
export default vitePreviewServerExecutor;
