"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webStaticServeGenerator = exports.applicationGenerator = exports.webInitGenerator = void 0;
var init_1 = require("./src/generators/init/init");
Object.defineProperty(exports, "webInitGenerator", { enumerable: true, get: function () { return init_1.webInitGenerator; } });
var application_1 = require("./src/generators/application/application");
Object.defineProperty(exports, "applicationGenerator", { enumerable: true, get: function () { return application_1.applicationGenerator; } });
var static_serve_configuration_1 = require("./src/generators/static-serve/static-serve-configuration");
Object.defineProperty(exports, "webStaticServeGenerator", { enumerable: true, get: function () { return static_serve_configuration_1.webStaticServeGenerator; } });
