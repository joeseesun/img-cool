import { ReactNode } from 'react';
interface TTDDialogPanelProps {
    label: string;
    children: ReactNode;
    panelAction?: {
        label: string;
        action: () => void;
        icon?: ReactNode;
    };
    panelActionDisabled?: boolean;
    onTextSubmitInProgress?: boolean;
    renderTopRight?: () => ReactNode;
    renderSubmitShortcut?: () => ReactNode;
    renderBottomRight?: () => ReactNode;
}
export declare const TTDDialogPanel: ({ label, children, panelAction, panelActionDisabled, onTextSubmitInProgress, renderTopRight, renderSubmitShortcut, renderBottomRight, }: TTDDialogPanelProps) => import("react/jsx-runtime").JSX.Element;
export {};
