import { defineConfig } from "eslint/config";
import globals from "globals";

import { GLOBS_CODE, GLOBS_JAVASCRIPT, GLOBS_NODE_TOOLING } from "../constants";

import type { Linter } from "eslint";

/**
 * 应用源码可声明的运行时环境。
 *
 * - `"browser"` 仅提供浏览器全局变量。
 * - `"node"` 仅提供 Node.js 全局变量。
 * - `"universal"` 同时提供浏览器与 Node.js 全局变量。
 */
export type RuntimeEnvironment = "browser" | "node" | "universal";

/**
 * 运行时全局变量配置片段的选项。
 *
 * @remarks
 * `fastConfig()` 会根据已启用的语言和框架计算 `files`、`nodeFiles`，再调用
 * `createEnvironmentConfigs()`。该接口仍保持独立，以便环境片段的输入、默认值和文件
 * 范围在源码中具有明确契约；直接组合配置片段时可从 `./configs` 子路径使用。
 *
 * 应用代码与 Node.js 工程文件使用两个独立 Flat Config 片段，避免浏览器源码无条件获得
 * `process`、`Buffer` 等 Node.js 全局变量，也避免配置文件误报这些合法全局变量未定义。
 */
export interface EnvironmentConfigOptions {
	/**
	 * 应用代码实际运行的环境，决定 `files` 范围内注入哪组标准全局变量。
	 *
	 * `"browser"` 只注入浏览器全局变量，`"node"` 只注入 Node.js 全局变量，
	 * `"universal"` 同时注入两组。该值不会影响 `nodeFiles` 对应的工程文件；后者始终
	 * 使用 Node.js 全局变量。
	 * @defaultValue `"browser"`
	 */
	environment?: RuntimeEnvironment;
	/**
	 * 需要获得所选运行时全局变量的应用代码 glob 列表。
	 *
	 * 工厂会把当前启用的 JavaScript、TypeScript 和 Vue 文件范围传入这里。数组会复制到
	 * 生成配置中，不会在函数内部修改调用方传入的值。
	 * @defaultValue {@link GLOBS_CODE}
	 */
	files?: readonly string[];
	/**
	 * 当前启用且允许作为 Node.js 工程文件执行的脚本扩展名 glob 列表。
	 *
	 * 每一项都会与内置的配置文件、脚本目录、测试文件和 CLI 文件模式组合为 ESLint
	 * Flat Config 的 AND 文件条件。例如顶层关闭 TypeScript 后，Node.js 工程片段也不会
	 * 因自身模式较宽而意外接管 `.ts` 文件。
	 * @defaultValue {@link GLOBS_JAVASCRIPT}
	 */
	nodeFiles?: readonly string[];
	/**
	 * 追加到应用代码环境中的项目级全局变量及其读写权限。
	 *
	 * 该记录在标准环境全局变量之后合并，所以同名条目可以覆盖预置权限。它应用于完整
	 * `files` 范围；其中属于 Node.js 工程文件的子集还会由后续片段追加标准 Node.js 全局
	 * 变量。值格式遵循 ESLint `Linter.Globals`。
	 * @defaultValue `{}`
	 */
	globals?: Linter.Globals;
}

/**
 * 创建运行时环境相关的 ESLint 配置。
 *
 * @remarks
 * 返回两个相互独立的 Flat Config 片段：第一个为应用源码配置所选环境和项目级全局
 * 变量；第二个仅命中配置、脚本、测试与 CLI 等工程文件，为它们配置 Node.js 全局变量
 * 并允许使用 `console`。分离范围可以减少跨运行时的假阴性。
 *
 * @param options - 运行时环境、目标文件范围与项目级全局变量。
 * @returns 依次包含应用运行时环境和 Node.js 工程文件环境的 Flat Config 数组。
 */
export const createEnvironmentConfigs = ({
	environment = "browser",
	files = GLOBS_CODE,
	nodeFiles = GLOBS_JAVASCRIPT,
	globals: projectGlobals = {},
}: EnvironmentConfigOptions = {}) => {
	const runtimeGlobals = {
		...(environment !== "node" ? globals.browser : {}),
		...(environment !== "browser" ? globals.node : {}),
		...projectGlobals,
	};
	const nodeToolingFiles = GLOBS_NODE_TOOLING.flatMap((nodeGlob) => nodeFiles.map((fileGlob) => [nodeGlob, fileGlob]));

	return defineConfig([
		{
			name: `@fast-china/globals/${environment}`,
			files: [...files],
			languageOptions: {
				globals: runtimeGlobals,
			},
		},
		{
			name: "@fast-china/globals/node-tooling",
			files: nodeToolingFiles,
			languageOptions: {
				globals: globals.node,
			},
			rules: {
				"no-console": "off",
			},
		},
	]);
};
