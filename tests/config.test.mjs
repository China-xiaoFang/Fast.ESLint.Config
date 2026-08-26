import assert from "node:assert/strict";
import test from "node:test";
import fastChina, * as publicApi from "@fast-china/eslint-config";
import {
	DEFAULT_IGNORE_PATTERNS,
	createAngularConfigs,
	createGlobalIgnores,
	createLodashConfigs,
	createMarkdownConfigs,
	createReactConfigs,
	getTypeScriptPresetConfigs,
} from "@fast-china/eslint-config/configs";
import { preferLodashRules, preferLodashUnifiedRules } from "@fast-china/eslint-config/rules";
import { ESLint } from "eslint";
import { defineConfig } from "eslint/config";

const { createBaseConfigs, fastConfig } = publicApi;

const createLinter = (config, options = {}) =>
	new ESLint({
		cwd: process.cwd(),
		ignore: false,
		overrideConfig: config,
		overrideConfigFile: true,
		...options,
	});

test("package exports the fixed default configuration, environment factory, and typed rule helper", () => {
	assert.ok(Array.isArray(fastChina));
	assert.ok(Array.isArray(publicApi.fastConfig()));
	assert.deepEqual(
		fastChina.map((config) => config.name),
		publicApi.fastConfig().map((config) => config.name)
	);
	assert.equal("defaultConfigOptions" in publicApi, false);
	assert.deepEqual(publicApi.defineRules({ "no-console": "warn" }), { "no-console": "warn" });
});

test("default configuration can be used directly or spread into defineConfig", async () => {
	const directLinter = createLinter(defineConfig([fastChina]));
	const spreadLinter = createLinter(defineConfig([...fastChina]));

	assert.ok(await directLinter.calculateConfigForFile("src/index.ts"));
	assert.ok(await spreadLinter.calculateConfigForFile("src/index.ts"));
});

test("configuration fragment factories consistently return arrays", () => {
	const globalIgnoreConfigs = createGlobalIgnores(["fixtures/generated/**"]);

	assert.ok(Array.isArray(globalIgnoreConfigs));
	assert.equal(globalIgnoreConfigs.length, 1);
	assert.equal(globalIgnoreConfigs[0].name, "@fast-china/ignores/global");
	assert.ok(DEFAULT_IGNORE_PATTERNS.includes("**/{.pnpm-store,node_modules}/**"));
	assert.ok(Array.isArray(createBaseConfigs()));
});

test("root entry always enables the fixed Vue, UniApp, language, sorting, and compatibility capabilities", () => {
	const names = fastConfig().map((config) => config.name ?? "");

	assert.ok(names.some((name) => name.includes("ignores/git")));
	assert.ok(names.some((name) => name.includes("javascript")));
	assert.ok(names.some((name) => name.includes("typescript/type-checked")));
	assert.ok(names.some((name) => name.includes("vue/type-checked")));
	assert.ok(names.some((name) => name.includes("uniapp/globals")));
	assert.ok(names.some((name) => name.includes("json/json")));
	assert.ok(names.some((name) => name.includes("sort/package-json")));
	assert.ok(names.some((name) => name.includes("sort/tsconfig")));
	assert.ok(names.some((name) => name.includes("prettier")));
	assert.ok(!names.some((name) => name.includes("markdown")));
	assert.ok(!names.some((name) => name.includes("react/")));
	assert.ok(!names.some((name) => name.includes("angular/")));
});

test("base composition remains framework-neutral", () => {
	const names = createBaseConfigs().map((config) => config.name ?? "");

	assert.ok(names.some((name) => name.includes("typescript/type-checked")));
	assert.ok(names.some((name) => name.includes("sort/package-json")));
	assert.ok(!names.some((name) => name.includes("vue/")));
	assert.ok(!names.some((name) => name.includes("uniapp/")));
	assert.ok(!names.some((name) => name.includes("react/")));
	assert.ok(!names.some((name) => name.includes("angular/")));
});

