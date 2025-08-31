import { Tree } from '@nx/devkit';
import { TargetFlags } from './generator-utils';
export declare function ensureViteConfigIsCorrect(tree: Tree, path: string, buildConfigString: string, buildConfigObject: {}, imports: string[], plugins: string[], testConfigString: string, testConfigObject: {}, cacheDir: string, projectAlreadyHasViteTargets?: TargetFlags): boolean;
