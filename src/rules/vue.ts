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
	// 组件对外事件必须通过 emits 显式声明，使事件 API 可检查，并避免事件名拼写错误被静默透传。
	"vue/require-explicit-emits": "error",
	// [默认关闭] 允许 App、Layout 等约定俗成的单词组件名。
	"vue/multi-word-component-names": "off",
	// 允许直接使用 Vue 子包入口，兼容编译器与运行时等明确子模块导入。
	"vue/prefer-import-from-vue": "off",
	// 自定义组件的模板属性统一使用 kebab-case；脚本中的 Props 声明仍使用 camelCase。
	"vue/attribute-hyphenation": ["error", "always"],

	// props、data、computed、methods 等选项中禁止同名键，避免成员互相遮蔽或解析到错误来源。
	"vue/no-dupe-keys": "error",
	// Props 属于父组件传入的只读数据，子组件应通过 emit 或本地状态更新，不能直接修改。
	"vue/no-mutating-props": "error",
	// 组件名不能占用 Vue 内置组件或平台保留名称，避免模板解析与运行时组件发生冲突。
	"vue/no-reserved-component-names": "error",
	// 禁止在组件节点使用 v-text/v-html，避免覆盖组件内容并模糊数据边界。
	"vue/no-v-text-v-html-on-component": "error",
	// emit、emits 和事件处理引用中的自定义事件名称统一使用 camelCase，原生 DOM 事件不受影响。
	"vue/custom-event-name-casing": ["error", "camelCase"],
	// [默认关闭] 允许在一个 SFC 中声明仅供当前文件使用的小型辅助组件。
	"vue/one-component-per-file": "off",
	// 多行标签的闭合括号独占一行，单行标签保持同行。
	"vue/html-closing-bracket-newline": ["error", { multiline: "always", singleline: "never" }],
	// 模板属性按定义、循环、条件、修饰、普通属性、事件和内容等语义分组并保持稳定顺序。
	"vue/attributes-order": [
		"error",
		{
			order: ["DEFINITION", "LIST_RENDERING", "CONDITIONALS", "RENDER_MODIFIERS", "GLOBAL", "UNIQUE", "OTHER_ATTR", "EVENTS", "CONTENT"],
		},
	],
} satisfies RuleOptions;
