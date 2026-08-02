//#region src/configs/common.d.ts
/**
 * 创建跨 JavaScript、TypeScript 与 Vue 脚本生效的通用配置。
 *
 * 除公共规则外，这里还把无效的 `eslint-disable` 指令提升为错误，避免规则被移除后
 * 留下长期失效的抑制注释。
 */
declare const createCommonConfigs: (files?: readonly string[]) => import("eslint/config").ConfigObject[];
//#endregion
export { createCommonConfigs };
//# sourceMappingURL=common.d.mts.map