import tseslint from "typescript-eslint";
import { CONST_DTS, CONST_TS, CONST_TSX } from "../../constants";
import { typescriptRules } from "../../rules/typescript";

/**
 * TypeScript 核心配置
 */
export const typescriptCoreConfigs = tseslint.config([
	{
		name: "@fast-china/typescript",
		files: [CONST_TS, CONST_TSX],
		// 继承某些已有的规则
		extends: [tseslint.configs.recommended],
		languageOptions: {
			//  允许使用最新的 ECMAScript 语法特性
			ecmaVersion: "latest",
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: {
					// 允许使用 TSX 语法，适用于 Vue 组件中的 TSX 代码。
					tsx: true,
				},
				sourceType: "module",
			},
		},
		rules: typescriptRules,
	},
]);

/**
 * TypeScript配置
 */
export const typescriptConfigs = tseslint.config([
	...typescriptCoreConfigs,
	{
		name: "@fast-china/typescript/dts",
		files: [CONST_DTS],
		rules: {
			// 关闭 - 一致地使用 TypeScript 类型导入
			"@typescript-eslint/consistent-type-imports": "off",
		},
	},
	{
		name: "@fast-china/typescript/vite",
		files: ["**/vite.config.*"],
		rules: {
			// 关闭 - 要求在 TypeScript 函数和方法中显式地指定返回类型
			"@typescript-eslint/explicit-function-return-type": "off",
		},
	},
	{
		name: "@fast-china/typescript/md/js",
		files: ["**/*.md/*.ts"],
		rules: {
			// 允许定义未使用的变量
			"@typescript-eslint/no-unused-vars": "off",
		},
	},
]);
