import { type TargetConfiguration, type Tree } from '@nx/devkit';
export declare function testPostTargetTransformer(target: TargetConfiguration, tree: Tree, projectDetails: {
    projectName: string;
    root: string;
}, inferredTargetConfiguration: TargetConfiguration): TargetConfiguration<any>;
