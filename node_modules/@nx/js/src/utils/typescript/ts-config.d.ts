import { Tree } from '@nx/devkit';
import * as ts from 'typescript';
export declare function readTsConfig(tsConfigPath: string): ts.ParsedCommandLine;
export declare function getRootTsConfigPathInTree(tree: Tree): string | null;
export declare function getRelativePathToRootTsConfig(tree: Tree, targetPath: string): string;
export declare function getRootTsConfigPath(): string | null;
export declare function getRootTsConfigFileName(tree?: Tree): string | null;
export declare function addTsConfigPath(tree: Tree, importPath: string, lookupPaths: string[]): void;
export declare function readTsConfigPaths(tsConfig?: string | ts.ParsedCommandLine): ts.MapLike<string[]>;
