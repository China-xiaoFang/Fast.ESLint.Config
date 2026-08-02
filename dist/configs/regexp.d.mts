//#region src/configs/regexp.d.ts
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
declare const createRegexpConfigs: (files?: readonly string[]) => import("eslint/config").ConfigObject[];
//#endregion
export { createRegexpConfigs };
//# sourceMappingURL=regexp.d.mts.map