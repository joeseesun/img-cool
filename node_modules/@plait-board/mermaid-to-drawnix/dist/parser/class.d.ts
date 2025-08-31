import { Arrow, Line, Node, Text } from "../elementSkeleton.js";
import type { Diagram } from "mermaid/dist/Diagram.js";
import type { NamespaceNode } from "mermaid/dist/diagrams/class/classTypes.js";
export interface Class {
    type: "class";
    nodes: Array<Node[]>;
    lines: Line[];
    arrows: Arrow[];
    text: Text[];
    namespaces: NamespaceNode[];
}
export declare const parseMermaidClassDiagram: (diagram: Diagram, containerEl: Element) => Class;
