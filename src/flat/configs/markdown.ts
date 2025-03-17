// @ts-ignore
import eslintPluginMarkdown from "eslint-plugin-markdown";
import tseslint from "typescript-eslint";
import { CONST_MD } from "../../constants";

/**
 * markdown配置
 */
export const markdownConfigs = tseslint.config([
	{
		name: "@fast-china/markdown",
		files: [CONST_MD],
	},
	...eslintPluginMarkdown.configs.recommended.map((config: { name: string }) => ({
		...config,
		name: `@fast-china/${config.name || "markdown/anonymous"}`,
	})),
]);
