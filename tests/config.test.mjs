import assert from "node:assert/strict";
import test from "node:test";
import * as publicApi from "@fast-china/eslint-config";
import {
	DEFAULT_IGNORE_PATTERNS,
	createAngularConfigs,
	createEnvironmentConfigs,
	createGlobalIgnores,
	createImportConfigs,
	createLodashConfigs,
	createMarkdownConfigs,
	createReactConfigs,
	createTypeScriptConfigs,
	getTypeScriptPresetConfigs,
} from "@fast-china/eslint-config/configs";
import { preferLodashRules, preferLodashUnifiedRules } from "@fast-china/eslint-config/rules";
import { ESLint } from "eslint";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const { createBaseConfigs, createUniAppProjectConfigs, createVueProjectConfigs, uniAppConfig, vueConfig } = publicApi;

const createLinter = (config, options = {}) =>
	new ESLint({
		cwd: process.cwd(),
		ignore: false,
		overrideConfig: config,
		overrideConfigFile: true,
		...options,
	});

test("root package exports independent named configurations without legacy aliases", () => {
	assert.ok(Array.isArray(vueConfig));
	assert.ok(Array.isArray(uniAppConfig));
	assert.equal("default" in publicApi, false);
	assert.equal("fastConfig" in publicApi, false);
	assert.deepEqual(
		vueConfig.map((config) => config.name),
		createVueProjectConfigs().map((config) => config.name)
	);
	assert.deepEqual(
		uniAppConfig.map((config) => config.name),
		createUniAppProjectConfigs().map((config) => config.name)
	);
	assert.deepEqual(publicApi.defineRules({ "no-console": "warn" }), { "no-console": "warn" });
});

test("named framework configurations can be used directly or spread into defineConfig", async () => {
	const directLinter = createLinter(defineConfig([vueConfig]));
	const spreadLinter = createLinter(defineConfig([...uniAppConfig]));

	assert.ok(await directLinter.calculateConfigForFile("src/index.ts"));
	assert.ok(await spreadLinter.calculateConfigForFile("src/index.ts"));
});

test("configuration fragment factories consistently return arrays", () => {
	const globalIgnoreConfigs = createGlobalIgnores(["fixtures/generated/**"]);
	const environmentConfigs = createEnvironmentConfigs({ files: ["fixtures/**/*.js"], nodeFiles: [] });

	assert.ok(Array.isArray(globalIgnoreConfigs));
	assert.equal(globalIgnoreConfigs.length, 1);
	assert.equal(globalIgnoreConfigs[0].name, "@fast-china/ignores/global");
	assert.ok(DEFAULT_IGNORE_PATTERNS.includes("**/{.pnpm-store,node_modules}/**"));
	assert.ok(Array.isArray(createBaseConfigs()));
	assert.equal(environmentConfigs.length, 2);
	assert.deepEqual(
		environmentConfigs.map((config) => config.name),
		["@fast-china/globals/browser", "@fast-china/globals/node-tooling"]
	);
});

test("Vue and UniApp project configurations keep framework capabilities isolated", () => {
	const vueNames = createVueProjectConfigs().map((config) => config.name ?? "");
	const uniAppNames = createUniAppProjectConfigs().map((config) => config.name ?? "");

	for (const names of [vueNames, uniAppNames]) {
		assert.ok(names.some((name) => name.includes("ignores/git")));
		assert.ok(names.some((name) => name.includes("javascript")));
		assert.ok(names.some((name) => name.includes("typescript/type-checked")));
		assert.ok(names.some((name) => name.includes("vue/type-checked")));
		assert.ok(names.some((name) => name.includes("vue/jsx")));
		assert.ok(names.some((name) => name.includes("vue/tsx-type-checked")));
		assert.ok(names.some((name) => name.includes("json/json")));
		assert.ok(names.some((name) => name.includes("prettier")));
		assert.ok(names.some((name) => name.includes("sort/package-json")));
		assert.ok(names.some((name) => name.includes("sort/tsconfig")));
	}
	assert.ok(!vueNames.some((name) => name.includes("uniapp/")));
	assert.ok(uniAppNames.some((name) => name.includes("uniapp/globals")));
	assert.ok(uniAppNames.some((name) => name.includes("uniapp/ignores")));
});

