import { ProjectGraph, ProjectGraphDependency, ProjectGraphProjectNode, Tree } from '@nx/devkit';
export interface LocalPackageDependency extends ProjectGraphDependency {
    /**
     * The rawVersionSpec contains the value of the version spec as it was defined in the package.json
     * of the dependent project. This can be useful in cases where the version spec is a range, path or
     * workspace reference, and it needs to be be reverted to that original value as part of the release.
     */
    rawVersionSpec: string;
    dependencyCollection: 'dependencies' | 'devDependencies' | 'optionalDependencies';
}
export declare function resolveLocalPackageDependencies(tree: Tree, projectGraph: ProjectGraph, filteredProjects: ProjectGraphProjectNode[], projectNameToPackageRootMap: Map<string, string>, resolvePackageRoot: (projectNode: ProjectGraphProjectNode) => string, includeAll?: boolean): Record<string, LocalPackageDependency[]>;
