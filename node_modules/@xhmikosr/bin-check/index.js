import execa from 'execa';
import isexe from 'isexe';

const binCheck = (bin, args) => {
	if (!Array.isArray(args)) {
		args = ['--help'];
	}

	return isexe(bin)
		.then(works => {
			if (!works) {
				throw new Error(`Couldn't execute the "${bin}" binary. Make sure it has the right permissions.`);
			}

			return execa(bin, args);
		})
		.then(result => result.exitCode === 0);
};

binCheck.sync = (bin, args) => {
	if (!Array.isArray(args)) {
		args = ['--help'];
	}

	if (!isexe.sync(bin)) {
		throw new Error(`Couldn't execute the "${bin}" binary. Make sure it has the right permissions.`);
	}

	return execa.sync(bin, args).exitCode === 0;
};

export default binCheck;