test("runtime environment and trailing overrides apply in declaration order", async () => {
	const config = fastConfig(
		{ environment: "node" },
		{
			files: ["**/*.js"],
			languageOptions: { globals: { __APP_VERSION__: "readonly" } },
			rules: publicApi.defineRules({ "no-console": "error" }),
		},
		{
			files: ["**/allowed.js"],
			name: "project/allow-console",
			rules: { "no-console": "off" },
		}
	);
	const linter = createLinter(config);
	const [blockedResult] = await linter.lintText("console.log(process.cwd(), __APP_VERSION__);\n", { filePath: "fixtures/blocked.js" });
	const [allowedResult] = await linter.lintText("console.log(process.cwd(), __APP_VERSION__);\n", { filePath: "fixtures/allowed.js" });

	assert.equal(config.at(-1)?.name, "project/allow-console");
	assert.ok(blockedResult.messages.some((message) => message.ruleId === "no-console"));
	assert.ok(!blockedResult.messages.some((message) => message.ruleId === "no-undef"));
	assert.ok(!allowedResult.messages.some((message) => message.ruleId === "no-console"));
});

test("VS Code settings and extension recommendations allow JSONC comments", async () => {
	const linter = createLinter(fastConfig());
	const fixtures = [
		{
			code: '{\n\t// Workspace editor setting.\n\t"editor.formatOnSave": true\n}\n',
			filePath: "fixtures/.vscode/settings.json",
		},
		{
			code: '{\n\t// Workspace extension recommendation.\n\t"recommendations": ["dbaeumer.vscode-eslint"]\n}\n',
			filePath: "fixtures/.vscode/extensions.json",
		},
	];

	for (const fixture of fixtures) {
		const [result] = await linter.lintText(fixture.code, { filePath: fixture.filePath });
		const calculated = await linter.calculateConfigForFile(fixture.filePath);

		assert.equal(result.fatalErrorCount, 0);
		assert.ok(!result.messages.some((message) => message.ruleId === "jsonc/no-comments"));
		assert.equal(calculated.rules["jsonc/no-comments"][0], 0);
	}
});

test("Lodash config fragment rejects mixed static imports", async () => {
	const defaultLinter = createLinter(createBaseConfigs());
	const [defaultResult] = await defaultLinter.lintText('import get from "lodash/get";\nvoid get;\n', {
		filePath: "fixtures/default-lodash.js",
	});
	assert.ok(!defaultResult.messages.some((message) => message.ruleId === "no-restricted-imports"));

	const unifiedLinter = createLinter([...createBaseConfigs(), ...createLodashConfigs("lodash-unified")]);
	const [unifiedResult] = await unifiedLinter.lintText(
		'import get from "lodash/get";\nimport { debounce } from "lodash-es";\nexport { default as pick } from "lodash/pick";\nvoid get;\nvoid debounce;\n',
		{ filePath: "fixtures/prefer-lodash-unified.js" }
	);
	assert.equal(unifiedResult.messages.filter((message) => message.ruleId === "no-restricted-imports").length, 3);

	const lodashLinter = createLinter([...createBaseConfigs(), ...createLodashConfigs("lodash")]);
	const [lodashResult] = await lodashLinter.lintText(
		'import { debounce } from "lodash-unified";\nimport { get } from "lodash-es";\nexport * from "lodash-unified/fp";\nvoid debounce;\nvoid get;\n',
		{ filePath: "fixtures/prefer-lodash.js" }
	);
	assert.equal(lodashResult.messages.filter((message) => message.ruleId === "no-restricted-imports").length, 3);
	assert.equal(preferLodashRules["no-restricted-imports"]?.[0], "error");
	assert.equal(preferLodashUnifiedRules["no-restricted-imports"]?.[0], "error");
});

test("TypeScript always uses recommendedTypeChecked and Project Service", async () => {
	const linter = createLinter(createBaseConfigs({ environment: "node" }));
	const [result] = await linter.lintFiles(["src/index.ts"]);
	const calculated = await linter.calculateConfigForFile("src/index.ts");
	const presets = getTypeScriptPresetConfigs();

	assert.equal(result.fatalErrorCount, 0, result.messages.map((message) => message.message).join(", "));
	assert.equal(calculated.languageOptions.parserOptions.projectService, true);
	assert.equal(calculated.rules["@typescript-eslint/prefer-promise-reject-errors"][1].allowThrowingUnknown, true);
	assert.ok(presets.some((item) => item.name === "typescript-eslint/recommended-type-checked"));
});

