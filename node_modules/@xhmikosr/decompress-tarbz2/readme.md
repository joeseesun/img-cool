# decompress-tarbz2 [![CI](https://github.com/XhmikosR/decompress-tarbz2/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/XhmikosR/decompress-tarbz2/actions/workflows/ci.yml)

> tar.bz2 decompress plugin


## Install

```sh
npm install @xhmikosr/decompress-tarbz2
```


## Usage

```js
import decompress from '@xhmikosr/decompress';
import decompressTarbz from '@xhmikosr/decompress-tarbz2';

decompress('unicorn.tar.gz', 'dist', {
	plugins: [
		decompressTarbz()
	]
}).then(() => {
	console.log('Files decompressed');
});
```


## API

### decompressTarbz()(input)

Returns both a `Promise` for a `Buffer` and a [`Duplex stream`](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

#### input

Type: `Buffer` `Stream`

Buffer to decompress.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
