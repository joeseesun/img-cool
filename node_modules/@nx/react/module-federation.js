"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withModuleFederationForSSR = exports.withModuleFederation = void 0;
const with_module_federation_1 = require("./src/module-federation/with-module-federation");
Object.defineProperty(exports, "withModuleFederation", { enumerable: true, get: function () { return with_module_federation_1.withModuleFederation; } });
const with_module_federation_ssr_1 = require("./src/module-federation/with-module-federation-ssr");
Object.defineProperty(exports, "withModuleFederationForSSR", { enumerable: true, get: function () { return with_module_federation_ssr_1.withModuleFederationForSSR; } });
// Support for older generated code: `const withModuleFederation = require('@nx/react/module-federation')`
module.exports = with_module_federation_1.withModuleFederation;
// Allow newer generated code to work: `const { withModuleFederation } = require(...)`;
module.exports.withModuleFederation = with_module_federation_1.withModuleFederation;
module.exports.withModuleFederationForSSR = with_module_federation_ssr_1.withModuleFederationForSSR;
