/**
 * 根入口只暴露稳定的配置工厂、默认值和精确规则类型；内部配置片段与 glob 不再构成
 * 公共 API。需要复用原始规则记录时，请使用 `@fast-china/eslint-config/rules`。
 */
import type { RuleOptions } from "./typegen";
import type { Linter } from "eslint";

type RejectUnknownRuleNames<Rules extends RuleOptions> = Rules & Record<Exclude<keyof Rules, keyof RuleOptions>, never>;

/**
 * 为项目规则提供精确的规则名、严重级别和规则选项自动补全。
 *
 * 该函数不会修改传入对象；它只在 TypeScript 编译阶段拒绝未知规则和无效选项。
 */
export const defineRules = <const Rules extends RuleOptions>(rules: RejectUnknownRuleNames<Rules>): Rules & Linter.RulesRecord => rules;

export { defaultConfigOptions, fastConfig as default, fastConfig } from "./core";

export type { AngularConfigOptions } from "./configs/angular";
export type { RuntimeEnvironment } from "./configs/environment";
export type { LodashPreference } from "./configs/lodash";
export type { ReactConfigOptions } from "./configs/react";
export type { TypeScriptConfigOptions } from "./configs/typescript";
export type { FastConfigOptions } from "./core";
export type { RuleOptions } from "./typegen";
