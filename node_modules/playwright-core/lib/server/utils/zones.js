"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Zone = void 0;
exports.currentZone = currentZone;
exports.emptyZone = void 0;
var _async_hooks = require("async_hooks");
/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const asyncLocalStorage = new _async_hooks.AsyncLocalStorage();
class Zone {
  constructor(asyncLocalStorage, store) {
    this._asyncLocalStorage = void 0;
    this._data = void 0;
    this._asyncLocalStorage = asyncLocalStorage;
    this._data = store;
  }
  with(type, data) {
    return new Zone(this._asyncLocalStorage, new Map(this._data).set(type, data));
  }
  without(type) {
    const data = type ? new Map(this._data) : new Map();
    data.delete(type);
    return new Zone(this._asyncLocalStorage, data);
  }
  run(func) {
    return this._asyncLocalStorage.run(this, func);
  }
  data(type) {
    return this._data.get(type);
  }
}
exports.Zone = Zone;
const emptyZone = exports.emptyZone = new Zone(asyncLocalStorage, new Map());
function currentZone() {
  var _asyncLocalStorage$ge;
  return (_asyncLocalStorage$ge = asyncLocalStorage.getStore()) !== null && _asyncLocalStorage$ge !== void 0 ? _asyncLocalStorage$ge : emptyZone;
}