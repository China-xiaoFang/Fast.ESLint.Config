//#region src/rules/lodash.d.ts
/**
 * 统一使用 `lodash-unified` 的可选导入策略。
 *
 * @remarks
 * 该规则只约束静态 import/export 的模块来源，不会安装依赖，也不会检查动态
 * `import()` 或 CommonJS `require()`。选择此策略的项目应自行安装 `lodash-unified`。
 */
declare const preferLodashUnifiedRules: {
  "no-restricted-imports": ["error", {
    paths: {
      name: string;
      message: string;
    }[];
    patterns: {
      group: string[];
      message: string;
    }[];
  }];
};
/**
 * 统一使用 `lodash` 的可选导入策略。
 *
 * @remarks
 * 根入口和 `lodash/*` 子路径都允许使用；规则只负责避免与 `lodash-es` 或
 * `lodash-unified` 混用，不替项目决定整包导入或按方法导入。
 */
declare const preferLodashRules: {
  "no-restricted-imports": ["error", {
    paths: {
      name: string;
      message: string;
    }[];
    patterns: {
      group: string[];
      message: string;
    }[];
  }];
};
//#endregion
export { preferLodashRules, preferLodashUnifiedRules };
//# sourceMappingURL=lodash.d.mts.map