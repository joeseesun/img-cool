import { ExecutorContext } from '@nx/devkit';
import { PublishExecutorSchema } from './schema';
export default function runExecutor(options: PublishExecutorSchema, context: ExecutorContext): Promise<{
    success: boolean;
}>;
