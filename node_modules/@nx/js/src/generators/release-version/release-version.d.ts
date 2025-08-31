import { Tree } from '@nx/devkit';
import { ReleaseVersionGeneratorResult } from 'nx/src/command-line/release/version';
import { ReleaseVersionGeneratorSchema } from './schema';
export declare function releaseVersionGenerator(tree: Tree, options: ReleaseVersionGeneratorSchema): Promise<ReleaseVersionGeneratorResult>;
export default releaseVersionGenerator;
