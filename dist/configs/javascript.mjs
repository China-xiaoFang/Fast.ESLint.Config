import { GLOBS_JAVASCRIPT } from "../constants/index.mjs";
import { javascriptRules } from "../rules/javascript.mjs";
import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
//#region src/configs/javascript.ts
/**
* 创建 JavaScript/JSX 配置。
*
* `@eslint/js` 提供基础正确性规则，本仓库只在其后补充有明确维护理由的规则。
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