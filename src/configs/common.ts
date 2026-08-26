import { defineConfig } from "eslint/config";
import { GLOBS_CODE } from "../constants";
import { commonRules } from "../rules";

/**
 * 创建跨 JavaScript、TypeScript 与 Vue 脚本生效的通用配置。
 *
 * @remarks
 * 除公共规则外，这里还把无效的 `eslint-disable` 指令提升为错误，避免规则被移除后
 * 留下长期失效的抑制注释。
 *
 * @param files - 应用公共规则的 ESLint glob 列表。
 * @returns 包含公共规则与无效禁用指令检查的 Flat Config 数组。
 */
export const createCommonConfigs = (files: readonly string[] = GLOBS_CODE): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/common",
			files: [...files],
			linterOptions: {
				reportUnusedDisableDirectives: "error",
			},
			rules: commonRules,
		},
	]);
