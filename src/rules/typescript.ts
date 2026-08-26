import type { RuleOptions } from "../typegen";

/**
 * TypeScript 本地覆写规则。
 *
 * @remarks
 * 公共模块边界要求显式类型，业务内部函数保留 TypeScript 返回类型推断；默认的
 * recommendedTypeChecked 预置负责补充类型语义检查。
 */
export const typescriptRules = {
	// 导出函数和类的公共方法必须显式声明参数与返回类型，公共 API 不允许 any 参数。
	"@typescript-eslint/explicit-module-boundary-types": ["error", { allowArgumentsExplicitlyTypedAsAny: false }],
	// 使用 TypeScript 版本避免核心规则误判声明合并、类型和值的同名声明。
	"@typescript-eslint/no-redeclare": "error",
	// 未使用符号视为错误；以下划线开头可显式表示参数、异常或变量被有意忽略。
	"@typescript-eslint/no-unused-vars": [
		"error",
		{
			args: "after-used",
			argsIgnorePattern: "^_",
			caughtErrors: "all",
			caughtErrorsIgnorePattern: "^_",
			ignoreRestSiblings: true,
			varsIgnorePattern: "^_",
		},
	],
	// [默认关闭] 声明文件、全局扩展和部分 SDK 仍需要 namespace。
	"@typescript-eslint/no-namespace": "off",
	// any 会绕过类型检查，但第三方边界和渐进迁移仍可能需要，因此只警告。
	"@typescript-eslint/no-explicit-any": "warn",
	// TypeScript 源码统一使用 ESM import；Node 工具文件由末尾覆写单独放开。
	"@typescript-eslint/no-require-imports": "error",
	// 禁止无意义空函数，但允许依赖注入构造器和明确的空重写实现。
	"@typescript-eslint/no-empty-function": ["error", { allow: ["constructors", "overrideMethods"] }],
	// 使用 TS 版本识别类型断言等语法；允许常见的短路和三元表达式调用模式。
	"@typescript-eslint/no-unused-expressions": [
		"error",
		{
			allowShortCircuit: true,
			allowTernary: true,
		},
	],
	// 删除可由 TypeScript 明确推断的原始值类型标注。
	"@typescript-eslint/no-inferrable-types": "error",
	// 禁止非空断言，要求显式处理空值边界。
	"@typescript-eslint/no-non-null-assertion": "error",
	// 可选链之后再做非空断言逻辑矛盾，通常表示边界条件设计有误。
	"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
	// 纯类型依赖必须标记为 type import。
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{
			disallowTypeAnnotations: false,
			fixStyle: "inline-type-imports",
			prefer: "type-imports",
		},
	],
} satisfies RuleOptions;

/** 仅在启用 Project Service 后应用的 TypeScript 类型感知规则覆写。 */
export const typescriptTypeCheckedRules = {
	// Promise 返回路径必须采用一致的 await 语义。
	"@typescript-eslint/return-await": "error",
	// 允许透明转发外部 Promise 的未知拒绝原因；静态可知的 string、number 等仍会被报告。
	"@typescript-eslint/prefer-promise-reject-errors": ["error", { allowThrowingUnknown: true }],
} satisfies RuleOptions;
