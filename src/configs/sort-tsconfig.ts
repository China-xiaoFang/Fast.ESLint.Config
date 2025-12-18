import { defineConfig } from "eslint/config";
import { CONST_TSCONFIG } from "../constants";
import { tsconfigJsonSortRules } from "../rules";

/**
 * tsconfig.json 属性排序
 */
export const tsconfigJsonSortConfigs = defineConfig([
	{
		name: "@fast-china/sort/tsconfig",
		files: CONST_TSCONFIG,
		rules: tsconfigJsonSortRules,
	},
]);
