import tseslint from "typescript-eslint";
import { CONST_TSCONFIG } from "../../constants";
import { tsconfigJsonSortRules } from "../../rules/sort-tsconfig";

/**
 * tsconfig.json 属性排序
 */
export const tsconfigJsonSortConfigs = tseslint.config([
	{
		name: "@fast-china/sort/tsconfig",
		files: CONST_TSCONFIG,
		rules: tsconfigJsonSortRules,
	},
]);
