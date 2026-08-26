import { defineConfig } from "eslint/config";
import eslintPluginRegexp from "eslint-plugin-regexp";
import { GLOBS_CODE } from "../constants";
import { regexpRules } from "../rules";

/**
 * 创建正则表达式正确性配置。
 *
 * @remarks
 * 只启用本仓库明确维护的正确性与安全规则，不继承包含大量语法偏好的完整推荐预置。
 *
 * @param files - 应用正则表达式规则的 ESLint glob 列表。
 * @returns 包含正则插件及公共正则规则的 Flat Config 数组。
 */
export const createRegexpConfigs = (files: readonly string[] = GLOBS_CODE): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/regexp",
			files: [...files],
			plugins: {
				regexp: eslintPluginRegexp,
			},
			rules: regexpRules,
		},
	]);
