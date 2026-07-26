import { defineConfig } from "eslint/config";
import globals from "globals";

import { GLOBS_CODE, GLOBS_JAVASCRIPT, GLOBS_NODE_TOOLING } from "../constants";

import type { Linter } from "eslint";

export type RuntimeEnvironment = "browser" | "node" | "universal";

/**
 * 创建运行时环境相关的 ESLint 配置。
 *
 * 用于为应用源码配置对应运行环境的全局变量，
 * 同时为 Node.js 工程脚本单独启用 Node.js 全局变量。
 *
 * @param environment 运行时环境，默认为浏览器环境
 * @param files 应用源码匹配规则，默认为所有代码文件
 * @returns ESLint Flat Config 配置数组
 */
export interface EnvironmentConfigOptions {
	/** 应用代码实际运行的环境，默认是浏览器。 */
	environment?: RuntimeEnvironment;
	/** 需要获得运行时全局变量的代码文件。 */
	files?: readonly string[];
	/** 当前启用且可能作为 Node.js 工程文件执行的脚本类型。 */
	nodeFiles?: readonly string[];
	/** 项目额外提供的只读、可写或禁写全局变量。 */
	globals?: Linter.Globals;
}

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
