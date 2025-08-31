import { Tree } from '@nx/devkit';
export declare function addStyledModuleDependencies(host: Tree, options: {
    styledModule?: string;
    compiler?: 'babel' | 'swc';
}): import("@nx/devkit").GeneratorCallback;
