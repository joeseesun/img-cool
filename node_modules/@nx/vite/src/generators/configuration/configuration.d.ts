import { GeneratorCallback, Tree } from '@nx/devkit';
import { ViteConfigurationGeneratorSchema } from './schema';
export declare function viteConfigurationGenerator(host: Tree, schema: ViteConfigurationGeneratorSchema): Promise<GeneratorCallback>;
export declare function viteConfigurationGeneratorInternal(tree: Tree, schema: ViteConfigurationGeneratorSchema): Promise<GeneratorCallback>;
export default viteConfigurationGenerator;
