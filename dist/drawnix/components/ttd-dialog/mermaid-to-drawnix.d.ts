import { MermaidConfig } from '@plait-board/mermaid-to-drawnix/dist';
import { MermaidToDrawnixResult } from '@plait-board/mermaid-to-drawnix/dist/interfaces';
export interface MermaidToDrawnixLibProps {
    loaded: boolean;
    api: Promise<{
        parseMermaidToDrawnix: (definition: string, config?: MermaidConfig) => Promise<MermaidToDrawnixResult>;
    }>;
}
declare const MermaidToDrawnix: () => import("react/jsx-runtime").JSX.Element;
export default MermaidToDrawnix;
