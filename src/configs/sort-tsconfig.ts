import { defineConfig } from "eslint/config";
import { GLOBS_TSCONFIG } from "../constants";
import { tsconfigJsonSortRules } from "../rules";

/**
 * 创建 tsconfig.json 排序配置。
 *
 * @remarks
 * 排序只改变字段阅读顺序，不改变编译选项值。固定项目组合默认启用，首次修复可能产生
 * 较大的排序 diff。
 *
 * @returns 匹配 `tsconfig.json` 与 `tsconfig.*.json` 的字段排序 Flat Config 数组。
 */
export const createTsconfigSortConfigs = (): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/sort/tsconfig",
			files: [...GLOBS_TSCONFIG],
			rules: tsconfigJsonSortRules,
		},
	]);
