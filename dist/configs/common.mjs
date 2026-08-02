import { GLOBS_CODE } from "../constants/index.mjs";
import { commonRules } from "../rules/common.mjs";
import { defineConfig } from "eslint/config";
//#region src/configs/common.ts
/**
* 创建跨 JavaScript、TypeScript 与 Vue 脚本生效的通用配置。
*
* 除公共规则外，这里还把无效的 `eslint-disable` 指令提升为错误，避免规则被移除后
* 留下长期失效的抑制注释。
*/
const createCommonConfigs = (files = GLOBS_CODE) => defineConfig([{
	name: "@fast-china/common",
	files: [...files],
	linterOptions: { reportUnusedDisableDirectives: "error" },
	rules: commonRules
}]);
//#endregion
export { createCommonConfigs };

//# sourceMappingURL=common.mjs.map