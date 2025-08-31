"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("@nx/webpack");
const with_react_1 = require("./with-react");
const plugin = (0, webpack_1.composePlugins)((0, webpack_1.withNx)(), (0, with_react_1.withReact)());
module.exports = plugin;
