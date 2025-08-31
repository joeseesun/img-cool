export declare enum ProjectType {
    Application = "application",
    Library = "library"
}
export declare function projectRootDir(projectType: ProjectType): "apps" | "libs";
