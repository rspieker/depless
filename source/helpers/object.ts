import { isObject } from './guards.ts';

export function clone<T>(value: T): T {
	return structuredClone(value);
}

export function groupBy<T, K extends PropertyKey>(
	items: T[],
	key: (item: T) => K,
): Partial<Record<K, T[]>> {
	return Object.groupBy(items, key);
}

export function includes<T>(object: Record<string, T>, value: T): boolean {
	return isObject(object) && Object.values(object).includes(value);
}
