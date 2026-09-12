/**
 * 原始规则记录的公共入口。
 *
 * 维护规则时必须为每个规则属性保留说明取舍的 TSDoc；新增或调整规则后运行
 * `pnpm run docs:rules` 更新完整规则手册，并同步维护风险指南与对应集成测试。
 * 这些记录可用于高级组合；大多数项目应直接使用 Vue、UniApp 或基础项目配置。
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
export * from "./regexp";
export * from "./sort-package";
export * from "./sort-tsconfig";
export * from "./typescript";
export * from "./vue";
