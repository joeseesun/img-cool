import type { GeneratorCallback, Tree } from '@nx/devkit';
import { NormalizedSchema } from '../../application/schema';
import type { Schema } from '../schema';
export declare function setupSsrForRemote(tree: Tree, options: NormalizedSchema<Schema>, appName: string): Promise<GeneratorCallback>;
