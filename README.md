<p align="left">
	<a href="./README.zh.md">简体中文</a> | <strong>English</strong>
</p>

<p align="center">
	<img src="./Fast.png" alt="logo" width="160" />
</p>

# @fast-china/eslint-config

A practical ESLint Flat Config for Vue 3, UniApp, React, Angular, Vite, TypeScript, and JavaScript projects.

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config) [![Node.js](https://img.shields.io/badge/node-%5E22.18%20%7C%7C%20%5E24.18-brightgreen)](https://nodejs.org/) [![ESLint](https://img.shields.io/badge/eslint-%5E10.0-4b32c3)](https://eslint.org/) [![license](https://img.shields.io/npm/l/@fast-china/eslint-config)](./LICENSE)

## Features

- Built for ESLint 10 and native Flat Config only.
- The root entry is a fixed Vue 3 + TypeScript + UniApp preset with no language or plugin switches.
- TypeScript, Vue, and React TypeScript always use type-aware recommended rules and Project Service.
- SDKs, OA systems, administration apps, and clients use one JavaScript, TypeScript, Import, and RegExp rule set with no strictness tiers.
- JavaScript, TypeScript, Vue/`.nvue`, UniApp globals, JSON dialects, Import, RegExp, manifest sorting, `.gitignore`, and Prettier compatibility are enabled by default.
- React, Angular, Markdown, and Lodash policies compose explicitly from `@fast-china/eslint-config/configs`.
- Schema-generated `RuleOptions` provides exact rule-name and option completion.
- Plugins and parsers are direct package dependencies, so consumers do not assemble a plugin dependency tree.

## Requirements

- Node.js `^22.18.0` or `^24.18.0`
- ESLint `^10.0.0`
- TypeScript `^6.0.0`

## Installation

```sh
pnpm add -D eslint typescript @fast-china/eslint-config
```

## Vue 3 / UniApp quick start

Create `eslint.config.mjs`:

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina;
```

The default entry includes:

- Browser globals plus dedicated Node.js globals for tooling files.
- JavaScript, type-aware TypeScript, Vue 3, and `.nvue`.
- `uni`, `uniCloud`, page APIs, and conditional-platform globals such as `wx`, `plus`, `my`, and `tt`.
- JSON, JSONC, JSON5, comment-compatible `pages.json`, `manifest.json`, and VS Code `settings.json` and `extensions.json`.
- Import, RegExp, `package.json`/`tsconfig*.json` sorting, `.gitignore`, and Prettier conflict handling.

ESLint does not execute UniApp `#ifdef`/`#endif` directives. It recognizes platform objects but cannot verify that they are used in the correct platform branch. `.uvue` and `.uts`, which require dedicated parsers, are not handled.

## `fastConfig()`

The root factory retains only `environment`, whose default is `"browser"`:

```js
import { fastConfig } from "@fast-china/eslint-config";

export default fastConfig({
	environment: "universal",
});
```

| Value         | Application globals |
| ------------- | ------------------- |
| `"browser"`   | Browser             |
| `"node"`      | Node.js             |
| `"universal"` | Browser and Node.js |

Config, script, test, and CLI files always receive Node.js globals and allow necessary logging and CommonJS interoperability.

## Project overrides

Rules, globals, ignores, and special parser settings use trailing Flat Config objects instead of root factory options:

```js
import { defineRules, fastConfig } from "@fast-china/eslint-config";

export default fastConfig(
	{ environment: "browser" },
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
	},
	{
		files: ["**/*.generated.ts"],
		rules: defineRules({
			"@typescript-eslint/no-unused-vars": "off",
		}),
	}
);
```

Trailing configs have the highest precedence. `defineRules()` leaves the object unchanged and only adds exact type checking.

## TypeScript

`createTypeScriptConfigs()`, Vue SFCs, and React TSX always use `strictTypeChecked` plus `stylisticTypeChecked` with:

```js
parserOptions: {
	projectService: true,
	extraFileExtensions: [".vue", ".nvue"],
}
```

Linted files must belong to a discoverable `tsconfig.json`. The same `extraFileExtensions` list is applied to TypeScript, TSX, Vue, and NVue files so Project Service does not reload the project while linting mixed file types. The `typeChecked` and `tsconfigRootDir` wrapper options have been removed. Complex monorepos can override `languageOptions.parserOptions` in a trailing Flat Config when necessary, but every type-aware file override in the same project must keep `extraFileExtensions` identical.

Developers decide whether a Promise must be awaited, returned, or handled from the required ordering and error semantics. Therefore, `no-floating-promises` and `strict-void-return` are disabled, framework allowlists are unnecessary, and `void promise` is rejected. `no-misused-promises`, `await-thenable`, `require-await`, and the unsafe type rules remain strict, so invalid async callbacks, invalid `await` expressions, and `async` functions without asynchronous behavior are still reported.

`return-await` keeps the strict preset's `error-handling-correctness-only` mode instead of forcing stylistic `await` expressions.

Named TypeScript and TSX functions and module boundaries require explicit types, while inline callbacks and already typed function expressions keep contextual inference. Vue/NVue SFCs disable function-return and module-boundary annotations and allow unused parameters in declarative callbacks such as `defineEmits` validators; unused variables and imports are still reported. Standalone SFC handler parameters that cannot be inferred back from templates still require explicit types.

Type-only exports use `export type`, and private members assigned only during construction use `readonly`. Primitive values retain the semantic choice between `||` and `??`, while public overloads with different parameter names or standalone JSDoc are preserved. Shared JavaScript rules reject `eval` and the `void` operator, require consistent braces for multiline branches, and place an existing `default` branch last.

## React

React projects compose from the framework-neutral base:

```js
import { createBaseConfigs } from "@fast-china/eslint-config";
import { createReactConfigs } from "@fast-china/eslint-config/configs";
import { defineConfig } from "eslint/config";

export default defineConfig([...createBaseConfigs(), ...createReactConfigs()]);
```

The base provides the shared JavaScript, type-aware TypeScript, JSON, Import, RegExp, manifest sorting, and Prettier compatibility. The React fragment adds `@eslint-react`, the official Hooks Recommended preset, and DOM safety rules without loading Vue or UniApp globals.

React-compatible runtimes can pass recognition settings:

```js
export default defineConfig([...createBaseConfigs(), ...createReactConfigs({ importSource: "preact", version: "detect" })]);
```

## Angular

```js
import { createBaseConfigs } from "@fast-china/eslint-config";
import { createAngularConfigs } from "@fast-china/eslint-config/configs";
import { defineConfig } from "eslint/config";

export default defineConfig([...createBaseConfigs(), ...createAngularConfigs()]);
```

The Angular fragment checks TypeScript source, external HTML templates, and component inline templates. Official template accessibility rules are enabled by default. Exceptional projects can still configure:

```js
createAngularConfigs({
	inlineTemplates: false,
	templateAccessibility: false,
});
```

## Node.js / SDK

Projects that do not need Vue, UniApp, React, or Angular use the base directly:

```js
import { createBaseConfigs } from "@fast-china/eslint-config";

export default createBaseConfigs({ environment: "node" });
```

`createBaseConfigs()` always enables JavaScript, type-aware TypeScript, JSON, Import, RegExp, manifest sorting, `.gitignore`, and Prettier compatibility, but does not claim framework files.

## Markdown and Lodash

Markdown composes explicitly:

```js
import { createBaseConfigs } from "@fast-china/eslint-config";
import { createMarkdownConfigs } from "@fast-china/eslint-config/configs";
import { defineConfig } from "eslint/config";

export default defineConfig([...createBaseConfigs(), ...createMarkdownConfigs()]);
```

Lodash static-import policies are also standalone:

```js
import { createLodashConfigs } from "@fast-china/eslint-config/configs";

createLodashConfigs("lodash");
createLodashConfigs("lodash-unified");
```

## Public entries

The root entry exports only:

- The default Vue 3 + TypeScript + UniApp Flat Config.
- `fastConfig`, `createBaseConfigs`, and `FastConfigOptions`.
- `defineRules` and `RuleOptions`.

Focused subpaths provide advanced composition:

- `@fast-china/eslint-config/configs`: framework and capability fragments.
- `@fast-china/eslint-config/constants`: file globs and UniApp globals.
- `@fast-china/eslint-config/rules`: typed raw rule records.

## Prettier

Prettier does not run as an ESLint rule. The default only loads `eslint-config-prettier` to disable conflicting rules. Install and run formatting separately:

```sh
pnpm add -D prettier
pnpm exec prettier --check .
```

## Documentation

- [Default rules and risk guide](./docs/rules-risk.md)
- [Engineering quality audit](./docs/engineering-audit.zh.md)
- [Contributing guide](./CONTRIBUTING.md)
- [Security policy](./SECURITY.md)
- [Changelog](./CHANGELOG.md)

## Development

```sh
pnpm install --frozen-lockfile
pnpm typegen
pnpm check
pnpm pack --dry-run
```

Run `pnpm typegen` after upgrading ESLint or plugins and commit `src/typegen.d.ts`. `pnpm check` verifies types, builds, runtime behavior, package contracts, ESLint, and formatting.

## License

[Apache-2.0](./LICENSE)
