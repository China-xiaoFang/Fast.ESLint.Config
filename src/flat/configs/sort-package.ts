import tseslint from "typescript-eslint";
import { packageJsonSortRules } from "../../rules/sort-package";

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
