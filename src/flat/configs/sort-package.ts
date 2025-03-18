import tseslint from "typescript-eslint";
import { packageJsonSortRules } from "../../rules";

/**
 * package.json 属性排序
 */
export const packageJsonSortConfigs = tseslint.config([
	{
		name: "@fast-china/sort/package",
		files: ["**/package.json"],
		rules: packageJsonSortRules,
	},
]);
