interface ImageViewerOptions {
    zoomStep?: number;
    minZoom?: number;
    maxZoom?: number;
    enableKeyboard?: boolean;
}
export declare class ImageViewer {
    private options;
    private overlay;
    private imageContainer;
    private image;
    private closeButton;
    private controlsContainer;
    private delegationHandler;
    private dragHandler;
    private mouseUpHandler;
    private animationFrameId;
    private pendingUpdate;
    private state;
    constructor(options?: ImageViewerOptions);
    open(src: string, alt?: string): void;
    close(): void;
    private createOverlay;
    private createCloseButton;
    private createControls;
    private createImage;
    private bindDragEvents;
    private cleanupDragEvents;
    private bindEvents;
    private zoomIn;
    private zoomOut;
    private resetState;
    private updateImageTransform;
    private styleElement;
    private addStyles;
    private removeStyles;
    destroy(): void;
}
export {};
