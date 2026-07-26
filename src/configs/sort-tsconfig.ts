import { defineConfig } from "eslint/config";

import { GLOBS_TSCONFIG } from "../constants";
import { tsconfigJsonSortRules } from "../rules";

/**
 * 创建 tsconfig.json 排序配置。
 *
 * 排序只改变字段阅读顺序，不改变编译选项值；由于首次修复 diff 较大，默认关闭。
 */
export const createTsconfigSortConfigs = () =>
	defineConfig([
		{
			name: "@fast-china/sort/tsconfig",
			files: [...GLOBS_TSCONFIG],
			rules: tsconfigJsonSortRules,
		},
	]);
