# decompress-tar [![CI](https://github.com/XhmikosR/decompress-tar/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/XhmikosR/decompress-tar/actions/workflows/ci.yml)

> tar decompress plugin


## Install

```sh
npm install @xhmikosr/decompress-tar
```


## Usage

```js
import decompress from '@xhmikosr/decompress';
import decompressTar from '@xhmikosr/decompress-tar';

decompress('unicorn.tar', 'dist', {
	plugins: [
		decompressTar()
	]
}).then(() => {
	console.log('Files decompressed');
});
```


## API

### decompressTar()(input)

Returns both a Promise for a Buffer and a [Duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

#### input

Type: `Buffer` `Stream`

Buffer or stream to decompress.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
