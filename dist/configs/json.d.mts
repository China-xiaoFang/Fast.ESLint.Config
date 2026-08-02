//#region src/configs/json.d.ts
/**
 * 创建 JSON、JSONC 与 JSON5 配置。
 *
 * 三种方言使用各自的官方推荐预置，避免严格 JSON 规则错误覆盖允许注释或尾随逗号的文件。
 */
declare const createJsonConfigs: () => import("eslint/config").ConfigObject[];
//#endregion
export { createJsonConfigs };
//# sourceMappingURL=json.d.mts.map