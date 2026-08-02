/**
 * 根入口提供面向 Vue 3 浏览器管理项目的默认配置工厂。
 * 配置片段、glob 常量与原始规则分别由 `./configs`、`./constants` 与 `./rules` 子路径提供。
 */
import { type Config, defineConfig } from "eslint/config";

import { type AngularConfigOptions, createAngularConfigs } from "./configs/angular";
import { createCommonConfigs } from "./configs/common";
import { type RuntimeEnvironment, createEnvironmentConfigs } from "./configs/environment";
import { createGitignoreConfigs, createGlobalIgnores } from "./configs/ignores";
import { createImportConfigs } from "./configs/import";
import { createJavaScriptConfigs } from "./configs/javascript";
import { createJsonConfigs } from "./configs/json";
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

type RejectUnknownRuleNames<Rules extends RuleOptions> = Rules & Record<Exclude<keyof Rules, keyof RuleOptions>, never>;

/**
 * 为项目规则提供精确的规则名、严重级别和规则选项自动补全。
 *
 * 该函数不会修改传入对象；它只在 TypeScript 编译阶段拒绝未知规则和无效选项。
 */
export const defineRules = <const Rules extends RuleOptions>(rules: RejectUnknownRuleNames<Rules>): Rules & Linter.RulesRecord => rules;

export type { RuleOptions } from "./typegen";

/**
 * 核心工厂 `fastConfig()` 的项目级 ESLint Flat Config 选项。
 *
 * 每个字段只控制一个相对独立的配置片段。未传入字段时使用下方 `@default` 标注的值；
 * 布尔选项传入 `false` 会让工厂完全跳过对应片段，支持对象形式的框架或 TypeScript
 * 选项传入 `true` 时采用其内部默认值，传入对象时则在启用能力的同时覆盖内部默认值。
 *
 * `rules` 会在全部内置规则和 Prettier 兼容层之后应用；`fastConfig()` 的其余位置参数
 * 又会排在 `rules` 之后。因此，常规的全项目规则放在 `rules` 中，按文件覆盖或需要最高
 * 优先级的配置应通过其余位置参数传入。
 *
 * 这些选项只负责生成 ESLint 配置，不会修改 TypeScript、Vite 或各框架的构建配置。
 *
 * @example
 * ```ts
 * export default fastConfig({
 *   environment: "browser",
 *   react: { version: "detect" },
 *   typescript: { typeChecked: true },
 *   vue: false,
 * });
 * ```
 */
