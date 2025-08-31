export interface Options {
	/**
	The arguments to pass to `binary` so that it will print its version.

	If not specified, predefined arguments will be used for known binaries, or `['--version']` and `['version']` arguments will be tried.
	*/
	readonly args?: readonly string[];
}

/**
Get the version of a binary in [semver](https://github.com/npm/node-semver) format.

@param binary - The name of or path to the binary to get the version from.
@returns The version of the `binary`.

@example
```
import binaryVersion from 'bin-version';

// $ curl --version
// curl 7.30.0 (x86_64-apple-darwin13.0)

console.log(await binaryVersion('curl'));
//=> '7.30.0'

// $ openssl version
// OpenSSL 1.0.2d 9 Jul 2015

console.log(await binaryVersion('openssl'));
//=> '1.0.2'

console.log(await binaryVersion('openssl', {args: ['version']}));
//=> '1.0.2'
```
*/
export default function binaryVersion(binary: string, options?: Options): Promise<string>;
