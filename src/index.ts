/**
 * 根入口提供面向 Vue 3、TypeScript 与 UniApp 浏览器项目的固定 ESLint 配置。
 *
 * 配置片段、glob 常量与原始规则分别由 `./configs`、`./constants` 与 `./rules` 子路径提供。
 *
 * @packageDocumentation
 */
import { type Config, defineConfig } from "eslint/config";
import { createCommonConfigs } from "./configs/common";
import { type RuntimeEnvironment, createEnvironmentConfigs, createNodeToolingConfigs } from "./configs/environment";
import { createGitignoreConfigs, createGlobalIgnores } from "./configs/ignores";
import { createImportConfigs } from "./configs/import";
import { createJavaScriptConfigs } from "./configs/javascript";
import { createJsonConfigs } from "./configs/json";
import { createPrettierConfigs } from "./configs/prettier";
import { createRegexpConfigs } from "./configs/regexp";
import { createPackageJsonSortConfigs } from "./configs/sort-package";
import { createTsconfigSortConfigs } from "./configs/sort-tsconfig";
import { createTypeScriptConfigs } from "./configs/typescript";
import { createUniAppConfigs } from "./configs/uniapp";
import { createVueConfigs } from "./configs/vue";
import { GLOBS_CODE, GLOBS_JAVASCRIPT, GLOBS_TYPESCRIPT, GLOB_NVUE } from "./constants";
import type { RuleOptions } from "./typegen";
import type { Linter } from "eslint";

type RejectUnknownRuleNames<Rules extends RuleOptions> = Rules & Record<Exclude<keyof Rules, keyof RuleOptions>, never>;

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
export const defineRules = <const Rules extends RuleOptions>(rules: RejectUnknownRuleNames<Rules>): Rules & Linter.RulesRecord => rules;

export type { RuleOptions } from "./typegen";

/**
 * 根配置工厂唯一保留的项目选项。
 *
 * @remarks
 * 根入口固定启用 `.gitignore`、JavaScript、类型感知 TypeScript、Vue 3、UniApp、Import、
 * RegExp、JSON、清单排序和 Prettier 兼容层。项目级规则、globals 与 ignores 应通过
 * `fastConfig()` 的后置 Flat Config 参数声明。React、Angular、Markdown 与其他可选能力
 * 应从 `@fast-china/eslint-config/configs` 显式组合。
 */
export interface FastConfigOptions {
	/**
	 * 应用代码实际运行的环境。
	 *
	 * - `"browser"`：提供浏览器全局变量。
	 * - `"node"`：提供 Node.js 全局变量。
	 * - `"universal"`：同时提供浏览器与 Node.js 全局变量。
	 *
	 * 配置文件、脚本、测试和 CLI 文件无论选择何种环境都会单独获得 Node.js globals。
	 * @defaultValue `"browser"`
	 */
	environment?: RuntimeEnvironment;
}

const SCRIPT_FILES = [...GLOBS_JAVASCRIPT, ...GLOBS_TYPESCRIPT];
const VUE_PROJECT_FILES = [...GLOBS_CODE, GLOB_NVUE];

const createProjectConfigs = (environment: RuntimeEnvironment, codeFiles: readonly string[], frameworkConfigs: readonly Config[] = []): Config[] =>
	defineConfig([
		...createGlobalIgnores(),
		...createGitignoreConfigs(),
		...createEnvironmentConfigs({
			environment,
			files: codeFiles,
			nodeFiles: SCRIPT_FILES,
		}),
		...createCommonConfigs(codeFiles),
		...createJavaScriptConfigs(),
		...createImportConfigs(codeFiles),
		...createRegexpConfigs(codeFiles),
		...createTypeScriptConfigs(),
		...createJsonConfigs(),
		...createPackageJsonSortConfigs(),
		...createTsconfigSortConfigs(),
		...frameworkConfigs,
		...createPrettierConfigs(),
		...createNodeToolingConfigs(SCRIPT_FILES),
	]);

/**
 * 创建不绑定前端框架的固定基础配置。
 *
 * @remarks
 * 默认包含 `.gitignore`、JavaScript、类型感知 TypeScript、Import、RegExp、JSON、
 * `package.json`/`tsconfig*.json` 排序、Prettier 兼容层和 Node.js 工程文件覆写。
 * React、Angular、Markdown 与 Lodash 等能力由调用方从 `./configs` 子路径继续组合。
 *
 * @param options - 应用代码的运行环境。
 * @returns 可作为 React、Angular、Node.js 或 SDK 项目基础的 Flat Config 数组。
 */
export const createBaseConfigs = ({ environment = "browser" }: FastConfigOptions = {}): Config[] => createProjectConfigs(environment, SCRIPT_FILES);

const createVueProjectConfigs = ({ environment = "browser" }: FastConfigOptions = {}): Config[] =>
	createProjectConfigs(environment, VUE_PROJECT_FILES, [...createVueConfigs(), ...createUniAppConfigs(VUE_PROJECT_FILES)]);

/**
 * 创建固定的 Vue 3、TypeScript 与 UniApp ESLint Flat Config。
 *
 * @remarks
 * 除运行环境外，根入口不提供能力启停开关。TypeScript 和 Vue 始终使用
 * `recommendedTypeChecked` 与 Project Service；被检查文件必须属于可发现的 tsconfig。
 * 额外配置会放在全部内置片段之后，因此可以覆盖项目规则、globals、ignores 或解析器选项。
 *
 * @param options - 应用代码的运行环境。
 * @param overrides - 追加到全部内置片段之后的 ESLint Flat Config。
 * @returns 可直接导出给 ESLint 的 Flat Config 数组。
 *
 * @example
 * ```ts
 * import { defineRules, fastConfig } from "@fast-china/eslint-config";
 *
 * export default fastConfig(
 *   { environment: "browser" },
 *   {
 *     files: ["src/generated/*.ts"],
 *     rules: defineRules({ "@typescript-eslint/no-unused-vars": "off" }),
 *   },
 * );
 * ```
 */
export const fastConfig = ({ environment = "browser" }: FastConfigOptions = {}, ...overrides: Config[]): Config[] =>
	defineConfig([...createVueProjectConfigs({ environment }), ...overrides]);

/**
 * 可直接导出或展开的默认 ESLint Flat Config。
 *
 * @remarks
 * 默认使用浏览器环境。需要切换运行环境或追加项目覆写时，请使用具名导出的
 * {@link fastConfig} 工厂。
 */
const fastChina: Config[] = fastConfig();

export default fastChina;
