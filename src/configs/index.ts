/**
 * 可独立组合的 Flat Config 片段入口。
 *
 * 根入口不会重复导出这些成员；需要绕过 `fastConfig()` 自行组合时，请使用
 * `@fast-china/eslint-config/configs`。
 */
export * from "./angular";
export * from "./common";
export * from "./environment";
export * from "./ignores";
export * from "./import";
export * from "./javascript";
export * from "./json";
export * from "./lodash";
export * from "./markdown";
export * from "./prettier";
export * from "./react";
export * from "./regexp";
export * from "./sort-package";
export * from "./sort-tsconfig";
export * from "./typescript";
export * from "./vue";
