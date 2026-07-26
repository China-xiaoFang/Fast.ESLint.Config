import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import vueEslintParser from "vue-eslint-parser";

import { GLOB_VUE } from "../constants";
import { typescriptRules, vueRules } from "../rules";

import { type TypeScriptConfigOptions, createTypeScriptParserOptions, getTypeScriptPresetConfigs } from "./typescript";

export interface VueConfigOptions {
	/** 是否使用 typescript-eslint 解析 `<script>`；关闭后仅支持 JavaScript。 */
	typescript?: boolean;
	/** 与独立 TypeScript 文件共享的类型感知选项。 */
	typescriptOptions?: TypeScriptConfigOptions;
}

/**
 * 创建 Vue 3 单文件组件配置。
 *
 * 本包只处理 Vue 3。启用 TypeScript 时，Vue 模板解析器通过 `parserOptions.parser`
 * 委托给 typescript-eslint；这是 Vue 官方推荐的自定义脚本解析器接入方式。
 */
export const createVueConfigs = ({ typescript = true, typescriptOptions = {} }: VueConfigOptions = {}) => {
	const typeChecked = typescriptOptions.typeChecked ?? false;
	const typeScriptConfigs = typescript ? getTypeScriptPresetConfigs(typeChecked, true) : [];

	return defineConfig([
		{
			name: typeChecked ? "@fast-china/vue/type-checked" : "@fast-china/vue",
			files: [GLOB_VUE],
			extends: [eslint.configs.recommended, ...typeScriptConfigs, ...eslintPluginVue.configs["flat/recommended"]],
			languageOptions: {
				ecmaVersion: "latest",
				parser: vueEslintParser,
				parserOptions: {
					...(typescript ? { parser: tseslint.parser, extraFileExtensions: [".vue"] } : {}),
					ecmaFeatures: {
						jsx: true,
					},
					sourceType: "module",
					...createTypeScriptParserOptions(typescriptOptions),
				},
			},
			rules: {
				...(typescript ? typescriptRules : {}),
				...vueRules,
			},
		},
	]);
};
