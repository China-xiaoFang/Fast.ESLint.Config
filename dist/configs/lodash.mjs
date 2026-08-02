import { GLOBS_CODE } from "../constants/index.mjs";
import { preferLodashRules, preferLodashUnifiedRules } from "../rules/lodash.mjs";
import { defineConfig } from "eslint/config";
//#region src/configs/lodash.ts
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
const createLodashConfigs = (preference, files = GLOBS_CODE) => defineConfig([{
	name: `@fast-china/lodash/${preference}`,
	files: [...files],
	rules: preference === "lodash" ? preferLodashRules : preferLodashUnifiedRules
}]);
//#endregion
export { createLodashConfigs };

//# sourceMappingURL=lodash.mjs.map