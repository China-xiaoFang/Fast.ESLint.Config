/**
 * JS
 */
export const CONST_JS = "**/*.?([cm])js";

/**
 * JSX
 */
export const CONST_JSX = "**/*.?([cm])jsx";

/**
 * TS
 */
export const CONST_TS = "**/*.?([cm])ts";

/**
 * TSX
 */
export const CONST_TSX = "**/*.?([cm])tsx";

/**
 * .d.ts
 */
export const CONST_DTS = "**/*.d.ts";

/**
 * JSON
 */
export const CONST_JSON = "**/*.json";

/**
 * JSONC
 */
export const CONST_JSONC = "**/*.jsonc";

/**
 * JSON5
 */
export const CONST_JSON5 = "**/*.json5";

/**
 * MD
 */
export const CONST_MD = "**/*.md";

/**
 * VUE
 */
export const CONST_VUE = "**/*.vue";

/**
 * YAML
 */
export const CONST_YAML = "**/*.y?(a)ml";

/**
 * node_modules
 */
export const CONST_NODE_MODULES = "**/node_modules/**";

/**
 * 打包目录 dist
 */
export const CONST_DIST = "**/dist/**";

/**
 * 包管理 lock 文件
 */
export const CONST_LOCKFILE = ["**/package-lock.json", "**/yarn.lock", "**/pnpm-lock.yaml", "**/bun.lock", "**/bun.lockb", "**/deno.lock"];

/**
 * public
 */
export const CONST_PUBLIC = "**/public";

/**
 * TS 配置文件
 */
export const CONST_TSCONFIG = ["**/tsconfig.json", "**/tsconfig.*.json"];

/** JavaScript 文件 */
export const GLOB_JAVASCRIPT = [CONST_JS, CONST_JSX] as const;

/** TypeScript 文件 */
export const GLOB_TYPESCRIPT = [CONST_TS, CONST_TSX] as const;

/** ESLint 可处理的源码文件 */
export const GLOB_CODE = [...GLOB_JAVASCRIPT, ...GLOB_TYPESCRIPT, CONST_VUE] as const;

/** 默认按 Node.js 环境处理的工程文件 */
export const GLOB_NODE = [
	"**/*.{config,setup}.{js,cjs,mjs,ts,cts,mts}",
	"**/{scripts,bin}/**/*.{js,cjs,mjs,ts,cts,mts}",
	"**/{test,tests}/**/*.{js,cjs,mjs,ts,cts,mts}",
	"**/cli.{js,cjs,mjs,ts,cts,mts}",
] as const;
