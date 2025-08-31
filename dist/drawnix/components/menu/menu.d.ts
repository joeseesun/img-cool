import { default as React } from 'react';
declare const Menu: {
    ({ children, className, onSelect, style, }: {
        children?: React.ReactNode;
        className?: string;
        /**
         * Called when any menu item is selected (clicked on).
         */
        onSelect?: (event: Event) => void;
        style?: React.CSSProperties;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default Menu;
