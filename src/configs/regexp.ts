import { defineConfig } from "eslint/config";
import eslintPluginRegexp from "eslint-plugin-regexp";

import { GLOB_CODE } from "../constants";

/**
 * regexp配置
 */
export const createRegexpConfigs = (files: readonly string[] = GLOB_CODE) =>
	defineConfig([
		{
			name: "@fast-china/regexp",
			files: [...files],
			extends: [eslintPluginRegexp.configs["flat/recommended"]],
		},
	]);

export const regexpConfigs = createRegexpConfigs();
