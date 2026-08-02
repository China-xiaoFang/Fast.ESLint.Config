//#region src/configs/sort-package.d.ts
/**
 * 创建 package.json 排序配置。
 *
 * @remarks
 * 该能力会产生较大的可修复 diff，因此必须显式启用；规则不会进入顺序具有
 * 条件导出语义的 `exports` 对象内部。
 *
 * @returns 仅匹配 `package.json` 的字段排序 Flat Config 数组。
 */
declare const createPackageJsonSortConfigs: () => import("eslint/config").ConfigObject[];
//#endregion
export { createPackageJsonSortConfigs };
//# sourceMappingURL=sort-package.d.mts.map