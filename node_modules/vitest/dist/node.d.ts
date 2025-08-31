import { x as ResolvedConfig, w as UserConfig, t as VitestRunMode, E as VitestOptions, V as Vitest, A as ApiConfig, F as TestProject, G as TestSequencer, H as TestSpecification, L as Logger, J as TestModule, M as ModuleDiagnostic } from './chunks/reporters.66aFHiyX.js';
export { B as BaseCoverageOptions, z as BenchmarkUserOptions, ae as BrowserBuiltinProvider, af as BrowserCommand, ag as BrowserCommandContext, o as BrowserConfigOptions, ah as BrowserInstanceOption, ai as BrowserOrchestrator, aj as BrowserProvider, ak as BrowserProviderInitializationOptions, al as BrowserProviderModule, am as BrowserProviderOptions, n as BrowserScript, an as BrowserServerState, ao as BrowserServerStateSession, p as BuiltinEnvironment, ap as CDPSession, s as CSSModuleScopeStrategy, k as CoverageIstanbulOptions, j as CoverageOptions, c as CoverageProvider, g as CoverageProviderModule, h as CoverageReporter, d as CoverageV8Options, l as CustomProviderOptions, D as DepsOptimizationOptions, _ as HTMLOptions, I as InlineConfig, a0 as JUnitOptions, $ as JsonOptions, O as OnServerRestartHandler, K as OnTestsRerunHandler, aq as ParentProjectBrowser, P as Pool, r as PoolOptions, Q as ProcessPool, ar as ProjectBrowser, y as ProjectConfig, a as ReportContext, ax as ReportedHookContext, m as Reporter, au as ResolveSnapshotPathHandler, av as ResolveSnapshotPathHandlerContext, as as ResolvedBrowserOptions, R as ResolvedCoverageOptions, at as ResolvedProjectConfig, Z as SerializedTestProject, a1 as TaskOptions, a2 as TestCase, a3 as TestCollection, a4 as TestDiagnostic, a5 as TestModuleState, a6 as TestResult, a7 as TestResultFailed, a8 as TestResultPassed, a9 as TestResultSkipped, ay as TestRunEndReason, aw as TestRunResult, ad as TestSequencerConstructor, aa as TestState, ab as TestSuite, ac as TestSuiteState, u as TransformModePatterns, v as TypecheckConfig, U as UserWorkspaceConfig, q as VitestEnvironment, N as VitestPackageInstaller, X as WorkspaceSpec, Y as getFilePoolName } from './chunks/reporters.66aFHiyX.js';
import { UserConfig as UserConfig$1, Plugin, ResolvedConfig as ResolvedConfig$1, LogLevel, LoggerOptions, Logger as Logger$1, createServer as createServer$1 } from 'vite';
import * as vite from 'vite';
export { vite as Vite };
export { esbuildVersion, isFileServingAllowed, parseAst, parseAstAsync, rollupVersion, version as viteVersion } from 'vite';
import { IncomingMessage } from 'node:http';
import { R as RuntimeRPC } from './chunks/worker.BmVno_ab.js';
import { Writable } from 'node:stream';
export { W as WorkerContext } from './chunks/worker.BT4v-DKx.js';
export { C as TypeCheckCollectLineNumbers, a as TypeCheckCollectLines, c as TypeCheckContext, T as TypeCheckErrorInfo, R as TypeCheckRawErrorsMap, b as TypeCheckRootAndTarget } from './chunks/global.CnI8_G5V.js';
import { Debugger } from 'debug';
export { Task as RunnerTask, TaskResult as RunnerTaskResult, TaskResultPack as RunnerTaskResultPack, Test as RunnerTestCase, File as RunnerTestFile, Suite as RunnerTestSuite, SequenceHooks, SequenceSetupFiles } from '@vitest/runner';
export { f as EnvironmentOptions, H as HappyDOMOptions, J as JSDOMOptions } from './chunks/environment.d8YfPkTm.js';
export { SerializedError } from '@vitest/utils';
export { b as RuntimeConfig } from './chunks/config.BCv-fVdT.js';
import './chunks/vite.BCQa3xFG.js';
export { generateFileHash } from '@vitest/runner/utils';
import '@vitest/utils/source-map';
import '@vitest/pretty-format';
import '@vitest/snapshot';
import '@vitest/utils/diff';
import 'vite-node';
import 'chai';
import './chunks/benchmark.CFFwLv-O.js';
import 'tinybench';
import '@vitest/snapshot/manager';
import 'node:fs';
import 'node:worker_threads';
import '@vitest/expect';
import '@vitest/snapshot/environment';

