import { defineConfig } from "eslint/config";
import eslintPluginImportX from "eslint-plugin-import-x";
import { CONST_DTS, CONST_JS, CONST_JSX, CONST_TS, CONST_TSX } from "../constants";
import { importRules, importUseLodashUnifiedRules } from "../rules";

/**
 * import配置
 */
export const importConfigs = defineConfig([
	{
		name: "@fast-china/import",
		// 继承某些已有的规则
		extends: [eslintPluginImportX.flatConfigs.recommended, eslintPluginImportX.flatConfigs.typescript],
		settings: {
			// 确保 ESLint 和 eslint-plugin-import 能够正确解析项目中的所有相关文件类型
			"import-x/resolver": {
				node: {
					alwaysTryTypes: true,
					extensions: [CONST_JS, CONST_JSX, CONST_TS, CONST_TSX, CONST_DTS],
				},
				typescript: {
					alwaysTryTypes: true,
					project: ["./tsconfig.json", "./tsconfig.*.json", "./packages/*/tsconfig.json", "./packages/*/tsconfig.*.json"],
				},
			},
		},
		rules: {
			...importRules,

			...importUseLodashUnifiedRules,
		},
	},
]);
