import { defineConfig } from "eslint/config";
import eslintPluginRegexp from "eslint-plugin-regexp";

/**
 * regexp配置
 */
export const regexpConfigs = defineConfig([
	{
		name: "@fast-china/regexp",
		...eslintPluginRegexp.configs["flat/recommended"],
	},
]);
