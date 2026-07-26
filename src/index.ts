/**
 * 根入口只暴露稳定的配置工厂、默认值和精确规则类型；内部配置片段与 glob 不再构成
 * 公共 API。需要复用原始规则记录时，请使用 `@fast-china/eslint-config/rules`。
 */
export { defineRules } from "./define-rules";
export { defaultConfigOptions, fastConfig as default, fastConfig } from "./factory";

export type { AngularConfigOptions } from "./configs/angular";
export type { RuntimeEnvironment } from "./configs/environment";
export type { LodashPreference } from "./configs/lodash";
export type { ReactConfigOptions } from "./configs/react";
export type { TypeScriptConfigOptions } from "./configs/typescript";
export type { FastConfigOptions } from "./factory";
export type { RuleOptions } from "./typegen";
