/**
Deeply merges the given options with the specified defaults.

@param options - The user-provided options. If the value is not a plain object, a new plain object will be used instead.
@param defaultOptions - The default options to use when a value is not provided in the `options` object.
@returns A new object containing the merged options.

@example
```
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
*/
export default function defaults<T extends Record<string, unknown>, U extends Record<string, unknown> | undefined = undefined>(
	options: T,
	defaultOptions: U
): U extends undefined ? T : DeepMerge<U, T>;

type DeepMerge<T, U> =
	T extends Record<string, unknown> ?
		U extends Record<string, unknown> ?
			{[K in keyof T | keyof U]: K extends keyof T ? K extends keyof U ? DeepMerge<T[K], U[K]> : T[K] : K extends keyof U ? U[K] : never}
			: T
		: U extends undefined ?
			T extends undefined ?
				U
				: T
			: U;
