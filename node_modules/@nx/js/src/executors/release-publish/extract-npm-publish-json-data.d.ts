export declare function extractNpmPublishJsonData(str: string): {
    beforeJsonData: string;
    jsonData: Record<string, unknown> | null;
    afterJsonData: string;
};
