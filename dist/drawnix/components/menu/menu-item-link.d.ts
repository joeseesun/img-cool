import { default as React } from 'react';
declare const MenuItemLink: {
    ({ icon, shortcut, href, children, onSelect, className, selected, ...rest }: {
        href: string;
        icon?: React.ReactNode;
        children: React.ReactNode;
        shortcut?: string;
        className?: string;
        selected?: boolean;
        onSelect?: (event: Event) => void;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default MenuItemLink;
