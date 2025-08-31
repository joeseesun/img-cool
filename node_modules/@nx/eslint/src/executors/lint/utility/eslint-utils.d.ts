import type { ESLint } from 'eslint';
import type { Schema } from '../schema';
export declare function resolveAndInstantiateESLint(eslintConfigPath: string | undefined, options: Schema, useFlatConfig?: boolean): Promise<{
    ESLint: typeof import("eslint").ESLint;
    eslint: ESLint;
}>;
