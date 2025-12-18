import { defineConfig } from "eslint/config";
import { commonRules } from "../rules";

/**
 * 公共配置
 * @description 最佳实践
 */
export const commonConfigs = defineConfig([
	{
		name: "@fast-china/common",
		rules: commonRules,
	},
]);
