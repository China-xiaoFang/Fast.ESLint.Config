import eslintMarkdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";

import { CONST_MD } from "../constants";

/**
 * markdown配置
 */
export const markdownConfigs = defineConfig([
	{
		name: "@fast-china/markdown",
		files: [CONST_MD],
		extends: [eslintMarkdown.configs.recommended],
	},
]);
