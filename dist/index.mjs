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
* 配置片段、glob 常量与原始规则分别由 `./configs`、`./constants` 与 `./rules` 子路径提供。
*/
/**
* 为项目规则提供精确的规则名、严重级别和规则选项自动补全。
*
* 该函数不会修改传入对象；它只在 TypeScript 编译阶段拒绝未知规则和无效选项。
*/
const defineRules = (rules) => rules;
/** `fastConfig()` 使用的稳定默认值；对象被冻结，避免运行时被意外修改。 */
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
* 默认启用浏览器环境、JavaScript、TypeScript、Vue 3、import、RegExp、JSON 和
* Prettier 兼容层。React、Angular、Markdown 与清单排序按需启用；Lodash 导入策略
* 通过 `@fast-china/eslint-config/configs` 独立组合。
* 额外配置参数会放在内置配置之后，因此项目可以按文件范围覆盖任何默认规则。
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