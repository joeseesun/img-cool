import { useCallback, useEffect, useRef } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils';
var setRafTimeout = function (callback, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setTimeout(callback, delay)
    };
  }
  var handle = {
    id: 0
  };
  var startTime = new Date().getTime();
  var loop = function () {
    var current = new Date().getTime();
    if (current - startTime >= delay) {
      callback();
    } else {
      handle.id = requestAnimationFrame(loop);
    }
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};
function cancelAnimationFrameIsNotDefined(t) {
  return typeof cancelAnimationFrame === typeof undefined;
}
var clearRafTimeout = function (handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id)) {
    return clearTimeout(handle.id);
  }
  cancelAnimationFrame(handle.id);
};
function useRafTimeout(fn, delay) {
  var fnRef = useLatest(fn);
  var timerRef = useRef();
  var clear = useCallback(function () {
    if (timerRef.current) {
      clearRafTimeout(timerRef.current);
    }
  }, []);
  useEffect(function () {
    if (!isNumber(delay) || delay < 0) return;
    timerRef.current = setRafTimeout(function () {
      fnRef.current();
    }, delay);
    return clear;
  }, [delay]);
  return clear;
}
export default useRafTimeout;