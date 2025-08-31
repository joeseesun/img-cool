import { BaseEditor } from 'slate';
import { DOMEditor } from './dom-editor';
/**
 * `withDOM` adds DOM specific behaviors to the editor.
 *
 * If you are using TypeScript, you must extend Slate's CustomTypes to use
 * this plugin.
 *
 * See https://docs.slatejs.org/concepts/11-typescript to learn how.
 */
export declare const withDOM: <T extends BaseEditor>(editor: T, clipboardFormatKey?: string) => T & DOMEditor;
//# sourceMappingURL=with-dom.d.ts.map