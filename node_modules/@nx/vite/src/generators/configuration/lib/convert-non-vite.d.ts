import { TargetConfiguration, Tree } from '@nx/devkit';
import { ViteConfigurationGeneratorSchema } from '../schema';
export declare function convertNonVite(tree: Tree, schema: ViteConfigurationGeneratorSchema, projectRoot: string, _projectType: string, targets: {
    [targetName: string]: TargetConfiguration<any>;
}): Promise<void>;
