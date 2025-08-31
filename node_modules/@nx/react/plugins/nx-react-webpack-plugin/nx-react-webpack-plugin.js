"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NxReactWebpackPlugin = void 0;
const apply_react_config_1 = require("./lib/apply-react-config");
class NxReactWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
    }
    apply(compiler) {
        (0, apply_react_config_1.applyReactConfig)(this.options, compiler.options);
    }
}
exports.NxReactWebpackPlugin = NxReactWebpackPlugin;
