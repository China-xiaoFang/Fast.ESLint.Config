// @ts-nocheck
import tseslint from "typescript-eslint";
import eslintPluginMarkdown from "eslint-plugin-markdown";
import { CONST_MD } from "../constants";

/**
 * markdown配置
 */
export const markdownConfigs = tseslint.config([
	{
		name: "@fast-china/markdown",
		files: [CONST_MD],
		rules: {},
	},
	...eslintPluginMarkdown.configs.recommended.map((config) => ({
		...config,
		name: `@fast-china/${config.name || "markdown/anonymous"}`,
	})),
]);
