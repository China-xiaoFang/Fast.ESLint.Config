import type { RuleOptions } from "../typegen";

/**
 * TypeScript 本地覆写规则。
 * 这里补充 typescript-eslint 预置；高影响规则需同步维护风险文档。
 */
export const typescriptRules = {
	// 使用 TypeScript 版本避免核心规则误判声明合并、类型和值的同名声明。
	"@typescript-eslint/no-redeclare": "error",
	// [高影响][可自动修复] 未使用符号视为错误；以下划线开头可显式表示参数或变量被有意忽略。
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
	// any 会绕过类型检查，但在第三方边界和渐进式类型完善中有合理用途，因此只警告。
	"@typescript-eslint/no-explicit-any": "warn",
	// [高影响] 默认要求 ESM import；CommonJS、动态加载或工具链互操作代码可能需要按文件关闭。
	"@typescript-eslint/no-require-imports": "error",
	// 使用 TS 版本识别类型断言等语法；允许常见的短路和三元表达式调用模式。
	"@typescript-eslint/no-unused-expressions": [
		"error",
		{
			allowShortCircuit: true,
			allowTernary: true,
		},
	],
	// [可自动修复] 删除可由 TypeScript 明确推断的原始值类型标注，减少重复信息。
	"@typescript-eslint/no-inferrable-types": "error",
	// 非空断言可能隐藏空值缺陷；以警告提示逐步消除，避免一次性产生大量阻断错误。
	"@typescript-eslint/no-non-null-assertion": "warn",
	// 可选链之后再做非空断言逻辑矛盾，通常表示边界条件设计有误。
	"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
	// [高影响][可自动修复] 类型依赖改用内联 type import；需复核仅靠 import 触发的模块副作用。
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{
			disallowTypeAnnotations: false,
			fixStyle: "inline-type-imports",
			prefer: "type-imports",
		},
	],
} satisfies RuleOptions;