test("root Vue configuration includes UniApp globals, nvue parsing, manifest comments, and output ignores", async () => {
	const linter = createLinter(fastConfig());
	const [javaScriptResult] = await linter.lintText(
		"uni.getSystemInfoSync();\ngetCurrentPages();\n// #ifdef MP-WEIXIN\nwx.request({});\n// #endif\n// #ifdef APP-PLUS\nplus.runtime.getProperty();\n// #endif\nunknownHostApi();\n",
		{ filePath: "fixtures/uniapp.js" }
	);
	const [nvueResult] = await linter.lintFiles(["tests/fixtures/home.nvue"]);
	const [pagesResult] = await linter.lintText('{\n\t// UniApp pages can contain comments.\n\t"pages": []\n}\n', {
		filePath: "fixtures/pages.json",
	});

	assert.ok(!javaScriptResult.messages.some((message) => message.message.includes("'uni' is not defined")));
	assert.ok(!javaScriptResult.messages.some((message) => message.message.includes("'wx' is not defined")));
	assert.ok(!javaScriptResult.messages.some((message) => message.message.includes("'plus' is not defined")));
	assert.ok(javaScriptResult.messages.some((message) => message.message.includes("'unknownHostApi' is not defined")));
	assert.equal(nvueResult.fatalErrorCount, 0, nvueResult.messages.map((message) => message.message).join(", "));
	assert.ok(!pagesResult.messages.some((message) => message.ruleId === "jsonc/no-comments"));
	assert.ok(DEFAULT_IGNORE_PATTERNS.includes("**/unpackage/**"));
});

test("React composes explicitly on the framework-neutral base", async () => {
	const config = defineConfig([...createBaseConfigs(), ...createReactConfigs()]);
	const names = config.map((item) => item.name ?? "");
	const linter = createLinter(config);
	const [result] = await linter.lintText(
		'import { useState } from "react";\n\nfunction App({ ready }) {\n\tif (ready) useState(0);\n\treturn <button>Save</button>;\n}\n\nexport { App };\n',
		{ filePath: "fixtures/App.jsx" }
	);

	assert.ok(names.some((name) => name.includes("react/javascript")));
	assert.ok(names.some((name) => name.includes("react/typescript-type-checked")));
	assert.ok(!names.some((name) => name.includes("vue/")));
	assert.ok(result.messages.some((message) => message.ruleId === "react-hooks/rules-of-hooks"));
	assert.ok(result.messages.some((message) => message.ruleId === "@eslint-react/dom-no-missing-button-type"));
	const calculated = await linter.calculateConfigForFile("fixtures/App.jsx");
	assert.equal(calculated.rules["@eslint-react/rules-of-hooks"][0], 0);
});

test("Angular composes explicitly on the framework-neutral base", async () => {
	const config = defineConfig([...createBaseConfigs(), ...createAngularConfigs()]);
	const names = config.map((item) => item.name ?? "");
	const linter = createLinter(config);
	const [templateResult] = await linter.lintText('<img src="logo.png">\n', { filePath: "fixtures/app.component.html" });
	const [inlineResult] = await linter.lintText(
		'import { Component } from "@angular/core";\n\n@Component({ template: `<div (click)="save()">Save</div>` })\nexport class AppComponent {\n\tsave() { return true; }\n}\n',
		{ filePath: "src/app.component.ts" }
	);

	assert.ok(names.some((name) => name.includes("angular/typescript-with-inline-templates")));
	assert.ok(names.some((name) => name.includes("angular/template-accessibility")));
	assert.ok(!names.some((name) => name.includes("vue/")));
	assert.ok(templateResult.messages.some((message) => message.ruleId === "@angular-eslint/template/alt-text"));
	assert.ok(inlineResult.messages.some((message) => message.ruleId === "@angular-eslint/template/click-events-have-key-events"));
});

