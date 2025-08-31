import { UserConfig as UserConfig$1, ConfigEnv } from 'vite';
export { ConfigEnv, Plugin, UserConfig as ViteUserConfig, mergeConfig } from 'vite';
import { d as CoverageV8Options, R as ResolvedCoverageOptions, U as UserWorkspaceConfig, e as UserProjectConfigFn, f as UserProjectConfigExport, T as TestProjectConfiguration } from './chunks/reporters.66aFHiyX.js';
export { W as WorkspaceProjectConfiguration } from './chunks/reporters.66aFHiyX.js';
import './chunks/vite.BCQa3xFG.js';
import { F as FakeTimerInstallOpts } from './chunks/config.BCv-fVdT.js';
import '@vitest/runner';
import './chunks/environment.d8YfPkTm.js';
import '@vitest/utils';
import 'node:stream';
import '@vitest/utils/source-map';
import '@vitest/pretty-format';
import '@vitest/snapshot';
import '@vitest/utils/diff';
import 'vite-node';
import 'chai';
import './chunks/benchmark.CFFwLv-O.js';
import '@vitest/runner/utils';
import 'tinybench';
import '@vitest/snapshot/manager';
import 'node:fs';
import '@vitest/snapshot/environment';

declare const defaultBrowserPort = 63315;
declare const extraInlineDeps: RegExp[];

declare const defaultInclude: string[];
declare const defaultExclude: string[];
declare const coverageConfigDefaults: ResolvedCoverageOptions;
declare const configDefaults: Readonly<{
    allowOnly: boolean;
    isolate: boolean;
    watch: boolean;
    globals: boolean;
    environment: 'node';
    pool: 'forks';
    clearMocks: boolean;
    restoreMocks: boolean;
    mockReset: boolean;
    unstubGlobals: boolean;
    unstubEnvs: boolean;
    include: string[];
    exclude: string[];
    teardownTimeout: number;
    forceRerunTriggers: string[];
    update: boolean;
    reporters: never[];
    silent: boolean;
    hideSkippedTests: boolean;
    api: boolean;
    ui: boolean;
    uiBase: string;
    open: boolean;
    css: {
        include: never[];
    };
    coverage: CoverageV8Options;
    fakeTimers: FakeTimerInstallOpts;
    maxConcurrency: number;
    dangerouslyIgnoreUnhandledErrors: boolean;
    typecheck: {
        checker: 'tsc';
        include: string[];
        exclude: string[];
    };
    slowTestThreshold: number;
    disableConsoleIntercept: boolean;
}>;

/**
 * @deprecated Use `ViteUserConfig` instead
 */
type UserConfig = UserConfig$1;

type UserConfigFnObject = (env: ConfigEnv) => UserConfig$1;
type UserConfigFnPromise = (env: ConfigEnv) => Promise<UserConfig$1>;
type UserConfigFn = (env: ConfigEnv) => UserConfig$1 | Promise<UserConfig$1>;
type UserConfigExport = UserConfig$1 | Promise<UserConfig$1> | UserConfigFnObject | UserConfigFnPromise | UserConfigFn;
declare function defineConfig(config: UserConfig$1): UserConfig$1;
declare function defineConfig(config: Promise<UserConfig$1>): Promise<UserConfig$1>;
declare function defineConfig(config: UserConfigFnObject): UserConfigFnObject;
declare function defineConfig(config: UserConfigExport): UserConfigExport;
declare function defineProject(config: UserWorkspaceConfig): UserWorkspaceConfig;
declare function defineProject(config: Promise<UserWorkspaceConfig>): Promise<UserWorkspaceConfig>;
declare function defineProject(config: UserProjectConfigFn): UserProjectConfigFn;
declare function defineProject(config: UserProjectConfigExport): UserProjectConfigExport;
declare function defineWorkspace(config: TestProjectConfiguration[]): TestProjectConfiguration[];

export { TestProjectConfiguration, type UserConfig, type UserConfigExport, type UserConfigFn, type UserConfigFnObject, type UserConfigFnPromise, UserProjectConfigExport, UserProjectConfigFn, UserWorkspaceConfig, configDefaults, coverageConfigDefaults, defaultBrowserPort, defaultExclude, defaultInclude, defineConfig, defineProject, defineWorkspace, extraInlineDeps };
