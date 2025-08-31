import { useEffect } from 'react';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';
var useMount = function (fn) {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error("useMount: parameter `fn` expected to be a function, but got \"".concat(typeof fn, "\"."));
    }
  }
  useEffect(function () {
    fn === null || fn === void 0 ? void 0 : fn();
  }, []);
};
export default useMount;