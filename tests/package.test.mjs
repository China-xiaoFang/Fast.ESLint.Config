import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const manifest = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const resolvePackageFile = (filePath) => new URL(`../${filePath.replace(/^\.\//, "")}`, import.meta.url);
const semanticVersionPattern =
	/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[a-z-][0-9a-z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-z-][0-9a-z-]*))*)?(?:\+[0-9a-z-]+(?:\.[0-9a-z-]+)*)?$/i;

test("package metadata identifies a documented semantic version", () => {
	assert.match(manifest.version, semanticVersionPattern);
	assert.equal(manifest.type, "module");
	assert.equal(manifest.sideEffects, false);
	assert.equal(manifest.publishConfig.access, "public");
	assert.ok(manifest.keywords.includes("fast"));
	assert.ok(manifest.keywords.includes("fast-china"));
	assert.ok(manifest.files.includes("dist"));
	assert.ok(!manifest.files.includes("src"));
});

test("published entry points exist and expose the typed package contract", () => {
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
});

test("published source maps are self-contained", () => {
	const visit = (directory) => {
		for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
			const filePath = new URL(`../${directory}/${entry.name}`, import.meta.url);
			if (entry.isDirectory()) visit(`${directory}/${entry.name}`);
			else if (entry.name.endsWith(".d.mts.map")) assert.fail(`unexpected declaration map: ${filePath.pathname}`);
			else if (entry.name.endsWith(".mjs.map")) {
				const sourceMap = JSON.parse(fs.readFileSync(filePath, "utf8"));
				assert.equal(sourceMap.sources.length, sourceMap.sourcesContent?.length, filePath.pathname);
			}
		}
	};

	visit("dist");
});
