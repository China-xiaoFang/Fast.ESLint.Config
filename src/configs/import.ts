import { defineConfig } from "eslint/config";
import eslintPluginImportX from "eslint-plugin-import-x";

import { GLOB_CODE } from "../constants";
import { importRules } from "../rules";

/**
 * import配置
 */
export const createImportConfigs = (files: readonly string[] = GLOB_CODE) =>
	defineConfig([
		{
			name: "@fast-china/import",
			files: [...files],
			extends: [eslintPluginImportX.flatConfigs.recommended],
			rules: importRules,
		},
	]);

export const importConfigs = createImportConfigs();
