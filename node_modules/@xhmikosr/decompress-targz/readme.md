# decompress-targz [![CI](https://github.com/XhmikosR/decompress-targz/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/XhmikosR/decompress-targz/actions/workflows/ci.yml)

> tar.gz decompress plugin


## Install

```sh
npm install @xhmikosr/decompress-targz
```


## Usage

```js
import decompress from '@xhmikosr/decompress';
import decompressTargz from '@xhmikosr/decompress-targz';

decompress('unicorn.tar.gz', 'dist', {
	plugins: [
		decompressTargz()
	]
}).then(() => {
	console.log('Files decompressed');
});
```


## API

### decompressTargz()(input)

Returns both a Promise for a Buffer and a [Duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

#### input

Type: `Buffer` `Stream`

Buffer or stream to decompress.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
