import type { RuleOptions } from "../typegen";

/**
 * 跨 JavaScript、TypeScript 与 Vue 脚本生效的公共规则。
 *
 * @remarks
 * 默认规则面向 SDK、OA、Admin 与客户端项目使用同一套质量标准。这里只保留
 * 跨语言且误报较少的规则；纯格式和语法偏好交给 Prettier 或项目自行覆盖。
 */
export const commonRules = {
	// 要求数组回调在所有可到达分支返回值，避免 map/filter 等调用静默产生 undefined。
	"array-callback-return": "error",
	// 浏览器弹窗通常不适合生产代码；使用 warn 允许原型调试，同时确保发布前能够被发现。
	"no-alert": "warn",
	// switch 的 case 不创建词法作用域；要求用花括号包裹声明，避免跨 case 冲突。
	"no-case-declarations": "error",
	// 禁止反斜杠续行字符串，优先使用可读性更好的模板字符串。
	"no-multi-str": "error",
	// with 会让标识符解析不可预测，并且在严格模式和 ESM 中不可用。
	"no-with": "error",
	// 允许用 `void promise` 明确忽略 Promise，但禁止在普通表达式中滥用 void。
	"no-void": [
		"error",
		{
			allowAsStatement: true,
		},
	],
	// 要求严格相等；保留 `value == null` 同时判断 null/undefined 的常用写法。
	eqeqeq: ["error", "always", { null: "ignore" }],
	// 使用幂运算符代替 Math.pow，使数学表达式更直接。
	"prefer-exponentiation-operator": "error",
	// 强制使用不会受原型覆盖影响的 Object.hasOwn。
	"prefer-object-has-own": "error",
	// import 声明顺序交给 import-x；这里只排序同一 import 声明中的成员。
	"sort-imports": [
		"warn",
		{
			ignoreCase: false,
			ignoreDeclarationSort: true,
			ignoreMemberSort: false,
			memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
			allowSeparatedGroups: false,
		},
	],
} satisfies RuleOptions;
