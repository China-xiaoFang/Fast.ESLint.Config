//#region src/configs/sort-tsconfig.d.ts
/**
 * 创建 tsconfig.json 排序配置。
 *
 * @remarks
 * 排序只改变字段阅读顺序，不改变编译选项值；由于首次修复 diff 较大，默认关闭。
 *
 * @returns 匹配 `tsconfig.json` 与 `tsconfig.*.json` 的字段排序 Flat Config 数组。
 */
declare const createTsconfigSortConfigs: () => import("eslint/config").ConfigObject[];
//#endregion
export { createTsconfigSortConfigs };
//# sourceMappingURL=sort-tsconfig.d.mts.map