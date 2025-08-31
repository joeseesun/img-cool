/// <reference types="react" />
type Props<T> = {
    value: T;
    shortcut?: string;
    choices: {
        value: T;
        label: React.ReactNode;
        ariaLabel?: string;
    }[];
    onChange: (value: T) => void;
    children: React.ReactNode;
    name: string;
};
declare const MenuItemContentRadio: {
    <T>({ value, shortcut, onChange, choices, children, name, }: Props<T>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default MenuItemContentRadio;
