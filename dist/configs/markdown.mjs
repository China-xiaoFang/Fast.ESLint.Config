import { GLOB_MARKDOWN } from "../constants/index.mjs";
import { defineConfig } from "eslint/config";
import eslintMarkdown from "@eslint/markdown";
//#region src/configs/markdown.ts
/**
* 创建 Markdown 结构与语法检查配置。
*
* 该配置检查 Markdown 文档本身；代码块是否接受额外语言规则由项目覆盖配置决定。
*/
const createMarkdownConfigs = () => defineConfig([{
	name: "@fast-china/markdown",
	files: [GLOB_MARKDOWN],
	extends: [eslintMarkdown.configs.recommended]
}]);
//#endregion
export { createMarkdownConfigs };

//# sourceMappingURL=markdown.mjs.map