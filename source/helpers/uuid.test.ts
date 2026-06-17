import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { uuid } from "./uuid.ts";

describe("uuid", () => {
	test("returns a valid v4 UUID", () => {
		assert.match(
			uuid(),
			/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
		);
	});

	test("returns a unique value each call", () => {
		assert.notEqual(uuid(), uuid());
	});
});
