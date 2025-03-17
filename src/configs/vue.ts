import tseslint from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";
import vueEslintParser from "vue-eslint-parser";
import { CONST_VUE } from "../constants";
import { typescriptCoreConfigs } from "./typescript";

import process from "node:process";
import { getPackageInfoSync } from "local-pkg";

const getVueVersion = () => {
	const pkg = getPackageInfoSync("vue", { paths: [process.cwd()] });
	if (pkg && typeof pkg.version === "string" && !Number.isNaN(+pkg.version[0])) {
		return +pkg.version[0];
	}
	return 3;
};

/**
 * 是否为 vue3 版本
 */
const isVue3 = getVueVersion() === 3;

/**
 * vue配置
 */
export const vueConfigs = tseslint.config([
	{
		name: "@fast-china/vue",
		files: [CONST_VUE],
		// 继承某些已有的规则
		extends: [...(isVue3 ? eslintPluginVue.configs["flat/recommended"] : eslintPluginVue.configs["flat/vue2-recommended"])],
		languageOptions: {
			parser: vueEslintParser,
			parserOptions: {
				// 允许在 Vue 文件中的脚本部分使用 TypeScript 语法
				parser: "@typescript-eslint/parser",
				// 指定额外的文件扩展名，告诉解析器 .vue 文件也需要处理
				extraFileExtensions: [".vue"],
				//  允许使用最新的 ECMAScript 语法特性
				ecmaVersion: "latest",
				// 允许使用 JSX/TSX 语法，适用于 Vue 组件中的 JSX/TSX 代码。
				ecmaFeatures: {
					jsx: true,
					tsx: true,
				},
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
		},
		rules: {
			// vue (https://eslint.vuejs.org/rules)

			// 关闭 - 禁止使用未声明的变量，以避免在 .vue 文件中出现关于未定义变量的警告，这在 Vue 单文件组件中可能不适用或会导致不必要的警告
			"no-undef": "off",

			// 允许使用 v-html
			"vue/no-v-html": "off",
			// 禁用所有 props 必填时，必须提供默认值
			"vue/require-default-prop": "off",
			// 强制组件中必须使用 emits 选项声明事件
			"vue/require-explicit-emits": "error",
			// 禁用组件名称必须是多单词
			"vue/multi-word-component-names": "off",
			// 关闭 - 强制从 vue 中导入 Vue相关 API
			"vue/prefer-import-from-vue": "off",
			// 强制 HTML 属性使用 camelCase 风格
			"vue/attribute-hyphenation": [
				"error",
				"always",
				{
					ignore: [
						// 忽略 Element-Plus 加载文案"element-loading-text"
					],
				},
			],

			// 禁止重复的字段名
			"vue/no-dupe-keys": "error",
			// 禁止直接修改 props 的值
			"vue/no-mutating-props": "error",
			// 禁止使用 Vue.js 内置的保留组件名称（如 transition、keep-alive 等）作为自定义组件名称
			"vue/no-reserved-component-names": "error",
			// 禁止在自定义组件上使用 v-text 或 v-html 指令
			"vue/no-v-text-v-html-on-component": "off",
			// 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
			// "vue/script-setup-uses-vars": "error",
			// 强制自定义事件名称使用 camelCase 风格命名
			"vue/custom-event-name-casing": ["error", "camelCase"],
			// 强制每个 Vue 文件中只包含一个 Vue 组件
			"vue/one-component-per-file": "off",
			// 闭合标签换行风格
			"vue/html-closing-bracket-newline": [
				"error",
				{
					// 强制要求当 HTML 元素跨多行时，闭合标签必须出现在新的一行上
					multiline: "always",
					// 强制要求当 HTML 元素只有一行时，闭合标签应与开始标签在同一行上
					singleline: "never",
				},
			],
			// 强制 Vue 模板中 HTML 元素的属性按照指定的顺序排列
			"vue/attributes-order": [
				"error",
				{
					order: [
						"DEFINITION",
						"LIST_RENDERING",
						"CONDITIONALS",
						"RENDER_MODIFIERS",
						"GLOBAL",
						"UNIQUE",
						"OTHER_ATTR",
						"EVENTS",
						"CONTENT",
					],
				},
			],
		},
	},
	{
		name: "@fast-china/vue/ts",
		files: [CONST_VUE],
		// 继承某些已有的规则
		extends: [...typescriptCoreConfigs],
	},
	{
		name: "@fast-china/reactivity",
		languageOptions: {
			globals: {
				$: "readonly",
				$$: "readonly",
				$computed: "readonly",
				$customRef: "readonly",
				$ref: "readonly",
				$shallowRef: "readonly",
				$toRef: "readonly",
			},
		},
		plugins: {
			vue: eslintPluginVue,
		},
	},
]);
