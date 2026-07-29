import { a as reactRules, c as javascriptRules, d as angularRules, f as angularTemplateAccessibilityRules, i as packageJsonSortRules, l as importRules, n as typescriptRules, o as preferLodashRules, p as angularTemplateRules, r as tsconfigJsonSortRules, s as preferLodashUnifiedRules, t as vueRules, u as commonRules } from "./rules.mjs";
import { defineConfig, globalIgnores } from "eslint/config";
import angularPlugin from "@angular-eslint/eslint-plugin";
import angularTemplatePlugin from "@angular-eslint/eslint-plugin-template";
import angularTemplateParser from "@angular-eslint/template-parser";
import globals from "globals";
import eslintConfigFlatGitignore from "eslint-config-flat-gitignore";
import eslintPluginImportX from "eslint-plugin-import-x";
import eslint from "@eslint/js";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import eslintMarkdown from "@eslint/markdown";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginRegexp from "eslint-plugin-regexp";
import tseslint from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";
import vueEslintParser from "vue-eslint-parser";
//#region src/constants/index.ts
/** JavaScript 与 JSX 文件；扩展名列表与 Node.js ESM/CJS 约定保持一致。 */
const GLOBS_JAVASCRIPT = ["**/*.{js,cjs,mjs,jsx}"];
/** TypeScript 与 TSX 文件；包含 TypeScript 的 ESM/CJS 专用扩展名。 */
const GLOBS_TYPESCRIPT = ["**/*.{ts,cts,mts,tsx}"];
/** Vue 3 单文件组件。 */
const GLOB_VUE = "**/*.vue";
/** Angular 组件、指令、服务等框架源码；Angular CLI 项目以 `.ts` 为标准源码扩展名。 */
const GLOB_ANGULAR_TYPESCRIPT = "**/*.ts";
/** Angular 外部模板；内联模板由 Angular 处理器提取后复用同一模板配置。 */
const GLOB_ANGULAR_TEMPLATE = "**/*.html";
/** ESLint JSON language 支持的三种 JSON 方言。 */
const GLOB_JSON = "**/*.json";
const GLOB_JSONC = "**/*.jsonc";
const GLOB_JSON5 = "**/*.json5";
/** Markdown 文档。 */
const GLOB_MARKDOWN = "**/*.md";
/** 默认由 JavaScript、TypeScript 和 Vue 规则处理的全部代码文件。 */
const GLOBS_CODE = [
	...GLOBS_JAVASCRIPT,
	...GLOBS_TYPESCRIPT,
	GLOB_VUE
];
/**
* 应额外获得 Node.js 全局变量的工程文件。
*
* 这些模式还会与当前已启用的 JavaScript/TypeScript 文件模式做 AND 匹配，
* 因而关闭 TypeScript 后不会意外让 ESLint 接管 `.ts` 文件。
*/
const GLOBS_NODE_TOOLING = [
	"**/*.{config,setup}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/{scripts,bin}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/{test,tests}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/*.{test,spec}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/cli.{js,cjs,mjs,ts,cts,mts}"
];
/** TypeScript 配置文件；它们使用 JSONC 语法并允许注释。 */
const GLOBS_TSCONFIG = ["**/tsconfig.json", "**/tsconfig.*.json"];
/** 不应交给 JSON/Markdown 解析器处理的包管理器锁文件。 */
const GLOBS_LOCKFILES = [
	"**/package-lock.json",
	"**/yarn.lock",
	"**/pnpm-lock.yaml",
	"**/bun.lock",
	"**/bun.lockb",
	"**/deno.lock"
];
//#endregion
//#region src/configs/angular.ts
/**
* 创建 Angular TypeScript、外部 HTML 模板与内联模板配置。
*
* Angular 支持依赖工厂的 TypeScript 配置先注册 typescript-eslint 解析器；模板由
* Angular 专用 parser 解析，内联模板通过官方 processor 复用同一套 HTML 规则。
*/
const createAngularConfigs = ({ inlineTemplates = true, templateAccessibility = true } = {}) => defineConfig([{
	name: inlineTemplates ? "@fast-china/angular/typescript-with-inline-templates" : "@fast-china/angular/typescript",
	files: [GLOB_ANGULAR_TYPESCRIPT],
	plugins: { "@angular-eslint": angularPlugin },
	...inlineTemplates ? { processor: angularTemplatePlugin.processors["extract-inline-html"] } : {},
	rules: angularRules
}, {
	name: templateAccessibility ? "@fast-china/angular/template-accessibility" : "@fast-china/angular/template",
	files: [GLOB_ANGULAR_TEMPLATE],
	languageOptions: { parser: angularTemplateParser },
	plugins: { "@angular-eslint/template": angularTemplatePlugin },
	rules: {
		...angularTemplateRules,
		...templateAccessibility ? angularTemplateAccessibilityRules : {}
	}
}]);
//#endregion
//#region src/configs/common.ts
/**
* 创建跨 JavaScript、TypeScript 与 Vue 脚本生效的基础配置。
*
* 除公共规则外，这里还把无效的 `eslint-disable` 指令提升为错误，避免规则被移除后
* 留下长期失效的抑制注释。
*/
const createBaseConfigs = (files = GLOBS_CODE) => defineConfig([{
	name: "@fast-china/common",
	files: [...files],
	linterOptions: { reportUnusedDisableDirectives: "error" },
	rules: commonRules
}]);
//#endregion
//#region src/configs/environment.ts
/**
* 创建运行时环境相关的 ESLint 配置。
*
* 返回两个相互独立的 Flat Config 片段：第一个为应用源码配置所选环境和项目级全局
* 变量；第二个仅命中配置、脚本、测试与 CLI 等工程文件，为它们配置 Node.js 全局变量
* 并允许使用 `console`。分离范围可以减少跨运行时的假阴性。
*/
const createEnvironmentConfigs = ({ environment = "browser", files = GLOBS_CODE, nodeFiles = GLOBS_JAVASCRIPT, globals: projectGlobals = {} } = {}) => {
	const runtimeGlobals = {
		...environment !== "node" ? globals.browser : {},
		...environment !== "browser" ? globals.node : {},
		...projectGlobals
	};
	const nodeToolingFiles = GLOBS_NODE_TOOLING.flatMap((nodeGlob) => nodeFiles.map((fileGlob) => [nodeGlob, fileGlob]));
	return defineConfig([{
		name: `@fast-china/globals/${environment}`,
		files: [...files],
		languageOptions: { globals: runtimeGlobals }
	}, {
		name: "@fast-china/globals/node-tooling",
		files: nodeToolingFiles,
		languageOptions: { globals: globals.node },
		rules: { "no-console": "off" }
	}]);
};
//#endregion
//#region src/configs/ignores.ts
/**
* 默认忽略依赖、构建结果、缓存、生成文件和包管理器锁文件。
*
* 不忽略 `src`、`public`、测试夹具或普通 Markdown 文档，避免共享配置静默漏检
* 应由项目维护的文件。
*/
const DEFAULT_IGNORE_PATTERNS = Object.freeze([
	"**/node_modules/**",
	"**/{dist,build,coverage,output,temp,tmp}/**",
	"**/{.cache,.nuxt,.output,.vercel,.nitro}/**",
	"**/{.vitepress/cache,.vite-inspect}/**",
	"**/__snapshots__/**",
	"**/*.min.*",
	"**/auto-import?(s).d.ts",
	"**/components.d.ts",
	...GLOBS_LOCKFILES
]);
/** 创建全局忽略配置，并在默认集合之后追加项目自定义模式。 */
const createGlobalIgnores = (additionalPatterns = []) => globalIgnores([...DEFAULT_IGNORE_PATTERNS, ...additionalPatterns], "@fast-china/ignores/global");
/** 读取运行 ESLint 的项目根目录中的 `.gitignore`。 */
const createGitignoreConfigs = () => defineConfig([{
	name: "@fast-china/ignores/git",
	...eslintConfigFlatGitignore({ strict: false })
}]);
//#endregion
//#region src/configs/import.ts
/**
* 创建模块导入规则配置。
*
* 共享库不猜测项目的路径别名或解析器，因此只继承 import-x 的推荐能力，
* 与 resolver 强耦合且容易误报的规则会在本地规则记录中显式关闭。
*/
const createImportConfigs = (files = GLOBS_CODE) => defineConfig([{
	name: "@fast-china/import",
	files: [...files],
	extends: [eslintPluginImportX.flatConfigs.recommended],
	rules: importRules
}]);
//#endregion
//#region src/configs/javascript.ts
/**
* 创建 JavaScript/JSX 配置。
*
* `@eslint/js` 提供基础正确性规则，本仓库只在其后补充有明确维护理由的规则。
*/
const createJavaScriptConfigs = (files = GLOBS_JAVASCRIPT) => defineConfig([{
	name: "@fast-china/javascript",
	files: [...files],
	extends: [eslint.configs.recommended],
	languageOptions: {
		ecmaVersion: "latest",
		parserOptions: { ecmaFeatures: { jsx: true } }
	},
	rules: javascriptRules
}]);
//#endregion
//#region src/configs/json.ts
/**
* 创建 JSON、JSONC 与 JSON5 配置。
*
* 三种方言使用各自的官方推荐预置，避免严格 JSON 规则错误覆盖允许注释或尾随逗号的文件。
*/
const createJsonConfigs = () => defineConfig([
	{
		name: "@fast-china/json/json",
		files: [GLOB_JSON],
		extends: [eslintPluginJsonc.configs["flat/recommended-with-json"]]
	},
	{
		name: "@fast-china/json/jsonc",
		files: [GLOB_JSONC],
		extends: [eslintPluginJsonc.configs["flat/recommended-with-jsonc"]]
	},
	{
		name: "@fast-china/json/json5",
		files: [GLOB_JSON5],
		extends: [eslintPluginJsonc.configs["flat/recommended-with-json5"]]
	},
	{
		name: "@fast-china/json/vscode-settings",
		files: ["**/.vscode/settings.json"],
		rules: { "jsonc/no-comments": "off" }
	}
]);
//#endregion
//#region src/configs/lodash.ts
/**
* 创建 Lodash 静态导入约束。
*
* 该配置使用 ESLint 核心规则，因此不依赖 import-x 开关或额外插件。
*/
const createLodashConfigs = (preference, files = GLOBS_CODE) => defineConfig([{
	name: `@fast-china/lodash/${preference}`,
	files: [...files],
	rules: preference === "lodash" ? preferLodashRules : preferLodashUnifiedRules
}]);
//#endregion
//#region src/configs/markdown.ts
/**
* 创建 Markdown 结构与语法检查配置。
*
* 该配置检查 Markdown 文档本身；代码块是否接受额外语言规则由项目覆盖配置决定。
*/
const createMarkdownConfigs = () => defineConfig([{
	name: "@fast-china/markdown",
	files: [GLOB_MARKDOWN],
	extends: [eslintMarkdown.configs.recommended]
}]);
//#endregion
//#region src/configs/prettier.ts
/**
* 创建 Prettier 兼容层。
*
* 它只关闭与 Prettier 冲突的 ESLint 格式规则，不会在 ESLint 进程中执行 Prettier。
* 工厂始终把它放在内置配置之后，使上游预置的格式规则能够被正确覆盖。
*/
const createPrettierConfigs = () => defineConfig([{
	...eslintConfigPrettierFlat,
	name: "@fast-china/prettier"
}]);
//#endregion
//#region src/configs/react.ts
/**
* 创建 React、JSX/TSX 与 Hooks 配置。
*
* JavaScript 和 TypeScript 分别继承对应的 @eslint-react 推荐预置；Hooks 使用
* React 官方 Flat Config。组件、Hooks 即使不返回 JSX 也能在普通 `.js`/`.ts` 中
* 定义，因此规则覆盖全部已启用脚本扩展名，而不仅是 `.jsx`/`.tsx`。
*/
const createReactConfigs = ({ importSource = "react", polymorphicPropName = "as", version = "detect" } = {}, { javascript = true, typeChecked = false, typescript = true } = {}) => {
	const createConfig = (name, files, preset) => ({
		name,
		files: [...files],
		extends: [preset, eslintPluginReactHooks.configs.flat.recommended],
		settings: { "react-x": {
			importSource,
			polymorphicPropName,
			version
		} },
		rules: reactRules
	});
	return defineConfig([...javascript ? [createConfig("@fast-china/react/javascript", GLOBS_JAVASCRIPT, eslintReact.configs.recommended)] : [], ...typescript ? [createConfig(typeChecked ? "@fast-china/react/typescript-type-checked" : "@fast-china/react/typescript", GLOBS_TYPESCRIPT, typeChecked ? eslintReact.configs["recommended-type-checked"] : eslintReact.configs["recommended-typescript"])] : []]);
};
//#endregion
//#region src/configs/regexp.ts
/**
* 创建正则表达式正确性配置。
*
* 插件推荐规则会检查无效、冗余或容易产生回溯问题的正则结构；部分规则可修复，
* 批量修复后仍需运行覆盖真实输入的项目测试。
*/
const createRegexpConfigs = (files = GLOBS_CODE) => defineConfig([{
	name: "@fast-china/regexp",
	files: [...files],
	extends: [eslintPluginRegexp.configs["flat/recommended"]]
}]);
//#endregion
//#region src/configs/sort-package.ts
/**
* 创建 package.json 排序配置。
*
* 该能力会产生较大的可修复 diff，因此必须显式启用；规则不会进入顺序具有
* 条件导出语义的 `exports` 对象内部。
*/
const createPackageJsonSortConfigs = () => defineConfig([{
	name: "@fast-china/sort/package-json",
	files: ["**/package.json"],
	rules: packageJsonSortRules
}]);
//#endregion
//#region src/configs/sort-tsconfig.ts
/**
* 创建 tsconfig.json 排序配置。
*
* 排序只改变字段阅读顺序，不改变编译选项值；由于首次修复 diff 较大，默认关闭。
*/
const createTsconfigSortConfigs = () => defineConfig([{
	name: "@fast-china/sort/tsconfig",
	files: [...GLOBS_TSCONFIG],
	rules: tsconfigJsonSortRules
}]);
//#endregion
//#region src/configs/typescript.ts
/**
* 返回 typescript-eslint 推荐预置。
*
* Vue SFC 需要移除上游仅匹配 `.ts` 的文件范围，否则这些关闭核心规则的配置会与
* `.vue` 外层范围形成不可能命中的 AND 条件。
*/
const getTypeScriptPresetConfigs = (typeChecked, removeFileScopes = false) => {
	const configs = [...typeChecked ? tseslint.configs.recommendedTypeChecked : tseslint.configs.recommended, ...typeChecked ? tseslint.configs.stylisticTypeChecked : tseslint.configs.stylistic];
	if (!removeFileScopes) return configs;
	return configs.map((config) => {
		const { files: _files, ...configWithoutFiles } = config;
		return configWithoutFiles;
	});
};
/** 创建启用 Project Service 时需要的解析器选项。 */
const createTypeScriptParserOptions = ({ typeChecked = false, tsconfigRootDir } = {}) => ({
	...typeChecked ? { projectService: true } : {},
	...typeChecked && tsconfigRootDir ? { tsconfigRootDir } : {}
});
/**
* 创建 TypeScript 配置。
*
* 默认采用无需类型信息的 recommended + stylistic 预置；`typeChecked: true` 会切换为
* 对应的类型感知预置并启动 Project Service。
*/
const createTypeScriptConfigs = (options = {}, files = GLOBS_TYPESCRIPT) => defineConfig([{
	name: options.typeChecked ? "@fast-china/typescript/type-checked" : "@fast-china/typescript",
	files: [...files],
	extends: getTypeScriptPresetConfigs(options.typeChecked ?? false),
	languageOptions: {
		ecmaVersion: "latest",
		parserOptions: createTypeScriptParserOptions(options)
	},
	rules: typescriptRules
}]);
//#endregion
//#region src/configs/vue.ts
/**
* 创建 Vue 3 单文件组件配置。
*
* 本包只处理 Vue 3。启用 TypeScript 时，Vue 模板解析器通过 `parserOptions.parser`
* 委托给 typescript-eslint；这是 Vue 官方推荐的自定义脚本解析器接入方式。
*/
const createVueConfigs = ({ typescript = true, typescriptOptions = {} } = {}) => {
	const typeChecked = typescriptOptions.typeChecked ?? false;
	const typeScriptConfigs = typescript ? getTypeScriptPresetConfigs(typeChecked, true) : [];
	return defineConfig([{
		name: typeChecked ? "@fast-china/vue/type-checked" : "@fast-china/vue",
		files: [GLOB_VUE],
		extends: [
			eslint.configs.recommended,
			...typeScriptConfigs,
			...eslintPluginVue.configs["flat/recommended"]
		],
		languageOptions: {
			ecmaVersion: "latest",
			parser: vueEslintParser,
			parserOptions: {
				...typescript ? {
					parser: tseslint.parser,
					extraFileExtensions: [".vue"]
				} : {},
				ecmaFeatures: { jsx: true },
				sourceType: "module",
				...createTypeScriptParserOptions(typescriptOptions)
			}
		},
		rules: {
			...typescript ? typescriptRules : {},
			...vueRules
		}
	}]);
};
//#endregion
//#region src/core/index.ts
/** `fastConfig()` 使用的稳定默认值；对象被冻结，避免运行时被意外修改。 */
const defaultConfigOptions = Object.freeze({
	angular: false,
	environment: "browser",
	gitignore: true,
	imports: true,
	javascript: true,
	json: true,
	lodash: false,
	markdown: true,
	prettier: true,
	react: false,
	regexp: true,
	sortPackageJson: false,
	sortTsconfig: false,
	typescript: true,
	vue: true
});
/**
* 创建面向 Vue 3、React、Angular、Vite、TypeScript、JavaScript 与 Node.js 项目的 ESLint Flat Config。
*
* 默认导出就是此函数。额外配置参数会放在内置配置之后，因此项目可以按文件范围
* 覆盖任何默认规则，而无需再次调用 ESLint 的 `defineConfig()`。
*/
const fastConfig = (options = {}, ...overrides) => {
	const angular = options.angular ?? defaultConfigOptions.angular;
	const environment = options.environment ?? defaultConfigOptions.environment;
	const gitignore = options.gitignore ?? defaultConfigOptions.gitignore;
	const imports = options.imports ?? defaultConfigOptions.imports;
	const javascript = options.javascript ?? defaultConfigOptions.javascript;
	const json = options.json ?? defaultConfigOptions.json;
	const lodash = options.lodash ?? defaultConfigOptions.lodash;
	const markdown = options.markdown ?? defaultConfigOptions.markdown;
	const prettier = options.prettier ?? defaultConfigOptions.prettier;
	const react = options.react ?? defaultConfigOptions.react;
	const regexp = options.regexp ?? defaultConfigOptions.regexp;
	const sortPackageJson = options.sortPackageJson ?? defaultConfigOptions.sortPackageJson;
	const sortTsconfig = options.sortTsconfig ?? defaultConfigOptions.sortTsconfig;
	const typescript = options.typescript ?? defaultConfigOptions.typescript;
	const vue = options.vue ?? defaultConfigOptions.vue;
	const typeScriptEnabled = typescript !== false;
	const typeScriptOptions = typeof typescript === "object" ? typescript : {};
	const angularEnabled = angular !== false;
	const angularOptions = typeof angular === "object" ? angular : {};
	const reactEnabled = react !== false;
	const reactOptions = typeof react === "object" ? react : {};
	if (angularEnabled && !typeScriptEnabled) throw new TypeError("Angular support requires TypeScript. Remove `typescript: false` or disable `angular`.");
	const projectRules = options.rules;
	const scriptFiles = [...javascript ? GLOBS_JAVASCRIPT : [], ...typeScriptEnabled ? GLOBS_TYPESCRIPT : []];
	const codeFiles = [...scriptFiles, ...vue ? [GLOB_VUE] : []];
	const jsonEnabled = json || sortPackageJson || sortTsconfig;
	return defineConfig([
		createGlobalIgnores(options.ignores),
		...gitignore ? createGitignoreConfigs() : [],
		...codeFiles.length ? [...createEnvironmentConfigs({
			environment,
			files: codeFiles,
			globals: options.globals,
			nodeFiles: scriptFiles
		}), ...createBaseConfigs(codeFiles)] : [],
		...javascript ? createJavaScriptConfigs() : [],
		...imports && codeFiles.length ? createImportConfigs(codeFiles) : [],
		...lodash && codeFiles.length ? createLodashConfigs(lodash, codeFiles) : [],
		...regexp && codeFiles.length ? createRegexpConfigs(codeFiles) : [],
		...typeScriptEnabled ? createTypeScriptConfigs(typeScriptOptions) : [],
		...jsonEnabled ? createJsonConfigs() : [],
		...sortPackageJson ? createPackageJsonSortConfigs() : [],
		...sortTsconfig ? createTsconfigSortConfigs() : [],
		...vue ? createVueConfigs({
			typescript: typeScriptEnabled,
			typescriptOptions: typeScriptOptions
		}) : [],
		...reactEnabled ? createReactConfigs(reactOptions, {
			javascript,
			typeChecked: typeScriptOptions.typeChecked ?? false,
			typescript: typeScriptEnabled
		}) : [],
		...angularEnabled ? createAngularConfigs(angularOptions) : [],
		...markdown ? createMarkdownConfigs() : [],
		...prettier ? createPrettierConfigs() : [],
		...projectRules && codeFiles.length ? [{
			name: "@fast-china/project/rules",
			files: codeFiles,
			rules: projectRules
		}] : [],
		...overrides
	]);
};
//#endregion
//#region src/index.ts
/**
* 为项目规则提供精确的规则名、严重级别和规则选项自动补全。
*
* 该函数不会修改传入对象；它只在 TypeScript 编译阶段拒绝未知规则和无效选项。
*/
const defineRules = (rules) => rules;
//#endregion
export { fastConfig as default, fastConfig, defaultConfigOptions, defineRules };

//# sourceMappingURL=index.mjs.map