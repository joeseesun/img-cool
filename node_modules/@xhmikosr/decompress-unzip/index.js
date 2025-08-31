/* eslint-disable no-bitwise */

import {Buffer} from 'node:buffer';
import {promisify} from 'node:util';
import {fileTypeFromBuffer} from 'file-type';
import getStream from 'get-stream';
import yauzl from 'yauzl';

const getType = (entry, mode) => {
	const IFMT = 61_440;
	const IFDIR = 16_384;
	const IFLNK = 40_960;
	const madeBy = entry.versionMadeBy >> 8;

	if ((mode & IFMT) === IFLNK) {
		return 'symlink';
	}

	if ((mode & IFMT) === IFDIR || (madeBy === 0 && entry.externalFileAttributes === 16)) {
		return 'directory';
	}

	return 'file';
};

const extractEntry = (entry, zip) => {
	const file = {
		mode: (entry.externalFileAttributes >> 16) & 0xFF_FF,
		mtime: entry.getLastModDate(),
		path: entry.fileName,
	};

	file.type = getType(entry, file.mode);

	if (file.mode === 0 && file.type === 'directory') {
		file.mode = 493;
	}

	if (file.mode === 0) {
		file.mode = 420;
	}

	return promisify(zip.openReadStream.bind(zip))(entry)
		.then(getStream.buffer)
		.then(buf => {
			file.data = buf;

			if (file.type === 'symlink') {
				file.linkname = buf.toString();
			}

			return file;
		})
		.catch(error => {
			zip.close();
			throw error;
		});
};

const extractFile = zip => new Promise((resolve, reject) => {
	const files = [];

	zip.readEntry();

	zip.on('entry', entry => {
		extractEntry(entry, zip)
			.catch(reject)
			.then(file => {
				files.push(file);
				zip.readEntry();
			});
	});

	zip.on('error', reject);
	zip.on('end', () => resolve(files));
});

const decompressUnzip = () => async input => {
	if (!Buffer.isBuffer(input)) {
		throw new TypeError(`Expected a Buffer, got ${typeof input}`);
	}

	if (Buffer.isBuffer(input)) {
		const type = await fileTypeFromBuffer(input);

		if (!type || type.ext !== 'zip') {
			return [];
		}
	}

	return promisify(yauzl.fromBuffer)(input, {lazyEntries: true}).then(extractFile);
};

export default decompressUnzip;
