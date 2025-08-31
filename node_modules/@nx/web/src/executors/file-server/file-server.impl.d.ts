import { ExecutorContext } from '@nx/devkit';
import { Schema } from './schema';
export default function fileServerExecutor(options: Schema, context: ExecutorContext): AsyncGenerator<{
    success: boolean;
    baseUrl: string;
}, {
    success: boolean;
}, unknown>;
