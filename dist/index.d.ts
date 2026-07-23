import * as eslint_config from 'eslint/config';
export { R as RuleOptions, d as defineRules } from './define-rules-CSwQ8C1q.js';
import 'eslint';

/**
 * 公共配置
 * @description 最佳实践
 */
declare const createCommonConfigs: (files?: readonly string[]) => eslint_config.Config[];
declare const commonConfigs: eslint_config.Config[];

type RuntimeEnvironment = "browser" | "node" | "universal";
/**
 * 创建运行时环境相关的 ESLint 配置。
 *
 * 用于为应用源码配置对应运行环境的全局变量，
 * 同时为 Node.js 工程脚本单独启用 Node.js 全局变量。
 *
 * @param environment 运行时环境，默认为浏览器环境
 * @param files 应用源码匹配规则，默认为所有代码文件
 * @returns ESLint Flat Config 配置数组
 */
declare const createEnvironmentConfigs: (environment?: RuntimeEnvironment, files?: readonly string[]) => eslint_config.Config[];
/**
 * 浏览器应用环境配置。
 *
 * 适用于普通 Vue、React 等浏览器端项目。
 */
declare const browserConfigs: eslint_config.Config[];
/**
 * Node.js 应用环境配置。
 *
 * 适用于 Node.js 服务、CLI 工具等项目。
 */
declare const nodeConfigs: eslint_config.Config[];
/**
 * 通用运行环境配置。
 *
 * 同时启用浏览器和 Node.js 全局变量，
 * 适用于 SSR、同构应用或跨运行时共享代码。
 */
declare const universalConfigs: eslint_config.Config[];

/**
 * 忽略配置
 */
declare const globalIgnoresConfigs: eslint_config.Config[];
declare const gitignoreConfigs: eslint_config.Config[];
declare const ignoresConfigs: eslint_config.Config[];

/**
 * import配置
 */
declare const createImportConfigs: (files?: readonly string[]) => eslint_config.Config[];
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
declare const createRegexpConfigs: (files?: readonly string[]) => eslint_config.Config[];
declare const regexpConfigs: eslint_config.Config[];

/**
 * package.json 属性排序
 */
declare const packageJsonSortConfigs: eslint_config.Config[];

/**
 * tsconfig.json 属性排序
 */
declare const tsconfigJsonSortConfigs: eslint_config.Config[];

interface TypeScriptConfigOptions {
    typeChecked?: boolean;
}
/**
 * TypeScript 核心配置
 */
declare const createTypeScriptCoreConfigs: ({ typeChecked }?: TypeScriptConfigOptions) => eslint_config.Config[];
declare const typescriptCoreConfigs: eslint_config.Config[];
/**
 * TypeScript配置
 */
declare const createTypeScriptConfigs: (options?: TypeScriptConfigOptions) => eslint_config.Config[];
declare const typescriptConfigs: eslint_config.Config[];
declare const typescriptTypeCheckedConfigs: eslint_config.Config[];

interface VueConfigOptions {
    typeChecked?: boolean;
    version?: 2 | 3;
}
/**
 * vue配置
 */
declare const createVueConfigs: ({ typeChecked, version }?: VueConfigOptions) => eslint_config.Config[];
declare const vueConfigs: eslint_config.Config[];
declare const vue2Configs: eslint_config.Config[];
declare const vueTypeCheckedConfigs: eslint_config.Config[];

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
declare const CONST_NODE_MODULES = "**/node_modules/**";
/**
 * 打包目录 dist
 */
declare const CONST_DIST = "**/dist/**";
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
/** JavaScript 文件 */
declare const GLOB_JAVASCRIPT: readonly ["**/*.?([cm])js", "**/*.?([cm])jsx"];
/** TypeScript 文件 */
declare const GLOB_TYPESCRIPT: readonly ["**/*.?([cm])ts", "**/*.?([cm])tsx"];
/** ESLint 可处理的源码文件 */
declare const GLOB_CODE: readonly ["**/*.?([cm])js", "**/*.?([cm])jsx", "**/*.?([cm])ts", "**/*.?([cm])tsx", "**/*.vue"];
/** 默认按 Node.js 环境处理的工程文件 */
declare const GLOB_NODE: readonly ["**/*.{config,setup}.{js,cjs,mjs,ts,cts,mts}", "**/{scripts,bin}/**/*.{js,cjs,mjs,ts,cts,mts}", "**/{test,tests}/**/*.{js,cjs,mjs,ts,cts,mts}", "**/cli.{js,cjs,mjs,ts,cts,mts}"];

