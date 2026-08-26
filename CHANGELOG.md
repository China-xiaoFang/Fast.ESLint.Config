# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and releases should follow [Semantic Versioning](https://semver.org/).

## Unreleased

## 2.1.0 - 2026-08-26

### Added

- Added built-in UniApp support for `.nvue`, cross-platform and conditional-platform runtime globals, comment-compatible `pages.json` and `manifest.json`, and generated `unpackage` output ignores.
- Added a trailing Node.js tooling override that permits logging and CommonJS interoperability in config, script, test, and CLI files.
- Added root-exported `createBaseConfigs()` as a fixed, framework-neutral composition for React, Angular, Node.js, and SDK projects.

### Changed

- Replaced project-type strictness with one shared rule set for SDKs, OA systems, administration apps, Vue web apps, and clients.
- Changed the root entry to a fixed Vue 3, type-aware TypeScript, and UniApp preset; `fastConfig()` now retains only the runtime `environment` option and trailing Flat Config overrides.
- Changed TypeScript, Vue, and React TypeScript to always use `recommendedTypeChecked` and Project Service.
- Required explicit parameter and return types at exported TypeScript module boundaries without forcing return annotations on internal functions and callbacks.
- Changed Vue to inherit `flat/recommended`, enforce kebab-case template attributes, warn on `v-html`, and reject `v-text`/`v-html` on components.
- Replaced the full RegExp recommended preset with an explicit correctness and safety rule set.
- Restored JavaScript conventions including camelCase, declaration order, arrow callbacks, logical assignment, object spread, object shorthand, rest/spread, and template literals.
- Restored `sort-imports`; import ordering is an error again and includes side-effect imports.
- Enabled the official React Hooks Recommended preset and aligned Angular TypeScript, template, and accessibility rules with the Angular ESLint recommended presets.
- Enabled `package.json` and `tsconfig*.json` sorting in the fixed root and base compositions; Markdown remains explicitly composed.
- Corrected the built-in dependency ignore glob so both `.pnpm-store` and `node_modules` are matched without relying on `.gitignore`.
- Allowed JSONC comments in both VS Code `.vscode/settings.json` and `.vscode/extensions.json`.

### Removed

- Removed `defaultConfigOptions`, root language/framework/plugin switches, factory-level rules/globals/ignores, `typeChecked`, and `tsconfigRootDir`. Native trailing Flat Config and focused factories replace these wrapper options.

## 2.0.10 - 2026-08-19

### Changed

- Changed the default export to a ready-to-use Flat Config array that can be exported directly or spread into another configuration; configurable usage remains available through the named `fastConfig()` export.
- Enabled Markdown, `package.json` sorting, and `tsconfig*.json` sorting by default while keeping React and Angular disabled by default.

## 2.0.9 - 2026-08-10

### Changed

- Allowed type-aware TypeScript configurations to forward `unknown` Promise rejection reasons without disabling `prefer-promise-reject-errors` for statically known non-`Error` values.

## 2.0.8 - 2026-08-09

### Changed

- Added prioritized import path groups for the uni-app, Vue, Element Plus, Fast Element Plus, Fast China, and Lodash ecosystems while keeping type-only imports in the dedicated type group.
- Changed import group spacing to a compact no-blank-line style and normalized the repository imports to the new policy.

## 2.0.7 - 2026-08-08

### Changed

- Added consistent `fast` and `fast-china` package keywords and aligned the npm publish allowlist with the other Fast packages.
- Removed `src` and declaration maps that referenced unpublished source files while retaining self-contained runtime source maps.
- Added package-contract coverage for the publish allowlist and source-map integrity.

## 2.0.6 - 2026-08-04

### Changed

- Standardized the bilingual README, repository ignores, editor settings, TypeScript checks, and tsdown output configuration across the Fast frontend SDK repositories.
- Simplified the test pipeline to runtime, type-contract, and package-contract verification by removing documentation- and comment-governance tests.
- Included contribution and security documents in the published package and refreshed the engineering guidance for the current workflow.

## 2.0.5 - 2026-08-02

### Changed

- Upgraded public API documentation to complete TSDoc, including standard defaults, parameters, return values, thrown errors, remarks, examples, and package-level documentation.
- Separated runtime, type-contract, rule-governance, and package-contract tests, and replaced the hard-coded release version assertion with SemVer and changelog consistency checks.

