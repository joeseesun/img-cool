import { type TargetConfiguration, type Tree } from '@nx/devkit';
export declare function buildPostTargetTransformer(target: TargetConfiguration, tree: Tree, projectDetails: {
    projectName: string;
    root: string;
}, inferredTargetConfiguration: TargetConfiguration): TargetConfiguration<any>;
export declare function moveBuildLibsFromSourceToViteConfig(tree: Tree, configPath: string): void;
