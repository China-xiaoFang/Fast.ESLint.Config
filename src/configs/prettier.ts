import { defineConfig } from "eslint/config";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";

/**
 * prettier配置
 */
export const prettierConfigs = defineConfig([
	{
		...eslintConfigPrettierFlat,
		name: "@fast-china/prettier",
	},
]);
