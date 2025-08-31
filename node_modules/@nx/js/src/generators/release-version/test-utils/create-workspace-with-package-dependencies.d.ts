import { ProjectGraph, Tree } from '@nx/devkit';
interface ProjectAndPackageData {
    [projectName: string]: {
        projectRoot: string;
        packageName: string;
        version: string;
        packageJsonPath: string;
        localDependencies: {
            projectName: string;
            dependencyCollection: 'dependencies' | 'devDependencies' | 'optionalDependencies';
            version: string;
        }[];
    };
}
export declare function createWorkspaceWithPackageDependencies(tree: Tree, projectAndPackageData: ProjectAndPackageData): ProjectGraph;
export {};
