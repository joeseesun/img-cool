import { default as React } from 'react';
export declare const MenuContentPropsContext: React.Context<{
    onSelect?: ((event: Event) => void) | undefined;
}>;
export declare const getMenuItemClassName: (className?: string, active?: boolean) => string;
export declare const useHandleMenuItemClick: (origOnClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> | undefined, onSelect: ((event: Event) => void) | undefined) => (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => void;
