# Default Rules, Risk Levels, and Maintenance

This document records what the default config inherits, which rules can have a large adoption or review cost, and what maintainers must update when changing rules.

## Risk labels

- `[High impact]`: the rule can create a large diff, block migration, or require a review of runtime or public API behavior.
- `[Auto-fixable]`: the currently locked ESLint or plugin version declares the rule fixable by `eslint --fix`. It does not remove the need for review.
- `[Security]`: the rule primarily protects a trust or injection boundary.
- `[Disabled by default]` and `[Opt-in]`: the rule record exists but is not loaded by the default config.

High impact does not mean inherently unsafe. It means adoption or fix review is relatively expensive. Module side effects, getters and proxies, build-tool conventions, and public component APIs deserve particular attention.

## Upstream presets enabled by default

`createConfig()` defaults to Vue 3, TypeScript, JavaScript, import, RegExp, JSON, Markdown, and the Prettier compatibility layer. Type-aware TypeScript linting is opt-in.

| Scope                  | Inherited preset                                                                                   | Notes                                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| JavaScript             | `@eslint/js` `recommended`                                                                         | Core syntax and runtime correctness, including `no-undef` and `no-unused-vars`.                         |
| TypeScript             | typescript-eslint `recommended` + `stylistic`                                                      | Does not read type information by default; local overrides are applied afterward.                       |
| Vue 3                  | `@eslint/js`, non-type-aware typescript-eslint presets, and `eslint-plugin-vue` `flat/recommended` | Vue 2 uses `flat/vue2-recommended` only when selected explicitly.                                       |
| Imports                | `eslint-plugin-import-x` `recommended`                                                             | Local rules add import placement, deduplication, and ordering. Resolver-dependent checks stay disabled. |
| RegExp                 | `eslint-plugin-regexp` `flat/recommended`                                                          | Some rules can rewrite regular expressions; run tests after bulk fixes.                                 |
| JSON dialects          | The matching `eslint-plugin-jsonc` `flat/recommended-*` preset                                     | JSON, JSONC, and JSON5 are scoped separately.                                                           |
| Markdown               | `@eslint/markdown` `recommended`                                                                   | Checks Markdown structure and syntax.                                                                   |
| Prettier compatibility | `eslint-config-prettier/flat`                                                                      | Disables conflicting rules only; it does not run Prettier through ESLint.                               |

The exact upstream rule set is defined by the dependency versions in `pnpm-lock.yaml`. Review the effective config with the config inspector whenever ESLint or a plugin is upgraded instead of copying an upstream list that will become stale.

## High-impact defaults

| Rule                                                    | Severity         | Auto-fix                 | Main impact                                                                                                                       | Recommended review                                                                                       |
| ------------------------------------------------------- | ---------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `jsonc/sort-keys`, `jsonc/sort-array-values`            | error            | Yes                      | Reorders `package.json`, `tsconfig*.json`, or the package `files` array and can create a large first-run diff.                    | Isolate the sorting commit and verify published files. `exports` condition keys are explicitly excluded. |
| `import-x/order`                                        | error            | Yes                      | Groups and reorders imports. Unassigned side-effect imports are reported but cannot be safely moved automatically.                | Check entrypoints, polyfills, styles, and registration imports.                                          |
| `@typescript-eslint/no-unused-vars`                     | error            | Yes in the locked plugin | Can remove unused imports, variables, or declarations. An underscore prefix is the explicit escape hatch.                         | Run type checking, builds, and tests after an isolated cleanup.                                          |
| `@typescript-eslint/consistent-type-imports`            | error            | Yes                      | Converts type-only dependencies to inline `type` imports; an import used only for side effects could disappear from emitted code. | Express side effects as a separate `import "module"` and inspect build output.                           |
| `@typescript-eslint/no-require-imports`                 | error            | No                       | Blocks CommonJS, conditional loading, and some toolchain interop patterns.                                                        | Disable only for scoped migration or configuration files.                                                |
| `no-var`                                                | error            | Yes                      | Moves legacy declarations to block scope; hoisting and loop closures need attention.                                              | Run behavior tests, especially around callbacks created in loops.                                        |
| `prefer-arrow-callback`                                 | error            | Yes                      | Rewrites callbacks; code relying on `this`, `arguments`, or named stack frames needs review.                                      | Check event handlers, library callbacks, and stack traces.                                               |
| `logical-assignment-operators`                          | error            | Yes                      | Rewrites conditional assignment; getter and Proxy access counts deserve review.                                                   | Test state containers and reactive objects.                                                              |
| `no-restricted-syntax` (`LabeledStatement`)             | error            | No                       | Requires control-flow refactoring for labeled break or continue.                                                                  | Downgrade only in migration files and restore after refactoring.                                         |
| `sort-imports`                                          | warn             | Yes                      | Sorts members inside one import declaration and usually creates text-only diffs.                                                  | Keep it in an isolated cleanup with `import-x/order`.                                                    |
| `vue/require-explicit-emits`                            | error            | No                       | Makes emitted events an explicit component API and can surface many legacy omissions.                                             | Model the real event list instead of disabling it blindly.                                               |
| `vue/no-mutating-props`                                 | error            | No                       | Enforces one-way data flow and may require local state or event changes.                                                          | Review the fix as a component-design change.                                                             |
| `vue/attributes-order`                                  | error            | Yes                      | Can reorder many template attributes on first use.                                                                                | Keep template sorting separate from business changes.                                                    |
| `no-unused-vars`, `no-undef` from the JavaScript preset | error            | No                       | Can block legacy JavaScript projects and expose missing runtime-global declarations.                                              | Select the correct `environment` before cleanup.                                                         |
| RegExp recommended preset                               | Upstream-defined | Some rules               | May rewrite character classes, quantifiers, or assertions.                                                                        | Exercise representative real-world inputs after fixing.                                                  |

