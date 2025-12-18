import eslintMarkdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";
import { CONST_MD } from "../constants";

/**
 * markdown配置
 */
export const markdownConfigs = defineConfig([
	{
		name: "@fast-china/markdown",
		files: [CONST_MD],
		// 继承某些已有的规则
		extends: [...eslintMarkdown.configs["recommended"]],
		plugins: {
			markdown: eslintMarkdown,
		},
	},
]);