declare function isValidApiRequest(config: ResolvedConfig, req: IncomingMessage): boolean;

interface CliOptions extends UserConfig {
    /**
     * Override the watch mode
     */
    run?: boolean;
    /**
     * Removes colors from the console output
     */
    color?: boolean;
    /**
     * Output collected tests as JSON or to a file
     */
    json?: string | boolean;
    /**
     * Output collected test files only
     */
    filesOnly?: boolean;
}
/**
 * Start Vitest programmatically
 *
 * Returns a Vitest instance if initialized successfully.
 */
declare function startVitest(mode: VitestRunMode, cliFilters?: string[], options?: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;

interface CliParseOptions {
    allowUnknownOptions?: boolean;
}
declare function parseCLI(argv: string | string[], config?: CliParseOptions): {
    filter: string[];
    options: CliOptions;
};

declare function resolveApiServerConfig<Options extends ApiConfig & UserConfig>(options: Options, defaultPort: number): ApiConfig | undefined;

declare function createVitest(mode: VitestRunMode, options: UserConfig, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;

declare class FilesNotFoundError extends Error {
    code: string;
    constructor(mode: 'test' | 'benchmark');
}
declare class GitNotFoundError extends Error {
    code: string;
    constructor();
}

/** @deprecated use `TestProject` instead */
type GlobalSetupContext = TestProject;

declare function VitestPlugin(options?: UserConfig, ctx?: Vitest): Promise<Plugin[]>;

declare function resolveConfig(options?: UserConfig, viteOverrides?: UserConfig$1): Promise<{
    vitestConfig: ResolvedConfig;
    viteConfig: ResolvedConfig$1;
}>;

declare function resolveFsAllow(projectRoot: string, rootConfigFile: string | false | undefined): string[];

interface MethodsOptions {
    cacheFs?: boolean;
    collect?: boolean;
}
declare function createMethodsRPC(project: TestProject, options?: MethodsOptions): RuntimeRPC;

declare class BaseSequencer implements TestSequencer {
    protected ctx: Vitest;
    constructor(ctx: Vitest);
    shard(files: TestSpecification[]): Promise<TestSpecification[]>;
    sort(files: TestSpecification[]): Promise<TestSpecification[]>;
}

declare function registerConsoleShortcuts(ctx: Vitest, stdin: NodeJS.ReadStream | undefined, stdout: NodeJS.WriteStream | Writable): () => void;

declare function createViteLogger(console: Logger, level?: LogLevel, options?: LoggerOptions): Logger$1;

declare const rootDir: string;
declare const distDir: string;

declare function createDebugger(namespace: `vitest:${string}`): Debugger | undefined;

declare const version: string;

/** @deprecated use `createViteServer` instead */
declare const createServer: typeof createServer$1;
declare const createViteServer: typeof createServer$1;

/**
 * @deprecated Use `TestModule` instead
 */
declare const TestFile: typeof TestModule;

/**
 * @deprecated Use `ModuleDiagnostic` instead
 */
type FileDiagnostic = ModuleDiagnostic;

export { ApiConfig, BaseSequencer, type CliParseOptions, type FileDiagnostic, GitNotFoundError, type GlobalSetupContext, ModuleDiagnostic, ResolvedConfig, TestFile, TestModule, TestProject, TestSequencer, TestSpecification, FilesNotFoundError as TestsNotFoundError, UserConfig, Vitest, VitestOptions, VitestPlugin, VitestRunMode, TestProject as WorkspaceProject, createDebugger, createMethodsRPC, createServer, createViteLogger, createViteServer, createVitest, distDir, isValidApiRequest, parseCLI, registerConsoleShortcuts, resolveApiServerConfig, resolveConfig, resolveFsAllow, rootDir, startVitest, version };
