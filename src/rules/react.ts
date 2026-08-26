import type { RuleOptions } from "../typegen";

/**
 * React 本地覆写规则。
 *
 * @remarks
 * `@eslint-react/recommended*` 负责组件、JSX、DOM 与 Web API 正确性，React 官方
 * Hooks Recommended 负责 Hooks 与 React Compiler 正确性；这里仅消除重复报告并补充 DOM 规则。
 */
export const reactRules = {
	// 子组件渲染错误应交给 Error Boundary，而不是用父组件 try/catch 捕获；由官方 react-hooks/error-boundaries 统一检查。
	"@eslint-react/error-boundaries": "off",
	// useEffect、useMemo 和 useCallback 等 Hook 的依赖项必须完整准确；由官方 react-hooks/exhaustive-deps 统一检查。
	"@eslint-react/exhaustive-deps": "off",
	// 组件和 Hook 渲染期间不得调用 Date.now、Math.random 等已知非纯函数；由官方 react-hooks/purity 统一检查。
	"@eslint-react/purity": "off",
	// Hook 只能在组件或自定义 Hook 顶层调用，不能放入条件、循环或普通函数；由官方 react-hooks/rules-of-hooks 统一检查。
	"@eslint-react/rules-of-hooks": "off",
	// Effect 内同步更新状态会触发额外渲染，应改为派生值或外部订阅回调；由官方 react-hooks/set-state-in-effect 统一检查。
	"@eslint-react/set-state-in-effect": "off",
	// 渲染期间无条件更新状态可能造成重复或无限渲染；由官方 react-hooks/set-state-in-render 统一检查。
	"@eslint-react/set-state-in-render": "off",
	// 在渲染函数内部创建组件会使其每次重建并丢失状态；由官方 react-hooks/static-components 统一检查。
	"@eslint-react/static-components": "off",
	// React Compiler 无法安全转换的语法需要调整或显式隔离；由官方 react-hooks/unsupported-syntax 统一检查。
	"@eslint-react/unsupported-syntax": "off",
	// useMemo 回调必须返回需要缓存的值，不能把它误当作副作用 Hook；由官方 react-hooks/use-memo 统一检查。
	"@eslint-react/use-memo": "off",

	// button 缺少 type 时在表单内默认为 submit，显式声明可避免意外提交。
	"@eslint-react/dom-no-missing-button-type": "error",
	// [安全关注] 未受限 iframe 权限面较大；以 warn 提醒评估可信来源和 sandbox 策略。
	"@eslint-react/dom-no-missing-iframe-sandbox": "warn",
	// JSX 属性拼写错误会被 React 忽略或错误透传到 DOM，应在提交前阻断。
	"@eslint-react/dom-no-unknown-property": "error",
	// [安全关注] target="_blank" 未隔离 opener 时可能允许目标页控制来源页。
	"@eslint-react/dom-no-unsafe-target-blank": "error",
} satisfies RuleOptions;
