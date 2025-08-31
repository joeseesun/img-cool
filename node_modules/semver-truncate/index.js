import semver from 'semver';

export default function semverTruncate(version, type) {
	if (!['major', 'minor', 'patch'].includes(type)) {
		throw new TypeError(`Invalid version type: ${version}`);
	}

	version = semver.parse(version, {loose: true});

	if (!version) {
		throw new Error(`Version ${version} is not valid semver`);
	}

	version.build = '';
	version.prerelease = '';

	if (type === 'minor') {
		version.patch = 0;
	}

	if (type === 'major') {
		version.patch = 0;
		version.minor = 0;
	}

	return version.format();
}
