import { Path } from '../interfaces/path';
import { Editor } from '../interfaces/editor';
/**
 * update editor dirty paths
 *
 * @param newDirtyPaths: Path[]; new dirty paths
 * @param transform: (p: Path) => Path | null; how to transform existing dirty paths
 */
export declare function updateDirtyPaths(editor: Editor, newDirtyPaths: Path[], transform?: (p: Path) => Path | null): void;
//# sourceMappingURL=update-dirty-paths.d.ts.map