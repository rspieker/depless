import { last, findLast } from "./helpers/array.ts";
import { clone, groupBy } from "./helpers/object.ts";
import { uuid } from "./helpers/uuid.ts";

console.log("uuid:", uuid());

const original = { nested: { value: 42 }, tags: new Set(["ts", "node"]) };
const copy = clone(original);
copy.nested.value = 0;
console.log("clone preserves original:", original.nested.value);

const libs = [
	{ lang: "ts", name: "depless" },
	{ lang: "ts", name: "bun" },
	{ lang: "rs", name: "deno" },
];
console.log("groupBy lang:", groupBy(libs, (lib) => lib.lang));

const numbers = [1, 2, 3, 4, 5];
console.log("last:", last(numbers));
console.log("findLast even:", findLast(numbers, (n) => n % 2 === 0));
