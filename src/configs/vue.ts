import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import vueEslintParser from "vue-eslint-parser";

import { CONST_VUE } from "../constants";
import { typescriptRules, vueRules } from "../rules";

import type { Linter } from "eslint";

export interface VueConfigOptions {
	typeChecked?: boolean;
	version?: 2 | 3;
}

const withoutFileScope = (config: Linter.Config): Linter.Config => {
	const { files: _files, ...unscopedConfig } = config;
	return unscopedConfig;
};

/**
 * vue配置
 */
export const createVueConfigs = ({ typeChecked = false, version = 3 }: VueConfigOptions = {}) => {
	const typeScriptConfigs = [
		...(typeChecked ? tseslint.configs.recommendedTypeChecked : tseslint.configs.recommended),
		...(typeChecked ? tseslint.configs.stylisticTypeChecked : tseslint.configs.stylistic),
	].map((config) => withoutFileScope(config));

	const vueRecommendedConfigs = version === 3 ? eslintPluginVue.configs["flat/recommended"] : eslintPluginVue.configs["flat/vue2-recommended"];

	return defineConfig([
		{
			name: version === 3 ? "@fast-china/vue3" : "@fast-china/vue2",
			files: [CONST_VUE],
			extends: [eslint.configs.recommended, ...typeScriptConfigs, ...vueRecommendedConfigs],
			languageOptions: {
				ecmaVersion: "latest",
				parser: vueEslintParser,
				parserOptions: {
					parser: tseslint.parser,
					extraFileExtensions: [".vue"],
					ecmaFeatures: {
						jsx: true,
					},
					sourceType: "module",
					...(typeChecked ? { projectService: true } : {}),
				},
			},
			rules: {
				...typescriptRules,
				...vueRules,
			},
		},
	]);
};

export const vueConfigs = createVueConfigs();
export const vue2Configs = createVueConfigs({ version: 2 });
export const vueTypeCheckedConfigs = createVueConfigs({ typeChecked: true });
