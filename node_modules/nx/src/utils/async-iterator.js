"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastValueFromAsyncIterableIterator = exports.isAsyncIterator = void 0;
function isAsyncIterator(v) {
    return typeof v?.[Symbol.asyncIterator] === 'function';
}
exports.isAsyncIterator = isAsyncIterator;
async function getLastValueFromAsyncIterableIterator(i) {
    let prev;
    let current;
    const generator = i[Symbol.asyncIterator] || i[Symbol.iterator];
    const iterator = generator.call(i);
    do {
        prev = current;
        current = await iterator.next();
    } while (!current.done);
    return current.value !== undefined || !prev ? current.value : prev.value;
}
exports.getLastValueFromAsyncIterableIterator = getLastValueFromAsyncIterableIterator;
