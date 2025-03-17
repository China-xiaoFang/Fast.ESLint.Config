import eslintPluginJsonc from "eslint-plugin-jsonc";
import jsoncEslintParser from "jsonc-eslint-parser";
import tseslint from "typescript-eslint";
import { CONST_JSON, CONST_JSON5, CONST_JSON6, CONST_JSONC } from "../../constants";

/**
 * Json配置
 */
export const jsonConfigs = tseslint.config([
	{
		name: "@fast-china/json",
		files: [CONST_JSON, CONST_JSONC, CONST_JSON5, CONST_JSON6],
		// 继承某些已有的规则
		extends: [...eslintPluginJsonc.configs["flat/recommended-with-jsonc"]],
		languageOptions: {
			parser: jsoncEslintParser,
		},
		plugins: {
			jsonc: eslintPluginJsonc,
		},
	},
]);
