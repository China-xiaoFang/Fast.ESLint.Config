/** JavaScript 与 JSX 文件；扩展名列表与 Node.js ESM/CJS 约定保持一致。 */
export const GLOBS_JAVASCRIPT = ["**/*.{js,cjs,mjs,jsx}"] as const;

/** TypeScript 与 TSX 文件；包含 TypeScript 的 ESM/CJS 专用扩展名。 */
export const GLOBS_TYPESCRIPT = ["**/*.{ts,cts,mts,tsx}"] as const;

/** Vue 3 单文件组件。 */
export const GLOB_VUE = "**/*.vue";

/** ESLint JSON language 支持的三种 JSON 方言。 */
export const GLOB_JSON = "**/*.json";
export const GLOB_JSONC = "**/*.jsonc";
export const GLOB_JSON5 = "**/*.json5";

/** Markdown 文档。 */
export const GLOB_MARKDOWN = "**/*.md";

/** 默认由 JavaScript、TypeScript 和 Vue 规则处理的全部代码文件。 */
export const GLOBS_CODE = [...GLOBS_JAVASCRIPT, ...GLOBS_TYPESCRIPT, GLOB_VUE] as const;

/**
 * 应额外获得 Node.js 全局变量的工程文件。
 *
 * 这些模式还会与当前已启用的 JavaScript/TypeScript 文件模式做 AND 匹配，
 * 因而关闭 TypeScript 后不会意外让 ESLint 接管 `.ts` 文件。
 */
export const GLOBS_NODE_TOOLING = [
	"**/*.{config,setup}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/{scripts,bin}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/{test,tests}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/*.{test,spec}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/cli.{js,cjs,mjs,ts,cts,mts}",
] as const;

/** TypeScript 配置文件；它们使用 JSONC 语法并允许注释。 */
export const GLOBS_TSCONFIG = ["**/tsconfig.json", "**/tsconfig.*.json"] as const;

/** 不应交给 JSON/Markdown 解析器处理的包管理器锁文件。 */
export const GLOBS_LOCKFILES = ["**/package-lock.json", "**/yarn.lock", "**/pnpm-lock.yaml", "**/bun.lock", "**/bun.lockb", "**/deno.lock"] as const;
