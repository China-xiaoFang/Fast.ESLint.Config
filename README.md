[中文](./README.zh.md) | **English**

# @fast-china/eslint-config

A practical, typed ESLint Flat Config for Vue 3, React, Angular, Vite, TypeScript, and JavaScript projects.

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config)
[![license](https://img.shields.io/npm/l/@fast-china/eslint-config)](./LICENSE)

## Highlights

- Built for ESLint 10 and the native Flat Config format.
- Vue 3 + TypeScript + Vite defaults; React and Angular are first-class opt-in integrations, so existing Vue projects do not activate unrelated rules.
- First-class JavaScript, TypeScript, Vue SFC, JSX/TSX, Angular TypeScript and templates, JSON dialects, Markdown, RegExp, and import rules.
- One focused `fastConfig()` factory with a compact public API and no project-file reads at module import time.
- Schema-generated rule types provide exact rule-name and rule-option completion.
- Plugins and parsers are regular package dependencies, so consumers do not need to assemble the plugin graph.
- Prettier stays a formatter: the default only disables conflicting ESLint rules and does not run Prettier inside ESLint.
- Manifest sorting is explicit opt-in, preventing an unexpected large first-fix diff.
- An opt-in Lodash policy keeps projects on either `lodash` or `lodash-unified` without mixing package entry points.

## Requirements

- Node.js `^22.18.0` or `>=24.11.0`
- ESLint `^10.0.0`
- TypeScript `>=6.0.0 <6.1.0`

These versions follow the runtime requirements of ESLint 10 and the included language plugins.

## Installation

```sh
pnpm add -D eslint typescript @fast-china/eslint-config
```

Equivalent npm, Yarn, and Bun commands work as well.

## Quick start: Vue 3 + Vite

Create `eslint.config.mjs`:

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina();
```

The default enables Vue 3, TypeScript, JavaScript, JSON dialects, Markdown, import ordering, RegExp checks, `.gitignore`, browser globals, and Node globals for common config, script, test, and CLI files.

## Other project types

Use the default `fastConfig()` factory to keep only what a project needs.

### React + Vite

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina({
	react: true,
	vue: false,
});
```

React support applies the modern `@eslint-react` JavaScript/TypeScript preset, the official React Hooks Flat Config, and additional DOM safety checks. JSX and TSX are parsed by the existing JavaScript and TypeScript integrations. For a React-compatible JSX runtime such as Preact, set `react: { importSource: "preact" }`.

### Angular

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina({
	angular: true,
	vue: false,
});
```

Angular support checks framework TypeScript, external `.html` templates, and inline component templates. Template accessibility and inline-template extraction are enabled by default:

```js
export default fastChina({
	angular: {
		inlineTemplates: true,
		templateAccessibility: true,
	},
	vue: false,
});
```

Angular requires the TypeScript integration; `angular: true` together with `typescript: false` fails early with a clear configuration error.

### Node.js + TypeScript

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina({
	environment: "node",
	vue: false,
});
```

### JavaScript only

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina({
	environment: "node",
	json: false,
	markdown: false,
	typescript: false,
	vue: false,
});
```

### Type-aware TypeScript rules

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina({
	typescript: {
		tsconfigRootDir: import.meta.dirname,
		typeChecked: true,
	},
});
```

Type-aware linting uses the typescript-eslint Project Service. Project files must belong to a `tsconfig.json`. Most projects can omit `tsconfigRootDir`; complex monorepos should pass the directory containing the ESLint config explicitly.

## Options

| Option            | Default     | Purpose                                                                    |
| ----------------- | ----------- | -------------------------------------------------------------------------- |
| `angular`         | `false`     | Enable Angular TypeScript and templates, or pass Angular-specific options. |
| `environment`     | `"browser"` | Use `"browser"`, `"node"`, or `"universal"` globals.                       |
| `globals`         | none        | Add globals supplied by a host platform or test runner.                    |
| `gitignore`       | `true`      | Read ignore patterns from the project `.gitignore`.                        |
| `ignores`         | `[]`        | Append project-specific global ignore patterns.                            |
| `imports`         | `true`      | Enable import-x correctness and ordering rules.                            |
| `javascript`      | `true`      | Process JavaScript and JSX files.                                          |
| `json`            | `true`      | Enable recommended JSON, JSONC, and JSON5 rules.                           |
| `lodash`          | `false`     | Select `"lodash"` or `"lodash-unified"` for static imports.                |
| `markdown`        | `true`      | Enable the official Markdown language rules.                               |
| `prettier`        | `true`      | Disable ESLint rules that conflict with Prettier.                          |
| `react`           | `false`     | Enable React/JSX/Hooks, or pass runtime and React-version settings.        |
| `regexp`          | `true`      | Enable recommended RegExp rules.                                           |
| `rules`           | none        | Add exactly typed project rules to every enabled code file.                |
| `sortPackageJson` | `false`     | Sort safe package.json keys without entering conditional `exports`.        |
| `sortTsconfig`    | `false`     | Sort `tsconfig*.json` by TypeScript documentation topics.                  |
| `typescript`      | `true`      | Disable it or pass `{ typeChecked: true, tsconfigRootDir }`.               |
| `vue`             | `true`      | Enable Vue 3 single-file components.                                       |

## Framework coverage

Vue 3, React, and Angular have dedicated parsers or processors, presets, options, generated rule types, and integration tests. Nuxt can use the Vue base; Next.js and Remix can use the React base, then append their framework-specific Flat Config after `fastConfig()` when needed. React-compatible JSX runtimes can use `react.importSource`.

Svelte, Astro, and Solid use different template or compiler semantics and are not presented as first-class integrations yet. Their official Flat Config can already be appended as a trailing override, but first-class switches should only be added together with the correct parser, processor, rule schemas, documentation, and runtime fixtures.

## Lodash import policy

The default, `lodash: false`, leaves the dependency choice to the project. Select one policy when every static import should use the same package:

- `lodash: "lodash-unified"` rejects static imports and re-exports from `lodash`, `lodash-es`, and their subpaths.
- `lodash: "lodash"` rejects static imports and re-exports from `lodash-es`, `lodash-unified`, and their subpaths. The `lodash` root and `lodash/*` method imports remain valid.

Choose `lodash-unified`:

```sh
pnpm add lodash-unified
```

```js
import fastChina from "@fast-china/eslint-config";
import { cloneDeep, debounce } from "lodash-unified";

export default fastChina({ lodash: "lodash-unified" });
```

Choose standard `lodash`:

```sh
pnpm add lodash
pnpm add -D @types/lodash
```

```js
import fastChina from "@fast-china/eslint-config";
import debounce from "lodash/debounce";

export default fastChina({ lodash: "lodash" });
```

This feature uses ESLint core `no-restricted-imports`, adds no plugin, and does not install Lodash for the project. It checks static `import`/`export` only, not dynamic `import()` or CommonJS `require()`. Setting `imports: false` disables import-x but leaves an explicitly selected Lodash policy active.

If a later `rules` record or file-scoped override sets `no-restricted-imports`, ESLint replaces this complete policy instead of merging its options. Projects that need additional package restrictions can import raw `preferLodashRules` or `preferLodashUnifiedRules` from `@fast-china/eslint-config/rules` and maintain one combined rule.

## Exact rule types and completion

The package generates `RuleOptions` from the JSON Schemas published by ESLint core and every bundled plugin. The identity helper `defineRules()` adds editor completion for rule names, severities, and options while rejecting misspelled rules and invalid options at type-checking time.

```js
// @ts-check
import fastChina, { defineRules } from "@fast-china/eslint-config";

const projectRules = defineRules({
	"@angular-eslint/template/alt-text": "error",
	"@eslint-react/dom-no-missing-button-type": "error",
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used" }],
	"import-x/order": ["error", { "newlines-between": "always" }],
	"react-hooks/exhaustive-deps": "warn",
	"vue/attributes-order": ["error", { order: ["DEFINITION", "EVENTS", "CONTENT"] }],
});

export default fastChina(
	{ rules: projectRules },
	{
		files: ["**/*.generated.ts"],
		name: "project/generated",
		rules: defineRules({ "@typescript-eslint/no-unused-vars": "off" }),
	}
);
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

The default includes a small set of high-impact rules. They can block particular patterns or require a review of import side effects, type-only imports, and public component events. React and Angular are disabled globally by default, but enabling them also enables their documented modern-framework and accessibility policies. Manifest sorting is high-impact and disabled by default. Source comments mark these decisions as `[高影响]`, `[可自动修复]`, `[安全关注]`, or `[按需启用]`.

See the [default-rule and risk guide](./docs/rules-risk.md) for inherited presets, the high-impact inventory, scoped override examples, and the maintenance contract. Run a read-only lint before `eslint --fix`, apply fixes in an isolated commit, and review imports, `package.json`, component events, and build output.

## Project overrides

Put common overrides in `rules`, and pass file-scoped overrides as later arguments. Later configurations take precedence:

```js
import fastChina, { defineRules } from "@fast-china/eslint-config";

export default fastChina(
	{
		rules: {
			"no-console": "warn",
		},
	},
	{
		files: ["**/{scripts,tests}/**/*.{js,ts}"],
		name: "project/node-files",
		rules: defineRules({ "no-console": "off" }),
	}
);
```

The root entry exports only `fastConfig`, `defaultConfigOptions`, `defineRules`, and their related types. Advanced consumers can import the fully commented raw rule records from `@fast-china/eslint-config/rules`.

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
pnpm pack --dry-run
```

Run `pnpm typegen` after upgrading ESLint or a plugin and commit `src/typegen.d.ts`; never edit the generated file manually. `pnpm check` verifies that generated types are current, builds the package, type-checks source, lints all supported file types, checks formatting, and runs both runtime and consumer type tests against the built package.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the contribution workflow, the [default-rule and risk guide](./docs/rules-risk.md) for rule maintenance, and [the engineering audit](./docs/engineering-audit.zh.md) for the current quality baseline.

## License

[Apache-2.0](./LICENSE)
