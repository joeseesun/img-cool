import { Tree } from '@nx/devkit';
export interface Schema {
    name: string;
    ci: 'github' | 'azure' | 'circleci' | 'bitbucket-pipelines' | 'gitlab';
}
export declare function ciWorkflowGenerator(tree: Tree, schema: Schema): Promise<void>;
