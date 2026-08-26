import { defineConfig } from "eslint/config";
import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import vueEslintParser from "vue-eslint-parser";
import { GLOB_NVUE, GLOB_VUE } from "../constants";
import { typescriptRules, typescriptTypeCheckedRules, vueRules } from "../rules";
import { createTypeScriptParserOptions, getTypeScriptPresetConfigs } from "./typescript";

/**
 * 创建 Vue 3 单文件组件配置。
 *
 * @remarks
 * 本包只处理 Vue 3，并默认同时接管 UniApp 原生渲染页面使用的 `.nvue`。Vue 模板解析器
 * 通过 `parserOptions.parser` 委托给 typescript-eslint，统一使用类型感知检查。
 *
 * @returns 包含 Vue 模板、脚本解析器、推荐预置与本地规则的 Flat Config 数组。
 */
export const createVueConfigs = (): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/vue/type-checked",
			files: [GLOB_VUE, GLOB_NVUE],
			extends: [...getTypeScriptPresetConfigs(), ...eslintPluginVue.configs["flat/recommended"]],
			languageOptions: {
				ecmaVersion: "latest",
				parser: vueEslintParser,
				parserOptions: {
					parser: tseslint.parser,
					extraFileExtensions: [".vue", ".nvue"],
					ecmaFeatures: {
						jsx: true,
					},
					sourceType: "module",
					...createTypeScriptParserOptions(),
				},
			},
			rules: {
				...typescriptRules,
				...typescriptTypeCheckedRules,
				// Vue SFC 继承的 TypeScript 预置保留自身 files 范围，因此显式关闭容易误判 TS AST 的核心规则。
				...(tseslint.configs.recommendedTypeChecked[1]?.rules ?? {}),
				// SFC 内部函数依赖上下文推断返回类型，只要求模块导出边界显式声明。
				"@typescript-eslint/explicit-function-return-type": "off",
				...vueRules,
			},
		},
	]);
