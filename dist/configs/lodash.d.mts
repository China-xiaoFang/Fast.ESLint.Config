//#region src/configs/lodash.d.ts
/** 项目允许使用的 Lodash 导入来源。 */
type LodashPreference = "lodash" | "lodash-unified";
/**
 * 创建 Lodash 静态导入约束。
 *
 * 该配置使用 ESLint 核心规则，因此不依赖 import-x 开关或额外插件。
 */
declare const createLodashConfigs: (preference: LodashPreference, files?: readonly string[]) => import("eslint/config").ConfigObject[];
//#endregion
export { LodashPreference, createLodashConfigs };
//# sourceMappingURL=lodash.d.mts.map