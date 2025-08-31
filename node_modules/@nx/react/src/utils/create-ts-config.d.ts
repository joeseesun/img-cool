import { Tree } from 'nx/src/generators/tree';
export declare function createTsConfig(host: Tree, projectRoot: string, type: 'app' | 'lib', options: {
    strict?: boolean;
    style?: string;
    bundler?: string;
    rootProject?: boolean;
    unitTestRunner?: string;
}, relativePathToRootTsConfig: string): void;
export declare function extractTsConfigBase(host: Tree): void;
