# Native alternatives to common dependencies

A living reference of things people commonly reach for a package to do, and what to use instead.
Entries link to a working example in this repo. Unmarked entries are open todos.

---

## Crypto & IDs

| Replace | With | Example |
|---|---|---|
| `uuid` | `crypto.randomUUID()` | [`uuid()`](source/helpers/id.ts#L3) |
| `nanoid` | `crypto.getRandomValues()` + manual alphabet | [`nanoid()`](source/helpers/id.ts#L7) |
| `js-sha256`, `js-sha512` | `createHash()` from `node:crypto` | [`sha256()`, `sha512()`](source/helpers/crypto.ts#L13) |
| `jsonwebtoken` (sign/verify) | `crypto.subtle.sign()` / `crypto.subtle.verify()` | |
| `hmac` packages | `createHmac()` from `node:crypto` | [`hmac()`](source/helpers/crypto.ts#L31) |
| `base64-js`, `base-64` polyfills | `btoa()` / `atob()` | [`base64.encode/decode`](source/helpers/encoding.ts#L12) |
| hex encoding packages | `Buffer.from(...).toString('hex')` | [`hex.encode/decode`](source/helpers/encoding.ts#L19) |
| `crypto-browserify` | `globalThis.crypto` | |

---

## Collections & Objects

| Replace | With | Example |
|---|---|---|
| `lodash.clonedeep`, `clone`, `rfdc` | `structuredClone()` | [`clone()`](source/helpers/object.ts#L1) |
| `lodash.groupby`, `ramda.groupBy` | `Object.groupBy()` / `Map.groupBy()` | [`groupBy()`](source/helpers/object.ts#L5) |
| `lodash.get` / deep access | optional chaining `?.` + `??` | |
| `lodash.sortby`, `lodash.orderby` | `Array.prototype.toSorted(comparator)` | |
| `lodash.flatten` / `array-flatten` | `Array.prototype.flat(depth)` | |
| `lodash.flatmap` | `Array.prototype.flatMap()` | |
| `lodash.zip` | `Array.from({length}, (_, i) => [a[i], b[i]])` | |
| `lodash.chunk` | `Array.from({length: Math.ceil(n/size)}, (_, i) => arr.slice(i*size, (i+1)*size))` | |
| `lodash.uniq` | `[...new Set(arr)]` | |
| `lodash.uniqby` | `Map.groupBy()` + first of each group | |
| `lodash.intersection` / `difference` / `union` | `Set` methods: `.intersection()`, `.difference()`, `.union()` (Node 22+) | |
| `lodash.pick` / `omit` | `Object.fromEntries(Object.entries(obj).filter(...))` | |
| `fast-deep-equal`, `deep-equal` | `JSON.stringify` for plain serialisable data | |
| `object-assign` polyfill | `Object.assign()` or spread | |
| `is-plain-object`, `lodash.isplainobject` | `Object.prototype.toString.call(v) === '[object Object]'` | [`isPlainObject()`](source/helpers/guards.ts#L31) |
| `lodash.isinteger` | `Number.isInteger()` | [`isInteger()`](source/helpers/guards.ts#L27) |
| `has` / `hasown` | `Object.hasOwn(obj, key)` | |

---

## Arrays

| Replace | With | Example |
|---|---|---|
| `lodash.includes` | `Array.prototype.includes()` / `String.prototype.includes()` / `Object.values()` | [`collection.includes()`](source/helpers/collection.ts#L8) |
| `lodash.last` | `Array.prototype.at(-1)` | [`last()`](source/helpers/array.ts#L1) |
| `lodash.findlast` | `Array.prototype.findLast()` | [`findLast()`](source/helpers/array.ts#L5) |
| `lodash.findlastindex` | `Array.prototype.findLastIndex()` | |
| Immutable sort / reverse | `Array.prototype.toSorted()`, `.toReversed()`, `.toSpliced()`, `.with()` | |
| `array-first` | `arr[0]` / `arr.at(0)` | |

---

## Strings

| Replace | With | Example |
|---|---|---|
| `left-pad` | `String.prototype.padStart()` | |
| `right-pad` | `String.prototype.padEnd()` | |
| `repeat-string` | `String.prototype.repeat()` | |
| `trim`, `ltrim`, `rtrim` | `.trim()`, `.trimStart()`, `.trimEnd()` | |
| `replace-all` | `String.prototype.replaceAll()` | |
| `string-width` (grapheme-aware) | `Intl.Segmenter` with `granularity: 'grapheme'` | |

---

## Dates & Internationalisation

| Replace | With | Example |
|---|---|---|
| `moment`, `date-fns`, `dayjs` (formatting) | `Intl.DateTimeFormat` / `.toLocaleString()` | |
| `moment-timezone` | `Intl.DateTimeFormat` with `timeZone` option | |
| relative-time packages | `Intl.RelativeTimeFormat` | |
| `numeral`, `accounting` | `Intl.NumberFormat` (currency, compact, percent) | |
| `pluralize` | `Intl.PluralRules` | |
| list-format packages | `Intl.ListFormat` | |
| locale-aware sort | `Intl.Collator` | |
| string segmenter packages | `Intl.Segmenter` | |
| `ms` (duration string parsing) | simple regex (~20 lines) | |

---

## HTTP & Networking

| Replace | With | Example |
|---|---|---|
| `node-fetch`, `axios`, `got`, `superagent` | native `fetch()` | |
| `whatwg-url` | `new URL()` | |
| `qs`, `querystring` | `URLSearchParams` | |
| URL validation (`is-url` etc.) | `new URL(str)` in a try/catch | |
| `normalize-url` | `new URL(str).href` | |
| `form-data` | native `FormData` | |
| WebSocket clients (simple cases) | native `WebSocket` (Node 22+) | |

---

## File System

| Replace | With | Example |
|---|---|---|
| `rimraf` | `fs.rm(path, { recursive: true, force: true })` | |
| `mkdirp` | `fs.mkdir(path, { recursive: true })` | |
| `glob`, `fast-glob`, `globby` | `fs.glob()` (Node 22+) | |
| `chokidar` / file watching | `fs.watch(path, { recursive: true })` + AbortController | |
| `__dirname` / `__filename` workarounds | `import.meta.dirname` / `import.meta.filename` (Node 21+) | |

---

## Process, CLI & Config

| Replace | With | Example |
|---|---|---|
| `dotenv` | `node --env-file=.env` (Node 20.6+) | |
| `commander`, `yargs`, `minimist` | `util.parseArgs()` (Node 18.3+) | |
| `nodemon`, `ts-node-dev` | `node --watch` (stable Node 22) | |
| `ts-node`, `tsx`, `esno` | `node --import ./hooks.js` | [hooks.js](hooks.js) |
| `debug` | `util.debuglog('ns')` — enabled via `NODE_DEBUG=ns` | |
| `util-deprecate` | `process.emitWarning(msg, 'DeprecationWarning')` | |

---

## Encoding & Serialisation

| Replace | With | Example |
|---|---|---|
| `text-encoding` polyfill | `TextEncoder` / `TextDecoder` | [`text.encode/decode`](source/helpers/encoding.ts#L24) |
| `iconv-lite` (decode only) | `TextDecoder` with encoding label | [`toUTF8()`](source/helpers/encoding.ts#L34) |
| `buffer` polyfill | `Uint8Array` + `DataView` (cross-runtime) | |

---

## Streams

| Replace | With | Example |
|---|---|---|
| `readable-stream` polyfill | native `node:stream` or `ReadableStream` / `WritableStream` / `TransformStream` | |
| `web-streams-polyfill` | native Web Streams (Node 18+) | |
| `get-stream` | `Response.text()` / `Response.arrayBuffer()` | |
| `into-stream` | `ReadableStream.from(iterable)` | |
| `pump` / `pipeline` | `.pipeTo()` / `stream.pipeline()` with AbortSignal | |
| iteration over streams | `for await...of` on any async iterable | |

---

## Events & Async

| Replace | With | Example |
|---|---|---|
| `eventemitter3`, `mitt`, `tiny-emitter` | native `EventTarget` or `node:events` `EventEmitter` | |
| `abort-controller` polyfill | native `AbortController` | |
| `p-limit` (concurrency cap) | batched `Promise.all()` | |
| `p-map` | `Promise.all(arr.map(async fn))` | |
| `p-queue` | async generator + `for await` | |
| `deferred` / manual promise resolvers | `Promise.withResolvers()` (Node 22+) | |
| `delay` / `sleep` | `await new Promise(r => setTimeout(r, ms))` | |
| `once` function wrapper | closure with `let called = false` guard | |

---

## Type Guards

| Replace | With | Example |
|---|---|---|
| `@konfirm/guard`, `zod.safeParse`, ad-hoc `typeof` checks | `Guard<T>` alias + `is<T>()` factory + combinators | [`guards.ts`](source/helpers/guards.ts#L1) |

The core vocabulary is small: a `Guard<T>` alias, an `is<T>()` factory for `typeof` checks, and three combinators — `any`, `all`, `not`. Roughly twenty lines. If you only need guards for a specific domain, that's worth owning directly rather than pulling in a dependency. A library earns its place when you need a full catalogue of built-in guards or want battle-tested edge case handling shared across multiple projects.

---

## Testing

| Replace | With | Example |
|---|---|---|
| `jest`, `mocha`, `vitest`, `tap` | `node:test` | [`describe/test`](source/helpers/object.test.ts#L6) |
| `chai`, `expect.js` | `node:assert/strict` | [`assert.equal`](source/helpers/object.test.ts#L10) |
| `sinon`, `jest.mock()` | `mock.fn()`, `mock.method()`, `mock.module()` from `node:test` | |
| `lolex`, `sinon.useFakeTimers()` | `mock.timers` from `node:test` | |
| `nyc`, `c8`, `istanbul` | `node --experimental-coverage` / `deno coverage` | |

---

## Still worth a dependency

Some things don't have a satisfying native replacement yet:

| What | Why |
|---|---|
| **Argon2 / bcrypt** | `crypto.subtle` has PBKDF2 and HKDF, but not Argon2 or bcrypt |
| **Temporal** | Not in Node without a flag; use `@js-temporal/polyfill` for now |
| **CSV parsing** | No native API; a small dep or inline implementation is fine |
| **HTML entity encoding** | No native; a tiny dep or regex |
| **Schema validation** | `zod`, `valibot` etc. have no native equivalent |
| **Terminal colors** | Raw ANSI codes work, but `picocolors` / `chalk` beats the DX for little cost |
| **Complex glob patterns** | `fs.glob()` (Node 22+) is limited; `fast-glob` is still worth it for advanced cases |
| **Guard libraries (`@konfirm/guard` etc.)** | The core pattern — `Guard<T>`, an `is<T>()` factory, and `any`/`all`/`not` combinators — fits in ~20 lines and is worth owning for domain-specific guards. A library earns its place when you need a full catalogue of built-in guards shared across multiple projects. |
