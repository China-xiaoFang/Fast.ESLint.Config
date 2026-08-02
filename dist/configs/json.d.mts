//#region src/configs/json.d.ts
/**
 * 创建 JSON、JSONC 与 JSON5 配置。
 *
 * @remarks
 * 三种方言使用各自的官方推荐预置，避免严格 JSON 规则错误覆盖允许注释或尾随逗号的文件。
 * VS Code 的 `.vscode/settings.json` 仍以 `.json` 结尾，因此额外允许其中出现注释。
 *
 * @returns 按 JSON、JSONC、JSON5 与 VS Code 设置覆盖顺序排列的 Flat Config 数组。
 */
declare const createJsonConfigs: () => import("eslint/config").ConfigObject[];
//#endregion
export { createJsonConfigs };
//# sourceMappingURL=json.d.mts.map