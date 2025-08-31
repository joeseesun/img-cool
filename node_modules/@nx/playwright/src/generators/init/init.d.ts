import { GeneratorCallback, Tree } from '@nx/devkit';
import { InitGeneratorSchema } from './schema';
export declare function initGenerator(tree: Tree, options: InitGeneratorSchema): Promise<GeneratorCallback>;
export declare function initGeneratorInternal(tree: Tree, options: InitGeneratorSchema): Promise<GeneratorCallback>;
export default initGenerator;
