import type * as ts from 'typescript';
import { StringChange } from '@nx/devkit';
export declare function addImport(source: ts.SourceFile, statement: string): StringChange[];
export declare function findMainRenderStatement(source: ts.SourceFile): ts.CallExpression | null;
export declare function findDefaultExport(source: ts.SourceFile): ts.VariableDeclaration | ts.FunctionDeclaration | ts.ClassDeclaration | null;
export declare function findDefaultExportDeclaration(source: ts.SourceFile): ts.VariableDeclaration | ts.FunctionDeclaration | ts.ClassDeclaration | null;
export declare function findExportDeclarationsForJsx(source: ts.SourceFile): Array<ts.VariableDeclaration | ts.FunctionDeclaration | ts.ClassDeclaration> | null;
export declare function findDefaultExportIdentifier(source: ts.SourceFile): ts.Identifier | null;
export declare function findDefaultClassOrFunction(source: ts.SourceFile | null): ts.FunctionDeclaration | ts.ClassDeclaration | null;
export declare function findComponentImportPath(componentName: string, source: ts.SourceFile): string;
export declare function findElements(source: ts.SourceFile, tagName: string): ts.Node[];
export declare function findClosestOpening(tagName: string, node: ts.Node): ts.Node;
export declare function isTag(tagName: string, node: ts.Node): boolean;
export declare function addInitialRoutes(sourcePath: string, source: ts.SourceFile): StringChange[];
export declare function addRoute(sourcePath: string, source: ts.SourceFile, options: {
    routePath: string;
    componentName: string;
    moduleName: string;
}): StringChange[];
export declare function addBrowserRouter(sourcePath: string, source: ts.SourceFile): StringChange[];
export declare function addStaticRouter(sourcePath: string, source: ts.SourceFile): StringChange[];
export declare function addReduxStoreToMain(sourcePath: string, source: ts.SourceFile): StringChange[];
export declare function updateReduxStore(sourcePath: string, source: ts.SourceFile, feature: {
    keyName: string;
    reducerName: string;
    modulePath: string;
}): StringChange[];
export declare function getComponentNode(sourceFile: ts.SourceFile): ts.Node | null;
export declare function getComponentPropsInterface(sourceFile: ts.SourceFile, cmpDeclaration: ts.Node): ts.InterfaceDeclaration | null;
