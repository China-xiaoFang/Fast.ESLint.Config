import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigFlatGitignore from "eslint-config-flat-gitignore";

import { GLOBS_LOCKFILES } from "../constants";

/**
 * 默认忽略依赖、构建结果、缓存、生成文件和包管理器锁文件。
 *
 * 不忽略 `src`、`public`、测试夹具或普通 Markdown 文档，避免共享配置静默漏检
 * 应由项目维护的文件。
 */
export const DEFAULT_IGNORE_PATTERNS = Object.freeze([
	"**/node_modules/**",
	"**/{dist,build,coverage,output,temp,tmp}/**",
	"**/{.cache,.nuxt,.output,.vercel,.nitro}/**",
	"**/{.vitepress/cache,.vite-inspect}/**",
	"**/__snapshots__/**",
	"**/*.min.*",
	"**/auto-import?(s).d.ts",
	"**/components.d.ts",
	...GLOBS_LOCKFILES,
]);

/** 创建全局忽略配置，并在默认集合之后追加项目自定义模式。 */
export const createGlobalIgnores = (additionalPatterns: readonly string[] = []) =>
	globalIgnores([...DEFAULT_IGNORE_PATTERNS, ...additionalPatterns], "@fast-china/ignores/global");

/** 读取运行 ESLint 的项目根目录中的 `.gitignore`。 */
export const createGitignoreConfigs = () =>
	defineConfig([
		{
			name: "@fast-china/ignores/git",
			...eslintConfigFlatGitignore({ strict: false }),
		},
	]);
