//#region src/configs/javascript.d.ts
/**
 * 创建 JavaScript/JSX 配置。
 *
 * `@eslint/js` 提供基础正确性规则，本仓库只在其后补充有明确维护理由的规则。
 */
declare const createJavaScriptConfigs: (files?: readonly string[]) => import("eslint/config").ConfigObject[];
//#endregion
export { createJavaScriptConfigs };
//# sourceMappingURL=javascript.d.mts.map