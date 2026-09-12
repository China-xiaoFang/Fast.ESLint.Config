import { defineConfig } from "eslint/config";
import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import vueEslintParser from "vue-eslint-parser";
import { GLOB_JSX, GLOB_TSX, GLOB_VUE } from "../constants";
import { javascriptRules, typescriptRules, typescriptTypeCheckedRules, vueRules, vueScriptRules } from "../rules";
import { createTypeScriptParserOptions, getTypeScriptPresetConfigs } from "./typescript";

/**
 * 创建 Vue 3 单文件组件配置。
 *
 * @remarks
 * Vue 模板解析器通过 `parserOptions.parser` 委托给 typescript-eslint，统一使用类型感知检查。
 * UniApp 项目可传入 `.nvue` 文件范围及对应扩展名；普通 Vue 项目默认只处理 `.vue`。
 *
 * @param files - 应用 Vue 解析器与规则的单文件组件 glob。
 * @param extraFileExtensions - 与同一项目组合中的 TypeScript 配置保持一致的额外扩展名。
 * @returns 包含 Vue 模板、脚本解析器、推荐预置与本地规则的 Flat Config 数组。
 */
export const createVueConfigs = (
	files: readonly string[] = [GLOB_VUE],
	extraFileExtensions: readonly string[] = [".vue"]
): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/vue/type-checked",
			files: [...files],
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
					...createTypeScriptParserOptions(extraFileExtensions),
				},
			},
			rules: {
				/** Vue SFC 显式接管 TypeScript 预置中的核心规则替换，再由本地策略做最终覆写。 */
				...(tseslint.configs.recommendedTypeChecked[1]?.rules ?? {}),
				...javascriptRules,
				...typescriptRules,
				...typescriptTypeCheckedRules,
				/** SFC 以模板上下文和快速迭代为主，不强制补写函数返回类型。 */
				"@typescript-eslint/explicit-function-return-type": "off",
				/** SFC 的导出宏由 Vue 编译器建立契约，不强制补写普通模块边界类型。 */
				"@typescript-eslint/explicit-module-boundary-types": "off",
				/** Vue 模板事件由框架接管异步结果，允许 Promise 返回的事件处理函数；其他 Promise 误用继续检查。 */
				"@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
				/** `defineEmits` 校验器和框架回调的形参可只声明契约；普通未使用变量和导入仍然报错。 */
				"@typescript-eslint/no-unused-vars": ["error", { args: "none", caughtErrors: "none", ignoreRestSiblings: true }],
				...vueRules,
			},
		},
	]);

/**
 * 创建 Vue JSX 与 TSX 组件脚本语义配置。
 *
 * @remarks
 * `vue-eslint-parser` 会为独立 JSX/TSX 建立 eslint-plugin-vue 所需的组件脚本访问器；
 * TSX 继续委托给 typescript-eslint 并复用项目的 Project Service。这里只加载适用于
 * `defineComponent()`、Options API 与 `setup()` 的脚本规则，不把 kebab-case、模板属性
 * 排序或 `v-text`/`v-html` 等模板节点规则套到 JSX 属性上。
 *
 * @param extraFileExtensions - 与同一项目组合中的 TypeScript 和 SFC 配置保持一致的额外扩展名。
 * @returns 分别处理独立 `.jsx` 与 `.tsx` Vue 组件的 Flat Config 数组。
 */
export const createVueJsxConfigs = (extraFileExtensions: readonly string[] = [".vue"]): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/vue/jsx",
			files: [GLOB_JSX],
			plugins: {
				vue: eslintPluginVue,
			},
			languageOptions: {
				ecmaVersion: "latest",
				parser: vueEslintParser,
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
					sourceType: "module",
				},
			},
			rules: vueScriptRules,
		},
		{
			name: "@fast-china/vue/tsx-type-checked",
			files: [GLOB_TSX],
			plugins: {
				vue: eslintPluginVue,
			},
			languageOptions: {
				ecmaVersion: "latest",
				parser: vueEslintParser,
				parserOptions: {
					parser: tseslint.parser,
					ecmaFeatures: {
						jsx: true,
					},
					sourceType: "module",
					...createTypeScriptParserOptions(extraFileExtensions),
				},
			},
			rules: vueScriptRules,
		},
	]);