interface FastConfigOptions {
    /** 运行时全局变量。Vue/Vite 应用通常使用 browser。 */
    environment?: RuntimeEnvironment;
    /** 是否读取项目根目录的 .gitignore。 */
    gitignore?: boolean;
    /** 额外的全局忽略模式。 */
    ignores?: string[];
    /** 是否启用 import-x 规则。 */
    imports?: boolean;
    /** 是否启用 JSON、JSONC、JSON5 规则及常用清单排序。 */
    json?: boolean;
    /** 是否启用 Markdown 规则。 */
    markdown?: boolean;
    /** 是否在末尾关闭与 Prettier 冲突的格式规则。 */
    prettier?: boolean;
    /** 是否启用正则表达式规则。 */
    regexp?: boolean;
    /** TypeScript 支持；传入对象可开启类型感知规则。 */
    typescript?: boolean | TypeScriptConfigOptions;
    /** Vue 支持；默认 Vue 3，也可显式选择 Vue 2。 */
    vue?: boolean | 2 | 3 | VueConfigOptions;
}
declare const defaultOptions: Readonly<{
    environment: "browser";
    gitignore: true;
    imports: true;
    json: true;
    markdown: true;
    prettier: true;
    regexp: true;
    typescript: true;
    vue: 3;
}>;
/**
 * 创建可组合的 ESLint Flat Config。
 *
 * 返回普通配置数组，可直接展开，也可继续通过 defineConfig 追加项目规则。
 */
declare const createConfig: (options?: FastConfigOptions) => eslint_config.Config[];

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
 * TypeScript 预置配置（不包含 Vue、JSON 和 Markdown）。
 */
declare const PresetTypescriptConfigs: eslint_config.Config[];
declare const PresetTypeScriptConfigs: eslint_config.Config[];
/**
 * 基础预置配置
 *
 * @description javascript，typescript，json
 */
declare const PresetBasicConfigs: eslint_config.Config[];
/**
 * Vue 3 + TypeScript 完整预置配置。
 */
declare const PresetVueConfigs: eslint_config.Config[];

export { CONST_DIST, CONST_DTS, CONST_JS, CONST_JSON, CONST_JSON5, CONST_JSONC, CONST_JSX, CONST_LOCKFILE, CONST_MD, CONST_NODE_MODULES, CONST_PUBLIC, CONST_TS, CONST_TSCONFIG, CONST_TSX, CONST_VUE, CONST_YAML, type FastConfigOptions, GLOB_CODE, GLOB_JAVASCRIPT, GLOB_NODE, GLOB_TYPESCRIPT, PresetBasicConfigs, PresetJavascriptConfigs, PresetJsonConfigs, PresetTypeScriptConfigs, PresetTypescriptConfigs, PresetVueConfigs, type RuntimeEnvironment, type TypeScriptConfigOptions, type VueConfigOptions, browserConfigs, commonConfigs, createCommonConfigs, createConfig, createEnvironmentConfigs, createImportConfigs, createRegexpConfigs, createTypeScriptConfigs, createTypeScriptCoreConfigs, createVueConfigs, PresetVueConfigs as default, defaultOptions, gitignoreConfigs, globalIgnoresConfigs, ignoresConfigs, importConfigs, javascriptConfigs, jsonConfigs, markdownConfigs, nodeConfigs, packageJsonSortConfigs, prettierConfigs, regexpConfigs, tsconfigJsonSortConfigs, typescriptConfigs, typescriptCoreConfigs, typescriptTypeCheckedConfigs, universalConfigs, vue2Configs, vueConfigs, vueTypeCheckedConfigs };
