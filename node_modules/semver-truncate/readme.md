# semver-truncate

> Truncate a semver version: `1.2.3` → `1.2.0`

## Install

```
$ npm install semver-truncate
```

## Usage

```js
import semverTruncate from 'semver-truncate';

semverTruncate('1.2.3-foo', 'patch');
//=> '1.2.3'

semverTruncate('1.2.3', 'minor');
//=> '1.2.0'

semverTruncate('1.2.3', 'major');
//=> '1.0.0'
```

## API

### truncateSemver(version, type)

#### version

Type: `string`

Semver version.

#### type

Type: `'patch' | 'minor' | 'major'`

Version type to truncate to.

## Related

- [latest-semver](https://github.com/sindresorhus/latest-semver) - Get the latest stable semver version from an array of versions
- [to-semver](https://github.com/sindresorhus/to-semver) - Get an array of valid, sorted, and cleaned semver versions from an array of strings
- [semver-regex](https://github.com/sindresorhus/semver-regex) - Regular expression for matching semver versions
- [semver-diff](https://github.com/sindresorhus/semver-diff) - Get the diff type of two semver versions: `0.0.1` `0.0.2` → `patch`
