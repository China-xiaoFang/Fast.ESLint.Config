/**
 * 原始规则记录的公共入口。
 *
 * 维护规则时必须保留“为什么启用”的源码注释；标记为 `[高影响]` 的默认规则还需
 * 同步更新 `docs/rules-risk.zh.md`、`docs/rules-risk.md` 与对应集成测试。
 * 这些记录可用于高级组合，但推荐大多数项目通过根入口的 `fastConfig()` 使用。
 */
export type { RuleOptions } from "../typegen";

export { angularRules, angularTemplateAccessibilityRules, angularTemplateRules } from "./angular";
export { commonRules } from "./common";
export { importRules } from "./import";
export { javascriptRules } from "./javascript";
export { preferLodashRules, preferLodashUnifiedRules } from "./lodash";
export { reactRules } from "./react";
export { packageJsonSortRules } from "./sort-package";
export { tsconfigJsonSortRules } from "./sort-tsconfig";
export { typescriptRules } from "./typescript";
export { vueRules } from "./vue";
