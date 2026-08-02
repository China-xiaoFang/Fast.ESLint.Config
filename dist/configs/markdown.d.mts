//#region src/configs/markdown.d.ts
/**
 * 创建 Markdown 结构与语法检查配置。
 *
 * @remarks
 * 该配置检查 Markdown 文档本身；代码块是否接受额外语言规则由项目覆盖配置决定。
 *
 * @returns 包含 `@eslint/markdown` 推荐预置的 Flat Config 数组。
 */
declare const createMarkdownConfigs: () => import("eslint/config").ConfigObject[];
//#endregion
export { createMarkdownConfigs };
//# sourceMappingURL=markdown.d.mts.map