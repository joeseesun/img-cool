import { ProjectType, Tree } from 'nx/src/devkit-exports';
export type ProjectNameAndRootFormat = 'as-provided' | 'derived';
export type ProjectGenerationOptions = {
    name: string;
    projectType: ProjectType;
    callingGenerator: string | null;
    directory?: string;
    importPath?: string;
    projectNameAndRootFormat?: ProjectNameAndRootFormat;
    rootProject?: boolean;
};
export type ProjectNameAndRootOptions = {
    /**
     * Normalized full project name, including scope if name was provided with
     * scope (e.g., `@scope/name`, only available when `projectNameAndRootFormat`
     * is `as-provided`).
     */
    projectName: string;
    /**
     * Normalized project root, including the layout directory if configured.
     */
    projectRoot: string;
    names: {
        /**
         * Normalized project name without scope. It's meant to be used when
         * generating file names that contain the project name.
         */
        projectFileName: string;
        /**
         * Normalized project name without scope or directory. It's meant to be used
         * when generating shorter file names that contain the project name.
         */
        projectSimpleName: string;
    };
    /**
     * Normalized import path for the project.
     */
    importPath?: string;
};
export declare function determineProjectNameAndRootOptions(tree: Tree, options: ProjectGenerationOptions): Promise<ProjectNameAndRootOptions & {
    projectNameAndRootFormat: ProjectNameAndRootFormat;
}>;
/**
 * Function for setting cwd during testing
 */
export declare function setCwd(path: string): void;
