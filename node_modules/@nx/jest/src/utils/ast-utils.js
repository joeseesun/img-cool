"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTransformerToConfig = exports.TS_QUERY_JEST_CONFIG_PREFIX = exports.TEST_FILE_PATTERN = void 0;
const tsquery_1 = require("@phenomnomnominal/tsquery");
/**
 * match testing file based on their name file
 */
exports.TEST_FILE_PATTERN = new RegExp('.*(spec|test).[jt]sx?$');
/**
 * Match right hand side of `export default` or `module.exports` = statements
 */
exports.TS_QUERY_JEST_CONFIG_PREFIX = ':matches(ExportAssignment, BinaryExpression:has(Identifier[name="module"]):has(Identifier[name="exports"]))';
function addTransformerToConfig(configContents, transformer) {
    // TODO make sure there isn't an existing matching transformer regex
    const transformerConfig = tsquery_1.tsquery.query(configContents, `${exports.TS_QUERY_JEST_CONFIG_PREFIX} > ObjectLiteralExpression PropertyAssignment:has(Identifier[name="transform"])`);
    if (transformerConfig.length === 0) {
        return tsquery_1.tsquery.replace(configContents, `${exports.TS_QUERY_JEST_CONFIG_PREFIX} > ObjectLiteralExpression`, (node) => {
            return `{
${node.properties.map((p) => p.getText()).join(',\n')},
transform: { ${transformer} }
}`;
        });
    }
    return tsquery_1.tsquery.replace(configContents, `${exports.TS_QUERY_JEST_CONFIG_PREFIX} > ObjectLiteralExpression PropertyAssignment:has(Identifier[name="transform"])`, (node) => {
        const transformObject = node.initializer;
        const transformProperties = transformObject.properties
            .map((p) => p.getText())
            .join(',\n');
        return `transform: { ${transformer}, ${transformProperties} }`;
    });
}
exports.addTransformerToConfig = addTransformerToConfig;
