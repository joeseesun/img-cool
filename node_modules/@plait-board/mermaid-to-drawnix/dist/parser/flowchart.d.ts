import { Position, SubGraph, Vertex } from "../interfaces.js";
import type { Diagram } from "mermaid/dist/Diagram.js";
export interface Flowchart {
    type: "flowchart";
    subGraphs: SubGraph[];
    vertices: {
        [key: string]: Vertex | undefined;
    };
    edges: Edge[];
}
export interface Edge {
    id?: string;
    start: string;
    end: string;
    type: string;
    text: string;
    labelType: string;
    stroke: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    reflectionPoints: Position[];
}
export declare const parseMermaidFlowChartDiagram: (diagram: Diagram, containerEl: Element) => Flowchart;
