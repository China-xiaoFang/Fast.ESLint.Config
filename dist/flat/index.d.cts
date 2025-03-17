import * as _typescript_eslint_utils_dist_ts_eslint from '@typescript-eslint/utils/dist/ts-eslint';
import { Linter } from 'eslint';

/**
 * 公共配置
 * @description 最佳实践
 */
declare const commonConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * 忽略配置
 */
declare const ignoresConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * 导入使用 lodash-unified 模块规则
 */
declare const importUseLodashUnifiedRules: Linter.RulesRecord;
/**
 * 导入使用 lodash 模块规则
 */
declare const importUseLodashRules: Linter.RulesRecord;
/**
 * import配置
 */
declare const importConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * JavaScript配置
 */
declare const javascriptConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * Json配置
 */
declare const jsonConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * markdown配置
 */
declare const markdownConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * prettier配置
 */
declare const prettierConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * regexp配置
 */
declare const regexpConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * package.json 属性排序
 */
declare const packageJsonSortConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * tsconfig.json 属性排序
 */
declare const tsconfigJsonSortConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * TypeScript 核心配置
 */
declare const typescriptCoreConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;
/**
 * TypeScript配置
 */
declare const typescriptConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * vue配置
 */
declare const vueConfigs: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.ConfigArray;

/**
 * JS
 */
declare const CONST_JS = "**/*.?([cm])js";
/**
 * JSX
 */
declare const CONST_JSX = "**/*.?([cm])jsx";
/**
 * TS
 */
declare const CONST_TS = "**/*.?([cm])ts";
/**
 * TSX
 */
declare const CONST_TSX = "**/*.?([cm])tsx";
/**
 * JSON
 */
declare const CONST_JSON = "**/*.json";
/**
 * JSONC
 */
declare const CONST_JSONC = "**/*.jsonc";
/**
 * JSON5
 */
declare const CONST_JSON5 = "**/*.json5";
/**
 * JSON6
 */
declare const CONST_JSON6 = "**/*.json6";
/**
 * MD
 */
declare const CONST_MD = "**/*.md";
/**
 * VUE
 */
declare const CONST_VUE = "**/*.vue";
/**
 * YAML
 */
declare const CONST_YAML = "**/*.y?(a)ml";
/**
 * node_modules
 */
declare const CONST_NODE_MODULES = "**/node_modules";
/**
 * 打包目录 dist
 */
declare const CONST_DIST = "**/dist";
/**
 * 包管理 lock 文件
 */
declare const CONST_LOCKFILE: string[];
/**
 * public
 */
declare const CONST_PUBLIC = "**/public";
/**
 * TS 配置文件
 */
declare const CONST_TSCONFIG: string[];

declare const _default: _typescript_eslint_utils_dist_ts_eslint.FlatConfig.Config[];

export { CONST_DIST, CONST_JS, CONST_JSON, CONST_JSON5, CONST_JSON6, CONST_JSONC, CONST_JSX, CONST_LOCKFILE, CONST_MD, CONST_NODE_MODULES, CONST_PUBLIC, CONST_TS, CONST_TSCONFIG, CONST_TSX, CONST_VUE, CONST_YAML, commonConfigs, _default as default, ignoresConfigs, importConfigs, importUseLodashRules, importUseLodashUnifiedRules, javascriptConfigs, jsonConfigs, markdownConfigs, packageJsonSortConfigs, prettierConfigs, regexpConfigs, tsconfigJsonSortConfigs, typescriptConfigs, typescriptCoreConfigs, vueConfigs };
