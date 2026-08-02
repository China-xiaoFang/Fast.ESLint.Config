import { packageJsonSortRules } from "../rules/sort-package.mjs";
import { defineConfig } from "eslint/config";
//#region src/configs/sort-package.ts
/**
* 创建 package.json 排序配置。
*
* 该能力会产生较大的可修复 diff，因此必须显式启用；规则不会进入顺序具有
* 条件导出语义的 `exports` 对象内部。
*/
const createPackageJsonSortConfigs = () => defineConfig([{
	name: "@fast-china/sort/package-json",
	files: ["**/package.json"],
	rules: packageJsonSortRules
}]);
//#endregion
export { createPackageJsonSortConfigs };

//# sourceMappingURL=sort-package.mjs.map