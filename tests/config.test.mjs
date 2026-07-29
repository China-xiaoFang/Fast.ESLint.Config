import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { ESLint } from "eslint";
import ts from "typescript";

import fastConfig, * as publicApi from "@fast-china/eslint-config";
import { preferLodashRules, preferLodashUnifiedRules } from "@fast-china/eslint-config/rules";

const rulesDirectory = new URL("../src/rules/", import.meta.url);
const readRuleSources = () =>
	fs
		.readdirSync(rulesDirectory)
		.filter((fileName) => fileName.endsWith(".ts") && fileName !== "index.ts")
		.map((fileName) => ({ fileName, source: fs.readFileSync(new URL(fileName, rulesDirectory), "utf8") }));

const createLinter = (config, options = {}) =>
	new ESLint({
		cwd: process.cwd(),
		ignore: false,
		overrideConfig: config,
		overrideConfigFile: true,
		...options,
	});

test("package exports the configuration factory and typed rule helper", () => {
	assert.equal(typeof fastConfig, "function");
	assert.equal(fastConfig, publicApi.fastConfig);
	assert.ok(Array.isArray(fastConfig({ gitignore: false })));
	assert.equal(Object.isFrozen(publicApi.defaultConfigOptions), true);
	assert.equal(publicApi.defaultConfigOptions.angular, false);
	assert.equal(publicApi.defaultConfigOptions.lodash, false);
	assert.equal(publicApi.defaultConfigOptions.react, false);
	assert.equal(publicApi.defaultConfigOptions.sortPackageJson, false);
	assert.equal(publicApi.defaultConfigOptions.sortTsconfig, false);
	assert.deepEqual(publicApi.defineRules({ "no-console": "warn" }), { "no-console": "warn" });
});

test("factory disables optional language integrations without claiming their files", async () => {
	const minimalConfig = fastConfig({
		gitignore: false,
		imports: false,
		json: false,
		markdown: false,
		prettier: false,
		regexp: false,
		typescript: false,
		vue: false,
	});
	const names = minimalConfig.map((config) => config.name ?? "");

	assert.ok(names.some((name) => name.includes("javascript")));
	assert.ok(!names.some((name) => name.includes("typescript")));
	assert.ok(!names.some((name) => name.includes("vue")));
	assert.ok(!names.some((name) => name.includes("react")));
	assert.ok(!names.some((name) => name.includes("angular")));
	assert.ok(!names.some((name) => name.includes("json")));
	assert.ok(!names.some((name) => name.includes("markdown")));

	const linter = createLinter(minimalConfig);
	assert.ok(await linter.calculateConfigForFile("fixtures/example.js"));
	assert.equal(await linter.calculateConfigForFile("fixtures/example.ts"), undefined);
	assert.equal(await linter.calculateConfigForFile("fixtures/example.vue"), undefined);
});

test("factory can build a JSON-only configuration without activating code rules", async () => {
	const config = fastConfig({
		gitignore: false,
		imports: false,
		javascript: false,
		markdown: false,
		prettier: false,
		regexp: false,
		typescript: false,
		vue: false,
	});
	const linter = createLinter(config);

	const javaScriptConfig = await linter.calculateConfigForFile("fixtures/example.js");
	assert.equal(Object.keys(javaScriptConfig?.rules ?? {}).length, 0);
	assert.ok(await linter.calculateConfigForFile("fixtures/example.json"));
});

test("runtime globals are scoped to application and Node.js tooling files", async () => {
	const linter = createLinter(
		fastConfig({
			gitignore: false,
			globals: { __APP_VERSION__: "readonly" },
			imports: false,
			json: false,
			markdown: false,
			prettier: false,
			regexp: false,
			typescript: false,
			vue: false,
		})
	);
	const [applicationResult] = await linter.lintText("process.cwd();\n__APP_VERSION__;\n", { filePath: "fixtures/application.js" });
	const [toolingResult] = await linter.lintText("process.cwd();\n", { filePath: "fixtures/vite.config.js" });

	assert.ok(applicationResult.messages.some((message) => message.ruleId === "no-undef"));
	assert.ok(!applicationResult.messages.some((message) => message.message.includes("__APP_VERSION__")));
	assert.ok(!toolingResult.messages.some((message) => message.ruleId === "no-undef"));
});

