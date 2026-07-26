import eslintMarkdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";

import { GLOB_MARKDOWN } from "../constants";

/**
 * 创建 Markdown 结构与语法检查配置。
 *
 * 该配置检查 Markdown 文档本身；代码块是否接受额外语言规则由项目覆盖配置决定。
 */
export const createMarkdownConfigs = () =>
	defineConfig([
		{
			name: "@fast-china/markdown",
			files: [GLOB_MARKDOWN],
			extends: [eslintMarkdown.configs.recommended],
		},
	]);
