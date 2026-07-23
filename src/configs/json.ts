import { defineConfig } from "eslint/config";
import eslintPluginJsonc from "eslint-plugin-jsonc";

import { CONST_JSON, CONST_JSON5, CONST_JSONC } from "../constants";

/**
 * Json配置
 */
export const jsonConfigs = defineConfig([
	{
		name: "@fast-china/json/strict",
		files: [CONST_JSON],
		extends: [eslintPluginJsonc.configs["flat/recommended-with-json"]],
	},
	{
		name: "@fast-china/json/jsonc",
		files: [CONST_JSONC],
		extends: [eslintPluginJsonc.configs["flat/recommended-with-jsonc"]],
	},
	{
		name: "@fast-china/json/json5",
		files: [CONST_JSON5],
		extends: [eslintPluginJsonc.configs["flat/recommended-with-json5"]],
	},
	{
		name: "@fast-china/json/settings",
		files: ["**/.vscode/settings.json"],
		rules: {
			// 允许注释
			"jsonc/no-comments": "off",
		},
	},
]);
