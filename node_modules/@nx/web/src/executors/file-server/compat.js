"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devkit_1 = require("@nx/devkit");
const file_server_impl_1 = require("./file-server.impl");
exports.default = (0, devkit_1.convertNxExecutor)(file_server_impl_1.default);
