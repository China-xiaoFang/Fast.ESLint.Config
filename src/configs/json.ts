import { defineConfig } from "eslint/config";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import jsoncEslintParser from "jsonc-eslint-parser";
import { CONST_JSON, CONST_JSON5, CONST_JSONC } from "../constants";

/**
 * Json配置
 */
export const jsonConfigs = defineConfig([
	{
		name: "@fast-china/json",
		files: [CONST_JSON, CONST_JSONC, CONST_JSON5],
		// 继承某些已有的规则
		extends: [
			...eslintPluginJsonc.configs["flat/recommended-with-json"],
			...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
			...eslintPluginJsonc.configs["flat/recommended-with-json5"],
		],
		languageOptions: {
			parser: jsoncEslintParser,
		},
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
