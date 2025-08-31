import { type Tree } from '@nx/devkit';
export declare function toProjectRelativePath(path: string, projectRoot: string): string;
export declare function getViteConfigPath(tree: Tree, root: string): string;
export declare function addConfigValuesToViteConfig(tree: Tree, configFile: string, configValues: Record<string, Record<string, unknown>>): void;
