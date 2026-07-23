import { defineConfig } from "eslint/config";

import { GLOB_CODE } from "../constants";
import { commonRules } from "../rules";

/**
 * 公共配置
 * @description 最佳实践
 */
export const createCommonConfigs = (files: readonly string[] = GLOB_CODE) =>
	defineConfig([
		{
			name: "@fast-china/common",
			files: [...files],
			linterOptions: {
				reportUnusedDisableDirectives: "error",
			},
			rules: commonRules,
		},
	]);

export const commonConfigs = createCommonConfigs();
