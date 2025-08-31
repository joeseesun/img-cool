import { GeneratorCallback, Tree } from '@nx/devkit';
import { InitGeneratorSchema } from './schema';
export declare function updateNxJsonSettings(tree: Tree): void;
export declare function initGenerator(tree: Tree, schema: InitGeneratorSchema): Promise<GeneratorCallback>;
export declare function initGeneratorInternal(tree: Tree, schema: InitGeneratorSchema): Promise<GeneratorCallback>;
export default initGenerator;
