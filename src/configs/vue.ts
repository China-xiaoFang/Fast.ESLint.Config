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
					ecmaFeatures: {
						jsx: true,
					},
					sourceType: "module",
					...createTypeScriptParserOptions(),
				},
			},
			rules: {
				// Vue SFC 需要显式接管 TypeScript 预置中的核心规则替换，再由本地策略做最终覆写。
				...(tseslint.configs.strictTypeChecked[1]?.rules ?? {}),
				...typescriptRules,
				...typescriptTypeCheckedRules,
				// SFC 以模板上下文和快速迭代为主，不强制补写函数返回类型或模块边界类型。
				"@typescript-eslint/explicit-function-return-type": "off",
				"@typescript-eslint/explicit-module-boundary-types": "off",
				// Vue 模板事件由框架接管异步结果，允许 Promise 返回的事件处理函数；其他 Promise 误用继续检查。
				"@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
				// defineEmits 校验器和框架回调的形参可用于声明契约而不读取；普通未使用变量和导入仍然报错。
				"@typescript-eslint/no-unused-vars": ["error", { args: "none", caughtErrors: "none", ignoreRestSiblings: true }],
				...vueRules,
			},
		},
	]);
