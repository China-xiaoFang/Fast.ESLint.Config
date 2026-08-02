import { GLOB_ANGULAR_TEMPLATE, GLOB_ANGULAR_TYPESCRIPT } from "../constants/index.mjs";
import { angularRules, angularTemplateAccessibilityRules, angularTemplateRules } from "../rules/angular.mjs";
import angularPlugin from "@angular-eslint/eslint-plugin";
import angularTemplatePlugin from "@angular-eslint/eslint-plugin-template";
import angularTemplateParser from "@angular-eslint/template-parser";
import { defineConfig } from "eslint/config";
//#region src/configs/angular.ts
/**
* 创建 Angular TypeScript、外部 HTML 模板与内联模板配置。
*
* @remarks
* Angular 支持依赖工厂的 TypeScript 配置先注册 typescript-eslint 解析器；模板由
* Angular 专用 parser 解析，内联模板通过官方 processor 复用同一套 HTML 规则。
*
* @param options - 控制内联模板处理与模板无障碍规则的 Angular 选项。
* @returns 按 TypeScript 源码、外部模板顺序排列的 ESLint Flat Config 数组。
*/
const createAngularConfigs = ({ inlineTemplates = true, templateAccessibility = true } = {}) => defineConfig([{
	name: inlineTemplates ? "@fast-china/angular/typescript-with-inline-templates" : "@fast-china/angular/typescript",
	files: [GLOB_ANGULAR_TYPESCRIPT],
	plugins: { "@angular-eslint": angularPlugin },
	...inlineTemplates ? { processor: angularTemplatePlugin.processors["extract-inline-html"] } : {},
	rules: angularRules
}, {
	name: templateAccessibility ? "@fast-china/angular/template-accessibility" : "@fast-china/angular/template",
	files: [GLOB_ANGULAR_TEMPLATE],
	languageOptions: { parser: angularTemplateParser },
	plugins: { "@angular-eslint/template": angularTemplatePlugin },
	rules: {
		...angularTemplateRules,
		...templateAccessibility ? angularTemplateAccessibilityRules : {}
	}
}]);
//#endregion
export { createAngularConfigs };

//# sourceMappingURL=angular.mjs.map