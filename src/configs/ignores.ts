import { defineConfig } from "eslint/config";
import eslintConfigFlatGitignore from "eslint-config-flat-gitignore";

import { CONST_DIST, CONST_LOCKFILE, CONST_NODE_MODULES } from "../constants";

/**
 * 忽略配置
 */
export const globalIgnoresConfigs = defineConfig([
	{
		name: "@fast-china/ignores/global",
		ignores: [
			CONST_NODE_MODULES,
			CONST_DIST,
			...CONST_LOCKFILE,

			"**/{coverage,output,temp}/**",
			"**/{.nuxt,.output,.vercel,.nitro}/**",
			"**/{.vitepress/cache,.vite-inspect}/**",

			"**/CHANGELOG*.md",
			"**/*.min.*",
			"**/LICENSE*",
			"**/__snapshots__/**",
			"**/auto-import?(s).d.ts",
			"**/components.d.ts",
		],
	},
]);

export const gitignoreConfigs = defineConfig([
	{
		name: "@fast-china/ignores/git",
		...eslintConfigFlatGitignore({ strict: false }),
	},
]);

export const ignoresConfigs = defineConfig([...globalIgnoresConfigs, ...gitignoreConfigs]);
