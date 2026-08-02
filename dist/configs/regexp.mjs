import { GLOBS_CODE } from "../constants/index.mjs";
import { defineConfig } from "eslint/config";
import eslintPluginRegexp from "eslint-plugin-regexp";
//#region src/configs/regexp.ts
/**
* 创建正则表达式正确性配置。
*
* @remarks
* 插件推荐规则会检查无效、冗余或容易产生回溯问题的正则结构；部分规则可修复，
* 批量修复后仍需运行覆盖真实输入的项目测试。
*
* @param files - 应用正则表达式规则的 ESLint glob 列表。
* @returns 包含 `eslint-plugin-regexp` 推荐预置的 Flat Config 数组。
*/
const createRegexpConfigs = (files = GLOBS_CODE) => defineConfig([{
	name: "@fast-china/regexp",
	files: [...files],
	extends: [eslintPluginRegexp.configs["flat/recommended"]]
}]);
//#endregion
export { createRegexpConfigs };

//# sourceMappingURL=regexp.mjs.map