# bin-check [![CI](https://github.com/XhmikosR/bin-check/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/XhmikosR/bin-check/actions/workflows/ci.yml)

> Check if a binary is working by checking its exit code


## Install

```sh
npm install bin-check
```


## Usage

```js
import binCheck from '@xhmikosr/bin-check';

binCheck('/bin/sh', ['--version']).then(works => {
	console.log(works);
	//=> true
});
```


## API

### binCheck(binary, [arguments])

Returns a `Promise` for a `boolean`.

### binCheck.sync(binary, [arguments])

Returns a `boolean`.

#### binary

Type: `string`

Path to the binary.

#### arguments

* Type: `Array`
* Default: `['--help']`

Arguments to run the binary with.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
