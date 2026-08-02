import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "../constants/index.mjs";
import { defineConfig } from "eslint/config";
import eslintPluginJsonc from "eslint-plugin-jsonc";
//#region src/configs/json.ts
/**
* 创建 JSON、JSONC 与 JSON5 配置。
*
* 三种方言使用各自的官方推荐预置，避免严格 JSON 规则错误覆盖允许注释或尾随逗号的文件。
*/
const createJsonConfigs = () => defineConfig([
	{
		name: "@fast-china/json/json",
		files: [GLOB_JSON],
		extends: [eslintPluginJsonc.configs["flat/recommended-with-json"]]
	},
	{
		name: "@fast-china/json/jsonc",
		files: [GLOB_JSONC],
		extends: [eslintPluginJsonc.configs["flat/recommended-with-jsonc"]]
	},
	{
		name: "@fast-china/json/json5",
		files: [GLOB_JSON5],
		extends: [eslintPluginJsonc.configs["flat/recommended-with-json5"]]
	},
	{
		name: "@fast-china/json/vscode-settings",
		files: ["**/.vscode/settings.json"],
		rules: { "jsonc/no-comments": "off" }
	}
]);
//#endregion
export { createJsonConfigs };

//# sourceMappingURL=json.mjs.map