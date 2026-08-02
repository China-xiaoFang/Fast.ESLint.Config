import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { GLOBS_CODE } from "@fast-china/eslint-config/constants";

const manifest = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const changelog = fs.readFileSync(new URL("../CHANGELOG.md", import.meta.url), "utf8");
const securityPolicy = fs.readFileSync(new URL("../SECURITY.md", import.meta.url), "utf8");
const engineeringAudit = fs.readFileSync(new URL("../docs/engineering-audit.zh.md", import.meta.url), "utf8");
const resolvePackageFile = (filePath) => new URL(`../${filePath.replace(/^\.\//, "")}`, import.meta.url);
const semanticVersionPattern =
	/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[a-z-][0-9a-z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-z-][0-9a-z-]*))*)?(?:\+[0-9a-z-]+(?:\.[0-9a-z-]+)*)?$/i;

test("package metadata identifies a documented semantic version", () => {
	assert.match(manifest.version, semanticVersionPattern);
	assert.equal(manifest.type, "module");
	assert.equal(manifest.sideEffects, false);
	assert.equal(manifest.publishConfig.access, "public");
});

test("release documentation reflects the current package version", () => {
	assert.ok(changelog.includes(`## ${manifest.version} -`), `CHANGELOG.md must document version ${manifest.version}`);
	assert.equal(securityPolicy.split(`| \`${manifest.version}\``).length - 1, 2, "SECURITY.md must list the current version in both languages");
	assert.ok(
		engineeringAudit.includes(`\`@fast-china/eslint-config\` ${manifest.version} 工作区`),
		"the engineering audit must identify the current workspace version"
	);
});

test("published entry points exist and expose the typed package contract", () => {
	const declarations = fs.readFileSync(resolvePackageFile(manifest.types), "utf8");
	const configDeclarations = fs.readFileSync(resolvePackageFile(manifest.exports["./configs"].types), "utf8");
	const constantDeclarations = fs.readFileSync(resolvePackageFile(manifest.exports["./constants"].types), "utf8");
	const ruleDeclarations = fs.readFileSync(resolvePackageFile(manifest.exports["./rules"].types), "utf8");
	const publicEntries = [manifest.exports["."], manifest.exports["./configs"], manifest.exports["./constants"], manifest.exports["./rules"]];

	assert.equal(manifest.main, manifest.exports["."].import);
	assert.equal(manifest.module, manifest.exports["."].import);
	assert.equal(manifest.types, manifest.exports["."].types);
	assert.match(manifest.main, /\.mjs$/);
	assert.match(manifest.types, /\.d\.mts$/);
	assert.equal(fs.existsSync(resolvePackageFile(manifest.main)), true);
	assert.equal("require" in manifest.exports["."], false);
	assert.equal("require" in manifest.exports["./configs"], false);
	assert.equal("require" in manifest.exports["./constants"], false);
	assert.equal("require" in manifest.exports["./rules"], false);
	assert.deepEqual(Object.keys(manifest.exports), [".", "./configs", "./constants", "./rules", "./package.json"]);

	for (const entry of publicEntries) {
		assert.match(entry.import, /\.mjs$/);
		assert.match(entry.types, /\.d\.mts$/);
		assert.equal(entry.default, entry.import);
		assert.equal(fs.existsSync(resolvePackageFile(entry.import)), true);
		assert.equal(fs.existsSync(resolvePackageFile(entry.types)), true);
	}

	assert.match(declarations, /RuleOptions/);
	assert.match(declarations, /defineRules/);
	assert.match(declarations, /fastConfig/);
	assert.match(configDeclarations, /createCommonConfigs/);
	assert.match(configDeclarations, /createTypeScriptConfigs/);
	assert.match(configDeclarations, /AngularConfigOptions/);
	assert.match(constantDeclarations, /GLOBS_CODE/);
	assert.deepEqual(GLOBS_CODE, ["**/*.{js,cjs,mjs,jsx}", "**/*.{ts,cts,mts,tsx}", "**/*.vue"]);
	assert.doesNotMatch(ruleDeclarations, /defineRules/);
});
