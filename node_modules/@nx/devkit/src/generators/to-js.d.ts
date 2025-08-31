import type { Tree } from 'nx/src/devkit-exports';
import type { ScriptTarget, ModuleKind } from 'typescript';
export type ToJSOptions = {
    target?: ScriptTarget;
    module?: ModuleKind;
    extension: '.js' | '.mjs' | '.cjs';
};
/**
 * Rename and transpile any new typescript files created to javascript files
 */
export declare function toJS(tree: Tree, options?: ToJSOptions): void;
