'use strict';

const {join, normalize, sep, posix: {isAbsolute: posixIsAbsolute}, win32: {isAbsolute: win32IsAbsolute}} = require('path');
const {inspect} = require('util');

const inspectWithKind = require('inspect-with-kind');
const isPlainObj = require('is-plain-obj');

const COUNT_ERROR = 'Expected a non-negative integer';

module.exports = function stripDirs(...args) {
	const argLen = args.length;

	if (argLen !== 2 && argLen !== 3) {
		throw new RangeError(`Expected 2 or 3 arguments (<string>, <integer>[, <Object>]), but got ${
			argLen === 0 ? 'no' : argLen
		} arguments.`);
	}

	const [pathStr, count, option = {disallowOverflow: false}] = args;

	if (typeof pathStr !== 'string') {
		throw new TypeError(`Expected a relative file path (<string>), but got a non-string value ${
			inspectWithKind(pathStr)
		}.`);
	}

	if (posixIsAbsolute(pathStr) || win32IsAbsolute(pathStr)) {
		throw new Error(`Expected a relative file path, but got an absolute path ${inspect(pathStr)}.`);
	}

	if (typeof count !== 'number') {
		throw new TypeError(`${COUNT_ERROR}, but got a non-number value ${inspectWithKind(count)}.`);
	}

	if (count < 0) {
		throw new RangeError(`${COUNT_ERROR}, but got a negative value ${inspectWithKind(count)}.`);
	}

	if (!isFinite(count)) {
		throw new RangeError(`${COUNT_ERROR}, but got ${count}.`);
	}

	if (count > Number.MAX_SAFE_INTEGER) {
		throw new RangeError(`${COUNT_ERROR}, but got an extremely large number ${count}.`);
	}

	if (!Number.isInteger(count)) {
		throw new RangeError(`${COUNT_ERROR}, but got a non-integer number ${count}.`);
	}

	if (argLen === 3) {
		if (!isPlainObj(option)) {
			throw new TypeError(`Expected an option object to set strip-dirs option, but got ${
				inspectWithKind(option)
			}.`);
		}

		if (option.disallowOverflow !== undefined && typeof option.disallowOverflow !== 'boolean') {
			throw new TypeError(`Expected \`disallowOverflow\` option to be a boolean, but got a non-boolean value ${
				inspectWithKind(option.disallowOverflow)
			}.`);
		}
	}

	const pathComponents = normalize(pathStr).split(sep);

	if (pathComponents.length > 1 && pathComponents[0] === '.') {
		pathComponents.shift();
	}

	if (count > pathComponents.length - 1) {
		if (option.disallowOverflow) {
			throw new RangeError('Cannot strip more directories than there are.');
		}

		return normalize(pathComponents[pathComponents.length - 1]);
	}

	return join(...pathComponents.slice(count));
};
