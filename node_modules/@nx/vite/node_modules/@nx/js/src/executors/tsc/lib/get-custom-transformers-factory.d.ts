import * as ts from 'typescript';
import type { TransformerEntry } from '../../../utils/typescript/types';
export declare function getCustomTrasformersFactory(transformers: TransformerEntry[]): (program: ts.Program) => ts.CustomTransformers;
