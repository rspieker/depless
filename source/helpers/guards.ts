type Guard<T> = (input: unknown) => input is T;

function is<T>(...types: [string, ...Array<string>]): Guard<T> {
	return (input: unknown): input is T => types.includes(typeof input);
}

export const isString = is<string>("string");

export function isNodeJSArrayBufferView(
	input: unknown,
): input is NodeJS.ArrayBufferView {
	return ArrayBuffer.isView(input);
}

export function any<T>(...guards: [Guard<T>, ...Array<Guard<T>>]): Guard<T> {
	return (input: unknown): input is T => guards.some((guard) => guard(input));
}

export function all<T>(...guards: [Guard<T>, ...Array<Guard<T>>]): Guard<T> {
	return (input: unknown): input is T => guards.every((guard) => guard(input));
}

export function not<T>(
	...guards: [Guard<unknown>, ...Array<Guard<unknown>>]
): Guard<T> {
	const some = any(...guards);

	return (input: unknown): input is T => !some(input);
}
