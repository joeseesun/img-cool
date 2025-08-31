import { Tree } from 'nx/src/devkit-exports';
export type NameAndDirectoryFormat = 'as-provided' | 'derived';
export type ArtifactGenerationOptions = {
    artifactType: string;
    callingGenerator: string | null;
    name: string;
    directory?: string;
    disallowPathInNameForDerived?: boolean;
    fileExtension?: 'js' | 'jsx' | 'ts' | 'tsx' | 'vue';
    fileName?: string;
    flat?: boolean;
    nameAndDirectoryFormat?: NameAndDirectoryFormat;
    pascalCaseDirectory?: boolean;
    pascalCaseFile?: boolean;
    project?: string;
    suffix?: string;
    derivedDirectory?: string;
};
export type NameAndDirectoryOptions = {
    /**
     * Normalized artifact name.
     */
    artifactName: string;
    /**
     * Normalized directory path where the artifact will be generated.
     */
    directory: string;
    /**
     * Normalized file name of the artifact without the extension.
     */
    fileName: string;
    /**
     * Normalized full file path of the artifact.
     */
    filePath: string;
    /**
     * Project name where the artifact will be generated.
     */
    project: string;
};
export declare function determineArtifactNameAndDirectoryOptions(tree: Tree, options: ArtifactGenerationOptions): Promise<NameAndDirectoryOptions & {
    nameAndDirectoryFormat: NameAndDirectoryFormat;
}>;
export declare function getRelativeCwd(): string;
/**
 * Function for setting cwd during testing
 */
export declare function setCwd(path: string): void;
