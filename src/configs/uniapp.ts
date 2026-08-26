import { defineConfig } from "eslint/config";
import { GLOBS_CODE, GLOBS_UNIAPP_JSON, UNIAPP_CONDITIONAL_GLOBALS, UNIAPP_GLOBALS } from "../constants";

/**
 * 创建 UniApp 跨端运行时与项目清单适配。
 *
 * @remarks
 * 除跨端公共 API 外，也声明条件编译分支常用的 `wx`、`plus`、`my`、`tt` 等平台对象。
 * ESLint 不执行 UniApp 预处理器，因此这些对象在整个 UniApp 文件内可见；该配置不会验证
 * 对象是否位于正确的 `#ifdef` 分支中。`.nvue` 的解析由 Vue 配置负责。
 *
 * @param files - 应用 UniApp 公共全局变量的代码文件 glob。
 * @returns UniApp globals 与 JSON 注释兼容配置。
 */
export const createUniAppConfigs = (files: readonly string[] = GLOBS_CODE): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/uniapp/globals",
			files: [...files],
			languageOptions: {
				globals: {
					...UNIAPP_GLOBALS,
					...UNIAPP_CONDITIONAL_GLOBALS,
				},
			},
		},
		{
			name: "@fast-china/uniapp/json",
			files: [...GLOBS_UNIAPP_JSON],
			rules: {
				// UniApp 的 pages.json 和 manifest.json 使用允许注释的 JSONC 方言。
				"jsonc/no-comments": "off",
			},
		},
	]);
