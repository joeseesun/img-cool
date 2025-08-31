# defaults

> Easily handle defaults for your options

## Install

```sh
npm install defaults
```

## Usage

```js
import defaults from 'defaults';

const calculate = options => {
	options = defaults(options, {
		timeout: {
			before: 100,
			after: 100
		}
	});

	console.log(options);
	//=> {timeout: {before: 200, after: 100}}

	// …
}

// …

calculate({timeout: {before: 200}});
```

## API

### defaults(options, defaultOptions?)

Deeply merges the given options with the specified defaults and returns a new object.

The given parameters are deep-cloned and never mutated.

#### options

Type: `object`

The user-provided options.

If the value is not a plain object, a new plain object will be used instead.

#### defaultOptions

Type: `object | undefined`

The default options to use when a value is not provided in the `options` object.

## FAQ

### Why use this over [object-spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals)?

- Does not overwrite options if they are not defined in the `options` object
- Supports deep merging of objects
- Provides protection against prototype pollution attacks
