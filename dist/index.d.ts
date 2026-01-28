import * as eslint_config from 'eslint/config';

/**
 * 公共配置
 * @description 最佳实践
 */
declare const commonConfigs: eslint_config.Config[];

/**
 * 忽略配置
 */
declare const ignoresConfigs: eslint_config.Config[];

/**
 * import配置
 */
declare const importConfigs: eslint_config.Config[];

/**
 * JavaScript配置
 */
declare const javascriptConfigs: eslint_config.Config[];

/**
 * Json配置
 */
declare const jsonConfigs: eslint_config.Config[];

/**
 * markdown配置
 */
declare const markdownConfigs: eslint_config.Config[];

/**
 * prettier配置
 */
declare const prettierConfigs: eslint_config.Config[];

/**
 * regexp配置
 */
declare const regexpConfigs: eslint_config.Config[];

/**
 * package.json 属性排序
 */
declare const packageJsonSortConfigs: eslint_config.Config[];

/**
 * tsconfig.json 属性排序
 */
declare const tsconfigJsonSortConfigs: eslint_config.Config[];

/**
 * TypeScript 核心配置
 */
declare const typescriptCoreConfigs: eslint_config.Config[];
/**
 * TypeScript配置
 */
declare const typescriptConfigs: eslint_config.Config[];

/**
 * vue配置
 */
declare const vueConfigs: eslint_config.Config[];

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
 * .d.ts
 */
declare const CONST_DTS = "**/*.d.ts";
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

/**
 * JavaScript 预置配置
 *
 * @description ignores，common，javascript，import，regexp
 */
declare const PresetJavascriptConfigs: eslint_config.Config[];
/**
 * JSON 预置配置
 */
declare const PresetJsonConfigs: eslint_config.Config[];
/**
 * 基础预置配置
 *
 * @description javascript，typescript，json
 */
declare const PresetBasicConfigs: eslint_config.Config[];
/**
 * 默认最全的配置
 */
declare const _default: eslint_config.Config[];

export { CONST_DIST, CONST_DTS, CONST_JS, CONST_JSON, CONST_JSON5, CONST_JSONC, CONST_JSX, CONST_LOCKFILE, CONST_MD, CONST_NODE_MODULES, CONST_PUBLIC, CONST_TS, CONST_TSCONFIG, CONST_TSX, CONST_VUE, CONST_YAML, PresetBasicConfigs, PresetJavascriptConfigs, PresetJsonConfigs, commonConfigs, _default as default, ignoresConfigs, importConfigs, javascriptConfigs, jsonConfigs, markdownConfigs, packageJsonSortConfigs, prettierConfigs, regexpConfigs, tsconfigJsonSortConfigs, typescriptConfigs, typescriptCoreConfigs, vueConfigs };
