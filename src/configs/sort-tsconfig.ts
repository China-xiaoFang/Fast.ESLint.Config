import { defineConfig } from "eslint/config";

import { GLOBS_TSCONFIG } from "../constants";
import { tsconfigJsonSortRules } from "../rules";

/**
 * 创建 tsconfig.json 排序配置。
 *
 * @remarks
 * 排序只改变字段阅读顺序，不改变编译选项值；由于首次修复 diff 较大，默认关闭。
 *
 * @returns 匹配 `tsconfig.json` 与 `tsconfig.*.json` 的字段排序 Flat Config 数组。
 */
export const createTsconfigSortConfigs = () =>
	defineConfig([
		{
			name: "@fast-china/sort/tsconfig",
			files: [...GLOBS_TSCONFIG],
			rules: tsconfigJsonSortRules,
		},
	]);
