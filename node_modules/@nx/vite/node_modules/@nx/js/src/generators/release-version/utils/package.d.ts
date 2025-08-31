import { PackageJson } from 'nx/src/utils/package-json';
export declare class Package {
    private packageJson;
    name: string;
    version: string;
    location: string;
    constructor(packageJson: PackageJson, workspaceRoot: string, workspaceRelativeLocation: string);
    getLocalDependency(depName: string): {
        collection: 'dependencies' | 'devDependencies' | 'optionalDependencies';
        spec: string;
    } | null;
}
