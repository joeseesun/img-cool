# strip-dirs

[![npm version](https://img.shields.io/npm/v/strip-dirs.svg)](https://www.npmjs.com/package/strip-dirs)
[![Build Status](https://img.shields.io/travis/shinnn/node-strip-dirs.svg)](https://travis-ci.org/shinnn/node-strip-dirs)
[![Build status](https://ci.appveyor.com/api/projects/status/pr5edbtg59f6xfgn?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/node-strip-dirs)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/node-strip-dirs.svg)](https://coveralls.io/github/shinnn/node-strip-dirs)

Remove leading directory components from a path, like [tar(1)](http://linuxcommand.org/lc3_man_pages/tar1.html)'s `--strip-components` option

```javascript
const stripDirs = require('strip-dirs');

stripDirs('foo/bar/baz', 1); //=> 'bar/baz'
stripDirs('foo/bar/baz', 2); //=> 'baz'
stripDirs('foo/bar/baz', 999); //=> 'baz'
```

## Installation

[Use]((https://docs.npmjs.com/cli/install)) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install strip-dirs
```

## API

```javascript
const stripDirs = require('strip-dirs');
```

### stripDirs(*path*, *count* [, *option*])

*path*: `string` (A relative path)  
*count*: `integer` (>= `0`)  
*option*: `Object`  
Return: `string`

It removes directory components from the beginning of the *path* by *count*.

```javascript
const stripDirs = require('strip-dirs');

stripDirs('foo/bar', 1); //=> 'bar'
stripDirs('foo/bar/baz', 2); //=> 'bar'
stripDirs('foo/././/bar/./', 1); //=> 'bar'
stripDirs('foo/bar', 0); //=> 'foo/bar'

stripDirs('/foo/bar', 1) // throw an error because the path is an absolute path
```

If you want to remove all directory components certainly, use [`path.basename`](https://nodejs.org/api/path.html#path_path_basename_path_ext) instead of this module.

#### option.disallowOverflow

Type: `boolean`  
Default: `false`

By default, it keeps the last path component when path components are fewer than the *count*.

If this option is enabled, it throws an error in this situation.

```javascript
stripDirs('foo/bar/baz', 9999); //=> 'baz'

stripDirs('foo/bar/baz', 9999, {disallowOverflow: true}); // throws an range error
```

## License

[ISC License](./LICENSE) © 2017 - 2018 Shinnosuke Watanabe
