"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHandleGlobMessage = exports.GLOB = void 0;
exports.GLOB = 'GLOB';
function isHandleGlobMessage(message) {
    return (typeof message === 'object' &&
        message !== null &&
        'type' in message &&
        message['type'] === exports.GLOB);
}
exports.isHandleGlobMessage = isHandleGlobMessage;
