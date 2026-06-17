import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { all, any, isNodeJSArrayBufferView, isString, not } from "./guards.ts";

describe("helpers/guards.ts", () => {
	describe("isString", () => {
		test("returns true for string literals", () => {
			assert.equal(isString("hello"), true);
			assert.equal(isString(""), true);
		});

		test("returns false for non-strings", () => {
			assert.equal(isString(0), false);
			assert.equal(isString(null), false);
			assert.equal(isString(undefined), false);
			assert.equal(isString([]), false);
			assert.equal(isString({}), false);
			assert.equal(isString(true), false);
		});
	});

	describe("isNodeJSArrayBufferView", () => {
		test("returns true for TypedArrays and Buffer", () => {
			assert.equal(isNodeJSArrayBufferView(new Uint8Array()), true);
			assert.equal(isNodeJSArrayBufferView(Buffer.from("hello")), true);
			assert.equal(isNodeJSArrayBufferView(new DataView(new ArrayBuffer(8))), true);
		});

		test("returns false for non-ArrayBufferView types", () => {
			assert.equal(isNodeJSArrayBufferView("hello"), false);
			assert.equal(isNodeJSArrayBufferView(42), false);
			assert.equal(isNodeJSArrayBufferView({}), false);
			assert.equal(isNodeJSArrayBufferView(null), false);
		});
	});

	describe("any", () => {
		const isStringOrBuffer = any<string | NodeJS.ArrayBufferView>(isString, isNodeJSArrayBufferView);

		test("returns true when at least one guard matches", () => {
			assert.equal(isStringOrBuffer("hello"), true);
			assert.equal(isStringOrBuffer(Buffer.from("hello")), true);
		});

		test("returns false when no guard matches", () => {
			assert.equal(isStringOrBuffer(42), false);
			assert.equal(isStringOrBuffer(null), false);
		});
	});

	describe("all", () => {
		const isNonEmptyString = all<string>(
			isString,
			(v): v is string => isString(v) && v.length > 0,
		);

		test("returns true when all guards match", () => {
			assert.equal(isNonEmptyString("hello"), true);
		});

		test("returns false when any guard fails", () => {
			assert.equal(isNonEmptyString(""), false);
			assert.equal(isNonEmptyString(42), false);
		});
	});

	describe("not", () => {
		const isNotString = not<unknown>(isString);

		test("returns true when no guard matches", () => {
			assert.equal(isNotString(42), true);
			assert.equal(isNotString(null), true);
		});

		test("returns false when a guard matches", () => {
			assert.equal(isNotString("hello"), false);
		});
	});
});
