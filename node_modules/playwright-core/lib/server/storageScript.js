"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collect = collect;
exports.restore = restore;
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

async function collect(serializers, isFirefox, recordIndexedDB) {
  async function collectDB(dbInfo) {
    if (!dbInfo.name) throw new Error('Database name is empty');
    if (!dbInfo.version) throw new Error('Database version is unset');
    function idbRequestToPromise(request) {
      return new Promise((resolve, reject) => {
        request.addEventListener('success', () => resolve(request.result));
        request.addEventListener('error', () => reject(request.error));
      });
    }
    function isPlainObject(v) {
      const ctor = v === null || v === void 0 ? void 0 : v.constructor;
      if (isFirefox) {
        const constructorImpl = ctor === null || ctor === void 0 ? void 0 : ctor.toString();
        if (constructorImpl.startsWith('function Object() {') && constructorImpl.includes('[native code]')) return true;
      }
      return ctor === Object;
    }
    function trySerialize(value) {
      let trivial = true;
      const encoded = serializers.serializeAsCallArgument(value, v => {
        const isTrivial = isPlainObject(v) || Array.isArray(v) || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || Object.is(v, null);
        if (!isTrivial) trivial = false;
        return {
          fallThrough: v
        };
      });
      if (trivial) return {
        trivial: value
      };
      return {
        encoded
      };
    }
    const db = await idbRequestToPromise(indexedDB.open(dbInfo.name));
    const transaction = db.transaction(db.objectStoreNames, 'readonly');
    const stores = await Promise.all([...db.objectStoreNames].map(async storeName => {
      const objectStore = transaction.objectStore(storeName);
      const keys = await idbRequestToPromise(objectStore.getAllKeys());
      const records = await Promise.all(keys.map(async key => {
        const record = {};
        if (objectStore.keyPath === null) {
          const {
            encoded,
            trivial
          } = trySerialize(key);
          if (trivial) record.key = trivial;else record.keyEncoded = encoded;
        }
        const value = await idbRequestToPromise(objectStore.get(key));
        const {
          encoded,
          trivial
        } = trySerialize(value);
        if (trivial) record.value = trivial;else record.valueEncoded = encoded;
        return record;
      }));
      const indexes = [...objectStore.indexNames].map(indexName => {
        const index = objectStore.index(indexName);
        return {
          name: index.name,
          keyPath: typeof index.keyPath === 'string' ? index.keyPath : undefined,
          keyPathArray: Array.isArray(index.keyPath) ? index.keyPath : undefined,
          multiEntry: index.multiEntry,
          unique: index.unique
        };
      });
      return {
        name: storeName,
        records: records,
        indexes,
        autoIncrement: objectStore.autoIncrement,
        keyPath: typeof objectStore.keyPath === 'string' ? objectStore.keyPath : undefined,
        keyPathArray: Array.isArray(objectStore.keyPath) ? objectStore.keyPath : undefined
      };
    }));
    return {
      name: dbInfo.name,
      version: dbInfo.version,
      stores
    };
  }
  return {
    localStorage: Object.keys(localStorage).map(name => ({
      name,
      value: localStorage.getItem(name)
    })),
    indexedDB: recordIndexedDB ? await Promise.all((await indexedDB.databases()).map(collectDB)).catch(e => {
      throw new Error('Unable to serialize IndexedDB: ' + e.message);
    }) : undefined
  };
}
async function restore(originState, serializers) {
  var _originState$indexedD;
  for (const {
    name,
    value
  } of originState.localStorage || []) localStorage.setItem(name, value);
  await Promise.all(((_originState$indexedD = originState.indexedDB) !== null && _originState$indexedD !== void 0 ? _originState$indexedD : []).map(async dbInfo => {
    const openRequest = indexedDB.open(dbInfo.name, dbInfo.version);
    openRequest.addEventListener('upgradeneeded', () => {
      const db = openRequest.result;
      for (const store of dbInfo.stores) {
        var _store$keyPathArray;
        const objectStore = db.createObjectStore(store.name, {
          autoIncrement: store.autoIncrement,
          keyPath: (_store$keyPathArray = store.keyPathArray) !== null && _store$keyPathArray !== void 0 ? _store$keyPathArray : store.keyPath
        });
        for (const index of store.indexes) {
          var _index$keyPathArray;
          objectStore.createIndex(index.name, (_index$keyPathArray = index.keyPathArray) !== null && _index$keyPathArray !== void 0 ? _index$keyPathArray : index.keyPath, {
            unique: index.unique,
            multiEntry: index.multiEntry
          });
        }
      }
    });
    function idbRequestToPromise(request) {
      return new Promise((resolve, reject) => {
        request.addEventListener('success', () => resolve(request.result));
        request.addEventListener('error', () => reject(request.error));
      });
    }

    // after `upgradeneeded` finishes, `success` event is fired.
    const db = await idbRequestToPromise(openRequest);
    const transaction = db.transaction(db.objectStoreNames, 'readwrite');
    await Promise.all(dbInfo.stores.map(async store => {
      const objectStore = transaction.objectStore(store.name);
      await Promise.all(store.records.map(async record => {
        var _record$value, _record$key;
        await idbRequestToPromise(objectStore.add((_record$value = record.value) !== null && _record$value !== void 0 ? _record$value : serializers.parseEvaluationResultValue(record.valueEncoded), (_record$key = record.key) !== null && _record$key !== void 0 ? _record$key : serializers.parseEvaluationResultValue(record.keyEncoded)));
      }));
    }));
  })).catch(e => {
    throw new Error('Unable to restore IndexedDB: ' + e.message);
  });
}