test("project rules and trailing overrides take precedence in declaration order", async () => {
	const config = fastConfig(
		{
			gitignore: false,
			json: false,
			markdown: false,
			rules: publicApi.defineRules({ "no-console": "error" }),
			typescript: false,
			vue: false,
		},
		{
			name: "project/allow-console-in-example",
			files: ["**/allowed.js"],
			rules: { "no-console": "off" },
		}
	);
	const linter = createLinter(config);
	const [blockedResult] = await linter.lintText("console.log('blocked');\n", { filePath: "fixtures/blocked.js" });
	const [allowedResult] = await linter.lintText("console.log('allowed');\n", { filePath: "fixtures/allowed.js" });

	assert.equal(config.at(-1)?.name, "project/allow-console-in-example");
	assert.ok(blockedResult.messages.some((message) => message.ruleId === "no-console"));
	assert.ok(!allowedResult.messages.some((message) => message.ruleId === "no-console"));
});

test("lodash package preference is opt-in and rejects mixed static imports", async () => {
	const baseOptions = {
		gitignore: false,
		imports: false,
		json: false,
		markdown: false,
		prettier: false,
		regexp: false,
		typescript: false,
		vue: false,
	};
	const defaultLinter = createLinter(fastConfig(baseOptions));
	const [defaultResult] = await defaultLinter.lintText('import get from "lodash/get";\nvoid get;\n', {
		filePath: "fixtures/default-lodash.js",
	});
	assert.ok(!defaultResult.messages.some((message) => message.ruleId === "no-restricted-imports"));

	const unifiedLinter = createLinter(fastConfig({ ...baseOptions, lodash: "lodash-unified" }));
	const [unifiedResult] = await unifiedLinter.lintText(
		'import get from "lodash/get";\nimport { debounce } from "lodash-es";\nexport { default as pick } from "lodash/pick";\nvoid get;\nvoid debounce;\n',
		{ filePath: "fixtures/prefer-lodash-unified.js" }
	);
	assert.equal(unifiedResult.messages.filter((message) => message.ruleId === "no-restricted-imports").length, 3);
	const [allowedUnifiedResult] = await unifiedLinter.lintText('import { debounce } from "lodash-unified";\nvoid debounce;\n', {
		filePath: "fixtures/allowed-lodash-unified.js",
	});
	assert.ok(!allowedUnifiedResult.messages.some((message) => message.ruleId === "no-restricted-imports"));

	const lodashLinter = createLinter(fastConfig({ ...baseOptions, lodash: "lodash" }));
	const [lodashResult] = await lodashLinter.lintText(
		'import { debounce } from "lodash-unified";\nimport { get } from "lodash-es";\nexport * from "lodash-unified/fp";\nvoid debounce;\nvoid get;\n',
		{ filePath: "fixtures/prefer-lodash.js" }
	);
	assert.equal(lodashResult.messages.filter((message) => message.ruleId === "no-restricted-imports").length, 3);
	const [allowedLodashResult] = await lodashLinter.lintText('import get from "lodash/get";\nvoid get;\n', {
		filePath: "fixtures/allowed-lodash.js",
	});
	assert.ok(!allowedLodashResult.messages.some((message) => message.ruleId === "no-restricted-imports"));
	assert.equal(preferLodashRules["no-restricted-imports"]?.[0], "error");
	assert.equal(preferLodashUnifiedRules["no-restricted-imports"]?.[0], "error");
});

test("factory supports Vue 3 and type-aware TypeScript", () => {
	const config = fastConfig({
		gitignore: false,
		typescript: { tsconfigRootDir: process.cwd(), typeChecked: true },
		vue: true,
	});

	assert.ok(config.some((item) => item.name?.includes("vue/type-checked")));
	assert.ok(config.some((item) => item.languageOptions?.parserOptions?.projectService === true));
	assert.ok(config.some((item) => item.languageOptions?.parserOptions?.tsconfigRootDir === process.cwd()));
});

test("factory enables React correctness, official Hooks, and DOM safety rules on demand", async () => {
	const config = fastConfig({
		gitignore: false,
		imports: false,
		json: false,
		markdown: false,
		prettier: false,
		react: true,
		regexp: false,
		vue: false,
	});
	const names = config.map((item) => item.name ?? "");
	const linter = createLinter(config);
	const [result] = await linter.lintText(
		'import { useState } from "react";\n\nfunction App({ ready }) {\n\tif (ready) useState(0);\n\treturn <button>Save</button>;\n}\n\nexport { App };\n',
		{ filePath: "fixtures/App.jsx" }
	);

	assert.ok(names.some((name) => name.includes("react/javascript")));
	assert.ok(names.some((name) => name.includes("react/typescript")));
	assert.equal(result.fatalErrorCount, 0);
	assert.ok(result.messages.some((message) => message.ruleId === "react-hooks/rules-of-hooks"));
	assert.ok(result.messages.some((message) => message.ruleId === "@eslint-react/dom-no-missing-button-type"));
});

