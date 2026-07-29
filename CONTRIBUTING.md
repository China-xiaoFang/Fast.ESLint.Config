# Contributing

Thank you for improving `@fast-china/eslint-config`.

## Prerequisites

- A supported Node.js version from `package.json`
- pnpm `11.x`

## Local workflow

```sh
pnpm install
pnpm typegen
pnpm check
```

Use `pnpm lint:fix` and `pnpm format` for safe mechanical fixes. `pnpm check` is the same quality gate used by CI: it builds the actual package, type-checks source, lints every supported language, verifies formatting, and runs integration tests against `dist`.

`src/typegen.d.ts` is generated from ESLint rule schemas and is part of the public type API. Run `pnpm typegen` after changing ESLint or plugin versions, inspect and commit the generated diff, and use `pnpm typegen:check` to verify it. Never edit the generated declaration manually.

## Changing rules or factory behavior

1. Keep correctness rules separate from formatting rules.
2. Scope every rule group with `files` unless it is intentionally global.
3. Register each plugin in a configuration that matches the same files as its rules.
4. Prefer upstream recommended configs before adding local overrides.
5. Keep organization-specific dependency restrictions out of this general-purpose package; projects should own those policies.
6. Explain the purpose, rationale, and important exception or risk immediately above every local rule override.
7. Mark disruptive defaults with `[高影响]`; verify `meta.fixable` before using `[可自动修复]`, and keep `docs/rules-risk.md` plus `docs/rules-risk.zh.md` synchronized.
8. Never sort a map whose key order has semantics, including conditional objects under `package.json#exports`.
9. Regenerate `src/typegen.d.ts` whenever ESLint or a bundled plugin changes; confirm new rules and changed option schemas intentionally.
10. Add or update an integration test for every parser, plugin, option, auto-fix, generated type, or public export change. The root API is intentionally limited to `fastConfig`, `defaultConfigOptions`, `defineRules`, and related types.
11. Document behavior changes in `CHANGELOG.md` and both README files.

## Pull requests

Keep changes focused and explain user-visible compatibility effects. Do not commit credentials or publish from a pull request. Changes to the Node.js, ESLint, TypeScript, Vue, React, Angular, Prettier, or module-format contract should be treated as release-significant changes.

## Releases

The package is ESM-only and publication is maintainer-controlled. Update `CHANGELOG.md` and `package.json`, commit the release state, then run:

```sh
pnpm check
pnpm pack --dry-run
pnpm publish --access public --registry https://registry.npmjs.org/
```

`prepack` reruns the complete quality gate before pnpm creates the publish archive. Inspect the dry-run list and verify that both root and `./rules` entry points contain JavaScript and declarations, together with the generated JavaScript and declaration source maps. After publication, verify the registry result and tag the exact commit:

```sh
pnpm view @fast-china/eslint-config version --registry https://registry.npmjs.org/
git tag -a v2.0.2 -m "release: v2.0.2"
git push origin master
git push origin v2.0.2
```

npm versions are immutable; never reuse an already published version.
