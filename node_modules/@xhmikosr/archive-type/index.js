import {fileTypeFromBuffer} from 'file-type';

const extensions = new Set([
	'7z',
	'bz2',
	'gz',
	'rar',
	'tar',
	'zip',
	'xz',
	'gz',
	'zst',
]);

const archiveType = async input => {
	const type = await fileTypeFromBuffer(input);
	return extensions.has(type?.ext) ? type : null;
};

export default archiveType;
