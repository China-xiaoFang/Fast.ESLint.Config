import { defineConfig } from "eslint/config";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "../constants";

/**
 * 创建 JSON、JSONC 与 JSON5 配置。
 *
 * @remarks
 * 三种方言使用各自的官方推荐预置，避免严格 JSON 规则错误覆盖允许注释或尾随逗号的文件。
 * VS Code 的 `.vscode/settings.json` 仍以 `.json` 结尾，因此额外允许其中出现注释。
 *
 * @returns 按 JSON、JSONC、JSON5 与 VS Code 设置覆盖顺序排列的 Flat Config 数组。
 */
export const createJsonConfigs = (): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/json/json",
			files: [GLOB_JSON],
			extends: [eslintPluginJsonc.configs["flat/recommended-with-json"]],
		},
		{
			name: "@fast-china/json/jsonc",
			files: [GLOB_JSONC],
			extends: [eslintPluginJsonc.configs["flat/recommended-with-jsonc"]],
		},
		{
			name: "@fast-china/json/json5",
			files: [GLOB_JSON5],
			extends: [eslintPluginJsonc.configs["flat/recommended-with-json5"]],
		},
		{
			name: "@fast-china/json/vscode-settings",
			files: ["**/.vscode/settings.json"],
			rules: {
				// VS Code 的 settings.json 使用带注释的 JSONC 方言。
				"jsonc/no-comments": "off",
			},
		},
	]);
