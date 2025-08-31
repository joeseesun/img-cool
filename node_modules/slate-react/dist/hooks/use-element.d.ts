/// <reference types="react" />
import { Element } from 'slate';
export declare const ElementContext: import("react").Context<import("slate").BaseElement | null>;
/**
 * Get the current element.
 */
export declare const useElement: () => Element;
/**
 * Get the current element, or return null if not inside `renderElement`.
 */
export declare const useElementIf: () => import("slate").BaseElement | null;
//# sourceMappingURL=use-element.d.ts.map