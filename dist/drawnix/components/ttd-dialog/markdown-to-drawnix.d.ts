import { MindElement } from '@plait/mind';
export interface MarkdownToDrawnixLibProps {
    loaded: boolean;
    api: Promise<{
        parseMarkdownToDrawnix: (definition: string, mainTopic?: string) => MindElement;
    }>;
}
declare const MarkdownToDrawnix: () => import("react/jsx-runtime").JSX.Element;
export default MarkdownToDrawnix;
