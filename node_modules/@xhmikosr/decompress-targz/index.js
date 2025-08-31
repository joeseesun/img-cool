import {Buffer} from 'node:buffer';
import zlib from 'node:zlib';
import decompressTar from '@xhmikosr/decompress-tar';
import {fileTypeFromBuffer} from 'file-type';
import isStream from 'is-stream';

const decompressTarGz = () => async input => {
	if (!Buffer.isBuffer(input) && !isStream(input)) {
		throw new TypeError(`Expected a Buffer or Stream, got ${typeof input}`);
	}

	if (Buffer.isBuffer(input)) {
		const type = await fileTypeFromBuffer(input);

		if (!type || type.ext !== 'gz') {
			return [];
		}
	}

	const unzip = zlib.createGunzip();
	const result = decompressTar()(unzip);

	if (Buffer.isBuffer(input)) {
		unzip.end(input);
	} else {
		input.pipe(unzip);
	}

	return result;
};

export default decompressTarGz;
