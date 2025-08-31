import { ExecutorContext } from '@nx/devkit';
import { ViteDevServerExecutorOptions } from '../executors/dev-server/schema';
/**
 * Returns the path to the vite config file or undefined when not found.
 */
export declare function normalizeViteConfigFilePath(contextRoot: string, projectRoot: string, configFile?: string): string | undefined;
export declare function getProjectTsConfigPath(projectRoot: string): string | undefined;
/**
 * Returns the path to the proxy configuration file or undefined when not found.
 */
export declare function getViteServerProxyConfigPath(nxProxyConfig: string | undefined, context: ExecutorContext): string | undefined;
/**
 * Builds the options for the vite dev server.
 */
export declare function getViteServerOptions(options: ViteDevServerExecutorOptions, context: ExecutorContext): Promise<Record<string, unknown>>;
export declare function getProxyConfig(context: ExecutorContext, proxyConfig?: string): Record<string, string | unknown> | undefined;
export declare function getNxTargetOptions(target: string, context: ExecutorContext): any;
