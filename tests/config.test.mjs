import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { ESLint } from "eslint";
import ts from "typescript";

import fastConfig, { PresetJavascriptConfigs, PresetTypeScriptConfigs, createConfig, defaultOptions, defineRules } from "@fast-china/eslint-config";

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

test("package exports a backward-compatible default array and named presets", () => {
	assert.ok(Array.isArray(fastConfig));
	assert.ok(fastConfig.length > 0);
	assert.ok(Array.isArray(PresetJavascriptConfigs));
	assert.ok(Array.isArray(PresetTypeScriptConfigs));
	assert.equal(Object.isFrozen(defaultOptions), true);
	assert.deepEqual(defineRules({ "no-console": "warn" }), { "no-console": "warn" });
});

test("factory disables optional language integrations without claiming their files", async () => {
	const minimalConfig = createConfig({
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
	assert.ok(!names.some((name) => name.includes("json")));
	assert.ok(!names.some((name) => name.includes("markdown")));

	const linter = createLinter(minimalConfig);
	assert.ok(await linter.calculateConfigForFile("fixtures/example.js"));
	assert.equal(await linter.calculateConfigForFile("fixtures/example.ts"), undefined);
	assert.equal(await linter.calculateConfigForFile("fixtures/example.vue"), undefined);
});

test("factory supports Vue 2 and type-aware TypeScript as explicit options", () => {
	const config = createConfig({
		gitignore: false,
		typescript: { typeChecked: true },
		vue: { typeChecked: true, version: 2 },
	});

	assert.ok(config.some((item) => item.name?.includes("vue2")));
	assert.ok(config.some((item) => item.languageOptions?.parserOptions?.projectService === true));
});

test("type-aware configuration can lint a file from the project service", async () => {
	const linter = createLinter(
		createConfig({
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
	const linter = createLinter(createConfig({ gitignore: false }));
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
	const linter = createLinter(createConfig({ gitignore: false }));
	const [javascriptResult] = await linter.lintText("var answer = 42;\n", { filePath: "fixtures/invalid.js" });
	const [vueResult] = await linter.lintText(
		'<script setup lang="ts">\nconst html = "<strong>trusted</strong>";\n</script>\n\n<template>\n\t<div v-html="html" />\n</template>\n',
		{ filePath: "fixtures/Unsafe.vue" }
	);

	assert.ok(javascriptResult.messages.some((message) => message.ruleId === "no-var"));
	assert.ok(vueResult.messages.some((message) => message.ruleId === "vue/no-v-html"));
});

test("package fixes preserve semantic exports condition order", async () => {
	const linter = createLinter(createConfig({ gitignore: false }), { fix: true });
	const source = `{
	"name": "fixture",
	"version": "1.0.0",
	"exports": {
		".": {
			"node": "./node.js",
			"import": "./index.js",
			"default": "./index.js"
		}
	}
}
`;
	const [result] = await linter.lintText(source, { filePath: "fixtures/package.json" });
	const fixed = result.output ?? source;

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

test("published entry points exist and never advertise CommonJS files that are not built", () => {
	const manifest = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"));
	const declarations = fs.readFileSync(new URL("../dist/index.d.ts", import.meta.url), "utf8");

	assert.equal(fs.existsSync(new URL(`../${manifest.main}`, import.meta.url)), true);
	assert.equal("require" in manifest.exports["."], false);
	assert.equal("require" in manifest.exports["./rules"], false);
	assert.match(declarations, /RuleOptions/);
	assert.match(declarations, /defineRules/);
});
