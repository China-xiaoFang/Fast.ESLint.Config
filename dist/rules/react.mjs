//#region src/rules/react.ts
/**
* React 本地覆写规则。
*
* @remarks
* `@eslint-react/recommended*` 负责组件、JSX、DOM 与 Web API 正确性，
* `react-hooks/recommended` 负责 React 官方 Hooks 与 Compiler 诊断。这里关闭两套
* 预置间的重复诊断，并补充少量明确的 DOM 安全约束。
*/
const reactRules = {
	"@eslint-react/error-boundaries": "off",
	"@eslint-react/exhaustive-deps": "off",
	"@eslint-react/purity": "off",
	"@eslint-react/rules-of-hooks": "off",
	"@eslint-react/set-state-in-effect": "off",
	"@eslint-react/set-state-in-render": "off",
	"@eslint-react/static-components": "off",
	"@eslint-react/unsupported-syntax": "off",
	"@eslint-react/use-memo": "off",
	"@eslint-react/dom-no-missing-button-type": "error",
	"@eslint-react/dom-no-missing-iframe-sandbox": "warn",
	"@eslint-react/dom-no-unknown-property": "error",
	"@eslint-react/dom-no-unsafe-target-blank": "error"
};
//#endregion
export { reactRules };

//# sourceMappingURL=react.mjs.map