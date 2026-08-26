import type { RuleOptions } from "../typegen";

/**
 * React 本地覆写规则。
 *
 * @remarks
 * `@eslint-react/recommended*` 负责组件、JSX、DOM 与 Web API 正确性，React 官方
 * Hooks Recommended 负责 Hooks 与 React Compiler 正确性；这里仅消除重复报告并补充 DOM 规则。
 */
export const reactRules = {
	// 以下规则由 React 官方 Hooks Recommended 提供，关闭 @eslint-react 中的重复实现。
	"@eslint-react/error-boundaries": "off",
	"@eslint-react/exhaustive-deps": "off",
	"@eslint-react/purity": "off",
	"@eslint-react/rules-of-hooks": "off",
	"@eslint-react/set-state-in-effect": "off",
	"@eslint-react/set-state-in-render": "off",
	"@eslint-react/static-components": "off",
	"@eslint-react/unsupported-syntax": "off",
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
