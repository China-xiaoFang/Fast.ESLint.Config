import { defineConfig } from "eslint/config";

import { GLOBS_CODE } from "../constants";
import { preferLodashRules, preferLodashUnifiedRules } from "../rules";

/** 项目允许使用的 Lodash 导入来源。 */
export type LodashPreference = "lodash" | "lodash-unified";

/**
 * 创建 Lodash 静态导入约束。
 *
 * 该配置使用 ESLint 核心规则，因此不依赖 import-x 开关或额外插件。
 */
export const createLodashConfigs = (preference: LodashPreference, files: readonly string[] = GLOBS_CODE) =>
	defineConfig([
		{
			name: `@fast-china/lodash/${preference}`,
			files: [...files],
			rules: preference === "lodash" ? preferLodashRules : preferLodashUnifiedRules,
		},
	]);