test("factory enables Angular TypeScript, external templates, inline templates, and accessibility on demand", async () => {
	const config = fastConfig({
		angular: true,
		gitignore: false,
		imports: false,
		javascript: false,
		json: false,
		markdown: false,
		prettier: false,
		regexp: false,
		vue: false,
	});
	const names = config.map((item) => item.name ?? "");
	const linter = createLinter(config);
	const [templateResult] = await linter.lintText('<img src="logo.png">\n', {
		filePath: "fixtures/app.component.html",
	});
	const [inlineResult] = await linter.lintText(
		'import { Component } from "@angular/core";\n\n@Component({ template: `<div (click)="save()">Save</div>` })\nexport class AppComponent {\n\tsave() { return true; }\n}\n',
		{ filePath: "fixtures/app.component.ts" }
	);

	assert.ok(names.some((name) => name.includes("angular/typescript-with-inline-templates")));
	assert.ok(names.some((name) => name.includes("angular/template-accessibility")));
	assert.equal(templateResult.fatalErrorCount, 0);
	assert.equal(inlineResult.fatalErrorCount, 0);
	assert.ok(templateResult.messages.some((message) => message.ruleId === "@angular-eslint/template/alt-text"));
	assert.ok(inlineResult.messages.some((message) => message.ruleId === "@angular-eslint/template/click-events-have-key-events"));
});

test("Angular support requires the TypeScript language integration", () => {
	assert.throws(() => fastConfig({ angular: true, typescript: false }), /Angular support requires TypeScript/);
});

test("Angular inline-template and accessibility policies can be disabled explicitly", async () => {
	const config = fastConfig({
		angular: { inlineTemplates: false, templateAccessibility: false },
		gitignore: false,
		imports: false,
		javascript: false,
		json: false,
		markdown: false,
		prettier: false,
		regexp: false,
		vue: false,
	});
	const names = config.map((item) => item.name ?? "");
	const linter = createLinter(config);
	const [templateResult] = await linter.lintText('<img src="logo.png">\n', {
		filePath: "fixtures/app.component.html",
	});
	const [inlineResult] = await linter.lintText(
		'import { Component } from "@angular/core";\n\n@Component({ template: `<div (click)="save()">Save</div>` })\nexport class AppComponent {\n\tsave() { return true; }\n}\n',
		{ filePath: "fixtures/app.component.ts" }
	);

	assert.ok(names.includes("@fast-china/angular/typescript"));
	assert.ok(names.includes("@fast-china/angular/template"));
	assert.ok(!templateResult.messages.some((message) => message.ruleId === "@angular-eslint/template/alt-text"));
	assert.ok(!inlineResult.messages.some((message) => message.ruleId?.startsWith("@angular-eslint/template/")));
});

test("type-aware configuration can lint a file from the project service", async () => {
	const linter = createLinter(
		fastConfig({
			gitignore: false,
			markdown: false,
			typescript: { typeChecked: true },
			vue: false,
		})
	);
	const [result] = await linter.lintFiles(["src/index.ts"]);

	assert.equal(result.fatalErrorCount, 0, result.messages.map((message) => message.message).join(", "));
	assert.ok(!result.messages.some((message) => message.message.includes("type information")));
});

test("representative JavaScript, TypeScript, Vue, JSON dialects, and Markdown parse without configuration errors", async () => {
	const linter = createLinter(fastConfig({ gitignore: false }));
	const fixtures = [
		{
			filePath: "fixtures/example.js",
			code: "const answer = 42;\n\nexport { answer };\n",
		},
		{
			filePath: "fixtures/example.ts",
			code: 'const message: string = "hello";\n\nexport { message };\n',
		},
		{
			filePath: "fixtures/App.vue",
			code: '<script setup lang="ts">\nconst message = "hello";\n</script>\n\n<template>\n\t<main>{{ message }}</main>\n</template>\n',
		},
		{
			filePath: "fixtures/example.json",
			code: '{ "enabled": true }\n',
		},
		{
			filePath: "fixtures/example.jsonc",
			code: '{\n\t// JSONC comments are valid.\n\t"enabled": true\n}\n',
		},
		{
			filePath: "fixtures/example.json5",
			code: "{ enabled: true, }\n",
		},
		{
			filePath: "fixtures/example.md",
			code: "# Example\n\nA valid Markdown document.\n",
		},
	];

	for (const fixture of fixtures) {
		const [result] = await linter.lintText(fixture.code, { filePath: fixture.filePath });
		assert.equal(result.fatalErrorCount, 0, `${fixture.filePath}: ${result.messages.map((message) => message.message).join(", ")}`);
		assert.ok(!result.messages.some((message) => message.message.includes("could not find plugin")));
	}
});

