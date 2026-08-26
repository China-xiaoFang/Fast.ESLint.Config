import type { RuleOptions } from "../typegen";

/**
 * JavaScript 本地覆写规则。
 *
 * @remarks
 * `@eslint/js` 推荐预置负责基础正确性。本记录补充命名、声明顺序和现代语法约定，
 * 供 SDK、管理端和客户端共同使用。
 */
export const javascriptRules = {
	// 变量和类型使用 camelCase；对象属性允许沿用外部协议字段名。
	camelcase: ["error", { properties: "never" }],
	// 控制台调用在应用源码中需要人工确认；warn/error 仍可用于必要的诊断输出。
	"no-console": [
		"warn",
		{
			allow: ["warn", "error"],
		},
	],
	// 防止调试断点进入发布代码并中断运行。
	"no-debugger": "error",
	// 禁止意外的恒定条件，但允许 while (true) 等有明确退出逻辑的循环。
	"no-constant-condition": [
		"error",
		{
			checkLoops: false,
		},
	],
	// 禁止标签语句和 with，避免难以追踪的跳转与动态标识符解析。
	"no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
	// 现代项目使用 let/const 替代 var，避免函数作用域和循环闭包陷阱。
	"no-var": "error",
	// 允许明确表示忽略失败的空 catch，其他空代码块视为遗漏。
	"no-empty": ["error", { allowEmptyCatch: true }],
	// 禁止肉眼难以识别、可能导致解析差异的非常规空白字符。
	"no-irregular-whitespace": "error",
	// 变量和类先声明后使用；函数声明允许使用 JavaScript 提升语义。
	"no-use-before-define": ["warn", { classes: true, functions: false, variables: true }],
	// 能保持引用不变的变量优先使用 const；读取发生在赋值前时不做不可靠判断。
	"prefer-const": [
		"warn",
		{
			destructuring: "all",
			ignoreReadBeforeAssign: true,
		},
	],
	// 属性和值同名时强制使用对象简写，带引号键名不强制改写。
	"object-shorthand": [
		"error",
		"always",
		{
			ignoreConstructors: false,
			avoidQuotes: true,
		},
	],
	// 回调优先使用箭头函数，同时允许依赖动态 this 的普通函数。
	"prefer-arrow-callback": ["error", { allowNamedFunctions: false, allowUnboundThis: true }],
	// 使用 ||=、&&=、??= 统一表达逻辑赋值，并检查可等价改写的条件语句。
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
	// 创建新对象时优先使用对象展开语法代替 Object.assign。
	"prefer-object-spread": "error",
	// 使用 rest 参数代替 arguments。
	"prefer-rest-params": "error",
	// 使用 spread 代替 Function.prototype.apply。
	"prefer-spread": "error",
	// 使用模板字符串代替字符串拼接。
	"prefer-template": "error",
	// 同一作用域禁止重复声明。
	"no-redeclare": "error",
} satisfies RuleOptions;
