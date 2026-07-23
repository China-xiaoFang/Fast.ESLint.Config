import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";

import { GLOB_JAVASCRIPT } from "../constants";
import { javascriptRules } from "../rules";

/**
 * JavaScript配置
 */
export const javascriptConfigs = defineConfig([
	{
		name: "@fast-china/javascript",
		files: [...GLOB_JAVASCRIPT],
		// 继承某些已有的规则
		extends: [eslint.configs.recommended],
		languageOptions: {
			// 允许使用最新的 ECMAScript 语法特性
			ecmaVersion: "latest",
			parserOptions: {
				ecmaFeatures: {
					// 允许在 JavaScript 文件中使用 JSX。
					jsx: true,
				},
			},
		},
		rules: javascriptRules,
	},
]);
