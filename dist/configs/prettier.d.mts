//#region src/configs/prettier.d.ts
/**
 * 创建 Prettier 兼容层。
 *
 * 它只关闭与 Prettier 冲突的 ESLint 格式规则，不会在 ESLint 进程中执行 Prettier。
 * 工厂始终把它放在内置配置之后，使上游预置的格式规则能够被正确覆盖。
 */
declare const createPrettierConfigs: () => import("eslint/config").ConfigObject[];
//#endregion
export { createPrettierConfigs };
//# sourceMappingURL=prettier.d.mts.map