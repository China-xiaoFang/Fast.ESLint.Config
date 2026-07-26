import angularPlugin from "@angular-eslint/eslint-plugin";
import angularTemplatePlugin from "@angular-eslint/eslint-plugin-template";
import angularTemplateParser from "@angular-eslint/template-parser";
import { defineConfig } from "eslint/config";

import { GLOB_ANGULAR_TEMPLATE, GLOB_ANGULAR_TYPESCRIPT } from "../constants";
import { angularRules, angularTemplateAccessibilityRules, angularTemplateRules } from "../rules";

import type { ESLint, Linter } from "eslint";

export interface AngularConfigOptions {
	/**
	 * 是否从 `@Component({ template: ... })` 中提取并检查内联模板。
	 * @default true
	 */
	inlineTemplates?: boolean;
	/**
	 * 是否启用 Angular 官方模板无障碍规则集。
	 * @default true
	 */
	templateAccessibility?: boolean;
}

/**
 * 创建 Angular TypeScript、外部 HTML 模板与内联模板配置。
 *
 * Angular 支持依赖工厂的 TypeScript 配置先注册 typescript-eslint 解析器；模板由
 * Angular 专用 parser 解析，内联模板通过官方 processor 复用同一套 HTML 规则。
 */
export const createAngularConfigs = ({ inlineTemplates = true, templateAccessibility = true }: AngularConfigOptions = {}) =>
	defineConfig([
		{
			name: inlineTemplates ? "@fast-china/angular/typescript-with-inline-templates" : "@fast-china/angular/typescript",
			files: [GLOB_ANGULAR_TYPESCRIPT],
			plugins: {
				"@angular-eslint": angularPlugin as unknown as ESLint.Plugin,
			},
			...(inlineTemplates
				? {
						processor: angularTemplatePlugin.processors["extract-inline-html"] as Linter.Processor,
					}
				: {}),
			rules: angularRules,
		},
		{
			name: templateAccessibility ? "@fast-china/angular/template-accessibility" : "@fast-china/angular/template",
			files: [GLOB_ANGULAR_TEMPLATE],
			languageOptions: {
				parser: angularTemplateParser as unknown as Linter.Parser,
			},
			plugins: {
				"@angular-eslint/template": angularTemplatePlugin as unknown as ESLint.Plugin,
			},
			rules: {
				...angularTemplateRules,
				...(templateAccessibility ? angularTemplateAccessibilityRules : {}),
			},
		},
	]);
