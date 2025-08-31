import { GeneratorCallback, Tree } from '@nx/devkit';
export declare const WORKSPACE_RULES_PROJECT_NAME = "eslint-rules";
export declare const WORKSPACE_PLUGIN_DIR = "tools/eslint-rules";
export interface LintWorkspaceRulesProjectGeneratorOptions {
    skipFormat?: boolean;
    addPlugin?: boolean;
}
export declare function lintWorkspaceRulesProjectGenerator(tree: Tree, options?: LintWorkspaceRulesProjectGeneratorOptions): Promise<GeneratorCallback>;
