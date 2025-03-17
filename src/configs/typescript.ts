import tseslint from "typescript-eslint";
import { CONST_JS, CONST_TS, CONST_TSX } from "../constants";

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
				// 允许使用 TSX 语法，适用于 Vue 组件中的 TSX 代码。
				ecmaFeatures: {
					tsx: true,
				},
				sourceType: "module",
			},
		},
		rules: {
			// TS (https://typescript-eslint.io/rules)

			// 要求在导出函数和类的公共方法上显式声明返回类型
			"@typescript-eslint/explicit-module-boundary-types": "off",
			// 要求在 TypeScript 函数和方法中显式地指定返回类型
			"@typescript-eslint/explicit-function-return-type": "error",
			// 禁止在同一作用域中重新声明 TypeScript 变量
			"@typescript-eslint/no-redeclare": "error",
			// 允许定义未使用的变量
			"@typescript-eslint/no-unused-vars": "off",
			// 允许使用自定义TypeScript模块和命名空间
			"@typescript-eslint/no-namespace": "off",
			// 允许使用 any 类型
			"@typescript-eslint/no-explicit-any": "off",
			// 禁止在 TypeScript 文件中使用 require 函数进行模块导入
			"@typescript-eslint/no-var-requires": "error",
			// 禁止定义空函数
			"@typescript-eslint/no-empty-function": "error",
			// 禁止无用的表达式
			"@typescript-eslint/no-unused-expressions": [
				"error",
				{
					// 允许短路操作符（&& 和 ||）中的无副作用表达式
					allowShortCircuit: true,
					// 允许三元操作符中的无副作用表达式
					allowTernary: true,
				},
			],
			// 禁止在 TypeScript 代码中对类型已经可以被推断的变量或参数进行显式的类型注解
			"@typescript-eslint/no-inferrable-types": "error",
			// 禁止使用后缀运算符的非空断言(!)
			"@typescript-eslint/no-non-null-assertion": "error",
			// 禁止在可选链(?)后使用非空断言(!)
			"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
			// 禁止在代码中使用 @ts-ignore 注释
			"@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": false }],
			// 一致地使用 TypeScript 类型导入
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					// 允许使用类型注解
					disallowTypeAnnotations: false,
				},
			],
		},
	},
]);

/**
 * TypeScript配置
 */
export const typescriptConfigs = tseslint.config([
	...typescriptCoreConfigs,
	{
		name: "@fast-china/typescript/dts",
		files: ["**/*.d.ts"],
		rules: {
			// 关闭 - 禁止在文件中重复导入相同的模块
			"import/no-duplicates": "off",
			// 关闭 - 一致地使用 TypeScript 类型导入
			"@typescript-eslint/consistent-type-imports": "off",
		},
	},
	{
		name: "@fast-china/typescript/tsx",
		files: [CONST_TSX],
		rules: {
			// 关闭 - 要求在 TypeScript 函数和方法中显式地指定返回类型
			// "@typescript-eslint/explicit-function-return-type": "off",
		},
	},
	{
		name: "@fast-china/typescript/cjs",
		files: [CONST_JS],
		rules: {
			// 关闭 - 不允许使用 require 语句
			"@typescript-eslint/no-var-requires": "off",
			"@typescript-eslint/no-require-imports": "off",
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
