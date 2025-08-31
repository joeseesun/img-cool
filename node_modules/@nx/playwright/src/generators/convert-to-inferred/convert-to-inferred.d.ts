import { type Tree } from '@nx/devkit';
interface Schema {
    project?: string;
    all?: boolean;
    skipFormat?: boolean;
}
export declare function convertToInferred(tree: Tree, options: Schema): Promise<void>;
export default convertToInferred;
