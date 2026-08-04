# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and releases should follow [Semantic Versioning](https://semver.org/).

## Unreleased

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
