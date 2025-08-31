import { CSSProperties, default as React } from 'react';
import { EventPointerType } from '../types';
export type ToolButtonSize = 'small' | 'medium';
type ToolButtonBaseProps = {
    icon?: React.ReactNode;
    'aria-label': string;
    'aria-keyshortcuts'?: string;
    'data-testid'?: string;
    label?: string;
    title?: string;
    name?: string;
    id?: string;
    size?: ToolButtonSize;
    keyBindingLabel?: string | null;
    showAriaLabel?: boolean;
    hidden?: boolean;
    visible?: boolean;
    selected?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    onPointerDown?(data: {
        pointerType: EventPointerType;
        event: React.PointerEvent<HTMLElement>;
    }): void;
    onPointerUp?(data: {
        pointerType: EventPointerType;
    }): void;
};
type ToolButtonProps = (ToolButtonBaseProps & {
    type: 'button';
    children?: React.ReactNode;
    onClick?(event: React.MouseEvent): void;
}) | (ToolButtonBaseProps & {
    type: 'submit';
    children?: React.ReactNode;
    onClick?(event: React.MouseEvent): void;
}) | (ToolButtonBaseProps & {
    type: 'icon';
    children?: React.ReactNode;
    onClick?(): void;
}) | (ToolButtonBaseProps & {
    type: 'radio';
    checked: boolean;
    onChange?(data: {
        pointerType: EventPointerType | null;
    }): void;
});
export declare const ToolButton: React.ForwardRefExoticComponent<ToolButtonProps & React.RefAttributes<unknown>>;
export {};
