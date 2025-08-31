import type { GeneratorCallback, Tree } from '@nx/devkit';
import type { Schema } from '../schema';
export declare function setupSsrForHost(tree: Tree, options: Schema, appName: string, defaultRemoteManifest: {
    name: string;
    port: number;
}[]): Promise<GeneratorCallback>;
