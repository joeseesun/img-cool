"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_1 = require("./messaging");
const loader_1 = require("../loader");
const serializable_error_1 = require("../../../utils/serializable-error");
if (process.env.NX_PERF_LOGGING === 'true') {
    require('../../../utils/perf-logging');
}
global.NX_GRAPH_CREATION = true;
let plugin;
process.on('message', async (message) => {
    if (!(0, messaging_1.isPluginWorkerMessage)(message)) {
        return;
    }
    return (0, messaging_1.consumeMessage)(message, {
        load: async ({ plugin: pluginConfiguration, root }) => {
            process.chdir(root);
            try {
                const [promise] = (0, loader_1.loadNxPlugin)(pluginConfiguration, root);
                plugin = await promise;
                return {
                    type: 'load-result',
                    payload: {
                        name: plugin.name,
                        include: plugin.include,
                        exclude: plugin.exclude,
                        createNodesPattern: plugin.createNodes?.[0],
                        hasCreateDependencies: 'createDependencies' in plugin && !!plugin.createDependencies,
                        hasProcessProjectGraph: 'processProjectGraph' in plugin && !!plugin.processProjectGraph,
                        hasCreateMetadata: 'createMetadata' in plugin && !!plugin.createMetadata,
                        success: true,
                    },
                };
            }
            catch (e) {
                return {
                    type: 'load-result',
                    payload: {
                        success: false,
                        error: (0, serializable_error_1.createSerializableError)(e),
                    },
                };
            }
        },
        createNodes: async ({ configFiles, context, tx }) => {
            try {
                const result = await plugin.createNodes[1](configFiles, context);
                return {
                    type: 'createNodesResult',
                    payload: { result, success: true, tx },
                };
            }
            catch (e) {
                return {
                    type: 'createNodesResult',
                    payload: {
                        success: false,
                        error: (0, serializable_error_1.createSerializableError)(e),
                        tx,
                    },
                };
            }
        },
        createDependencies: async ({ context, tx }) => {
            try {
                const result = await plugin.createDependencies(context);
                return {
                    type: 'createDependenciesResult',
                    payload: { dependencies: result, success: true, tx },
                };
            }
            catch (e) {
                return {
                    type: 'createDependenciesResult',
                    payload: {
                        success: false,
                        error: (0, serializable_error_1.createSerializableError)(e),
                        tx,
                    },
                };
            }
        },
        processProjectGraph: async ({ graph, ctx, tx }) => {
            try {
                const result = await plugin.processProjectGraph(graph, ctx);
                return {
                    type: 'processProjectGraphResult',
                    payload: { graph: result, success: true, tx },
                };
            }
            catch (e) {
                return {
                    type: 'processProjectGraphResult',
                    payload: {
                        success: false,
                        error: (0, serializable_error_1.createSerializableError)(e),
                        tx,
                    },
                };
            }
        },
        createMetadata: async ({ graph, context, tx }) => {
            try {
                const result = await plugin.createMetadata(graph, context);
                return {
                    type: 'createMetadataResult',
                    payload: { metadata: result, success: true, tx },
                };
            }
            catch (e) {
                return {
                    type: 'createMetadataResult',
                    payload: { success: false, error: e.stack, tx },
                };
            }
        },
    });
});
