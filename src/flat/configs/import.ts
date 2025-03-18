// @ts-ignore
import eslintPluginImport from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import { CONST_DTS, CONST_JS, CONST_JSX, CONST_TS, CONST_TSX } from "../../constants";
import { importRules, importUseLodashUnifiedRules } from "../../rules";

/**
 * import配置
 */
export const importConfigs = tseslint.config([
	{
		name: "@fast-china/import",
		// 继承某些已有的规则
		extends: [eslintPluginImport.flatConfigs.recommended],
		settings: {
			// 确保 ESLint 和 eslint-plugin-import 能够正确解析项目中的所有相关文件类型
			"import/resolver": {
				node: {
					extensions: [CONST_JS, CONST_JSX, CONST_TS, CONST_TSX, CONST_DTS],
				},
			},
		},
		rules: {
			...importRules,

			...importUseLodashUnifiedRules,
		},
	},
]);
