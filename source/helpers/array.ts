export function last<T>(array: T[]): T | undefined {
	return array.at(-1);
}

export function findLast<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
	return array.findLast(predicate);
}
