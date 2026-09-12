<p align="left">
	<a href="./README.zh.md">简体中文</a> | <strong>English</strong>
</p>

<p align="center">
	<img src="./Fast.png" alt="logo" width="160" />
</p>

# @fast-china/eslint-config

A practical ESLint Flat Config for Vue 3, UniApp, SDKs, Node.js, React, Angular, TypeScript, and JavaScript projects.

The policy starts from common ecosystem conventions and concise, readable code. It then prioritizes real bugs and type safety, consistency, and finally Fast project preferences. It does not force unusual rewrites merely to satisfy ESLint.

## Highlights

- ESLint 10 with native Flat Config only.
- Separate complete configurations for Vue 3 and UniApp; plain Vue projects do not receive UniApp globals, `.nvue` parsing, or manifest behavior.
- TypeScript uses `recommendedTypeChecked` and Project Service without the complete strict or stylistic presets.
- Exported `.ts`, `.mts`, and `.cts` boundaries are treated as SDK public APIs; `.tsx` retains full type safety and normal component return inference.
- SDKs and applications share one JavaScript, TypeScript, Import, and RegExp policy.
- `package.json` and `tsconfig*.json` sorting is enabled by default; React, Angular, Markdown, and Lodash compose explicitly from `./configs`.
- Schema-generated `RuleOptions` provides precise rule-name and option completion.

## Requirements

- Node.js `^22.18.0` or `^24.18.0`
- ESLint `^10.0.0`
- TypeScript `^6.0.0`

```sh
pnpm add -D eslint typescript @fast-china/eslint-config
```

## Vue 3

```js
import { vueConfig } from "@fast-china/eslint-config";

export default vueConfig;
```

This entry covers JavaScript, type-aware TypeScript, Vue SFCs, and standalone `.jsx`/`.tsx` components used by Vue projects. Vue JSX/TSX keeps checks for explicit emits, duplicate keys, readonly props, reactivity loss, and reserved component names without inheriting template-only kebab-case, attribute-order, or `v-text`/`v-html` rules. The entry also includes JSON, Import, RegExp, `.gitignore`, and Prettier compatibility without loading UniApp capabilities.

## UniApp

```js
import { uniAppConfig } from "@fast-china/eslint-config";

export default uniAppConfig;
```

The UniApp entry adds `.nvue`, `uni`, `uniCloud`, page APIs, conditional-platform globals, the `unpackage` ignore, and comment handling for `pages.json` and `manifest.json`.

ESLint does not execute `#ifdef` or `#endif`, so it can recognize platform objects but cannot prove that they occur in the correct branch. `.uvue` and `.uts` remain unsupported because they require dedicated parsers.

## Factories and project overrides

The root entry provides explicit named configurations and factories. Use a factory when the project needs to select its runtime environment or append overrides:

```js
import { createVueProjectConfigs, defineRules } from "@fast-china/eslint-config";

export default createVueProjectConfigs(
	{ environment: "universal" },
	{
		ignores: ["public/vendor/**"],
		languageOptions: {
			globals: {
				__APP_VERSION__: "readonly",
			},
		},
		rules: defineRules({
			"no-console": "warn",
		}),
	}
);
```

Available factories:

- `createVueProjectConfigs(options, ...overrides)`
- `createUniAppProjectConfigs(options, ...overrides)`
- `createBaseConfigs(options)` for framework-neutral Node.js, SDK, and explicit composition

`environment` accepts `"browser"`, `"node"`, or `"universal"` and defaults to `"browser"`. Configuration, script, test, and CLI files always receive Node.js globals separately.

Trailing Flat Config objects have the highest precedence. `defineRules()` returns its input unchanged and only adds precise rule typing.

## TypeScript policy

Type-aware files must belong to a `tsconfig.json` discoverable by Project Service.

