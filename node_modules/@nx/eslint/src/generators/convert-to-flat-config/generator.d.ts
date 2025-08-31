import { GeneratorCallback, Tree } from '@nx/devkit';
import { ConvertToFlatConfigGeneratorSchema } from './schema';
export declare function convertToFlatConfigGenerator(tree: Tree, options: ConvertToFlatConfigGeneratorSchema): Promise<void | GeneratorCallback>;
export default convertToFlatConfigGenerator;
