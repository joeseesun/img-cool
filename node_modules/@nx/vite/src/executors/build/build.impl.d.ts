import { ExecutorContext } from '@nx/devkit';
import { ViteBuildExecutorOptions } from './schema';
export declare function viteBuildExecutor(options: Record<string, any> & ViteBuildExecutorOptions, context: ExecutorContext): AsyncGenerator<{
    success: boolean;
    outfile?: string;
}, any, any>;
export declare function getBuildExtraArgs(options: ViteBuildExecutorOptions): Promise<{
    buildOptions: Record<string, unknown>;
    otherOptions: Record<string, any>;
}>;
export default viteBuildExecutor;
