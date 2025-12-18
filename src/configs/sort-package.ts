import { defineConfig } from "eslint/config";
import { packageJsonSortRules } from "../rules";

/**
 * package.json 属性排序
 */
export const packageJsonSortConfigs = defineConfig([
	{
		name: "@fast-china/sort/package",
		files: ["**/package.json"],
		rules: packageJsonSortRules,
	},
]);
