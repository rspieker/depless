export function clone<T>(value: T): T {
	return structuredClone(value);
}

export function groupBy<T, K extends PropertyKey>(
	items: T[],
	key: (item: T) => K,
): Partial<Record<K, T[]>> {
	return Object.groupBy(items, key);
}
