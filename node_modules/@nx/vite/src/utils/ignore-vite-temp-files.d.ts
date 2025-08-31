import { type Tree } from '@nx/devkit';
export declare function ignoreViteTempFiles(tree: Tree, projectRoot?: string | undefined): Promise<void>;
export declare function addViteTempFilesToGitIgnore(tree: Tree): void;
export declare function isEslintInstalled(tree: Tree): boolean;
