import { Linter } from 'eslint';

/**
 * 公共规则
 * @description 最佳实践
 */
declare const commonRules: Linter.RulesRecord;

/**
 * 导入使用 lodash-unified 模块规则
 */
declare const importUseLodashUnifiedRules: Linter.RulesRecord;
/**
 * 导入使用 lodash 模块规则
 */
declare const importUseLodashRules: Linter.RulesRecord;
/**
 * import规则
 */
declare const importRules: Linter.RulesRecord;

/**
 * JavaScript规则
 */
declare const javascriptRules: Linter.RulesRecord;

/**
 * package.json 属性排序规则
 */
declare const packageJsonSortRules: Linter.RulesRecord;

/**
 * tsconfig.json 属性排序规则
 */
declare const tsconfigJsonSortRules: Linter.RulesRecord;

/**
 * TypeScript规则
 */
declare const typescriptRules: Linter.RulesRecord;

/**
 * Vue规则
 */
declare const vueRules: Linter.RulesRecord;

export { commonRules, importRules, importUseLodashRules, importUseLodashUnifiedRules, javascriptRules, packageJsonSortRules, tsconfigJsonSortRules, typescriptRules, vueRules };
