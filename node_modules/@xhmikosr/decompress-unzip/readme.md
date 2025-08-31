# decompress-unzip [![CI](https://github.com/XhmikosR/decompress-unzip/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/XhmikosR/decompress-unzip/actions/workflows/ci.yml)

> zip decompress plugin


## Install

```sh
npm install @xhmikosr/decompress-unzip
```


## Usage

```js
import decompress from '@xhmikosr/decompress';
import decompressUnzip from '@xhmikosr/decompress-unzip';

decompress('unicorn.zip', 'dist', {
	plugins: [
		decompressUnzip()
	]
}).then(() => {
	console.log('Files decompressed');
});
```


## API

### decompressUnzip()(buf)

#### buf

Type: `Buffer`

Buffer to decompress.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
