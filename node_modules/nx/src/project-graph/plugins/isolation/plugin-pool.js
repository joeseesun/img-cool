"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRemoteNxPlugin = void 0;
const child_process_1 = require("child_process");
const path = require("path");
// TODO (@AgentEnder): After scoped verbose logging is implemented, re-add verbose logs here.
// import { logger } from '../../utils/logger';
const internal_api_1 = require("../internal-api");
const messaging_1 = require("./messaging");
const cleanupFunctions = new Set();
const pluginNames = new Map();
function loadRemoteNxPlugin(plugin, root) {
    // this should only really be true when running unit tests within
    // the Nx repo. We still need to start the worker in this case,
    // but its typescript.
    const isWorkerTypescript = path.extname(__filename) === '.ts';
    const workerPath = path.join(__dirname, 'plugin-worker');
    const env = {
        ...process.env,
        ...(isWorkerTypescript
            ? {
                // Ensures that the worker uses the same tsconfig as the main process
                TS_NODE_PROJECT: path.join(__dirname, '../../../../tsconfig.lib.json'),
            }
            : {}),
    };
    const worker = (0, child_process_1.fork)(workerPath, [], {
        stdio: ['ignore', 'inherit', 'inherit', 'ipc'],
        env,
        execArgv: [
            ...process.execArgv,
            // If the worker is typescript, we need to register ts-node
            ...(isWorkerTypescript ? ['-r', 'ts-node/register'] : []),
        ],
    });
    worker.send({ type: 'load', payload: { plugin, root } });
    // logger.verbose(`[plugin-worker] started worker: ${worker.pid}`);
    const pendingPromises = new Map();
    const exitHandler = createWorkerExitHandler(worker, pendingPromises);
    const cleanupFunction = () => {
        worker.off('exit', exitHandler);
        shutdownPluginWorker(worker);
    };
    cleanupFunctions.add(cleanupFunction);
    return new Promise((res, rej) => {
        worker.on('message', createWorkerHandler(worker, pendingPromises, res, rej));
        worker.on('exit', exitHandler);
    });
}
exports.loadRemoteNxPlugin = loadRemoteNxPlugin;
function shutdownPluginWorker(worker) {
    // Clears the plugin cache so no refs to the workers are held
    internal_api_1.nxPluginCache.clear();
    // logger.verbose(`[plugin-pool] starting worker shutdown`);
    worker.kill('SIGINT');
}
/**
 * Creates a message handler for the given worker.
 * @param worker Instance of plugin-worker
 * @param pending Set of pending promises
 * @param onload Resolver for RemotePlugin promise
 * @param onloadError Rejecter for RemotePlugin promise
 * @returns Function to handle messages from the worker
 */
function createWorkerHandler(worker, pending, onload, onloadError) {
    let pluginName;
    return function (message) {
        if (!(0, messaging_1.isPluginWorkerResult)(message)) {
            return;
        }
        return (0, messaging_1.consumeMessage)(message, {
            'load-result': (result) => {
                if (result.success) {
                    const { name, createNodesPattern, include, exclude } = result;
                    pluginName = name;
                    pluginNames.set(worker, pluginName);
                    onload({
                        name,
                        include,
                        exclude,
                        createNodes: createNodesPattern
                            ? [
                                createNodesPattern,
                                (configFiles, ctx) => {
                                    const tx = pluginName + ':createNodes:' + performance.now();
                                    return registerPendingPromise(tx, pending, () => {
                                        worker.send({
                                            type: 'createNodes',
                                            payload: { configFiles, context: ctx, tx },
                                        });
                                    });
                                },
                            ]
                            : undefined,
                        createDependencies: result.hasCreateDependencies
                            ? (ctx) => {
                                const tx = pluginName + ':createDependencies:' + performance.now();
                                return registerPendingPromise(tx, pending, () => {
                                    worker.send({
                                        type: 'createDependencies',
                                        payload: { context: ctx, tx },
                                    });
                                });
                            }
                            : undefined,
                        processProjectGraph: result.hasProcessProjectGraph
                            ? (graph, ctx) => {
                                const tx = pluginName + ':processProjectGraph:' + performance.now();
                                return registerPendingPromise(tx, pending, () => {
                                    worker.send({
                                        type: 'processProjectGraph',
                                        payload: { graph, ctx, tx },
                                    });
                                });
                            }
                            : undefined,
                        createMetadata: result.hasCreateMetadata
                            ? (graph, ctx) => {
                                const tx = pluginName + ':createMetadata:' + performance.now();
                                return registerPendingPromise(tx, pending, () => {
                                    worker.send({
                                        type: 'createMetadata',
                                        payload: { graph, context: ctx, tx },
                                    });
                                });
                            }
                            : undefined,
                    });
                }
                else if (result.success === false) {
                    onloadError(result.error);
                }
            },
            createDependenciesResult: ({ tx, ...result }) => {
                const { resolver, rejector } = pending.get(tx);
                if (result.success) {
                    resolver(result.dependencies);
                }
                else if (result.success === false) {
                    rejector(result.error);
                }
            },
            createNodesResult: ({ tx, ...result }) => {
                const { resolver, rejector } = pending.get(tx);
                if (result.success) {
                    resolver(result.result);
                }
                else if (result.success === false) {
                    rejector(result.error);
                }
            },
            processProjectGraphResult: ({ tx, ...result }) => {
                const { resolver, rejector } = pending.get(tx);
                if (result.success) {
                    resolver(result.graph);
                }
                else if (result.success === false) {
                    rejector(result.error);
                }
            },
            createMetadataResult: ({ tx, ...result }) => {
                const { resolver, rejector } = pending.get(tx);
                if (result.success) {
                    resolver(result.metadata);
                }
                else if (result.success === false) {
                    rejector(result.error);
                }
            },
        });
    };
}
function createWorkerExitHandler(worker, pendingPromises) {
    return () => {
        for (const [_, pendingPromise] of pendingPromises) {
            pendingPromise.rejector(new Error(`Plugin worker ${pluginNames.get(worker) ?? worker.pid} exited unexpectedly with code ${worker.exitCode}`));
        }
    };
}
process.on('exit', () => {
    for (const fn of cleanupFunctions) {
        fn();
    }
});
function registerPendingPromise(tx, pending, callback) {
    let resolver, rejector;
    const promise = new Promise((res, rej) => {
        resolver = res;
        rejector = rej;
        callback();
    }).finally(() => {
        pending.delete(tx);
    });
    pending.set(tx, {
        promise,
        resolver,
        rejector,
    });
    return promise;
}