## 2.0.4 - 2026-08-02

### Added

- Added dedicated `@fast-china/eslint-config/configs` and `@fast-china/eslint-config/constants` subpaths for advanced Flat Config composition.

### Changed

- Changed the `configs` and `rules` barrels to forward every module export, including configuration option types, while keeping configuration types out of the root entry.
- Changed this repository's own ESLint configuration to compose focused config fragments and constants instead of calling the root `fastConfig()` factory.
- Moved the `fastConfig()` implementation from `src/core/index.ts` directly into `src/index.ts` so the source root matches the package root entry.
- Narrowed the default preset to conventional Vue 3 browser administration projects by making Markdown linting opt-in alongside React, Angular, and manifest sorting.
- Removed Lodash policy selection from `fastConfig()` and the temporary `./lodash` subpath; optional Lodash restrictions now compose exclusively through `createLodashConfigs()` from `./configs`.
- Changed `createGlobalIgnores()` to return a config array like the other fragment factories, so direct composition consistently uses spread syntax.
- Updated `@eslint-react/eslint-plugin`, `@eslint/config-inspector`, and `globals` within their existing compatible version ranges.

## 2.0.3 - 2026-07-29

### Changed

- Renamed the internal factory directory from `src/code` to the clearer `src/core` and updated all source and type-generation imports.
- Expanded JSDoc for public and internal configuration interfaces, covering defaults, activation conditions, file scopes, option interactions, performance tradeoffs, and behavior intentionally left to project tooling.

## 2.0.2 - 2026-07-29

### Changed

- Moved the `fastConfig()` factory implementation to `src/code/index.ts` so the source layout groups the primary code entry consistently.
- Inlined `defineRules()` into the root entry and kept `@fast-china/eslint-config/rules` focused on the documented raw rule records and generated `RuleOptions` type.

## 2.0.1 - 2026-07-26

### Added

- Added first-class opt-in React support with JavaScript/TypeScript presets, official Hooks and React Compiler diagnostics, DOM safety rules, React-compatible JSX runtime settings, generated rule types, and runtime tests.
- Added first-class opt-in Angular support for framework TypeScript, external and inline templates, modern recommended rules, configurable template accessibility, generated rule types, and runtime tests.

### Changed

- Changed the newly bundled React and Angular dependencies to caret ranges so compatible minor and patch releases can be installed without editing the manifest.
- Completed the TypeScript 6 migration with TypeScript 6.0.3, removed the deprecated compiler-option suppression, and replaced tsup with tsdown 0.22.14 for native `.mjs`, `.d.mts`, and source-map builds.
- Raised the verified runtime baselines to Node.js 22.18.0 and 24.11.0 to match the current tsdown toolchain.
- Updated the development baseline to ESLint 10.8.0, then upgraded `actions/checkout` plus `actions/setup-node` to their current v7 major releases.

## 2.0.0 - 2026-07-26

### Added

- Published the ESM-only `fastConfig(options, ...overrides)` factory for Vue 3, Vite, TypeScript, JavaScript, Node.js, JSON dialects, Markdown, RegExp, import rules, Prettier conflict handling, and project overrides.
- Added environment-aware globals, `.gitignore` support, global ignore patterns, language switches, and file-scoped trailing overrides.
- Added optional type-aware TypeScript and Vue linting through typescript-eslint Project Service.
- Added opt-in `lodash` and `lodash-unified` static import policies without requiring an additional ESLint plugin.
- Added opt-in, semantics-aware `package.json` and `tsconfig*.json` sorting that preserves conditional export order.
- Added schema-generated `RuleOptions`, factory-level typed rules, and `defineRules()` for exact rule-name and rule-option completion.
- Published fully commented raw rule records through `@fast-china/eslint-config/rules`.
- Added bilingual usage and risk documentation, contribution guidance, and an engineering quality audit.
- Added deterministic type-generation checks, consumer type tests, runtime integration tests, multi-version Node.js CI, and publish-archive inspection.

### Changed

- Raised the minimum supported Node.js version to 22.13.0 so the package, local development workflow, and pnpm 11 CI use one consistent runtime baseline.
- Upgraded `pnpm/action-setup` to v6 so GitHub Actions uses its Node.js 24 runtime without Node.js 20 deprecation warnings.
