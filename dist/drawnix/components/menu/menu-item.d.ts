import { default as React } from 'react';
declare const MenuItem: {
    ({ icon, onSelect, children, shortcut, className, selected, submenu, ...rest }: {
        icon?: React.ReactNode;
        onSelect: (event: Event) => void;
        children: React.ReactNode;
        shortcut?: string;
        selected?: boolean;
        className?: string;
        submenu?: React.ReactNode;
    } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
    Badge: {
        ({ children, }: {
            children: React.ReactNode;
        }): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
};
export declare const DropDownMenuItemBadge: {
    ({ children, }: {
        children: React.ReactNode;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default MenuItem;
