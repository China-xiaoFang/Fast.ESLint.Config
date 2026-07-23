[中文](./README.zh.md) | **English**

# @fast-china/eslint-config

A practical, typed ESLint Flat Config for Vue 3, Vite, TypeScript, and JavaScript projects.

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config)
[![license](https://img.shields.io/npm/l/@fast-china/eslint-config)](./LICENSE)

## Highlights

- Built for ESLint 10 and the native Flat Config format.
- Vue 3 + TypeScript + Vite defaults, with Vue 2 and type-aware linting available explicitly.
- First-class JavaScript, TypeScript, Vue SFC, JSON, JSONC, JSON5, Markdown, RegExp, and import rules.
- A zero-configuration default array plus a small `createConfig()` factory for other project types.
- Schema-generated rule types provide exact rule-name and rule-option completion.
- Plugins and parsers are regular package dependencies, so consumers do not need to assemble the plugin graph.
- Prettier stays a formatter: the default only disables conflicting ESLint rules and does not run Prettier inside ESLint.

## Requirements

- Node.js `^20.19.0`, `^22.13.0`, or `>=24`
- ESLint `^10.0.0`
- TypeScript `>=5.3.0 <6.1.0`

These versions follow the runtime requirements of ESLint 10 and the included language plugins.

## Installation

```sh
pnpm add -D eslint typescript @fast-china/eslint-config
```

Equivalent npm, Yarn, and Bun commands work as well.

## Quick start: Vue 3 + Vite

Create `eslint.config.mjs`:

```js
import { defineConfig } from "eslint/config";

import fastChina from "@fast-china/eslint-config";

export default defineConfig([...fastChina]);
```

The default enables Vue 3, TypeScript, JavaScript, JSON dialects, Markdown, import ordering, RegExp checks, `.gitignore`, browser globals, and Node globals for common config, script, test, and CLI files.

## Other project types

Use `createConfig()` to keep only what a project needs.

### Node.js + TypeScript

```js
import { defineConfig } from "eslint/config";

import { createConfig } from "@fast-china/eslint-config";

export default defineConfig(
	createConfig({
		environment: "node",
		vue: false,
	})
);
```

### JavaScript only

```js
import { defineConfig } from "eslint/config";

import { createConfig } from "@fast-china/eslint-config";

export default defineConfig(
	createConfig({
		environment: "node",
		json: false,
		markdown: false,
		typescript: false,
		vue: false,
	})
);
```

### Type-aware TypeScript rules

```js
import { defineConfig } from "eslint/config";

import { createConfig } from "@fast-china/eslint-config";

export default defineConfig(
	createConfig({
		typescript: { typeChecked: true },
		vue: { typeChecked: true, version: 3 },
	})
);
```

Type-aware linting uses the typescript-eslint project service. Project files must belong to a `tsconfig.json`.

## Options

| Option        | Default     | Purpose                                                     |
| ------------- | ----------- | ----------------------------------------------------------- |
| `environment` | `"browser"` | Use `"browser"`, `"node"`, or `"universal"` globals.        |
| `gitignore`   | `true`      | Read ignore patterns from the project `.gitignore`.         |
| `ignores`     | `[]`        | Add project-specific global ignore patterns.                |
| `imports`     | `true`      | Enable import-x correctness and ordering rules.             |
| `json`        | `true`      | Enable JSON/JSONC/JSON5 rules and package/tsconfig sorting. |
| `markdown`    | `true`      | Enable the official Markdown language rules.                |
| `prettier`    | `true`      | Disable ESLint rules that conflict with Prettier.           |
| `regexp`      | `true`      | Enable recommended RegExp rules.                            |
| `typescript`  | `true`      | Disable it or pass `{ typeChecked: true }`.                 |
| `vue`         | `3`         | Disable it, use `2`/`3`, or pass Vue options.               |

## Exact rule types and completion

The package generates `RuleOptions` from the JSON Schemas published by ESLint core and every bundled plugin. The identity helper `defineRules()` adds editor completion for rule names, severities, and options while rejecting misspelled rules and invalid options at type-checking time.

```js
// @ts-check
import { defineConfig } from "eslint/config";

import { createConfig, defineRules } from "@fast-china/eslint-config";

const projectRules = defineRules({
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used" }],
	"import-x/order": ["error", { "newlines-between": "always" }],
	"vue/attributes-order": ["error", { order: ["DEFINITION", "EVENTS", "CONTENT"] }],
});

export default defineConfig([
	...createConfig(),
	{
		name: "project/rules",
		rules: projectRules,
	},
]);
```

TypeScript configuration and tooling code can use the generated interface directly:

```ts
import type { RuleOptions } from "@fast-china/eslint-config";

const rules = {
	"no-console": ["warn", { allow: ["warn", "error"] }],
} satisfies RuleOptions;
```

The generated set covers ESLint core and plugins bundled by this package. Rules from additional project-installed plugins are outside this type set, and precision ultimately depends on the schema published by each rule.

## Rule risk and maintenance

The default includes a small set of high-impact rules. They can create a large first-run sorting diff, block legacy patterns, or require a review of import side effects, type-only imports, and public component events. Source comments mark these decisions as `[高影响]`, `[可自动修复]`, or `[安全关注]`.

See the [default-rule and risk guide](./docs/rules-risk.md) for inherited presets, the high-impact inventory, scoped override examples, and the maintenance contract. Run a read-only lint before `eslint --fix`, apply fixes in an isolated commit, and review imports, `package.json`, component events, and build output.

## Project overrides

Append project rules after the shared config so they take precedence:

```js
import { defineConfig } from "eslint/config";

import { createConfig } from "@fast-china/eslint-config";

export default defineConfig([
	...createConfig({ vue: 3 }),
	{
		name: "project/overrides",
		rules: {
			"no-console": "off",
		},
	},
]);
```

Reusable named exports include `PresetJavascriptConfigs`, `PresetTypeScriptConfigs`, `PresetBasicConfigs`, `PresetJsonConfigs`, `PresetVueConfigs`, individual config groups, constants, and raw rule records from `@fast-china/eslint-config/rules`.

## Prettier

Prettier is intentionally not a peer dependency and is not executed as an ESLint rule. Install and run it separately if the project uses it:

```sh
pnpm add -D prettier
pnpm exec prettier --check .
```

Set `prettier: false` if another formatter or stylistic rule set should remain fully in control.

## Development

```sh
pnpm install
pnpm typegen
pnpm check
```

Run `pnpm typegen` after upgrading ESLint or a plugin and commit `src/typegen.d.ts`; never edit the generated file manually. `pnpm check` verifies that generated types are current, builds the package, type-checks source, lints all supported file types, checks formatting, and runs both runtime and consumer type tests against the built package.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the contribution workflow, the [default-rule and risk guide](./docs/rules-risk.md) for rule maintenance, and [the engineering audit](./docs/engineering-audit.zh.md) for the current quality baseline.

## Migration from 1.0.48 and earlier

- Existing `export default [...fastChina]` usage still works.
- The package is ESM-only and no longer exposes a misleading CommonJS condition.
- Vue 3 is the explicit default; use `createConfig({ vue: 2 })` for Vue 2.
- `lodash` and `lodash-es` are no longer banned by default. The organization-specific rule records remain available from the rules subpath.
- Prettier no longer runs inside ESLint. Run the Prettier CLI or editor integration separately.
- ESLint 10 now determines the Node.js minimum shown above.

## License

[Apache-2.0](./LICENSE)
