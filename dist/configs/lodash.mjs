import { GLOBS_CODE } from "../constants/index.mjs";
import { preferLodashRules, preferLodashUnifiedRules } from "../rules/lodash.mjs";
import { defineConfig } from "eslint/config";
//#region src/configs/lodash.ts
/**
* 创建 Lodash 静态导入约束。
*
* 该配置使用 ESLint 核心规则，因此不依赖 import-x 开关或额外插件。
*/
const createLodashConfigs = (preference, files = GLOBS_CODE) => defineConfig([{
	name: `@fast-china/lodash/${preference}`,
	files: [...files],
	rules: preference === "lodash" ? preferLodashRules : preferLodashUnifiedRules
}]);
//#endregion
export { createLodashConfigs };

//# sourceMappingURL=lodash.mjs.map