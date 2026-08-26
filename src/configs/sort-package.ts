import { defineConfig } from "eslint/config";
import { packageJsonSortRules } from "../rules";

/**
 * 创建 package.json 排序配置。
 *
 * @remarks
 * 固定项目组合默认启用该能力。首次修复可能产生较大的排序 diff；规则不会进入顺序
 * 具有条件导出语义的 `exports` 对象内部。
 *
 * @returns 仅匹配 `package.json` 的字段排序 Flat Config 数组。
 */
export const createPackageJsonSortConfigs = (): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/sort/package-json",
			files: ["**/package.json"],
			rules: packageJsonSortRules,
		},
	]);
