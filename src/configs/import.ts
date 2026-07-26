import { defineConfig } from "eslint/config";
import eslintPluginImportX from "eslint-plugin-import-x";

import { GLOBS_CODE } from "../constants";
import { importRules } from "../rules";

/**
 * 创建模块导入规则配置。
 *
 * 共享库不猜测项目的路径别名或解析器，因此只继承 import-x 的推荐能力，
 * 与 resolver 强耦合且容易误报的规则会在本地规则记录中显式关闭。
 */
export const createImportConfigs = (files: readonly string[] = GLOBS_CODE) =>
	defineConfig([
		{
			name: "@fast-china/import",
			files: [...files],
			extends: [eslintPluginImportX.flatConfigs.recommended],
			rules: importRules,
		},
	]);
