import { Tree } from '@nx/devkit';
/**
 * Add a property to the jest config
 * @param host
 * @param path - path to the jest config file
 * @param propertyName - Property to update. Can be dot delimited or an array to access deeply nested properties
 * @param value
 * @param options - set `valueAsString` option to true if the `value` being passed represents a string of the code that should be associated with the `propertyName`
 */
export declare function addPropertyToJestConfig(host: Tree, path: string, propertyName: string | string[], value: unknown, options?: {
    valueAsString: boolean;
}): void;
/**
 * Remove a property value from the jest config
 * @param host
 * @param path
 * @param propertyName - Property to remove. Can be dot delimited or an array to access deeply nested properties
 */
export declare function removePropertyFromJestConfig(host: Tree, path: string, propertyName: string | string[]): void;
export declare function addImportStatementToJestConfig(host: Tree, path: string, importStatement: string): void;
