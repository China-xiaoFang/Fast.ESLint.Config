import type { RuleOptions } from "./typegen";
import type { Linter } from "eslint";

type RejectUnknownRuleNames<Rules extends RuleOptions> = Rules & Record<Exclude<keyof Rules, keyof RuleOptions>, never>;

/**
 * 为项目规则提供精确的规则名、严重级别和规则选项自动补全。
 *
 * 该函数不会修改传入对象；它只在 TypeScript 编译阶段拒绝未知规则和无效选项。
 */
export const defineRules = <const Rules extends RuleOptions>(rules: RejectUnknownRuleNames<Rules>): Rules & Linter.RulesRecord => rules;

export type { RuleOptions } from "./typegen";
