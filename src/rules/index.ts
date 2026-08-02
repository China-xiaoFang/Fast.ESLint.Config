/**
 * 原始规则记录的公共入口。
 *
 * 维护规则时必须保留“为什么启用”的源码注释；标记为 `[高影响]` 的默认规则还需
 * 同步更新 `docs/rules-risk.zh.md`、`docs/rules-risk.md` 与对应集成测试。
 * 这些记录可用于高级组合，但推荐大多数项目通过根入口的 `fastConfig()` 使用。
 *
 * @packageDocumentation
 */
export type { RuleOptions } from "../typegen";

export * from "./angular";
export * from "./common";
export * from "./import";
export * from "./javascript";
export * from "./lodash";
export * from "./react";
export * from "./sort-package";
export * from "./sort-tsconfig";
export * from "./typescript";
export * from "./vue";
