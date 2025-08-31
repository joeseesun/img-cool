"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nx_json_1 = require("../../generators/utils/nx-json");
function migrate(tree) {
    const nxJson = (0, nx_json_1.readNxJson)(tree);
    nxJson.useInferencePlugins = false;
    (0, nx_json_1.updateNxJson)(tree, nxJson);
}
exports.default = migrate;
