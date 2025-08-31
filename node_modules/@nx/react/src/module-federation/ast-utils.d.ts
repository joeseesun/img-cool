import type * as ts from 'typescript';
import { StringChange } from '@nx/devkit';
export declare function addRemoteToConfig(source: ts.SourceFile, app: string): StringChange[];
export declare function addRemoteDefinition(source: ts.SourceFile, app: string): StringChange[];
export declare function addRemoteRoute(source: ts.SourceFile, names: {
    fileName: string;
    className: string;
}): StringChange[];
