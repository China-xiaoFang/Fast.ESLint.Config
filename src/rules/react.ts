import type { RuleOptions } from "../typegen";

/**
 * React 本地覆写规则。
 *
 * `@eslint-react/recommended*` 负责组件、JSX、DOM 与 Web API 正确性，
 * `react-hooks/recommended` 负责 React 官方 Hooks 与 Compiler 诊断。这里关闭两套
 * 预置间的重复诊断，并补充少量明确的 DOM 安全约束。
 */
export const reactRules = {
	// React 官方 Hooks 插件提供更完整的 Error Boundary/Compiler 诊断，避免同一问题重复报告。
	"@eslint-react/error-boundaries": "off",
	// 依赖数组由 React 官方 exhaustive-deps 规则统一检查，避免重复警告。
	"@eslint-react/exhaustive-deps": "off",
	// 纯函数约束交给 React 官方 Compiler 规则维护，确保与 React 版本同步。
	"@eslint-react/purity": "off",
	// Hooks 调用顺序由 React 官方规则作为唯一来源，避免编辑器显示两个相同错误。
	"@eslint-react/rules-of-hooks": "off",
	// Effect 内同步更新状态由 React 官方 Compiler 规则判断，避免两套实现严重级别不一致。
	"@eslint-react/set-state-in-effect": "off",
	// 渲染期间更新状态由 React 官方 Compiler 规则判断，避免重复错误。
	"@eslint-react/set-state-in-render": "off",
	// 组件引用稳定性由 React 官方 Compiler 规则统一检查。
	"@eslint-react/static-components": "off",
	// Compiler 不支持的语法由 React 官方规则统一报告。
	"@eslint-react/unsupported-syntax": "off",
	// memoization 建议由 React 官方 Compiler 规则统一报告。
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
