let nice
let getCurrentProcessPriority

try {
  const { nice: niceNative, getCurrentProcessPriority: getCurrentProcessPriorityNative } = require('./index.js')
  nice = niceNative
  getCurrentProcessPriority = getCurrentProcessPriorityNative
} catch (e) {
  if (process.platform !== 'win32') {
    throw e
  }
  // fallback on Windows
  nice = function nice(incr) { return incr }
  getCurrentProcessPriority = function getCurrentProcessPriority() { return 1 }
}

module.exports.nice = nice
module.exports.getCurrentProcessPriority = getCurrentProcessPriority