test("Angular fragment retains explicit inline-template and accessibility controls", async () => {
	const config = defineConfig([...createBaseConfigs(), ...createAngularConfigs({ inlineTemplates: false, templateAccessibility: false })]);
	const names = config.map((item) => item.name ?? "");
	const linter = createLinter(config);
	const [templateResult] = await linter.lintText('<img src="logo.png">\n', { filePath: "fixtures/app.component.html" });

	assert.ok(names.includes("@fast-china/angular/typescript"));
	assert.ok(names.includes("@fast-china/angular/template"));
	assert.ok(!templateResult.messages.some((message) => message.ruleId === "@angular-eslint/template/alt-text"));
});

test("Markdown remains an explicitly composed capability", async () => {
	const defaultNames = createBaseConfigs().map((config) => config.name ?? "");
	const config = defineConfig([...createBaseConfigs(), ...createMarkdownConfigs()]);
	const linter = createLinter(config);
	const [result] = await linter.lintText("# Example\n\nA valid Markdown document.\n", { filePath: "fixtures/example.md" });

	assert.ok(!defaultNames.some((name) => name.includes("markdown")));
	assert.ok(config.some((item) => item.name?.includes("markdown")));
	assert.equal(result.fatalErrorCount, 0, result.messages.map((message) => message.message).join(", "));
});

test("shared JavaScript, TypeScript, and Vue rule contract stays active", async () => {
	const linter = createLinter(fastConfig());
	const javaScriptConfig = await linter.calculateConfigForFile("fixtures/example.js");
	const typeScriptConfig = await linter.calculateConfigForFile("src/example.ts");
	const vueConfig = await linter.calculateConfigForFile("src/App.vue");

	assert.equal(javaScriptConfig.rules["sort-imports"][0], 1);
	assert.equal(javaScriptConfig.rules["prefer-exponentiation-operator"][0], 2);
	assert.equal(javaScriptConfig.rules["prefer-object-has-own"][0], 2);
	assert.equal(javaScriptConfig.rules["prefer-arrow-callback"][0], 2);
	assert.equal(javaScriptConfig.rules["no-use-before-define"][1].functions, false);
	assert.equal(javaScriptConfig.rules["logical-assignment-operators"][0], 2);
	assert.equal(javaScriptConfig.rules["prefer-object-spread"][0], 2);
	assert.equal(javaScriptConfig.rules["import-x/order"][0], 2);
	assert.equal(javaScriptConfig.rules["import-x/order"][1].warnOnUnassignedImports, true);

	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-unused-vars"][1].argsIgnorePattern, "^_");
	assert.equal(typeScriptConfig.rules["@typescript-eslint/explicit-module-boundary-types"][1].allowArgumentsExplicitlyTypedAsAny, false);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/explicit-function-return-type"]?.[0] ?? 0, 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-explicit-any"][0], 1);
	assert.deepEqual(typeScriptConfig.rules["@typescript-eslint/no-empty-function"][1].allow, ["constructors", "overrideMethods"]);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/consistent-type-imports"][1].fixStyle, "inline-type-imports");
	assert.equal(typeScriptConfig.languageOptions.parserOptions.projectService, true);

	assert.equal(vueConfig.rules["vue/attribute-hyphenation"][1], "always");
	assert.equal(vueConfig.rules["vue/no-v-html"][0], 1);
	assert.equal(vueConfig.rules["vue/no-v-text-v-html-on-component"][0], 2);
});

test("manifest sorting is enabled and preserves semantic exports condition order", async () => {
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
	const linter = createLinter(fastConfig(), { fix: true });
	const [result] = await linter.lintText(source, { filePath: "fixtures/package.json" });
	const fixed = result.output ?? source;

	assert.ok(fixed.indexOf('"name"') < fixed.indexOf('"version"'));
	assert.ok(fixed.indexOf('"node"') < fixed.indexOf('"import"'));
	assert.ok(fixed.indexOf('"import"') < fixed.indexOf('"default"'));
});
