"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportForType = exports.getDefaultsForComponent = exports.getArgsDefaultValue = void 0;
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
const ast_utils_1 = require("./ast-utils");
let tsModule;
// TODO: candidate to refactor with the angular component story
function getArgsDefaultValue(property) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const typeNameToDefault = {
        [tsModule.SyntaxKind.StringKeyword]: "''",
        [tsModule.SyntaxKind.NumberKeyword]: 0,
        [tsModule.SyntaxKind.BooleanKeyword]: false,
    };
    const resolvedValue = typeNameToDefault[property];
    if (typeof resolvedValue === undefined) {
        return "''";
    }
    else {
        return resolvedValue;
    }
}
exports.getArgsDefaultValue = getArgsDefaultValue;
function getDefaultsForComponent(sourceFile, cmpDeclaration) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const propsInterface = (0, ast_utils_1.getComponentPropsInterface)(sourceFile, cmpDeclaration);
    let propsTypeName = null;
    let props = [];
    let argTypes = [];
    if (propsInterface) {
        propsTypeName = propsInterface.name.text;
        props = propsInterface.members.map((member) => {
            if (member.type.kind === tsModule.SyntaxKind.FunctionType) {
                argTypes.push({
                    name: member.name.text,
                    type: 'action',
                    actionText: `${member.name.text} executed!`,
                });
            }
            else {
                return {
                    name: member.name.text,
                    defaultValue: getArgsDefaultValue(member.type.kind),
                };
            }
        });
        props = props.filter((p) => p && p.defaultValue !== undefined);
    }
    return { propsTypeName, props, argTypes };
}
exports.getDefaultsForComponent = getDefaultsForComponent;
function getImportForType(sourceFile, typeName) {
    return sourceFile.statements.find((statement) => tsModule.isImportDeclaration(statement) &&
        statement.getText().includes(typeName));
}
exports.getImportForType = getImportForType;
