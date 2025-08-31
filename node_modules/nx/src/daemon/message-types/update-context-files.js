"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHandleUpdateContextMessage = exports.GLOB = void 0;
exports.GLOB = 'GLOB';
function isHandleUpdateContextMessage(message) {
    return (typeof message === 'object' &&
        message !== null &&
        'type' in message &&
        message['type'] === exports.GLOB);
}
exports.isHandleUpdateContextMessage = isHandleUpdateContextMessage;
