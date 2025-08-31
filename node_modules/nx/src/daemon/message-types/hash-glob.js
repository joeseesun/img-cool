"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHandleHashGlobMessage = exports.HASH_GLOB = void 0;
exports.HASH_GLOB = 'HASH_GLOB';
function isHandleHashGlobMessage(message) {
    return (typeof message === 'object' &&
        message !== null &&
        'type' in message &&
        message['type'] === exports.HASH_GLOB);
}
exports.isHandleHashGlobMessage = isHandleHashGlobMessage;
