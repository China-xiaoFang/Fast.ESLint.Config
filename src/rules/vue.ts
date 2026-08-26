import type { RuleOptions } from "../typegen";

/**
 * Vue SFC 本地覆写规则。
 *
 * @remarks
 * 上游 `flat/recommended` 负责 Vue 3 正确性与模板约定；本记录补充事件、属性命名和
 * 闭合标签规则。Vue Web、Admin 与 UniApp 使用同一套严重级别。
 */
export const vueRules = {
	// v-html 可能引入 XSS；保留警告以兼容经过净化的富文本场景。
	"vue/no-v-html": "warn",
	// [默认关闭] TypeScript 类型 props 和 required 声明已能表达可选性，不强制每个可选 prop 提供默认值。
	"vue/require-default-prop": "off",
	// 组件对外事件必须通过 emits 显式声明。
	"vue/require-explicit-emits": "error",
	// [默认关闭] 允许 App、Layout 等约定俗成的单词组件名。
	"vue/multi-word-component-names": "off",
	// 允许直接使用 Vue 子包入口，兼容编译器与运行时等明确子模块导入。
	"vue/prefer-import-from-vue": "off",
	// 模板属性统一使用 Vue 官方推荐的 kebab-case；脚本中的 Props 仍使用 camelCase。
	"vue/attribute-hyphenation": ["error", "always"],

	// 重复键、直接修改 props 和保留组件名会破坏组件数据流或运行时行为。
	"vue/no-dupe-keys": "error",
	"vue/no-mutating-props": "error",
	"vue/no-reserved-component-names": "error",
	// 禁止在组件节点使用 v-text/v-html，避免覆盖组件内容并模糊数据边界。
	"vue/no-v-text-v-html-on-component": "error",
	// 自定义事件名称统一使用 camelCase。
	"vue/custom-event-name-casing": ["error", "camelCase"],
	// [默认关闭] 允许在一个 SFC 中声明仅供当前文件使用的小型辅助组件。
	"vue/one-component-per-file": "off",
	// 多行标签的闭合括号独占一行，单行标签保持同行。
	"vue/html-closing-bracket-newline": ["error", { multiline: "always", singleline: "never" }],
	// 模板属性按语义分组并保持稳定顺序。
	"vue/attributes-order": [
		"error",
		{
			order: ["DEFINITION", "LIST_RENDERING", "CONDITIONALS", "RENDER_MODIFIERS", "GLOBAL", "UNIQUE", "OTHER_ATTR", "EVENTS", "CONTENT"],
		},
	],
} satisfies RuleOptions;
