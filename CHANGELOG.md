# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and releases should follow [Semantic Versioning](https://semver.org/).

## Unreleased

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
