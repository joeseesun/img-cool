/// <reference types="react" />
import { Element } from 'slate';
import { Key } from 'slate-dom';
import { RenderChunkProps } from './editable';
import { ChunkTree as TChunkTree } from '../chunking';
declare const ChunkTree: (props: {
    root: TChunkTree;
    ancestor: TChunkTree;
    renderElement: (node: Element, index: number, key: Key) => JSX.Element;
    renderChunk?: ((props: RenderChunkProps) => JSX.Element) | undefined;
}) => JSX.Element[];
export default ChunkTree;
//# sourceMappingURL=chunk-tree.d.ts.map