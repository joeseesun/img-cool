"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeMessage = exports.isPluginWorkerResult = exports.isPluginWorkerMessage = void 0;
function isPluginWorkerMessage(message) {
    return (typeof message === 'object' &&
        'type' in message &&
        typeof message.type === 'string' &&
        [
            'load',
            'createNodes',
            'createDependencies',
            'processProjectGraph',
        ].includes(message.type));
}
exports.isPluginWorkerMessage = isPluginWorkerMessage;
function isPluginWorkerResult(message) {
    return (typeof message === 'object' &&
        'type' in message &&
        typeof message.type === 'string' &&
        [
            'load-result',
            'createNodesResult',
            'createDependenciesResult',
            'processProjectGraphResult',
        ].includes(message.type));
}
exports.isPluginWorkerResult = isPluginWorkerResult;
// Takes a message and a map of handlers and calls the appropriate handler
// type safe and requires all handlers to be handled
async function consumeMessage(raw, handlers) {
    const message = raw;
    const handler = handlers[message.type];
    if (handler) {
        const response = await handler(message.payload);
        if (response) {
            process.send(response);
        }
    }
}
exports.consumeMessage = consumeMessage;
