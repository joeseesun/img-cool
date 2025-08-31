import { __read } from "tslib";
import { useState } from 'react';
import useEventListener from '../useEventListener';
import useMemoizedFn from '../useMemoizedFn';
import useUpdateEffect from '../useUpdateEffect';
import { isFunction, isUndef } from '../utils';
export var SYNC_STORAGE_EVENT_NAME = 'AHOOKS_SYNC_STORAGE_EVENT_NAME';
export function createUseStorageState(getStorage) {
  function useStorageState(key, options) {
    if (options === void 0) {
      options = {};
    }
    var storage;
    var _a = options.listenStorageChange,
      listenStorageChange = _a === void 0 ? false : _a,
      _b = options.onError,
      onError = _b === void 0 ? function (e) {
        console.error(e);
      } : _b;
    // https://github.com/alibaba/hooks/issues/800
    try {
      storage = getStorage();
    } catch (err) {
      onError(err);
    }
    var serializer = function (value) {
      if (options.serializer) {
        return options.serializer(value);
      }
      return JSON.stringify(value);
    };
    var deserializer = function (value) {
      if (options.deserializer) {
        return options.deserializer(value);
      }
      return JSON.parse(value);
    };
    function getStoredValue() {
      try {
        var raw = storage === null || storage === void 0 ? void 0 : storage.getItem(key);
        if (raw) {
          return deserializer(raw);
        }
      } catch (e) {
        onError(e);
      }
      if (isFunction(options.defaultValue)) {
        return options.defaultValue();
      }
      return options.defaultValue;
    }
    var _c = __read(useState(getStoredValue), 2),
      state = _c[0],
      setState = _c[1];
    useUpdateEffect(function () {
      setState(getStoredValue());
    }, [key]);
    var updateState = function (value) {
      var currentState = isFunction(value) ? value(state) : value;
      if (!listenStorageChange) {
        setState(currentState);
      }
      try {
        var newValue = void 0;
        var oldValue = storage === null || storage === void 0 ? void 0 : storage.getItem(key);
        if (isUndef(currentState)) {
          newValue = null;
          storage === null || storage === void 0 ? void 0 : storage.removeItem(key);
        } else {
          newValue = serializer(currentState);
          storage === null || storage === void 0 ? void 0 : storage.setItem(key, newValue);
        }
        dispatchEvent(
        // send custom event to communicate within same page
        // importantly this should not be a StorageEvent since those cannot
        // be constructed with a non-built-in storage area
        new CustomEvent(SYNC_STORAGE_EVENT_NAME, {
          detail: {
            key: key,
            newValue: newValue,
            oldValue: oldValue,
            storageArea: storage
          }
        }));
      } catch (e) {
        onError(e);
      }
    };
    var syncState = function (event) {
      if (event.key !== key || event.storageArea !== storage) {
        return;
      }
      setState(getStoredValue());
    };
    var syncStateFromCustomEvent = function (event) {
      syncState(event.detail);
    };
    // from another document
    useEventListener('storage', syncState, {
      enable: listenStorageChange
    });
    // from the same document but different hooks
    useEventListener(SYNC_STORAGE_EVENT_NAME, syncStateFromCustomEvent, {
      enable: listenStorageChange
    });
    return [state, useMemoizedFn(updateState)];
  }
  return useStorageState;
}