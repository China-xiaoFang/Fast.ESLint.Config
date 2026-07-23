/**
 * 本地规则覆写的公共入口。
 *
 * 维护规则时必须保留“为什么启用”的源码注释；标记为 `[高影响]` 的默认规则还需
 * 同步更新 `docs/rules-risk.zh.md`、`docs/rules-risk.md` 与对应集成测试。
 */
export { defineRules } from "../define-rules";
export type { RuleOptions } from "../typegen";

export * from "./common";
export * from "./import";
export * from "./javascript";
export * from "./sort-package";
export * from "./sort-tsconfig";
export * from "./typescript";
export * from "./vue";
