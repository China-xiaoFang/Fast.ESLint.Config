//#region src/rules/angular.ts
/**
* Angular TypeScript 推荐规则。
*
* @remarks
* Angular ESLint 的拆分插件不直接导出 Flat Config 预置；本记录与 angular-eslint
* 22.x 的 `tsRecommended` 保持一致，并逐条说明启用理由。
*/
const angularRules = {
	"@angular-eslint/contextual-lifecycle": "error",
	"@angular-eslint/no-empty-lifecycle-method": "error",
	"@angular-eslint/no-input-rename": "error",
	"@angular-eslint/no-inputs-metadata-property": "error",
	"@angular-eslint/no-output-native": "error",
	"@angular-eslint/no-output-on-prefix": "error",
	"@angular-eslint/no-output-rename": "error",
	"@angular-eslint/no-outputs-metadata-property": "error",
	"@angular-eslint/prefer-inject": "error",
	"@angular-eslint/prefer-on-push-component-change-detection": "error",
	"@angular-eslint/prefer-standalone": "error",
	"@angular-eslint/use-pipe-transform-interface": "error",
	"@angular-eslint/use-lifecycle-interface": "warn"
};
/**
* Angular HTML 模板推荐规则。
*
* @remarks
* 该记录与 angular-eslint 22.x 的 `templateRecommended` 对齐，并补充默认启用的现代
* 控制流约束。它同时应用于外部模板与 processor 提取的内联模板。
*/
const angularTemplateRules = {
	"@angular-eslint/template/banana-in-box": "error",
	"@angular-eslint/template/eqeqeq": "error",
	"@angular-eslint/template/no-negated-async": "error",
	"@angular-eslint/template/prefer-control-flow": "error"
};
/**
* Angular 模板无障碍规则。
*
* @remarks
* 规则覆盖替代文本、键盘交互、焦点、表单标签与 ARIA 合法性，可通过
* `angular.templateAccessibility` 整组关闭而不影响模板基础正确性规则。
*/
const angularTemplateAccessibilityRules = {
	"@angular-eslint/template/alt-text": "error",
	"@angular-eslint/template/click-events-have-key-events": "error",
	"@angular-eslint/template/elements-content": "error",
	"@angular-eslint/template/interactive-supports-focus": "error",
	"@angular-eslint/template/label-has-associated-control": "error",
	"@angular-eslint/template/mouse-events-have-key-events": "error",
	"@angular-eslint/template/no-autofocus": "error",
	"@angular-eslint/template/no-distracting-elements": "error",
	"@angular-eslint/template/role-has-required-aria": "error",
	"@angular-eslint/template/table-scope": "error",
	"@angular-eslint/template/valid-aria": "error"
};
//#endregion
export { angularRules, angularTemplateAccessibilityRules, angularTemplateRules };

//# sourceMappingURL=angular.mjs.map