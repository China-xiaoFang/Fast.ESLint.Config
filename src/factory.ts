import { type Config, defineConfig } from "eslint/config";

import { type AngularConfigOptions, createAngularConfigs } from "./configs/angular";
import { createBaseConfigs } from "./configs/common";
import { type RuntimeEnvironment, createEnvironmentConfigs } from "./configs/environment";
import { createGitignoreConfigs, createGlobalIgnores } from "./configs/ignores";
import { createImportConfigs } from "./configs/import";
import { createJavaScriptConfigs } from "./configs/javascript";
import { createJsonConfigs } from "./configs/json";
import { type LodashPreference, createLodashConfigs } from "./configs/lodash";
import { createMarkdownConfigs } from "./configs/markdown";
import { createPrettierConfigs } from "./configs/prettier";
import { type ReactConfigOptions, createReactConfigs } from "./configs/react";
import { createRegexpConfigs } from "./configs/regexp";
import { createPackageJsonSortConfigs } from "./configs/sort-package";
import { createTsconfigSortConfigs } from "./configs/sort-tsconfig";
import { type TypeScriptConfigOptions, createTypeScriptConfigs } from "./configs/typescript";
import { createVueConfigs } from "./configs/vue";
import { GLOBS_JAVASCRIPT, GLOBS_TYPESCRIPT, GLOB_VUE } from "./constants";

import type { RuleOptions } from "./typegen";
import type { Linter } from "eslint";

export interface FastConfigOptions {
	/**
	 * Angular 支持；启用后检查 TypeScript、外部 HTML 模板和内联模板。
	 * @default false
	 */
	angular?: boolean | AngularConfigOptions;
	/**
	 * 应用代码的运行环境；Vue/Vite 项目通常使用 `browser`。
	 * @default "browser"
	 */
	environment?: RuntimeEnvironment;
	/**
	 * 项目额外提供的全局变量，例如测试运行器或宿主平台 API。
	 * @default undefined
	 */
	globals?: Linter.Globals;
	/**
	 * 是否读取项目根目录的 .gitignore。
	 * @default true
	 */
	gitignore?: boolean;
	/**
	 * 追加到内置集合的全局忽略模式。
	 * @default []
	 */
	ignores?: readonly string[];
	/**
	 * 是否启用 import-x 规则。
	 * @default true
	 */
	imports?: boolean;
	/**
	 * 是否处理 JavaScript 与 JSX 文件。
	 * @default true
	 */
	javascript?: boolean;
	/**
	 * 是否启用 JSON、JSONC 与 JSON5 推荐规则；清单排序由独立选项控制。
	 * @default true
	 */
	json?: boolean;
	/**
	 * 统一项目使用的 Lodash 包；`false` 表示不限制 `lodash`、`lodash-es` 或 `lodash-unified`。
	 * @default false
	 */
	lodash?: false | LodashPreference;
	/**
	 * 是否启用 Markdown 规则。
	 * @default true
	 */
	markdown?: boolean;
	/**
	 * 是否在末尾关闭与 Prettier 冲突的格式规则。
	 * @default true
	 */
	prettier?: boolean;
	/**
	 * 是否启用正则表达式规则。
	 * @default true
	 */
	regexp?: boolean;
	/**
	 * React 支持；传入对象可配置 React 版本、JSX 运行时和多态组件属性。
	 * @default false
	 */
	react?: boolean | ReactConfigOptions;
	/**
	 * 应用于全部已启用代码文件的项目级规则，提供精确规则名与选项类型。
	 * @default undefined
	 */
	rules?: RuleOptions;
	/**
	 * 是否按安全的固定顺序整理 package.json；启用后首次运行可能产生较大 diff。
	 * @default false
	 */
	sortPackageJson?: boolean;
	/**
	 * 是否按 TypeScript 文档主题整理 tsconfig*.json。
	 * @default false
	 */
	sortTsconfig?: boolean;
	/**
	 * TypeScript 支持；传入对象可开启类型感知规则。
	 * @default true
	 */
	typescript?: boolean | TypeScriptConfigOptions;
	/**
	 * 是否启用 Vue 3 单文件组件支持。
	 * @default true
	 */
	vue?: boolean;
}

/** `fastConfig()` 使用的稳定默认值；对象被冻结，避免运行时被意外修改。 */
export const defaultConfigOptions = Object.freeze({
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
	vue: true,
} as const satisfies Required<Omit<FastConfigOptions, "globals" | "ignores" | "rules">>);

/**
 * 创建面向 Vue 3、React、Angular、Vite、TypeScript、JavaScript 与 Node.js 项目的 ESLint Flat Config。
 *
 * 默认导出就是此函数。额外配置参数会放在内置配置之后，因此项目可以按文件范围
 * 覆盖任何默认规则，而无需再次调用 ESLint 的 `defineConfig()`。
 */
export const fastConfig = (options: FastConfigOptions = {}, ...overrides: Config[]): Config[] => {
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

	if (angularEnabled && !typeScriptEnabled) {
		throw new TypeError("Angular support requires TypeScript. Remove `typescript: false` or disable `angular`.");
	}
	// RuleOptions 是无字符串索引签名的精确映射；运行时形状仍完全符合 ESLint RulesRecord。
	const projectRules = options.rules as Linter.RulesRecord | undefined;
	const scriptFiles = [...(javascript ? GLOBS_JAVASCRIPT : []), ...(typeScriptEnabled ? GLOBS_TYPESCRIPT : [])];
	const codeFiles = [...scriptFiles, ...(vue ? [GLOB_VUE] : [])];
	const jsonEnabled = json || sortPackageJson || sortTsconfig;

	return defineConfig([
		createGlobalIgnores(options.ignores),
		...(gitignore ? createGitignoreConfigs() : []),
		...(codeFiles.length
			? [
					...createEnvironmentConfigs({
						environment,
						files: codeFiles,
						globals: options.globals,
						nodeFiles: scriptFiles,
					}),
					...createBaseConfigs(codeFiles),
				]
			: []),
		...(javascript ? createJavaScriptConfigs() : []),
		...(imports && codeFiles.length ? createImportConfigs(codeFiles) : []),
		...(lodash && codeFiles.length ? createLodashConfigs(lodash, codeFiles) : []),
		...(regexp && codeFiles.length ? createRegexpConfigs(codeFiles) : []),
		...(typeScriptEnabled ? createTypeScriptConfigs(typeScriptOptions) : []),
		...(jsonEnabled ? createJsonConfigs() : []),
		...(sortPackageJson ? createPackageJsonSortConfigs() : []),
		...(sortTsconfig ? createTsconfigSortConfigs() : []),
		...(vue ? createVueConfigs({ typescript: typeScriptEnabled, typescriptOptions: typeScriptOptions }) : []),
		...(reactEnabled
			? createReactConfigs(reactOptions, {
					javascript,
					typeChecked: typeScriptOptions.typeChecked ?? false,
					typescript: typeScriptEnabled,
				})
			: []),
		...(angularEnabled ? createAngularConfigs(angularOptions) : []),
		...(markdown ? createMarkdownConfigs() : []),
		...(prettier ? createPrettierConfigs() : []),
		...(projectRules && codeFiles.length
			? [
					{
						name: "@fast-china/project/rules",
						files: codeFiles,
						rules: projectRules,
					},
				]
			: []),
		...overrides,
	]);
};
