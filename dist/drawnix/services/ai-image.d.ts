export interface AIImageResponse {
    success: boolean;
    imageUrl?: string;
    error?: string;
}
export interface AIImageRequest {
    images: string[];
    prompt: string;
}
export declare function processImagesWithAI(images: string[], prompt: string): Promise<AIImageResponse>;