test("base composition remains framework-neutral", () => {
	const names = createBaseConfigs().map((config) => config.name ?? "");

	assert.ok(names.some((name) => name.includes("typescript/type-checked")));
	assert.ok(names.some((name) => name.includes("sort/package-json")));
	assert.ok(names.some((name) => name.includes("sort/tsconfig")));
	assert.ok(!names.some((name) => name.includes("vue/")));
	assert.ok(!names.some((name) => name.includes("uniapp/")));
	assert.ok(!names.some((name) => name.includes("react/")));
	assert.ok(!names.some((name) => name.includes("angular/")));
});

test("runtime environment and trailing overrides apply in declaration order", async () => {
	const config = createVueProjectConfigs(
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
	const linter = createLinter(createVueProjectConfigs());
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

test("style imports form a final stable group while other imports retain import-x ordering", async () => {
	const linter = createLinter(createImportConfigs());
	const [validResult] = await linter.lintText(
		'import vue from "vue";\nimport App from "./App.vue";\nimport "./z.scss";\nimport "vue-json-pretty/lib/styles.css";\nimport styles from "./a.module.scss?inline";\nvoid vue;\nvoid App;\nvoid styles;\n',
		{ filePath: "fixtures/style-imports-valid.js" }
	);
	const [misplacedStyleResult] = await linter.lintText('import "./theme.scss";\nimport App from "./App.vue";\nvoid App;\n', {
		filePath: "fixtures/style-imports-invalid.js",
	});
	const [sideEffectResult] = await linter.lintText('import App from "./App.vue";\nimport "reflect-metadata";\nvoid App;\n', {
		filePath: "fixtures/side-effect-imports-invalid.js",
	});
	const [alphabetizeResult] = await linter.lintText('import z from "z";\nimport a from "a";\nvoid z;\nvoid a;\n', {
		filePath: "fixtures/alphabetize-imports-invalid.js",
	});

	assert.equal(validResult.errorCount, 0, validResult.messages.map((message) => message.message).join(", "));
	assert.equal(misplacedStyleResult.messages.filter((message) => message.ruleId === "import-x/style-imports-last").length, 1);
	assert.ok(!misplacedStyleResult.messages.some((message) => message.ruleId === "import-x/order"));
	assert.equal(misplacedStyleResult.messages.find((message) => message.ruleId === "import-x/style-imports-last")?.fix, undefined);
	assert.ok(sideEffectResult.messages.some((message) => message.ruleId === "import-x/order"));
	assert.ok(alphabetizeResult.messages.some((message) => message.ruleId === "import-x/order"));
});

test("root aliases precede the final type and stylesheet groups", async () => {
	const linter = createLinter([{ files: ["**/*.ts"], languageOptions: { parser: tseslint.parser } }, ...createImportConfigs(["**/*.ts"])], {
		fix: true,
	});
	const source =
		'import type { Config } from "eslint";\nimport app from "@/app";\nimport "./app.css";\nconst config = {} as Config;\nvoid app;\nvoid config;\n';
	const [result] = await linter.lintText(source, { filePath: "fixtures/alias-import-order.ts" });

	assert.equal(
		result.output,
		'import app from "@/app";\nimport type { Config } from "eslint";\nimport "./app.css";\nconst config = {} as Config;\nvoid app;\nvoid config;\n'
	);
});

test("TypeScript uses the recommended type-aware preset and Project Service", async () => {
	const linter = createLinter(createBaseConfigs({ environment: "node" }));
	const [result] = await linter.lintFiles(["src/index.ts"]);
	const calculated = await linter.calculateConfigForFile("src/index.ts");
	const presets = getTypeScriptPresetConfigs();

	assert.equal(result.fatalErrorCount, 0, result.messages.map((message) => message.message).join(", "));
	assert.equal(calculated.languageOptions.parserOptions.projectService, true);
	assert.equal(calculated.languageOptions.parserOptions.extraFileExtensions, undefined);
	assert.equal(calculated.rules["@typescript-eslint/prefer-promise-reject-errors"][1].allowThrowingUnknown, true);
	assert.ok(presets.some((item) => item.name === "typescript-eslint/recommended-type-checked"));
	assert.ok(!presets.some((item) => item.name === "typescript-eslint/strict-type-checked"));
	assert.ok(!presets.some((item) => item.name === "typescript-eslint/stylistic-type-checked"));
});

test("Promise waiting stays a business decision while misuse and void operators remain checked", async () => {
	const linter = createLinter(createBaseConfigs({ environment: "node" }));
	const validSource = `declare function nextTick(callback?: () => void): Promise<void>;
declare function onMounted(hook: () => unknown): void;
declare function requestApi(): Promise<void>;
declare function notify(): void;

function handlePlaceholderHeight(): void {
	notify();
}

requestApi();

onMounted(() => {
	nextTick(() => {
		handlePlaceholderHeight();
	});
});

onMounted(async () => {
	await nextTick();
	handlePlaceholderHeight();
});

const handler: () => void = () => notify();
handler();
`;
	const invalidSource = `declare function requestApi(): Promise<void>;
declare function save(item: number): Promise<void>;

[1, 2].forEach(async (item) => {
	await save(item);
});
async function redundantAsync() {
	return 1;
}
void requestApi();
`;

	for (const filePath of ["tests/fixtures/promise-safety.ts", "tests/fixtures/promise-safety-component.tsx"]) {
		const [validResult] = await linter.lintText(validSource, { filePath });
		const calculated = await linter.calculateConfigForFile(filePath);

		assert.equal(validResult.errorCount, 0, validResult.messages.map((message) => `${message.ruleId}: ${message.message}`).join(", "));
		assert.equal(calculated.rules["@typescript-eslint/no-floating-promises"][0], 0);
		assert.equal(calculated.rules["@typescript-eslint/no-misused-promises"][0], 2);
		assert.equal(calculated.rules["@typescript-eslint/require-await"][0], 2);
		assert.deepEqual(calculated.rules["@typescript-eslint/return-await"], [2, "error-handling-correctness-only"]);
		assert.equal(calculated.rules["@typescript-eslint/strict-void-return"][0], 0);
		assert.equal(calculated.rules["no-void"][0], 2);
		assert.equal(calculated.rules["@typescript-eslint/explicit-function-return-type"][0], 0);
		assert.equal(calculated.rules["@typescript-eslint/explicit-module-boundary-types"][0], filePath.endsWith(".tsx") ? 0 : 2);
	}

	const tsxComponentSource = `declare global {
	namespace JSX {
		interface Element { readonly type: string }
		interface IntrinsicElements { button: { children?: unknown; onClick?: () => unknown } }
	}
}

type Props = { label: string };
declare function save(): Promise<void>;

export function Button({ label }: Props) {
	return <button onClick={async () => { await save(); }}>{label}</button>;
}
`;
	const [tsxComponentResult] = await linter.lintText(tsxComponentSource, {
		filePath: "tests/fixtures/promise-safety-component.tsx",
	});
	assert.equal(tsxComponentResult.errorCount, 0, tsxComponentResult.messages.map((message) => `${message.ruleId}: ${message.message}`).join(", "));

	const vueLinter = createLinter(createVueProjectConfigs());
	const [vueResult] = await vueLinter.lintText(
		`<script setup lang="ts">
type ElSelectorOutput = string;

declare function defineEmits<T extends Record<string, (...args: never[]) => boolean>>(
	validators: T,
): <K extends keyof T>(event: K, ...args: Parameters<T[K]>) => void;

const emit = defineEmits({
	change: (value: ElSelectorOutput) => true,
});

const handleChange = (data: ElSelectorOutput) => {
	emit("change", data);
};
</script>

<template>
	<ElSelector @change="handleChange" />
</template>
`,
		{ filePath: "tests/fixtures/PromiseSafety.vue" }
	);
	assert.equal(vueResult.errorCount, 0, vueResult.messages.map((message) => `${message.ruleId}: ${message.message}`).join(", "));
	const [vueJsxResult] = await vueLinter.lintText("export const Button = ({ label }) => <button>{label}</button>;\n", {
		filePath: "fixtures/VueComponent.jsx",
	});
	const [vueTsxResult] = await vueLinter.lintText(tsxComponentSource, {
		filePath: "tests/fixtures/promise-safety-component.tsx",
	});
	assert.equal(vueJsxResult.errorCount, 0, vueJsxResult.messages.map((message) => `${message.ruleId}: ${message.message}`).join(", "));
	assert.equal(vueTsxResult.errorCount, 0, vueTsxResult.messages.map((message) => `${message.ruleId}: ${message.message}`).join(", "));
	const [vueInvalidResult] = await vueLinter.lintText(
		`<script setup lang="ts">
const unusedValue = 1;
</script>
`,
		{ filePath: "tests/fixtures/PromiseSafety.vue" }
	);
	assert.ok(vueInvalidResult.messages.some((message) => message.ruleId === "@typescript-eslint/no-unused-vars"));

	const [invalidResult] = await linter.lintText(invalidSource, { filePath: "tests/fixtures/promise-safety.ts" });
	assert.ok(invalidResult.messages.some((message) => message.ruleId === "@typescript-eslint/no-misused-promises"));
	assert.ok(invalidResult.messages.some((message) => message.ruleId === "@typescript-eslint/require-await"));
	assert.ok(!invalidResult.messages.some((message) => message.ruleId === "@typescript-eslint/explicit-function-return-type"));
	assert.ok(invalidResult.messages.some((message) => message.ruleId === "no-void"));
});

test("TSX keeps type safety without SDK return annotations and intersects every custom file pattern", async () => {
	const configs = createTypeScriptConfigs(["src/**/*.ts", "src/**/*.tsx"]);
	const linter = createLinter(configs);
	const typeScriptConfig = await linter.calculateConfigForFile("src/example.ts");
	const tsxConfig = await linter.calculateConfigForFile("src/example.tsx");

	assert.deepEqual(configs.at(-1)?.files, [
		["src/**/*.ts", "**/*.tsx"],
		["src/**/*.tsx", "**/*.tsx"],
	]);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/explicit-module-boundary-types"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-misused-promises"][1], undefined);
	assert.equal(tsxConfig.rules["@typescript-eslint/explicit-module-boundary-types"][0], 0);
	assert.equal(tsxConfig.rules["@typescript-eslint/no-misused-promises"][1].checksVoidReturn.attributes, false);
	assert.equal(tsxConfig.rules["@typescript-eslint/no-unsafe-assignment"][0], 2);
});

test("Vue JSX and TSX share component semantics without inheriting template syntax rules", async () => {
	const linter = createLinter(createVueProjectConfigs());
	const jsxSource = `const defineComponent = (options) => options;

export default defineComponent({
	name: "div",
	emits: [],
	props: { count: Number },
	data() {
		return { count: 1 };
	},
	setup(props, { emit }) {
		props.count += 1;
		emit("save-item");
		return () => <button aria-label="save">Save</button>;
	},
});
`;
	const tsxSource = `declare global {
	namespace JSX {
		interface Element { readonly type: string }
		interface IntrinsicElements { button: { "aria-label"?: string; children?: unknown } }
	}
}

type Options = {
	name: string;
	emits: string[];
	props: { count: NumberConstructor };
	data: () => { count: number };
	setup: (props: { count: number }, context: { emit: (event: string) => void }) => () => JSX.Element;
};

const defineComponent = (options: Options): Options => options;

export default defineComponent({
	name: "div",
	emits: [],
	props: { count: Number },
	data() {
		return { count: 1 };
	},
	setup(props, { emit }) {
		props.count += 1;
		emit("save-item");
		return () => <button aria-label="save">Save</button>;
	},
});
`;
	const cases = [
		{ filePath: "fixtures/VueComponent.jsx", source: jsxSource },
		{ filePath: "tests/fixtures/promise-safety-component.tsx", source: tsxSource },
	];

	for (const { filePath, source } of cases) {
		const config = await linter.calculateConfigForFile(filePath);
		const [result] = await linter.lintText(source, { filePath });
		const ruleIds = new Set(result.messages.map((message) => message.ruleId));

		for (const ruleName of [
			"vue/require-explicit-emits",
			"vue/no-dupe-keys",
			"vue/no-mutating-props",
			"vue/no-reserved-component-names",
			"vue/no-setup-props-reactivity-loss",
			"vue/no-ref-object-reactivity-loss",
		]) {
			assert.equal(config.rules[ruleName][0], 2, `${ruleName} must apply to ${filePath}`);
		}
		for (const ruleName of ["vue/attribute-hyphenation", "vue/attributes-order", "vue/no-v-text-v-html-on-component"]) {
			assert.equal(config.rules[ruleName], undefined, `${ruleName} must remain template-only for ${filePath}`);
		}
		for (const ruleName of [
			"vue/require-explicit-emits",
			"vue/no-dupe-keys",
			"vue/no-mutating-props",
			"vue/no-reserved-component-names",
			"vue/custom-event-name-casing",
		]) {
			assert.ok(ruleIds.has(ruleName), `${ruleName} must report the invalid ${filePath} fixture`);
		}
	}
});

test("Vue excludes UniApp capabilities while the UniApp entry enables them", async () => {
	const vueLinter = createLinter(createVueProjectConfigs());
	const uniAppLinter = createLinter(createUniAppProjectConfigs());
	const source =
		"uni.getSystemInfoSync();\ngetCurrentPages();\n// #ifdef MP-WEIXIN\nwx.request({});\n// #endif\n// #ifdef APP-PLUS\nplus.runtime.getProperty();\n// #endif\nunknownHostApi();\n";
	const [vueJavaScriptResult] = await vueLinter.lintText(source, { filePath: "fixtures/uniapp.js" });
	const [uniAppJavaScriptResult] = await uniAppLinter.lintText(source, { filePath: "fixtures/uniapp.js" });
	const vueNvueConfig = await vueLinter.calculateConfigForFile("tests/fixtures/home.nvue");
	const [nvueResult] = await uniAppLinter.lintFiles(["tests/fixtures/home.nvue"]);
	const [pagesResult] = await uniAppLinter.lintText('{\n\t// UniApp pages can contain comments.\n\t"pages": []\n}\n', {
		filePath: "fixtures/pages.json",
	});

	assert.ok(vueJavaScriptResult.messages.some((message) => message.message.includes("'uni' is not defined")));
	assert.ok(vueJavaScriptResult.messages.some((message) => message.message.includes("'wx' is not defined")));
	assert.ok(vueJavaScriptResult.messages.some((message) => message.message.includes("'plus' is not defined")));
	assert.ok(!uniAppJavaScriptResult.messages.some((message) => message.message.includes("'uni' is not defined")));
	assert.ok(!uniAppJavaScriptResult.messages.some((message) => message.message.includes("'wx' is not defined")));
	assert.ok(!uniAppJavaScriptResult.messages.some((message) => message.message.includes("'plus' is not defined")));
	assert.ok(uniAppJavaScriptResult.messages.some((message) => message.message.includes("'unknownHostApi' is not defined")));
	assert.equal(vueNvueConfig, undefined);
	assert.equal(nvueResult.fatalErrorCount, 0, nvueResult.messages.map((message) => message.message).join(", "));
	assert.ok(!pagesResult.messages.some((message) => message.ruleId === "jsonc/no-comments"));
	assert.ok(!DEFAULT_IGNORE_PATTERNS.includes("**/unpackage/**"));
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
	const [tableResult] = await linter.lintText("| Name | Value |\n| --- | --- |\n| Fast | 1 | extra |\n", {
		filePath: "fixtures/example.md",
	});

	assert.ok(!defaultNames.some((name) => name.includes("markdown")));
	assert.ok(config.some((item) => item.name?.includes("markdown")));
	assert.equal(result.fatalErrorCount, 0, result.messages.map((message) => message.message).join(", "));
	assert.ok(tableResult.messages.some((message) => message.ruleId === "markdown/table-column-count"));
});

test("shared JavaScript, TypeScript, and Vue rule contract stays active", async () => {
	const linter = createLinter(createVueProjectConfigs());
	const uniAppLinter = createLinter(createUniAppProjectConfigs());
	const javaScriptConfig = await linter.calculateConfigForFile("fixtures/example.js");
	const typeScriptConfig = await linter.calculateConfigForFile("src/example.ts");
	const jsxConfig = await linter.calculateConfigForFile("fixtures/VueComponent.jsx");
	const tsxConfig = await linter.calculateConfigForFile("src/example.tsx");
	const vueConfig = await linter.calculateConfigForFile("src/App.vue");
	const uniAppTypeScriptConfig = await uniAppLinter.calculateConfigForFile("src/example.ts");
	const nvueConfig = await uniAppLinter.calculateConfigForFile("src/App.nvue");

	assert.equal(javaScriptConfig.rules["sort-imports"][0], 2);
	assert.equal(javaScriptConfig.rules["sort-imports"][1].ignoreDeclarationSort, true);
	assert.equal(javaScriptConfig.rules["sort-imports"][1].ignoreMemberSort, false);
	assert.equal(javaScriptConfig.rules["prefer-exponentiation-operator"][0], 2);
	assert.equal(javaScriptConfig.rules["prefer-object-has-own"], undefined);
	assert.equal(javaScriptConfig.rules["prefer-arrow-callback"][0], 2);
	assert.equal(javaScriptConfig.rules["no-use-before-define"][1].functions, false);
	assert.equal(javaScriptConfig.rules["logical-assignment-operators"][0], 2);
	assert.equal(javaScriptConfig.rules["prefer-object-spread"][0], 2);
	assert.equal(javaScriptConfig.rules.camelcase[0], 2);
	assert.equal(javaScriptConfig.rules.camelcase[1].properties, "never");
	assert.equal(javaScriptConfig.rules["no-empty"][0], 2);
	assert.equal(javaScriptConfig.rules["no-empty"][1].allowEmptyCatch, true);
	assert.equal(javaScriptConfig.rules["no-eval"][0], 2);
	assert.equal(javaScriptConfig.rules["no-implied-eval"][0], 2);
	assert.equal(javaScriptConfig.rules["no-new-func"][0], 2);
	assert.equal(javaScriptConfig.rules["no-empty-character-class"][0], 2);
	assert.equal(javaScriptConfig.rules["no-invalid-regexp"][0], 2);
	assert.equal(javaScriptConfig.rules["no-useless-backreference"][0], 2);
	assert.equal(javaScriptConfig.rules["no-promise-executor-return"][0], 2);
	assert.deepEqual(javaScriptConfig.rules.curly, [2, "multi-line", "consistent"]);
	assert.equal(javaScriptConfig.rules["default-case-last"][0], 2);
	assert.equal(javaScriptConfig.rules["no-void"][0], 2);
	assert.equal(javaScriptConfig.rules["import-x/order"][0], 2);
	assert.equal(javaScriptConfig.rules["import-x/order"][1].warnOnUnassignedImports, true);
	assert.equal(javaScriptConfig.rules["import-x/order"][1].sortTypesGroup, true);
	assert.equal(javaScriptConfig.rules["import-x/order"][1].groups.at(-1), "type");
	assert.deepEqual(
		javaScriptConfig.rules["import-x/order"][1].pathGroups.find((group) => group.pattern === "@/**"),
		{ pattern: "@/**", group: "internal", position: "before" }
	);
	assert.deepEqual(javaScriptConfig.rules["import-x/order"][1].pathGroupsExcludedImportTypes, ["type"]);
	assert.ok(javaScriptConfig.rules["import-x/order"][1].pathGroups.some((group) => group.pattern.includes("react-dom")));
	assert.ok(javaScriptConfig.rules["import-x/order"][1].pathGroups.some((group) => group.pattern.includes("@angular")));
	assert.ok(javaScriptConfig.rules["import-x/order"][1].pathGroups.some((group) => group.pattern.includes("vite")));
	assert.equal(javaScriptConfig.rules["import-x/style-imports-last"][0], 2);

	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-unused-vars"][1].argsIgnorePattern, "^_");
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-unused-vars"][1].varsIgnorePattern, undefined);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/explicit-module-boundary-types"][1].allowArgumentsExplicitlyTypedAsAny, false);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/explicit-function-return-type"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-explicit-any"][0], 1);
	assert.deepEqual(typeScriptConfig.rules["@typescript-eslint/no-empty-function"][1].allow, ["constructors", "overrideMethods"]);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/consistent-type-imports"][1].fixStyle, "separate-type-imports");
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-import-type-side-effects"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-implied-eval"][0], 2);
	assert.equal(typeScriptConfig.rules["no-implied-eval"][0], 0);
	assert.equal(typeScriptConfig.rules["no-new-func"][0], 2);
	assert.equal(typeScriptConfig.languageOptions.parserOptions.projectService, true);
	assert.deepEqual(typeScriptConfig.languageOptions.parserOptions.extraFileExtensions, [".vue"]);
	assert.deepEqual(uniAppTypeScriptConfig.languageOptions.parserOptions.extraFileExtensions, [".vue", ".nvue"]);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-floating-promises"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-misused-promises"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-misused-promises"][1], undefined);
	assert.equal(tsxConfig.rules["@typescript-eslint/no-misused-promises"][1].checksVoidReturn.attributes, false);
	assert.equal(typeScriptConfig.rules["no-redeclare"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-redeclare"][0], 2);
	assert.equal(tsxConfig.rules["@typescript-eslint/no-unsafe-assignment"][0], 2);
	for (const config of [jsxConfig, tsxConfig]) {
		assert.equal(config.rules["vue/require-explicit-emits"][0], 2);
		assert.equal(config.rules["vue/no-dupe-keys"][0], 2);
		assert.equal(config.rules["vue/no-mutating-props"][0], 2);
		assert.equal(config.rules["vue/no-reserved-component-names"][0], 2);
		assert.equal(config.rules["vue/attribute-hyphenation"], undefined);
		assert.equal(config.rules["vue/attributes-order"], undefined);
		assert.equal(config.rules["vue/no-v-text-v-html-on-component"], undefined);
	}
	assert.equal(typeScriptConfig.rules["@typescript-eslint/await-thenable"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/require-await"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-unsafe-argument"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-unsafe-assignment"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-unsafe-call"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-unsafe-member-access"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-unsafe-return"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/strict-void-return"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-meaningless-void-operator"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-confusing-void-expression"][1].ignoreArrowShorthand, true);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/restrict-template-expressions"][1].allowBoolean, true);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/restrict-template-expressions"][1].allowNumber, true);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-dynamic-delete"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-extraneous-class"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-non-null-assertion"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-deprecated"][0], 1);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-unnecessary-condition"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/switch-exhaustiveness-check"][0], 2);
	assert.equal(vueConfig.rules["@typescript-eslint/switch-exhaustiveness-check"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/consistent-type-definitions"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/consistent-indexed-object-style"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/class-literal-property-style"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/prefer-regexp-exec"][0], 0);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/consistent-type-exports"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/prefer-readonly"][0], 2);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/prefer-nullish-coalescing"][1].ignorePrimitives, true);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/prefer-optional-chain"][1].requireNullish, true);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/unified-signatures"][0], 0);
	assert.deepEqual(typeScriptConfig.rules["@typescript-eslint/no-inferrable-types"], [2, { ignoreParameters: true, ignoreProperties: true }]);

	assert.equal(vueConfig.rules["vue/no-v-html"][0], 1);
	assert.equal(vueConfig.rules["vue/require-explicit-emits"][0], 2);
	assert.equal(vueConfig.rules["vue/attribute-hyphenation"][1], "always");
	assert.equal(vueConfig.rules["vue/no-dupe-keys"][0], 2);
	assert.equal(vueConfig.rules["vue/no-mutating-props"][0], 2);
	assert.equal(vueConfig.rules["vue/no-reserved-component-names"][0], 2);
	assert.equal(vueConfig.rules["vue/no-v-text-v-html-on-component"][0], 2);
	assert.deepEqual(vueConfig.rules["vue/attributes-order"][1].order, [
		"DEFINITION",
		"LIST_RENDERING",
		"CONDITIONALS",
		"RENDER_MODIFIERS",
		"UNIQUE",
		"GLOBAL",
		"OTHER_ATTR",
		"EVENTS",
		"CONTENT",
	]);
	assert.deepEqual(vueConfig.languageOptions.parserOptions.extraFileExtensions, [".vue"]);
	assert.deepEqual(nvueConfig.languageOptions.parserOptions.extraFileExtensions, [".vue", ".nvue"]);
	assert.equal(vueConfig.rules["@typescript-eslint/explicit-function-return-type"][0], 0);
	assert.equal(vueConfig.rules["@typescript-eslint/explicit-module-boundary-types"][0], 0);
	assert.equal(vueConfig.rules["@typescript-eslint/no-misused-promises"][1].checksVoidReturn.attributes, false);
	assert.equal(vueConfig.rules["vue/no-setup-props-reactivity-loss"][0], 2);
	assert.equal(vueConfig.rules["vue/no-ref-object-reactivity-loss"][0], 2);
	assert.equal(vueConfig.rules["@typescript-eslint/no-unused-vars"][1].args, "none");
	assert.equal(vueConfig.rules["@typescript-eslint/no-unused-vars"][1].caughtErrors, "none");
	assert.deepEqual(typeScriptConfig.languageOptions.parserOptions.extraFileExtensions, vueConfig.languageOptions.parserOptions.extraFileExtensions);
	for (const ruleName of [
		"@typescript-eslint/no-misused-promises",
		"@typescript-eslint/await-thenable",
		"@typescript-eslint/require-await",
		"@typescript-eslint/no-unsafe-argument",
		"@typescript-eslint/no-unsafe-assignment",
		"@typescript-eslint/no-unsafe-call",
		"@typescript-eslint/no-unsafe-member-access",
		"@typescript-eslint/no-unsafe-return",
	]) {
		assert.equal(vueConfig.rules[ruleName][0], 2, `${ruleName} must remain enabled for Vue files`);
	}
	assert.equal(vueConfig.rules["@typescript-eslint/no-floating-promises"][0], 0);
	assert.equal(vueConfig.rules["@typescript-eslint/strict-void-return"][0], 0);
});

test("manifest sorting is enabled by default and preserves semantic exports condition order", async () => {
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
	const linter = createLinter(createVueProjectConfigs(), { fix: true });
	const [result] = await linter.lintText(source, { filePath: "fixtures/package.json" });
	const fixed = result.output ?? source;

	assert.ok(fixed.indexOf('"name"') < fixed.indexOf('"version"'));
	assert.ok(fixed.indexOf('"node"') < fixed.indexOf('"import"'));
	assert.ok(fixed.indexOf('"import"') < fixed.indexOf('"default"'));
});
