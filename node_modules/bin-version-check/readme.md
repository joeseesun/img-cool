# bin-version-check

> Check whether a binary version satisfies a [semver range](https://github.com/npm/node-semver#ranges)

Useful when you have a thing that only works with specific versions of a binary.

## Install

```
$ npm install bin-version-check
```

## Usage

```
$ curl --version
curl 7.30.0 (x86_64-apple-darwin13.0)
```

```js
import binaryVersionCheck from 'bin-version-check';

try {
	await binaryVersionCheck('curl', '>=8');
} catch (error) {
	console.log(error);
	//=> 'InvalidBinaryVersion: curl 7.30.0 doesn't satisfy the version requirement of >=8'
}
```

## API

### binaryVersionCheck(binary, semverRange, options?)

#### binary

Type: `string`

Name or path of the binary to check.

#### semverRange

Type: `string`

[Semver range](https://github.com/npm/node-semver#ranges) to check against.

#### options

Type: `object`

##### args

Type: `string[]`\
Default: `['--version']`

CLI arguments used to get the binary version.

## Related

- [bin-version-check-cli](https://github.com/sindresorhus/bin-version-check-cli) - CLI for this module
