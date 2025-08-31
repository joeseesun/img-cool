import * as React from 'react';
interface DialogOptions {
    initialOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare function useDialog({ initialOpen, open: controlledOpen, onOpenChange: setControlledOpen, }?: DialogOptions): {
    labelId: string | undefined;
    descriptionId: string | undefined;
    setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
    placement: import('@floating-ui/utils').Placement;
    strategy: import('@floating-ui/utils').Strategy;
    middlewareData: import('@floating-ui/core').MiddlewareData;
    x: number;
    y: number;
    isPositioned: boolean;
    update: () => void;
    floatingStyles: React.CSSProperties;
    refs: {
        reference: React.MutableRefObject<import('@floating-ui/react-dom').ReferenceType | null>;
        floating: React.MutableRefObject<HTMLElement | null>;
        setReference: (node: import('@floating-ui/react-dom').ReferenceType | null) => void;
        setFloating: (node: HTMLElement | null) => void;
    } & import('@floating-ui/react').ExtendedRefs<import('@floating-ui/react').ReferenceType>;
    elements: {
        reference: import('@floating-ui/react-dom').ReferenceType | null;
        floating: HTMLElement | null;
    } & import('@floating-ui/react').ExtendedElements<import('@floating-ui/react').ReferenceType>;
    context: {
        x: number;
        y: number;
        placement: import('@floating-ui/utils').Placement;
        strategy: import('@floating-ui/utils').Strategy;
        middlewareData: import('@floating-ui/core').MiddlewareData;
        isPositioned: boolean;
        update: () => void;
        floatingStyles: React.CSSProperties;
        open: boolean;
        onOpenChange: (open: boolean, event?: Event | undefined, reason?: import('@floating-ui/react').OpenChangeReason | undefined) => void;
        events: import('@floating-ui/react').FloatingEvents;
        dataRef: React.MutableRefObject<import('@floating-ui/react').ContextData>;
        nodeId: string | undefined;
        floatingId: string;
        refs: import('@floating-ui/react').ExtendedRefs<import('@floating-ui/react').ReferenceType>;
        elements: import('@floating-ui/react').ExtendedElements<import('@floating-ui/react').ReferenceType>;
    };
    getReferenceProps: (userProps?: React.HTMLProps<Element> | undefined) => Record<string, unknown>;
    getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    getItemProps: (userProps?: (Omit<React.HTMLProps<HTMLElement>, "active" | "selected"> & {
        active?: boolean | undefined;
        selected?: boolean | undefined;
    }) | undefined) => Record<string, unknown>;
    open: boolean;
    setOpen: (open: boolean) => void;
};
export declare const useDialogContext: () => {
    labelId: string | undefined;
    descriptionId: string | undefined;
    setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
    placement: import('@floating-ui/utils').Placement;
    strategy: import('@floating-ui/utils').Strategy;
    middlewareData: import('@floating-ui/core').MiddlewareData;
    x: number;
    y: number;
    isPositioned: boolean;
    update: () => void;
    floatingStyles: React.CSSProperties;
    refs: {
        reference: React.MutableRefObject<import('@floating-ui/react-dom').ReferenceType | null>;
        floating: React.MutableRefObject<HTMLElement | null>;
        setReference: (node: import('@floating-ui/react-dom').ReferenceType | null) => void;
        setFloating: (node: HTMLElement | null) => void;
    } & import('@floating-ui/react').ExtendedRefs<import('@floating-ui/react').ReferenceType>;
    elements: {
        reference: import('@floating-ui/react-dom').ReferenceType | null;
        floating: HTMLElement | null;
    } & import('@floating-ui/react').ExtendedElements<import('@floating-ui/react').ReferenceType>;
    context: {
        x: number;
        y: number;
        placement: import('@floating-ui/utils').Placement;
        strategy: import('@floating-ui/utils').Strategy;
        middlewareData: import('@floating-ui/core').MiddlewareData;
        isPositioned: boolean;
        update: () => void;
        floatingStyles: React.CSSProperties;
        open: boolean;
        onOpenChange: (open: boolean, event?: Event | undefined, reason?: import('@floating-ui/react').OpenChangeReason | undefined) => void;
        events: import('@floating-ui/react').FloatingEvents;
        dataRef: React.MutableRefObject<import('@floating-ui/react').ContextData>;
        nodeId: string | undefined;
        floatingId: string;
        refs: import('@floating-ui/react').ExtendedRefs<import('@floating-ui/react').ReferenceType>;
        elements: import('@floating-ui/react').ExtendedElements<import('@floating-ui/react').ReferenceType>;
    };
    getReferenceProps: (userProps?: React.HTMLProps<Element> | undefined) => Record<string, unknown>;
    getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    getItemProps: (userProps?: (Omit<React.HTMLProps<HTMLElement>, "active" | "selected"> & {
        active?: boolean | undefined;
        selected?: boolean | undefined;
    }) | undefined) => Record<string, unknown>;
    open: boolean;
    setOpen: (open: boolean) => void;
} & {
    setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export declare function Dialog({ children, ...options }: {
    children: React.ReactNode;
} & DialogOptions): import("react/jsx-runtime").JSX.Element;
interface DialogTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
}
export declare const DialogTrigger: React.ForwardRefExoticComponent<Omit<React.HTMLProps<HTMLElement> & DialogTriggerProps, "ref"> & React.RefAttributes<HTMLElement>>;
export declare const DialogContent: React.ForwardRefExoticComponent<Omit<React.HTMLProps<HTMLDivElement> & {
    container?: HTMLElement | null | undefined;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const DialogHeading: React.ForwardRefExoticComponent<Omit<React.HTMLProps<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const DialogDescription: React.ForwardRefExoticComponent<Omit<React.HTMLProps<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export declare const DialogClose: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
export {};
