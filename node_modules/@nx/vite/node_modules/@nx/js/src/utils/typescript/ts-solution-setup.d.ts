import { type Tree } from '@nx/devkit';
export declare function isUsingTypeScriptPlugin(tree: Tree): boolean;
export declare function isUsingTsSolutionSetup(tree?: Tree): boolean;
export declare function assertNotUsingTsSolutionSetup(tree: Tree, pluginName: string, generatorName: string): void;
export declare function findRuntimeTsConfigName(projectRoot: string, tree?: Tree): string | null;
export declare function updateTsconfigFiles(tree: Tree, projectRoot: string, runtimeTsconfigFileName: string, compilerOptions: Record<string, string | boolean | string[]>, exclude?: string[], rootDir?: string): void;
export declare function addProjectToTsSolutionWorkspace(tree: Tree, projectDir: string): Promise<void>;
export declare function getProjectType(tree: Tree, projectRoot: string, projectType?: 'library' | 'application'): 'library' | 'application';
export declare function getProjectSourceRoot(tree: Tree, projectSourceRoot: string | undefined, projectRoot: string): string | undefined;
