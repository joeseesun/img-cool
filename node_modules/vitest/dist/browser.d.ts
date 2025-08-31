import { b as CoverageModuleLoader, c as CoverageProvider } from './chunks/reporters.66aFHiyX.js';
import { S as SerializedCoverageConfig, a as SerializedConfig } from './chunks/config.BCv-fVdT.js';
import { SerializedDiffOptions } from '@vitest/utils/diff';
import { VitestExecutor } from './execute.js';
export { collectTests, processError, startTests } from '@vitest/runner';
import * as spy from '@vitest/spy';
export { spy as SpyModule };
import './chunks/environment.d8YfPkTm.js';
import '@vitest/utils';
import 'node:stream';
import 'vite';
import '@vitest/utils/source-map';
import '@vitest/pretty-format';
import '@vitest/snapshot';
import 'vite-node';
import 'chai';
import './chunks/benchmark.CFFwLv-O.js';
import '@vitest/runner/utils';
import 'tinybench';
import '@vitest/snapshot/manager';
import 'node:fs';
import '@vitest/snapshot/environment';
import 'vite-node/client';
import './chunks/worker.BmVno_ab.js';
import 'node:vm';
import '@vitest/mocker';
import './chunks/mocker.cRtM890J.js';

declare function getCoverageProvider(options: SerializedCoverageConfig | undefined, loader: CoverageModuleLoader): Promise<CoverageProvider | null>;
declare function startCoverageInsideWorker(options: SerializedCoverageConfig | undefined, loader: CoverageModuleLoader, runtimeOptions: {
    isolate: boolean;
}): Promise<unknown>;
declare function takeCoverageInsideWorker(options: SerializedCoverageConfig | undefined, loader: CoverageModuleLoader): Promise<unknown>;
declare function stopCoverageInsideWorker(options: SerializedCoverageConfig | undefined, loader: CoverageModuleLoader, runtimeOptions: {
    isolate: boolean;
}): Promise<unknown>;

declare function setupCommonEnv(config: SerializedConfig): Promise<void>;
declare function loadDiffConfig(config: SerializedConfig, executor: VitestExecutor): Promise<SerializedDiffOptions | undefined>;
declare function loadSnapshotSerializers(config: SerializedConfig, executor: VitestExecutor): Promise<void>;

export { getCoverageProvider, loadDiffConfig, loadSnapshotSerializers, setupCommonEnv, startCoverageInsideWorker, stopCoverageInsideWorker, takeCoverageInsideWorker };
