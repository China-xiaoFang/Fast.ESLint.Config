import tseslint from "typescript-eslint";
import eslintPluginRegexp from "eslint-plugin-regexp";

/**
 * regexp配置
 */
export const regexpConfigs = tseslint.config([
	{
		name: "@fast-china/regexp",
		...eslintPluginRegexp.configs["flat/recommended"],
	},
]);
