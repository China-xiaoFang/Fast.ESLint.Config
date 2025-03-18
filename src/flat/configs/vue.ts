import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import vueEslintParser from "vue-eslint-parser";
import { CONST_VUE } from "../../constants";
import { isVue3 } from "../../env";
import { vueRules } from "../../rules";
import { typescriptCoreConfigs } from "./typescript";

/**
 * vue配置
 */
export const vueConfigs = tseslint.config([
	{
		name: "@fast-china/vue/ts",
		files: [CONST_VUE],
		// 继承某些已有的规则
		extends: [...typescriptCoreConfigs],
	},
	{
		name: "@fast-china/vue",
		files: [CONST_VUE],
		// 继承某些已有的规则
		extends: [...(isVue3 ? eslintPluginVue.configs["flat/recommended"] : eslintPluginVue.configs["flat/vue2-recommended"])],
		languageOptions: {
			//  允许使用最新的 ECMAScript 语法特性
			ecmaVersion: "latest",
			// 允许 ESLint 处理 Vue 文件中的模板和脚本
			parser: vueEslintParser,
			parserOptions: {
				// 允许在 Vue 文件中的脚本部分使用 TypeScript 语法
				parser: "@typescript-eslint/parser",
				// 指定额外的文件扩展名，告诉解析器 .vue 文件也需要处理
				extraFileExtensions: [".vue"],
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
			...vueRules,

			// 关闭 - 禁止使用未声明的变量，以避免在 .vue 文件中出现关于未定义变量的警告，这在 Vue 单文件组件中可能不适用或会导致不必要的警告
			"no-undef": "off",

			// 关闭 - 要求在 TypeScript 函数和方法中显式地指定返回类型
			"@typescript-eslint/explicit-function-return-type": "off",
		},
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
