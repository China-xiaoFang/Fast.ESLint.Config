import eslintMarkdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";
import { GLOB_MARKDOWN } from "../constants";

/**
 * 创建 Markdown 结构与语法检查配置。
 *
 * @remarks
 * 该配置按 GitHub Flavored Markdown 检查文档本身，使表格等 GFM 结构也能进入对应规则；
 * 代码块是否接受额外语言规则由项目覆盖配置决定。
 *
 * @returns 包含 `@eslint/markdown` 推荐预置的 Flat Config 数组。
 */
export const createMarkdownConfigs = (): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/markdown",
			files: [GLOB_MARKDOWN],
			extends: [eslintMarkdown.configs.recommended],
			language: "markdown/gfm",
		},
	]);
