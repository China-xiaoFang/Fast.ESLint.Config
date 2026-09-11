import type { RuleOptions } from "../typegen";

/**
 * TypeScript 本地覆写规则。
 *
 * @remarks
 * 普通 TS/TSX 的命名函数与公共模块边界要求显式类型，内联回调保留上下文推断；
 * strictTypeChecked 与 stylisticTypeChecked 预置负责补充类型语义和官方风格检查。
 */
export const typescriptRules = {
	// 单独组合 createTypeScriptConfigs() 时也禁止用 void 操作符标记被忽略的 Promise。
	"no-void": "error",
	// 普通 TS/TSX 函数要求显式返回类型；内联回调和已有函数类型约束的表达式继续依赖上下文推断。
	"@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true, allowTypedFunctionExpressions: true }],
	// 导出函数和类的公共方法必须显式声明参数与返回类型，使公共 API 不依赖实现细节推断；参数不允许显式 any。
	"@typescript-eslint/explicit-module-boundary-types": ["error", { allowArgumentsExplicitlyTypedAsAny: false }],
	// 使用 TypeScript 版本避免核心规则误判声明合并、类型和值的同名声明。
	"@typescript-eslint/no-redeclare": "error",
	// 未使用符号视为错误；仅参数和异常可用下划线明确表示有意忽略。
	"@typescript-eslint/no-unused-vars": [
		"error",
		{
			args: "after-used",
			argsIgnorePattern: "^_",
			caughtErrors: "all",
			caughtErrorsIgnorePattern: "^_",
			ignoreRestSiblings: true,
		},
	],
	// [默认关闭] 声明文件、全局扩展和部分 SDK 仍需要 namespace。
	"@typescript-eslint/no-namespace": "off",
	// any 会绕过类型检查，但第三方边界和渐进迁移仍可能需要，因此只警告。
	"@typescript-eslint/no-explicit-any": "warn",
	// TypeScript 源码统一使用 ESM import；Node 工具文件由末尾覆写单独放开。
	"@typescript-eslint/no-require-imports": "error",
	// 禁止普通空函数，避免遗漏实现；仅允许无函数体逻辑的构造器和有意留空的重写方法。
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
	// 纯类型依赖必须使用独立的 `import type`，避免生成无用运行时导入并统一导入声明结构。
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{
			disallowTypeAnnotations: false,
			fixStyle: "separate-type-imports",
			prefer: "type-imports",
		},
	],
} satisfies RuleOptions;

/** 仅在 Project Service 提供完整类型信息后应用的 TypeScript 类型感知规则覆写。 */
export const typescriptTypeCheckedRules = {
	// 是否等待、返回或处理 Promise 由开发者根据业务顺序和异常语义决定。
	"@typescript-eslint/no-floating-promises": "off",
	// 不限制框架生命周期和事件回调的返回写法。
	"@typescript-eslint/strict-void-return": "off",
	// 核心 no-void 已禁止全部 void 操作符，关闭类型感知的重复诊断。
	"@typescript-eslint/no-meaningless-void-operator": "off",
	// 保留简洁的 `() => notify()` 回调，其他容易混淆 void 值与返回值的用法继续检查。
	"@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
	// 数字是模板字符串的常见安全插值；对象、any 和空值仍需显式处理。
	"@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
	// 动态删除对象字段是表单和字典的正常操作；数组 delete 仍由 no-array-delete 禁止。
	"@typescript-eslint/no-dynamic-delete": "off",
	// 纯静态工具类可能是 SDK 的有意 API 设计，不强制改写为函数或对象。
	"@typescript-eslint/no-extraneous-class": "off",
	// 弃用 API 需要可见，但兼容多个依赖版本时不应直接阻断构建。
	"@typescript-eslint/no-deprecated": "warn",
	// TypeScript 类型不一定覆盖外部输入的真实运行时，防御性条件仅提醒审查。
	"@typescript-eslint/no-unnecessary-condition": "warn",
	// 语法形式不影响类型安全，不强制 interface/type、索引类型、字面量属性和 RegExp API 的单一写法。
	"@typescript-eslint/consistent-type-definitions": "off",
	"@typescript-eslint/consistent-indexed-object-style": "off",
	"@typescript-eslint/class-literal-property-style": "off",
	"@typescript-eslint/prefer-regexp-exec": "off",
	// 纯类型导出必须使用 export type，避免生成或暗示不存在的运行时导出。
	"@typescript-eslint/consistent-type-exports": "error",
	// 只在构造阶段赋值且之后保持不变的私有成员应声明为 readonly。
	"@typescript-eslint/prefer-readonly": "error",
	// 原始类型的 || 与 ?? 可能承载不同业务语义，不为了风格强制互换。
	"@typescript-eslint/prefer-nullish-coalescing": ["error", { ignorePrimitives: true }],
	// 参数名称或独立 JSDoc 属于公共重载契约；仅合并真正重复的签名。
	"@typescript-eslint/unified-signatures": [
		"error",
		{
			ignoreDifferentlyNamedParameters: true,
			ignoreOverloadsWithDifferentJSDoc: true,
		},
	],
	// 联合类型和枚举新增成员时，switch 必须覆盖全部分支或显式提供 default。
	"@typescript-eslint/switch-exhaustiveness-check": "error",
	// 允许透明转发外部 Promise 的未知拒绝原因；静态可知的 string、number 等仍会被报告。
	"@typescript-eslint/prefer-promise-reject-errors": ["error", { allowThrowingUnknown: true }],
} satisfies RuleOptions;
