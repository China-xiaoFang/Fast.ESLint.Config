import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";

import { GLOBS_JAVASCRIPT } from "../constants";
import { javascriptRules } from "../rules";

/**
 * 创建 JavaScript/JSX 配置。
 *
 * `@eslint/js` 提供基础正确性规则，本仓库只在其后补充有明确维护理由的规则。
 */
export const createJavaScriptConfigs = (files: readonly string[] = GLOBS_JAVASCRIPT) =>
	defineConfig([
		{
			name: "@fast-china/javascript",
			files: [...files],
			extends: [eslint.configs.recommended],
			languageOptions: {
				ecmaVersion: "latest",
				parserOptions: {
					ecmaFeatures: {
						// 普通 `.jsx` 文件需要显式开启 JSX 语法解析。
						jsx: true,
					},
				},
			},
			rules: javascriptRules,
		},
	]);
