import { defineConfig } from "eslint/config";

import { GLOBS_CODE } from "../constants";
import { commonRules } from "../rules";

/**
 * 创建跨 JavaScript、TypeScript 与 Vue 脚本生效的基础配置。
 *
 * 除公共规则外，这里还把无效的 `eslint-disable` 指令提升为错误，避免规则被移除后
 * 留下长期失效的抑制注释。
 */
export const createBaseConfigs = (files: readonly string[] = GLOBS_CODE) =>
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
