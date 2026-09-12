# Default Rules and Risk Guide

This guide describes the current configuration model, major rules, and auto-fix risks. Source comments explain current intent; historical differences belong in `CHANGELOG.md`.

## Policy

Rules are selected in this order:

1. Follow common JavaScript, TypeScript, and Vue conventions while keeping code concise and readable.
2. Detect real bugs and type-safety problems.
3. Preserve cross-project consistency.
4. Apply Fast project style preferences last.

Rules that only satisfy ESLint by changing valid semantics, adding boilerplate, or forcing uncommon forms do not belong in the defaults.

## Configuration model

Vue 3 and UniApp are separate named complete configurations from the root entry:

- `vueConfig` handles plain Vue projects only.
- `uniAppConfig` adds `.nvue`, UniApp globals, manifest behavior, and the `unpackage` ignore.

The root entry has no default export. It exposes `vueConfig`, `uniAppConfig`, `createVueProjectConfigs()`, `createUniAppProjectConfigs()`, `createBaseConfigs()`, `defineRules()`, and their types.

SDKs, Node.js, and other framework-neutral projects use `createBaseConfigs()`. React, Angular, Markdown, and Lodash compose explicitly from `./configs`; manifest sorting is part of every complete configuration.

## Preset sources

| Domain     | Preset or implementation                                                   |
| ---------- | -------------------------------------------------------------------------- |
| JavaScript | `@eslint/js` recommended plus local high-confidence rules                  |
| TypeScript | typescript-eslint `recommendedTypeChecked` plus Project Service            |
| Vue        | `eslint-plugin-vue` `flat/recommended` plus type-aware TypeScript          |
| React      | `@eslint-react` recommended/type-checked plus React Hooks Flat Recommended |
| Angular    | Angular ESLint TypeScript, template, and accessibility recommended presets |
| JSON       | `eslint-plugin-jsonc` recommended presets for three dialects               |
| Import     | `eslint-plugin-import-x` recommended plus a general ordering warning       |
| RegExp     | Explicit correctness, safety, and super-linear backtracking rules          |
| Prettier   | `eslint-config-prettier` conflict disabling                                |

The complete `strictTypeChecked`, `stylisticTypeChecked`, and mechanical `all` presets are not enabled. Extra rules are limited to low-false-positive checks that directly improve correctness or readability.

## JavaScript and Import

- `camelcase: ["error", { properties: "never" }]` applies to variables and types while external protocol properties retain their original names.
- `no-empty` permits a completely empty `catch` and reports other empty blocks.
- `no-void` is an error; `void` is not used to hide a Promise or express an ignored return value.
- Real-risk rules such as `no-eval`, `no-implied-eval`, `no-new-func`, `no-promise-executor-return`, and `no-debugger` are errors.
- `curly` requires consistent braces only for multiline branches and does not force braces on every single-line branch.
- `import-x/first` and `import-x/no-duplicates` are errors.
- `import-x/order` is an error and fixes declaration order; common framework, tool, and `@/**` path groups extend the general groups.
- `pathGroupsExcludedImportTypes: ["type"]` keeps type imports in the final type group.
- Non-style side-effect imports participate in ordering. `style-imports-last` requires a final contiguous stylesheet group without sorting within it, preserving CSS cascade order.
- `sort-imports` is an error and only normalizes members inside one import declaration; `prefer-object-has-own` is not enabled.

## TypeScript

TypeScript always uses Project Service and `recommendedTypeChecked`. Linted files must belong to a discoverable `tsconfig.json`.

- `.ts`, `.mts`, and `.cts` files are SDK-like module boundaries: `explicit-module-boundary-types` is an error, so exported functions and public boundaries of exported classes require explicit types.
- `.tsx` files are UI component files: type-aware correctness rules remain enabled, but module-boundary annotations are not required for inferable JSX return types.
- `explicit-function-return-type` is disabled, leaving internal functions, local handlers, and callbacks to TypeScript inference.
- `no-inferrable-types` preserves explicit parameter and property types and only removes annotations without contract value, such as obvious local-variable types.
- Vue/NVue SFCs and standalone TSX components disable module-boundary and function-return requirements to preserve common concise component forms.
- `no-floating-promises` is disabled because waiting, returning, or handling a Promise depends on business semantics.
- `require-await` is an error; an `async` function without `await` changes return and exception semantics and should lose `async`.
- `no-misused-promises`, `await-thenable`, unsafe-type rules, exhaustive switches, getter/setter compatibility, and other high-confidence checks are errors.
- `return-await` requires `await` only when needed for correct error handling.
- Standard non-null assertions are permitted, while contradictory optional-chain or nullish-coalescing combinations remain errors.
- `no-explicit-any` and `no-deprecated` warn.
- `no-unnecessary-condition`, `unified-signatures`, and syntax-only preferences are disabled to preserve runtime guards and public overloads.
- Template strings allow numbers and booleans; dynamic property deletion and static utility classes are not forcibly rewritten.
- `prefer-nullish-coalescing` does not force primitive values from `||` to `??`; `prefer-optional-chain` applies only when the type explicitly contains null or undefined.

## Vue

- The official `flat/recommended` preset is the general Vue baseline.
- `no-v-html` warns so XSS risk is visible while sanitized content remains possible.
- `require-explicit-emits`, `no-dupe-keys`, `no-mutating-props`, `no-setup-props-reactivity-loss`, `no-ref-object-reactivity-loss`, and `no-reserved-component-names` are errors for Vue SFC and Vue JSX/TSX component scripts.
- `attribute-hyphenation`, `no-v-text-v-html-on-component`, and `attributes-order` remain limited to `.vue/.nvue` templates; `attributes-order` sorts definition, list-rendering, conditional, render-modifier, unique, global, ordinary, event, and content attributes.
- JSX attributes retain JavaScript camelCase conventions and do not inherit the template kebab-case rule.
- Setup props/ref reactivity loss and invalid custom-event names remain errors.

## UniApp boundary

Only the UniApp entry declares `uni`, `uniCloud`, page APIs, and conditional-platform objects such as `wx`, `plus`, `my`, and `tt`. The plain Vue entry neither receives these globals nor ignores `unpackage`.

ESLint does not execute conditional compilation. It can avoid `no-undef` inside platform branches but cannot prove that an object occurs under the correct `#ifdef`.

## Manifest sorting and auto-fix

`package.json` and `tsconfig*.json` sorting is enabled by default in `createBaseConfigs()`, `vueConfig`, and `uniAppConfig`. The individual factories remain available for custom composition.

Review these fixes carefully:

- Import groups, path groups, type-import placement, and non-style side-effect import order.
- Stylesheet imports are only checked for final placement and are not moved or reordered automatically.
- Separate TypeScript `import type` and `export type` declarations.
- Default manifest key ordering.

Check before fixing:

```sh
pnpm exec eslint .
pnpm exec eslint . --fix
```

## Maintenance policy

1. Inspect effective rules after recommended preset upgrades so upstream changes do not silently alter severity.
2. Every new rule must explain the real problem it catches, its false-positive boundary, and whether it auto-fixes.
3. Frameworks add parsers, file scopes, and framework semantics without creating another language strictness tier.
4. Public entries, parser scopes, or auto-fix changes require matching type, runtime, and package tests.
