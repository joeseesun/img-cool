/**
 * match testing file based on their name file
 */
export declare const TEST_FILE_PATTERN: RegExp;
/**
 * Match right hand side of `export default` or `module.exports` = statements
 */
export declare const TS_QUERY_JEST_CONFIG_PREFIX = ":matches(ExportAssignment, BinaryExpression:has(Identifier[name=\"module\"]):has(Identifier[name=\"exports\"]))";
export declare function addTransformerToConfig(configContents: string, transformer: string): string;
