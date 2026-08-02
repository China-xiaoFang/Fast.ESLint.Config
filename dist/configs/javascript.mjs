import { GLOBS_JAVASCRIPT } from "../constants/index.mjs";
import { javascriptRules } from "../rules/javascript.mjs";
import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
//#region src/configs/javascript.ts
/**
* 创建 JavaScript/JSX 配置。
*
* @remarks
* `@eslint/js` 提供基础正确性规则，本仓库只在其后补充有明确维护理由的规则。
* 普通 `.jsx` 文件会显式启用 JSX 语法解析，但不会因此自动启用 React 规则。
*
* @param files - 应用 JavaScript 基础规则的 ESLint glob 列表。
* @returns 包含 JavaScript 推荐预置、本地规则与 JSX 解析设置的 Flat Config 数组。
*/
const createJavaScriptConfigs = (files = GLOBS_JAVASCRIPT) => defineConfig([{
	name: "@fast-china/javascript",
	files: [...files],
	extends: [eslint.configs.recommended],
	languageOptions: {
		ecmaVersion: "latest",
		parserOptions: { ecmaFeatures: { jsx: true } }
	},
	rules: javascriptRules
}]);
//#endregion
export { createJavaScriptConfigs };

//# sourceMappingURL=javascript.mjs.map