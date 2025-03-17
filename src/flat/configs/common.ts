import tseslint from "typescript-eslint";
import { commonRules } from "../../rules/common";

/**
 * 公共配置
 * @description 最佳实践
 */
export const commonConfigs = tseslint.config([
	{
		name: "@fast-china/common",
		rules: commonRules,
	},
]);
