import { GLOB_VUE } from "../constants/index.mjs";
import { typescriptRules } from "../rules/typescript.mjs";
import { vueRules } from "../rules/vue.mjs";
import { createTypeScriptParserOptions, getTypeScriptPresetConfigs } from "./typescript.mjs";
import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";
import vueEslintParser from "vue-eslint-parser";
//#region src/configs/vue.ts
/**
* 创建 Vue 3 单文件组件配置。
*
* 本包只处理 Vue 3。启用 TypeScript 时，Vue 模板解析器通过 `parserOptions.parser`
* 委托给 typescript-eslint；这是 Vue 官方推荐的自定义脚本解析器接入方式。
*/
const createVueConfigs = ({ typescript = true, typescriptOptions = {} } = {}) => {
	const typeChecked = typescriptOptions.typeChecked ?? false;
	const typeScriptConfigs = typescript ? getTypeScriptPresetConfigs(typeChecked, true) : [];
	return defineConfig([{
		name: typeChecked ? "@fast-china/vue/type-checked" : "@fast-china/vue",
		files: [GLOB_VUE],
		extends: [
			eslint.configs.recommended,
			...typeScriptConfigs,
			...eslintPluginVue.configs["flat/recommended"]
		],
		languageOptions: {
			ecmaVersion: "latest",
			parser: vueEslintParser,
			parserOptions: {
				...typescript ? {
					parser: tseslint.parser,
					extraFileExtensions: [".vue"]
				} : {},
				ecmaFeatures: { jsx: true },
				sourceType: "module",
				...createTypeScriptParserOptions(typescriptOptions)
			}
		},
		rules: {
			...typescript ? typescriptRules : {},
			...vueRules
		}
	}]);
};
//#endregion
export { createVueConfigs };

//# sourceMappingURL=vue.mjs.map