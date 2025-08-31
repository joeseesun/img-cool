import execa from 'execa';
import findVersions from 'find-versions';

const oneMegabyte = 1000 * 1000;

const knownBinaryArguments = new Map([
	...[
		'ffmpeg',
		'ffprobe',
		'ffplay'
	].map(name => [name, ['-version']]),
	['openssl', ['version']]
]);

const defaultPossibleArguments = [
	['--version'],
	['version']
];

export default async function binaryVersion(binary, options = {}) {
	let possibleArguments;

	if (options.args === undefined) {
		const customArgs = knownBinaryArguments.get(binary);
		possibleArguments = customArgs === undefined ? defaultPossibleArguments : [customArgs];
	} else {
		possibleArguments = [options.args];
	}

	for (const args of possibleArguments) {
		try {
			// eslint-disable-next-line no-await-in-loop
			const {all} = await execa(binary, args, {
				all: true,
				maxBuffer: oneMegabyte
			});

			const [version] = findVersions(all, {loose: true});
			if (version !== undefined) {
				return version;
			}
		} catch (error) {
			if (error.code === 'ENOENT') {
				const newError = new Error(`Couldn't find the \`${binary}\` binary. Make sure it's installed and in your $PATH.`);
				newError.sourceError = error;
				throw newError;
			}

			if (error.code === 'EACCES') {
				throw error;
			}
		}
	}

	throw new Error(`Couldn't find version of \`${binary}\``);
}
