# archive-type [![CI](https://github.com/XhmikosR/archive-type/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/XhmikosR/archive-type/actions/workflows/ci.yml)

> Detect the archive type of a Buffer/Uint8Array


## Install

```sh
npm install @xhmikosr/archive-type
```


## Usage

```js
import archiveType from '@xhmikosr/archive-type';
import {readChunk} from 'read-chunk';

const buffer = await readChunk('unicorn.zip', 0, 262);

await archiveType(buffer);
//=> {ext: 'zip', mime: 'application/zip'}
```


## API

### archiveType(input)

Returns an `Object` with:

- `ext` - One of the [supported file types](#supported-file-types)
- `mime` - The [MIME type](https://en.wikipedia.org/wiki/Media_type)

Or `null` when no match.

#### input

Type: `Buffer` `Uint8Array`

It only needs the first 262 bytes.


## Supported file types

- `7z`
- `bz2`
- `gz`
- `rar`
- `tar`
- `zip`
- `xz`
- `gz`
- `zst`


## Related

- [archive-type-cli](https://github.com/kevva/archive-type-cli) - CLI for this module


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
