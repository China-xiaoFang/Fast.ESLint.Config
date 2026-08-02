import { GLOBS_JAVASCRIPT, GLOBS_TYPESCRIPT, GLOB_VUE } from "./constants/index.mjs";
import { createAngularConfigs } from "./configs/angular.mjs";
import { createCommonConfigs } from "./configs/common.mjs";
import { createEnvironmentConfigs } from "./configs/environment.mjs";
import { createGitignoreConfigs, createGlobalIgnores } from "./configs/ignores.mjs";
import { createImportConfigs } from "./configs/import.mjs";
import { createJavaScriptConfigs } from "./configs/javascript.mjs";
import { createJsonConfigs } from "./configs/json.mjs";
import { createMarkdownConfigs } from "./configs/markdown.mjs";
import { createPrettierConfigs } from "./configs/prettier.mjs";
import { createReactConfigs } from "./configs/react.mjs";
import { createRegexpConfigs } from "./configs/regexp.mjs";
import { createPackageJsonSortConfigs } from "./configs/sort-package.mjs";
import { createTsconfigSortConfigs } from "./configs/sort-tsconfig.mjs";
import { createTypeScriptConfigs } from "./configs/typescript.mjs";
import { createVueConfigs } from "./configs/vue.mjs";
import { defineConfig } from "eslint/config";
//#region src/index.ts
/**
* 根入口提供面向 Vue 3 浏览器管理项目的默认配置工厂。
*
* 配置片段、glob 常量与原始规则分别由 `./configs`、`./constants` 与 `./rules` 子路径提供。
*
* @packageDocumentation
*/
/**
* 为项目规则提供精确的规则名、严重级别和规则选项自动补全。
*
* @remarks
* 该函数不会修改传入对象；它只在 TypeScript 编译阶段拒绝未知规则和无效选项。
*
* @typeParam Rules - 调用方传入的规则记录类型；保留字面量键和值以提供精确推断。
* @param rules - 需要进行规则名、严重级别和选项校验的 ESLint 规则记录。
* @returns 原始规则记录。返回值同时兼容 ESLint 的通用 `RulesRecord` 类型。
*/
const defineRules = (rules) => rules;
/**
* `fastConfig()` 使用的稳定默认选项。
*
* @remarks
* 对象在运行时被冻结，不包含无固定默认值的 `globals`、`ignores` 与 `rules` 字段。
* 调用方应将其视为只读参考，不应依赖修改该对象来改变工厂行为。
*/
const defaultConfigOptions = Object.freeze({
	angular: false,
	environment: "browser",
	gitignore: true,
	imports: true,
	javascript: true,
	json: true,
	markdown: false,
	prettier: true,
	react: false,
	regexp: true,
	sortPackageJson: false,
	sortTsconfig: false,
	typescript: true,
	vue: true
});
/**
* 创建面向 Vue 3、Vite、TypeScript 与浏览器后台管理项目的 ESLint Flat Config。
*
* @remarks
* 默认启用浏览器环境、JavaScript、TypeScript、Vue 3、import、RegExp、JSON 和
* Prettier 兼容层。React、Angular、Markdown 与清单排序按需启用；Lodash 导入策略
* 通过 `@fast-china/eslint-config/configs` 独立组合。
* 额外配置参数会放在内置配置之后，因此项目可以按文件范围覆盖任何默认规则。
*
* @param options - 控制内置语言、框架、插件与项目级规则的选项。
* @param overrides - 追加到全部内置片段之后的 ESLint Flat Config，可用于按文件覆盖默认行为。
* @returns 按应用顺序展开、可直接导出给 ESLint 的 Flat Config 数组。
* @throws {@link TypeError} 当启用 Angular 的同时显式关闭 TypeScript 时抛出。
*
* @example
* ```ts
* import fastConfig from "@fast-china/eslint-config";
*
* export default fastConfig(
*   { react: true, vue: false },
*   { files: ["src/index.ts"], rules: { "no-console": "error" } },
* );
* ```
*/
const fastConfig = (options = {}, ...overrides) => {
	const angular = options.angular ?? defaultConfigOptions.angular;
	const environment = options.environment ?? defaultConfigOptions.environment;
	const gitignore = options.gitignore ?? defaultConfigOptions.gitignore;
	const imports = options.imports ?? defaultConfigOptions.imports;
	const javascript = options.javascript ?? defaultConfigOptions.javascript;
	const json = options.json ?? defaultConfigOptions.json;
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
		...createGlobalIgnores(options.ignores),
		...gitignore ? createGitignoreConfigs() : [],
		...codeFiles.length ? [...createEnvironmentConfigs({
			environment,
			files: codeFiles,
			globals: options.globals,
			nodeFiles: scriptFiles
		}), ...createCommonConfigs(codeFiles)] : [],
		...javascript ? createJavaScriptConfigs() : [],
		...imports && codeFiles.length ? createImportConfigs(codeFiles) : [],
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
export { fastConfig as default, fastConfig, defaultConfigOptions, defineRules };

//# sourceMappingURL=index.mjs.map