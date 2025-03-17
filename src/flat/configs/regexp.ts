import eslintPluginRegexp from "eslint-plugin-regexp";
import tseslint from "typescript-eslint";

/**
 * regexp配置
 */
export const regexpConfigs = tseslint.config([
	{
		name: "@fast-china/regexp",
		...eslintPluginRegexp.configs["flat/recommended"],
	},
]);
