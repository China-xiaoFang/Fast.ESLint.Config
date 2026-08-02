import { defineConfig } from "eslint/config";

import { packageJsonSortRules } from "../rules";

/**
 * 创建 package.json 排序配置。
 *
 * @remarks
 * 该能力会产生较大的可修复 diff，因此必须显式启用；规则不会进入顺序具有
 * 条件导出语义的 `exports` 对象内部。
 *
 * @returns 仅匹配 `package.json` 的字段排序 Flat Config 数组。
 */
export const createPackageJsonSortConfigs = () =>
	defineConfig([
		{
			name: "@fast-china/sort/package-json",
			files: ["**/package.json"],
			rules: packageJsonSortRules,
		},
	]);
