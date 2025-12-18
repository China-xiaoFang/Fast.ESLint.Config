import { defineConfig } from "eslint/config";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/**
 * prettier配置
 */
export const prettierConfigs = defineConfig([
	{
		name: "@fast-china/prettier",
		// 继承某些已有的规则
		extends: [eslintConfigPrettierFlat, eslintPluginPrettierRecommended],
		plugins: {
			prettier: eslintPluginPrettier,
		},
		rules: {
			// 确保 Prettier 错误被 ESLint 捕获
			"prettier/prettier": "error",
		},
	},
]);
