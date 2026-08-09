import { defineConfig } from "eslint/config";
import { GLOBS_CODE } from "../constants";
import { preferLodashRules, preferLodashUnifiedRules } from "../rules";

/**
 * 项目允许使用的 Lodash 静态导入来源。
 *
 * `"lodash"` 允许根入口及 `lodash/*` 子路径；`"lodash-unified"` 只允许统一入口。
 */
export type LodashPreference = "lodash" | "lodash-unified";

/**
 * 创建 Lodash 静态导入约束。
 *
 * @remarks
 * 该配置使用 ESLint 核心规则，因此不依赖 import-x 开关或额外插件。
 * 它只检查静态 `import` 与 `export ... from`，不会安装依赖或检查动态导入。
 *
 * @param preference - 项目唯一允许使用的 Lodash 包入口。
 * @param files - 应用导入约束的 ESLint glob 列表。
 * @returns 包含对应 Lodash 导入限制规则的 Flat Config 数组。
 */
export const createLodashConfigs = (preference: LodashPreference, files: readonly string[] = GLOBS_CODE) =>
	defineConfig([
		{
			name: `@fast-china/lodash/${preference}`,
			files: [...files],
			rules: preference === "lodash" ? preferLodashRules : preferLodashUnifiedRules,
		},
	]);
