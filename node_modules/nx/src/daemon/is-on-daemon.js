"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOnDaemon = void 0;
function isOnDaemon() {
    return !!global.NX_DAEMON;
}
exports.isOnDaemon = isOnDaemon;
