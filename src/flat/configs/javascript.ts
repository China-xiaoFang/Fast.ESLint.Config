import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { javascriptRules } from "../../rules";

/**
 * JavaScript配置
 */
export const javascriptConfigs = tseslint.config([
	{
		name: "@fast-china/javascript",
		// 继承某些已有的规则
		extends: [eslint.configs.recommended],
		languageOptions: {
			//  允许使用最新的 ECMAScript 语法特性
			ecmaVersion: "latest",
			globals: {
				...globals.browser,
				...globals.es2022,
				...globals.node,
			},
			parserOptions: {
				ecmaFeatures: {
					// 允许使用 JSX 语法，适用于 Vue 组件中的 JSX 代码。
					jsx: true,
				},
				sourceType: "module",
			},
		},
		rules: javascriptRules,
	},
	{
		name: "@fast-china/javascript/md/js",
		files: ["**/*.md/*.js"],
		rules: {
			// 使用使用控制台
			"no-console": "off",
			// 关闭 - 禁止使用未声明的变量，除非/*global *\/注释中提到
			"no-undef": "off",
			// 关闭 - 禁用对无法解析的模块导入的检查
			"import/no-unresolved": "off",
			// 关闭 - 禁止在文件中重复导入相同的模块
			"import/no-duplicates": "off",
		},
	},
	{
		name: "@fast-china/javascript/script",
		files: ["**/scripts/*", "**/cli.*"],
		rules: {
			// 使用使用控制台
			"no-console": "off",
		},
	},
]);
