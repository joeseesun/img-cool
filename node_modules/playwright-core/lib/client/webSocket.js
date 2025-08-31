"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectOverWebSocket = connectOverWebSocket;
var _connection = require("./connection");
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

async function connectOverWebSocket(parentConnection, params) {
  const localUtils = parentConnection.localUtils();
  const transport = localUtils ? new JsonPipeTransport(localUtils) : new WebSocketTransport();
  const connectHeaders = await transport.connect(params);
  const connection = new _connection.Connection(parentConnection._platform, localUtils, parentConnection._instrumentation, connectHeaders);
  connection.markAsRemote();
  connection.on('close', () => transport.close());
  let closeError;
  const onTransportClosed = reason => {
    connection.close(reason || closeError);
  };
  transport.onClose(reason => onTransportClosed(reason));
  connection.onmessage = message => transport.send(message).catch(() => onTransportClosed());
  transport.onMessage(message => {
    try {
      connection.dispatch(message);
    } catch (e) {
      closeError = String(e);
      transport.close().catch(() => {});
    }
  });
  return connection;
}
class JsonPipeTransport {
  constructor(owner) {
    this._pipe = void 0;
    this._owner = void 0;
    this._owner = owner;
  }
  async connect(params) {
    const {
      pipe,
      headers: connectHeaders
    } = await this._owner._wrapApiCall(async () => {
      return await this._owner._channel.connect(params);
    }, /* isInternal */true);
    this._pipe = pipe;
    return connectHeaders;
  }
  async send(message) {
    await this._owner._wrapApiCall(async () => {
      await this._pipe.send({
        message
      });
    }, /* isInternal */true);
  }
  onMessage(callback) {
    this._pipe.on('message', ({
      message
    }) => callback(message));
  }
  onClose(callback) {
    this._pipe.on('closed', ({
      reason
    }) => callback(reason));
  }
  async close() {
    await this._owner._wrapApiCall(async () => {
      await this._pipe.close().catch(() => {});
    }, /* isInternal */true);
  }
}
class WebSocketTransport {
  constructor() {
    this._ws = void 0;
  }
  async connect(params) {
    this._ws = new window.WebSocket(params.wsEndpoint);
    return [];
  }
  async send(message) {
    this._ws.send(JSON.stringify(message));
  }
  onMessage(callback) {
    this._ws.addEventListener('message', event => callback(JSON.parse(event.data)));
  }
  onClose(callback) {
    this._ws.addEventListener('close', () => callback());
  }
  async close() {
    this._ws.close();
  }
}