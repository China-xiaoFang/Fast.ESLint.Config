import { defineConfig } from "eslint/config";
import eslintPluginImportX from "eslint-plugin-import-x";
import { GLOBS_CODE } from "../constants";
import { importRules } from "../rules";

/**
 * 创建模块导入规则配置。
 *
 * @remarks
 * 共享库不猜测项目的路径别名或解析器，因此只继承 import-x 的推荐能力，
 * 与 resolver 强耦合且容易误报的规则会在本地规则记录中显式关闭。
 *
 * @param files - 应用 import-x 推荐规则与本地覆盖规则的 ESLint glob 列表。
 * @returns 包含 import-x 插件预置和本地规则的 Flat Config 数组。
 */
export const createImportConfigs = (files: readonly string[] = GLOBS_CODE): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/import",
			files: [...files],
			extends: [eslintPluginImportX.flatConfigs.recommended],
			rules: importRules,
		},
	]);
