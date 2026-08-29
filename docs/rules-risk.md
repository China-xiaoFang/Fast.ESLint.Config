# Default Rules and Risk Guide

This document describes the current 2.1.3 configuration model, major rules, and migration risks. Source comments explain current intent only; historical changes belong in `CHANGELOG.md`.

## Configuration model

SDKs, OA systems, administration apps, Vue web apps, and UniApp clients share one JavaScript, TypeScript, Import, and RegExp rule set. There are no strictness tiers.

The root entry is a fixed Vue 3 + TypeScript + UniApp preset:

- `environment: "browser"`
- `.gitignore`
- JavaScript and type-aware TypeScript
- Vue 3, `.nvue`, UniApp globals, and manifest handling
- Import, RegExp, JSON, JSONC, and JSON5
- `package.json` and `tsconfig*.json` sorting
- Prettier conflict handling
- Node.js tooling globals and trailing rule overrides

`fastConfig()` retains only `environment`. React, Angular, Markdown, and Lodash compose from `./configs`; rules, globals, ignores, and special parser settings use trailing Flat Config objects.

## Preset sources

| Domain     | Preset or implementation                                                   |
| ---------- | -------------------------------------------------------------------------- |
| JavaScript | `@eslint/js` recommended plus local rules                                  |
| TypeScript | typescript-eslint `recommendedTypeChecked` plus Project Service            |
| Vue        | `eslint-plugin-vue` `flat/recommended` plus type-aware TypeScript          |
| React      | `@eslint-react` recommended/type-checked plus React Hooks Flat Recommended |
| Angular    | Angular ESLint TypeScript, template, and accessibility recommended presets |
| JSON       | `eslint-plugin-jsonc` recommended presets for three dialects               |
| Import     | `eslint-plugin-import-x` recommended plus a fixed ordering policy          |
| RegExp     | Explicit correctness, safety, and super-linear backtracking rules          |
| Prettier   | `eslint-config-prettier` conflict disabling                                |

## Major rules

### JavaScript

- `camelcase: ["error", { properties: "never" }]`
- `no-debugger: "error"`
- `no-use-before-define` warns; classes and variables must be declared first while function declarations may be hoisted.
- `prefer-arrow-callback`, `logical-assignment-operators`, and `prefer-object-spread` are errors.
- `prefer-exponentiation-operator` and `prefer-object-has-own` are errors.
- `sort-imports` warns and only sorts members within one import.
- `import-x/order` is an error with `warnOnUnassignedImports: true` and `sortTypesGroup: true`; ordinary side-effect imports remain checked, type imports are ordered by source category inside the final type group, and stylesheet imports do not participate in this rule.
- `import-x/style-imports-last` is an error; CSS, SCSS, LESS, and related styles must form the final contiguous import group, with their internal order preserved and no automatic fix.

### TypeScript

- `recommendedTypeChecked` and `projectService: true` are always enabled.
- `explicit-module-boundary-types` is an error and does not allow explicitly typed `any` arguments as an escape hatch.
- `explicit-function-return-type` is not additionally enabled, so internal functions and callbacks can rely on inference.
- `no-explicit-any` warns.
- `no-unused-vars` is an error; an `_` prefix marks intentional omissions and rest siblings are ignored.
- `no-empty-function` only allows empty constructors and override methods.
- `consistent-type-imports` fixes type-only dependencies as separate `import type` declarations.
- `no-non-null-assertion` is an error.

### Vue

- Uses `flat/recommended`.
- `attribute-hyphenation: ["error", "always"]`.
- `no-v-html` warns.
- `no-v-text-v-html-on-component` is an error.
- `require-explicit-emits`, `attributes-order`, and `no-mutating-props` are errors.
- `.vue` and `.nvue` share the TypeScript parser and Project Service.

## Type-aware requirements

TypeScript, Vue, and React TSX always require type information. Linted files must belong to a discoverable `tsconfig.json`, or Project Service reports a configuration error.

The `typeChecked` and `tsconfigRootDir` wrapper options no longer exist. Complex monorepos can override `languageOptions.parserOptions` in trailing Flat Config, but should not disable type checking to hide project-boundary problems.

## UniApp boundary

The root entry declares `uni`, `uniCloud`, page APIs, and conditional-platform objects, and permits comments in `pages.json` and `manifest.json`.

ESLint does not execute conditional compilation, so `wx`, `plus`, and similar objects are visible in every code file handled by the root entry. This prevents `no-undef` inside platform branches but cannot verify that objects occur under the correct `#ifdef`. Plain Vue projects that do not want these globals should compose focused fragments instead of using the root entry.

## Auto-fix risks

Review these fixes carefully:

- Import groups, type-source categories, member order, and side-effect import placement.
- Separate TypeScript `import type` declarations.
- Vue attribute naming and ordering.
- `package.json` and `tsconfig*.json` key order.

`package.json` sorting does not enter conditional `exports` objects whose order has runtime meaning.

Run a check first:

```sh
pnpm exec eslint .
```

Then apply fixes after reviewing the scope:

```sh
pnpm exec eslint . --fix
```

## Maintenance policy

1. Rule comments explain current behavior, risk, and exceptions without referring to historical versions.
2. After upgrading recommended presets, inspect the final effective rules to prevent silent severity changes.
3. New frameworks add parsers, file scopes, and framework semantics without creating another language-rule tier.
4. New public factories, parsers, or auto-fix behavior require type and runtime tests.
