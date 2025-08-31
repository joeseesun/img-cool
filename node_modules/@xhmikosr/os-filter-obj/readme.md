# os-filter-obj [![CI](https://github.com/XhmikosR/os-filter-obj/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/XhmikosR/os-filter-obj/actions/workflows/ci.yml)

> Filter an array of objects to a specific OS


## Install

```sh
npm install @xhmikosr/os-filter-obj
```


## Usage

```js
import osFilterObj from 'os-filter-obj';

const objects = [{
	os: 'linux',
	arch: 'x64',
	foo: 'unicorn',
	bar: 'cow'
}, {
	os: 'darwin',
	arch: 'x64',
	foo: 'unicorn',
	bar: 'cow'
},{
	os: 'win32',
	arch: 'x64',
	foo: 'unicorn',
	bar: 'cow'
}];

osFilterObj(objects);
/*
	[{
		os: 'linux',
		arch: 'x64',
		foo: 'unicorn',
		bar: 'cow'
	}];
*/
```


## API

### osFilterObj(objects)

Returns an `Array` with the filtered objects.

#### objects

Type: `Array`

The `Array` to filter.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