test("quality rules are active for JavaScript and Vue", async () => {
	const linter = createLinter(fastConfig({ gitignore: false }));
	const [javascriptResult] = await linter.lintText("var answer = 42;\n", { filePath: "fixtures/invalid.js" });
	const [vueResult] = await linter.lintText(
		'<script setup lang="ts">\nconst html = "<strong>trusted</strong>";\n</script>\n\n<template>\n\t<div v-html="html" />\n</template>\n',
		{ filePath: "fixtures/Unsafe.vue" }
	);

	assert.ok(javascriptResult.messages.some((message) => message.ruleId === "no-var"));
	assert.ok(vueResult.messages.some((message) => message.ruleId === "vue/no-v-html"));
});

test("manifest sorting is opt-in and preserves semantic exports condition order", async () => {
	const source = `{
	"version": "1.0.0",
	"name": "fixture",
	"exports": {
		".": {
			"node": "./node.js",
			"import": "./index.js",
			"default": "./index.js"
		}
	}
}
`;
	const defaultLinter = createLinter(fastConfig({ gitignore: false }), { fix: true });
	const [defaultResult] = await defaultLinter.lintText(source, { filePath: "fixtures/package.json" });
	assert.ok(!defaultResult.messages.some((message) => message.ruleId === "jsonc/sort-keys"));

	const sortingLinter = createLinter(fastConfig({ gitignore: false, sortPackageJson: true }), { fix: true });
	const [result] = await sortingLinter.lintText(source, { filePath: "fixtures/package.json" });
	const fixed = result.output ?? source;

	assert.ok(fixed.indexOf('"name"') < fixed.indexOf('"version"'));
	assert.ok(fixed.indexOf('"node"') < fixed.indexOf('"import"'));
	assert.ok(fixed.indexOf('"import"') < fixed.indexOf('"default"'));
});

test("every local rule override has a nearby rationale comment", () => {
	for (const { fileName, source } of readRuleSources()) {
		const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

		const visit = (node) => {
			if (ts.isVariableDeclaration(node) && node.initializer && ts.isSatisfiesExpression(node.initializer)) {
				const { expression, type } = node.initializer;

				if (type.getText(sourceFile) !== "RuleOptions" || !ts.isObjectLiteralExpression(expression)) {
					ts.forEachChild(node, visit);
					return;
				}

				for (const property of expression.properties) {
					if (!ts.isPropertyAssignment(property)) continue;

					const leadingTrivia = source.slice(property.getFullStart(), property.getStart(sourceFile));
					assert.match(
						leadingTrivia,
						/\/\/[^\r\n]+|\/\*[\s\S]*?\*\//,
						`${fileName}:${sourceFile.getLineAndCharacterOfPosition(property.getStart(sourceFile)).line + 1} needs a rationale comment`
					);
				}
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
	}
});

test("risk guide documents every high-impact local default", () => {
	const riskGuide = fs.readFileSync(new URL("../docs/rules-risk.zh.md", import.meta.url), "utf8");
	const highImpactRules = new Set();

	for (const { source } of readRuleSources()) {
		for (const match of source.matchAll(/\/\/([^\r\n]*\[高影响\][^\r\n]*)\r?\n\s*"([^"]+)"/g)) {
			const [, comment, rule] = match;
			if (!comment.includes("[按需启用]") && !comment.includes("[默认关闭]")) highImpactRules.add(rule);
		}
	}

	assert.ok(highImpactRules.size > 0);
	for (const rule of highImpactRules) {
		assert.ok(riskGuide.includes(`\`${rule}\``), `${rule} is missing from the risk guide`);
	}
});

test("published entry points exist and expose the typed factory contract", () => {
	const manifest = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"));
	const resolvePackageFile = (filePath) => new URL(`../${filePath.replace(/^\.\//, "")}`, import.meta.url);
	const declarations = fs.readFileSync(resolvePackageFile(manifest.types), "utf8");
	const ruleDeclarations = fs.readFileSync(resolvePackageFile(manifest.exports["./rules"].types), "utf8");
	const publicEntries = [manifest.exports["."], manifest.exports["./rules"]];

	assert.equal(manifest.version, "2.0.2");
	assert.equal(manifest.main, manifest.exports["."].import);
	assert.equal(manifest.module, manifest.exports["."].import);
	assert.equal(manifest.types, manifest.exports["."].types);
	assert.match(manifest.main, /\.mjs$/);
	assert.match(manifest.types, /\.d\.mts$/);
	assert.equal(fs.existsSync(resolvePackageFile(manifest.main)), true);
	assert.equal("require" in manifest.exports["."], false);
	assert.equal("require" in manifest.exports["./rules"], false);
	assert.deepEqual(Object.keys(manifest.exports), [".", "./rules", "./package.json"]);
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
	assert.match(declarations, /LodashPreference/);
	assert.match(declarations, /AngularConfigOptions/);
	assert.match(declarations, /ReactConfigOptions/);
	assert.doesNotMatch(ruleDeclarations, /defineRules/);
});
