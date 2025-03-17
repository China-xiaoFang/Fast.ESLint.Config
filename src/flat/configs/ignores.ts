import eslintConfigFlatGitignore from "eslint-config-flat-gitignore";
import tseslint from "typescript-eslint";
import { CONST_DIST, CONST_LOCKFILE, CONST_NODE_MODULES, CONST_PUBLIC } from "../../constants";

/**
 * 忽略配置
 */
export const ignoresConfigs = tseslint.config([
	{
		name: "@fast-china/ignores/global",
		ignores: [
			CONST_NODE_MODULES,
			CONST_DIST,
			CONST_PUBLIC,
			...CONST_LOCKFILE,

			"**/output",
			"**/coverage",
			"**/temp",
			"**/fixtures",
			"**/.vitepress/cache",
			"**/.nuxt",
			"**/.vercel",
			"**/.changeset",
			"**/.idea",
			"**/.output",
			"**/.vite-inspect",
			"**/.nitro",

			"**/CHANGELOG*.md",
			"**/*.min.*",
			"**/LICENSE*",
			"**/__snapshots__",
			"**/auto-import?(s).d.ts",
			"**/components.d.ts",
		],
	},
	{
		name: "@fast-china/ignores/git",
		...eslintConfigFlatGitignore({ strict: false }),
	},
]);
