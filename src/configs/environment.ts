import { defineConfig } from "eslint/config";
import globals from "globals";

import { GLOB_CODE, GLOB_NODE } from "../constants";

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
export const createEnvironmentConfigs = (environment: RuntimeEnvironment = "browser", files: readonly string[] = GLOB_CODE) => {
	const runtimeGlobals = {
		...(environment !== "node" ? globals.browser : {}),
		...(environment !== "browser" ? globals.node : {}),
	};
	const nodeToolingFiles = GLOB_NODE.flatMap((nodeGlob) => files.map((fileGlob) => [nodeGlob, fileGlob]));

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
/**
 * 浏览器应用环境配置。
 *
 * 适用于普通 Vue、React 等浏览器端项目。
 */
export const browserConfigs = createEnvironmentConfigs("browser");
/**
 * Node.js 应用环境配置。
 *
 * 适用于 Node.js 服务、CLI 工具等项目。
 */
export const nodeConfigs = createEnvironmentConfigs("node");
/**
 * 通用运行环境配置。
 *
 * 同时启用浏览器和 Node.js 全局变量，
 * 适用于 SSR、同构应用或跨运行时共享代码。
 */
export const universalConfigs = createEnvironmentConfigs("universal");
