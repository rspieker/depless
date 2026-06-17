# depless

A zero-runtime-dependency TypeScript boilerplate that runs natively on **Node.js** and **Deno**, and compiles cleanly with **tsc** for embedding in other projects.

No bundler. No transpiler pipeline. No `node_modules` to install.

---

## Philosophy

Modern JavaScript has quietly made most utility dependencies redundant. `crypto.randomUUID()`, `structuredClone()`, `Object.groupBy()`, `Array.prototype.at()` — these are all built in. This project exists to demonstrate that, and to serve as a starting point for projects that take it seriously.

---

## How it works

### Node.js

Node requires a small loader to strip TypeScript types at runtime. `hooks.js` in the project root handles this using Node's built-in `module.register()` and `Module.stripTypeScriptTypes()` — no external packages involved.

The clever part: `hooks.js` uses `isMainThread` from `node:worker_threads` to detect whether it's being loaded in the main thread or the hooks worker thread, and self-registers accordingly. One file, no separate registration step.

```
node --import ./hooks.js source/main.ts
```

### Deno

Deno runs TypeScript natively. No loader needed — `deno run source/main.ts` just works.

### TypeScript (tsc)

If you want to compile for distribution or embedding, `tsconfig.json` is configured with `rewriteRelativeImportExtensions: true` (TypeScript 5.7+). This rewrites the `.ts` extensions in imports to `.js` in the compiled output automatically.

```
tsc
```

Output lands in `dist/`.

---

## Imports use `.ts` extensions

All relative imports explicitly use `.ts` extensions:

```ts
import { uuid } from "./helpers/uuid.ts";
```

This is the cross-runtime common ground:
- **Deno** requires explicit extensions
- **Node** (with the loader) resolves `.ts` directly
- **tsc** rewrites them to `.js` in compiled output

---

## Running

### Node
```sh
npm start        # or: pnpm start
node --import ./hooks.js source/other.ts  # run a different entry point
```

### Deno
```sh
deno run source/main.ts
```

---

## Testing

Tests live next to their source files as `*.test.ts`. Both runtimes discover them automatically.

Uses `node:test` and `node:assert/strict` — supported natively by both Node and Deno.

### Node
```sh
npm test         # or: pnpm test
```

### Deno
```sh
deno test
# with a custom npm registry (needed to resolve @types/node):
NPM_CONFIG_REGISTRY=https://my.registry.tld deno test
```

---

## Coverage

### Node
```sh
npm run coverage  # or: pnpm run coverage
```

### Deno
```sh
deno task coverage
# with a custom npm registry:
NPM_CONFIG_REGISTRY=https://my.registry.tld deno task coverage
```

Deno additionally generates an HTML report and lcov file in `coverage/`.

---

## Custom registries

Deno uses the npm registry to resolve `@types/node` for type checking. In environments where the default registry is unavailable, pass `NPM_CONFIG_REGISTRY` as shown above, or — if your environment is properly configured — add an `.npmrc` to the project root and neither flag nor environment variable is needed:

```ini
registry=https://my.registry.tld
```

pnpm respects `.npmrc` by the same mechanism.

---

## Project structure

```
├── hooks.js                  # TypeScript loader for Node (self-registering)
├── package.json              # Node scripts
├── deno.json                 # Deno tasks and config
├── tsconfig.json             # tsc config with extension rewriting
└── source/
    ├── main.ts               # application entry point
    └── helpers/
        ├── array.ts          # last(), findLast()
        ├── array.test.ts
        ├── object.ts         # clone(), groupBy()
        ├── object.test.ts
        ├── uuid.ts           # uuid()
        └── uuid.test.ts
```

---

## Helpers

The `helpers/` directory demonstrates native replacements for common library dependencies.

### `uuid.ts`
```ts
import { uuid } from "./helpers/uuid.ts";
uuid(); // "3b4e1f2a-..."
```
Wraps `crypto.randomUUID()`. No need for the `uuid` package.

### `object.ts`
```ts
import { clone, groupBy } from "./helpers/object.ts";

clone({ nested: { value: 42 } });   // deep clone — handles Map, Set, Date correctly
groupBy(items, (item) => item.type); // replaces _.groupBy
```
`structuredClone()` correctly clones `Map`, `Set`, and `Date` — something spread operators cannot do.

### `array.ts`
```ts
import { last, findLast } from "./helpers/array.ts";

last([1, 2, 3]);                          // 3
findLast([1, 2, 3, 4], n => n % 2 === 0); // 4
```
Thin wrappers over `Array.prototype.at(-1)` and `Array.prototype.findLast()`.
