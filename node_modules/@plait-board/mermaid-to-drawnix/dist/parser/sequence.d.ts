import { Arrow, Container, Line, Node, Text } from "../elementSkeleton.js";
import type { Diagram } from "mermaid/dist/Diagram.js";
type Loop = {
    lines: Line[];
    texts: Text[];
    nodes: Container[];
};
type Group = {
    name: string;
    actorKeys: Array<string>;
    fill: string;
};
export interface Sequence {
    type: "sequence";
    nodes: Array<Node[]>;
    lines: Line[];
    arrows: Arrow[];
    loops: Loop | undefined;
    groups: Group[];
}
export declare const parseMermaidSequenceDiagram: (diagram: Diagram, containerEl: Element) => Sequence;
export {};