`vue/no-v-html` is also enabled as a warning. It is a security signal rather than an automatic rewrite: HTML must be trusted or reliably sanitized.

## High-impact features not enabled by default

- Type-aware TypeScript and Vue presets require `typeChecked: true`. They add project-service cost and rules such as `no-floating-promises`.
- Vue 2 support requires `vue: 2`.
- `importUseLodashRules` and `importUseLodashUnifiedRules` are organization-specific migration records exported only from `@fast-china/eslint-config/rules`.
- Resolver-dependent import checks such as `import-x/no-unresolved` and `import-x/named` stay disabled.
- Keys inside `package.json#exports` are never sorted. Node conditional exports use key order during matching, so reordering can change the loaded file.

## Scoped migration overrides

Overrides must follow the shared config and should target only the affected files:

```js
import { defineConfig } from "eslint/config";

import { createConfig } from "@fast-china/eslint-config";

export default defineConfig([
	...createConfig(),
	{
		name: "project/typescript-migration",
		files: ["**/*.{ts,tsx,mts,cts,vue}"],
		rules: {
			"@typescript-eslint/consistent-type-imports": "warn",
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-unused-vars": "warn",
		},
	},
	{
		name: "project/vue-migration",
		files: ["**/*.vue"],
		rules: {
			"vue/attributes-order": "warn",
			"vue/require-explicit-emits": "warn",
		},
	},
	{
		name: "project/json-migration",
		files: ["**/{package.json,tsconfig*.json}"],
		rules: {
			"jsonc/sort-array-values": "off",
			"jsonc/sort-keys": "off",
		},
	},
]);
```

Run a read-only lint first, then apply `eslint --fix` on a separate branch or commit. Review imports, side-effect entrypoints, package exports, component events, and manifests before running the project's type checks, build, and tests.

## Rule-change checklist

1. Every local rule in `src/rules/` must explain its purpose, rationale, and important exception or risk; translating the rule name is not enough.
2. Add `[High impact]` when appropriate. For fixable rules, verify `meta.fixable` in the installed version instead of relying on memory.
3. Update this file, `rules-risk.zh.md`, both READMEs, and `CHANGELOG.md` for default behavior changes.
4. Never sort maps whose key order has semantics, including conditional objects under `package.json#exports`.
5. Run `pnpm typegen` after changing ESLint or any bundled plugin; inspect and commit `src/typegen.d.ts` instead of editing it manually.
6. Add integration coverage for parser, plugin, scope, auto-fix, generated-type, and public-export changes.
7. Run `pnpm check` and `pnpm pack --dry-run`, then inspect the real fix diff.
