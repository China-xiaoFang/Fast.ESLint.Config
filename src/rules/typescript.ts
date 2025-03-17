import type { Linter } from "eslint";

/**
 * TypeScript规则
 */
export const typescriptRules: Linter.RulesRecord = {
	// TS (https://typescript-eslint.io/rules)

	// 要求在导出函数和类的公共方法上显式声明返回类型
	"@typescript-eslint/explicit-module-boundary-types": "error",
	// 要求在 TypeScript 函数和方法中显式地指定返回类型
	"@typescript-eslint/explicit-function-return-type": "error",
	// 禁止在同一作用域中重新声明 TypeScript 变量
	"@typescript-eslint/no-redeclare": "error",
	// 禁止定义未使用的变量，方法参数排除。
	"@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
	// 允许使用自定义TypeScript模块和命名空间
	"@typescript-eslint/no-namespace": "off",
	// 允许使用 any 类型
	"@typescript-eslint/no-explicit-any": "off",
	// 禁止在 TypeScript 文件中使用 require 函数进行模块导入
	"@typescript-eslint/no-var-requires": "error",
	// 禁止定义空函数
	"@typescript-eslint/no-empty-function": ["error", { allow: [] }],
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
};
