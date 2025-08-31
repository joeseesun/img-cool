import { MermaidConfig } from "mermaid";
import { GraphImage } from "./interfaces.js";
import { Flowchart } from "./parser/flowchart.js";
import { Sequence } from "./parser/sequence.js";
import { Class } from "./parser/class.js";
export declare const parseMermaid: (definition: string, config?: MermaidConfig) => Promise<Flowchart | GraphImage | Sequence | Class>;