export interface FastConfigOptions {
	/**
	 * 是否启用 Angular 源码与模板检查。
	 *
	 * `true` 使用 Angular 默认选项；传入对象可控制内联模板与模板无障碍规则。
	 * 启用后会检查 Angular TypeScript 源码、外部 `.html` 模板，并默认提取
	 * `@Component()` 中的内联模板。Angular 依赖 TypeScript 解析能力，因此不能与
	 * `typescript: false` 同时使用，否则 `fastConfig()` 会直接抛出配置错误。
	 *
	 * 此选项只配置 ESLint，不会创建或修改 Angular CLI、编译器或项目文件。
	 * @default false
	 */
	angular?: boolean | AngularConfigOptions;
	/**
	 * 应用代码实际运行的环境，用于声明 ESLint 可识别的运行时全局变量。
	 *
	 * - `"browser"`：提供浏览器全局变量，例如 `window`、`document`。
	 * - `"node"`：提供 Node.js 全局变量，例如 `process`、`Buffer`。
	 * - `"universal"`：同时提供浏览器与 Node.js 全局变量，适合 SSR 或同构代码。
	 *
	 * 常见 Vue、React、Angular 与 Vite 浏览器应用通常保持 `"browser"`。无论选择哪种
	 * 环境，配置文件、脚本目录和测试文件等 Node.js 工程文件都会单独获得 Node.js
	 * 全局变量。此选项不改变 JavaScript 编译目标或打包平台。
	 * @default "browser"
	 */
	environment?: RuntimeEnvironment;
	/**
	 * 追加到应用代码运行环境中的项目级全局变量。
	 *
	 * 适用于测试运行器、UniApp、浏览器扩展或其他宿主平台注入的 API。值的格式遵循
	 * ESLint `Linter.Globals`，可以声明为 `"readonly"`、`"writable"` 或 `"off"`。
	 * 自定义值在环境预置之后合并，因此同名项目配置可以覆盖预置的读写权限。
	 * @default undefined
	 */
	globals?: Linter.Globals;
	/**
	 * 是否读取运行 ESLint 的项目根目录中的 `.gitignore` 并转换为全局忽略规则。
	 *
	 * 关闭此项只会停止读取 `.gitignore`，不会移除本库内置的依赖目录、构建产物、
	 * 缓存、生成文件和锁文件忽略模式；如需补充忽略项，请使用 `ignores`。
	 * @default true
	 */
	gitignore?: boolean;
	/**
	 * 追加到内置全局忽略集合末尾的 ESLint glob 模式。
	 *
	 * 这些模式不会替换内置忽略项。模式按 ESLint Flat Config 的全局忽略语义解析，
	 * 适合排除项目特有的生成目录、工具输出或不应参与检查的资源。
	 * @default []
	 */
	ignores?: readonly string[];
	/**
	 * 是否为全部已启用代码文件加载 `eslint-plugin-import-x` 推荐规则和本库覆盖规则。
	 *
	 * 该片段检查常见的 ESM 导入导出问题，但共享配置不会猜测项目的路径别名或自定义
	 * resolver，因此默认关闭了强依赖模块解析且容易误报的规则。如果项目重新启用这些
	 * 规则，应在传给 `fastConfig()` 的覆盖配置中同时补充 resolver。关闭本选项不会影响
	 * JavaScript 或 TypeScript 的基础语法检查。
	 * @default true
	 */
	imports?: boolean;
	/**
	 * 是否让工厂接管 JavaScript、CommonJS、ES Module 与 JSX 文件。
	 *
	 * 启用时匹配 `.js`、`.cjs`、`.mjs` 与 `.jsx`；关闭后这些文件不会进入基础规则、
	 * 环境全局变量、import、regexp 或 React 的 JavaScript 配置范围，但不会影响
	 * 已启用的 TypeScript、Vue、JSON 或 Markdown 文件。
	 * @default true
	 */
	javascript?: boolean;
	/**
	 * 是否检查 JSON、JSONC 与 JSON5 文件，并为三种方言分别使用兼容的推荐规则。
	 *
	 * 此选项不负责字段排序。`sortPackageJson` 或 `sortTsconfig` 任一启用时，为了让对应
	 * 排序规则能够解析文件，JSON 配置仍会被加载，即使这里显式传入 `false`。
	 * @default true
	 */
	json?: boolean;
	/**
	 * 是否使用 `@eslint/markdown` 推荐配置检查 `.md` 文档的结构和 Markdown 语法。
	 *
	 * 该配置关注 Markdown 文档本身，不会自动把项目的 JavaScript、TypeScript 或框架
	 * 规则应用到围栏代码块；如需检查代码块，应通过项目覆盖配置明确指定。
	 * @default false
	 */
	markdown?: boolean;
	/**
	 * 是否加载 `eslint-config-prettier`，关闭与 Prettier 冲突的 ESLint 格式规则。
	 *
	 * 该片段不会运行 Prettier，也不会检查文件是否符合 Prettier 输出；项目仍需自行安装
	 * 并执行 Prettier。它位于内置规则之后、项目 `rules` 之前，因此项目仍可有意识地
	 * 重新启用某条格式规则。
	 * @default true
	 */
	prettier?: boolean;
	/**
	 * 是否为全部已启用代码文件加载 `eslint-plugin-regexp` 推荐规则。
	 *
	 * 规则用于发现无效、冗余、难以理解或可能产生性能问题的正则表达式；其中部分规则
	 * 支持自动修复，执行 `eslint --fix` 后仍应运行项目测试验证真实匹配行为。
	 * @default true
	 */
	regexp?: boolean;
	/**
	 * 是否启用 React、JSX/TSX 与 Hooks 正确性规则。
	 *
	 * `true` 使用默认 React 设置；传入对象可指定 React 版本、兼容 JSX 运行时包和多态
	 * 组件属性名。规则范围由 `javascript` 与 `typescript` 共同决定：关闭其中一种语言
	 * 后，React 不会继续接管该语言的文件。兼容 Preact 等运行时时，应同时配置相应的
	 * `importSource`，但此选项不会修改 JSX 编译器或打包器设置。
	 * @default false
	 */
	react?: boolean | ReactConfigOptions;
	/**
	 * 应用于全部已启用 JavaScript、TypeScript 和 Vue 文件的项目级规则记录。
	 *
	 * `RuleOptions` 为已安装插件提供精确规则名、严重级别和选项自动补全。该记录排在
	 * 内置规则及 Prettier 兼容层之后，可以覆盖它们；但其余位置参数中的配置优先级更高。
	 * JSON、Markdown、Angular HTML 模板或其他特殊文件范围应使用其余位置参数单独配置。
	 * @default undefined
	 */
	rules?: RuleOptions;
	/**
	 * 是否启用 `package.json` 顶层字段的固定顺序规则。
	 *
	 * 规则只在执行 `eslint --fix` 时重排字段，并刻意不进入顺序具有运行时语义的
	 * `exports` 条件对象。首次启用通常会产生较大的纯排序差异，建议单独提交并复核。
	 * 启用此项会同时加载 JSON 解析配置。
	 * @default false
	 */
	sortPackageJson?: boolean;
	/**
	 * 是否按 TypeScript 配置主题顺序整理 `tsconfig.json` 与 `tsconfig.*.json`。
	 *
	 * 规则不会改变编译选项值，只在执行 `eslint --fix` 时调整字段顺序。首次启用可能产生
	 * 较大差异，建议单独提交并确认继承关系仍清晰。启用此项会同时加载 JSON 解析配置。
	 * @default false
	 */
	sortTsconfig?: boolean;
	/**
	 * 是否让工厂接管 `.ts`、`.cts`、`.mts` 与 `.tsx` 文件。
	 *
	 * `true` 使用无需类型信息的 TypeScript 推荐与风格预置；传入对象可进一步启用
	 * `typeChecked` 和指定 `tsconfigRootDir`。类型感知设置还会同步给 Vue 与 React 的
	 * TypeScript 配置。传入 `false` 会移除 TypeScript 文件范围，使 Vue 退回 JavaScript
	 * 脚本解析，并且不能再启用 Angular。
	 * @default true
	 */
	typescript?: boolean | TypeScriptConfigOptions;
	/**
	 * 是否让工厂接管 Vue 3 `.vue` 单文件组件。
	 *
	 * 启用后加载 Vue 3 推荐规则、模板解析器以及本库的 Vue 规则。脚本语言跟随
	 * `typescript`：TypeScript 开启时同时支持 `<script lang="ts">` 和类型感知选项，
	 * 关闭时仅按 JavaScript 解析脚本。此库不提供 Vue 2 兼容预置。
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
	markdown: false,
	prettier: true,
	react: false,
	regexp: true,
	sortPackageJson: false,
	sortTsconfig: false,
	typescript: true,
	vue: true,
} as const satisfies Required<Omit<FastConfigOptions, "globals" | "ignores" | "rules">>);

/**
 * 创建面向 Vue 3、Vite、TypeScript 与浏览器后台管理项目的 ESLint Flat Config。
 *
 * 默认启用浏览器环境、JavaScript、TypeScript、Vue 3、import、RegExp、JSON 和
 * Prettier 兼容层。React、Angular、Markdown 与清单排序按需启用；Lodash 导入策略
 * 通过 `@fast-china/eslint-config/configs` 独立组合。
 * 额外配置参数会放在内置配置之后，因此项目可以按文件范围覆盖任何默认规则。
 */
export const fastConfig = (options: FastConfigOptions = {}, ...overrides: Config[]): Config[] => {
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

	if (angularEnabled && !typeScriptEnabled) {
		throw new TypeError("Angular support requires TypeScript. Remove `typescript: false` or disable `angular`.");
	}
	// RuleOptions 是无字符串索引签名的精确映射；运行时形状仍完全符合 ESLint RulesRecord。
	const projectRules = options.rules as Linter.RulesRecord | undefined;
	const scriptFiles = [...(javascript ? GLOBS_JAVASCRIPT : []), ...(typeScriptEnabled ? GLOBS_TYPESCRIPT : [])];
	const codeFiles = [...scriptFiles, ...(vue ? [GLOB_VUE] : [])];
	const jsonEnabled = json || sortPackageJson || sortTsconfig;

	return defineConfig([
		...createGlobalIgnores(options.ignores),
		...(gitignore ? createGitignoreConfigs() : []),
		...(codeFiles.length
			? [
					...createEnvironmentConfigs({
						environment,
						files: codeFiles,
						globals: options.globals,
						nodeFiles: scriptFiles,
					}),
					...createCommonConfigs(codeFiles),
				]
			: []),
		...(javascript ? createJavaScriptConfigs() : []),
		...(imports && codeFiles.length ? createImportConfigs(codeFiles) : []),
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

export default fastConfig;