- `explicit-module-boundary-types: "error"` requires explicit parameter and return types for exported `.ts`, `.mts`, and `.cts` functions and public boundaries of exported classes.
- `.tsx` disables the module-boundary annotation requirement by default: component props remain type checked without forcing an otherwise inferable JSX return annotation.
- `explicit-function-return-type: "off"` leaves internal functions, local handlers, and inline callbacks to TypeScript inference.
- `no-inferrable-types` preserves explicit parameter and property types.
- Vue/NVue SFCs and standalone TSX components do not require module-boundary or function-return annotations, retaining common concise component forms.
- `no-floating-promises` is disabled because Promise waiting depends on business ordering and error semantics.
- `no-void: "error"` rejects `void promise` and other `void` expressions as lint workarounds.
- `require-await: "error"` requires removing `async` when there is no real `await`, avoiding changed return and exception semantics.
- `no-misused-promises`, `await-thenable`, unsafe-type rules, and selected high-confidence type rules remain errors.
- Standard non-null assertions are permitted; contradictory, redundant, or invalid assertions remain checked by focused rules.
- Numbers and booleans may be interpolated directly in template strings, and runtime guards are not rejected merely because types make them look unnecessary.

## JavaScript, Import, and Vue policy

- `no-empty` permits a completely empty `catch` while reporting other empty blocks.
- `camelcase: ["error", { properties: "never" }]` applies to variables and types while preserving external protocol property names.
- Real-risk rules such as `no-eval`, `no-implied-eval`, `no-new-func`, and `no-debugger` remain errors.
- `import-x/first`, `import-x/no-duplicates`, and `import-x/order` are errors; declaration ordering supports automatic fixes.
- Common path groups cover UniApp, Vue, React, Angular, Vite, Element Plus, Fast, and Lodash. `@/**` is internal, and type imports do not participate in path-group matching.
- `sort-imports` checks only member order inside one import declaration and does not order declarations.
- `import-x/style-imports-last` keeps stylesheets in the final contiguous group without reordering that group internally.
- Vue SFCs use the official `flat/recommended`; script-semantic checks for explicit emits, duplicate keys, readonly props, reactivity loss, and reserved component names also apply to Vue JSX/TSX.
- Kebab-case attributes, template attribute ordering, and component `v-text`/`v-html` remain limited to `.vue/.nvue` templates; JSX attributes retain JavaScript camelCase conventions. `no-v-html` remains a warning.

## React and Angular

```js
import { createBaseConfigs } from "@fast-china/eslint-config";
import { createReactConfigs } from "@fast-china/eslint-config/configs";
import { defineConfig } from "eslint/config";

export default defineConfig([...createBaseConfigs(), ...createReactConfigs()]);
```

Angular composes `createAngularConfigs()` in the same way. The base configuration loads neither Vue nor UniApp.

## Optional capabilities and manifest sorting

Markdown and Lodash import policy require explicit composition:

```js
import { createBaseConfigs } from "@fast-china/eslint-config";
import { createMarkdownConfigs } from "@fast-china/eslint-config/configs";
import { defineConfig } from "eslint/config";

export default defineConfig([...createBaseConfigs({ environment: "node" }), ...createMarkdownConfigs()]);
```

`createBaseConfigs()`, `vueConfig`, and `uniAppConfig` all enable `package.json` and `tsconfig*.json` sorting by default. Package sorting does not enter conditional `exports` objects whose order has runtime meaning.

## Public entries

- `@fast-china/eslint-config`: named exports for both complete configurations, the project factories, `defineRules`, `ProjectConfigOptions`, and `RuleOptions`; no default export or legacy aliases are provided.
- `@fast-china/eslint-config/configs`: framework and optional feature fragments.
- `@fast-china/eslint-config/constants`: file globs and UniApp globals.
- `@fast-china/eslint-config/rules`: typed raw rule records.

## Prettier

Prettier does not run as an ESLint rule. The defaults only load `eslint-config-prettier` to disable conflicting rules; projects install and run Prettier separately.

## Documentation

- [Complete rule reference (Chinese)](./docs/rules/index.zh.md)
- [Default rules and risk guide](./docs/rules-risk.md)
- [Chinese engineering audit](./docs/engineering-audit.zh.md)
- [Changelog](./CHANGELOG.md)

Each rule-reference category lists repository-explicit rules before third-party preset rules, and every rule includes direct incorrect and correct code examples.

## Development

```sh
pnpm install --frozen-lockfile
pnpm typegen
pnpm check
```
