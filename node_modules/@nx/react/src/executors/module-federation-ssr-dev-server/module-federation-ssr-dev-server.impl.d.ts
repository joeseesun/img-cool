import { ExecutorContext } from '@nx/devkit';
import { WebSsrDevServerOptions } from '@nx/webpack/src/executors/ssr-dev-server/schema';
type ModuleFederationDevServerOptions = WebSsrDevServerOptions & {
    devRemotes?: string | string[];
    skipRemotes?: string[];
    host: string;
};
export default function moduleFederationSsrDevServer(options: ModuleFederationDevServerOptions, context: ExecutorContext): AsyncGenerator<any, any, undefined>;
export {};
