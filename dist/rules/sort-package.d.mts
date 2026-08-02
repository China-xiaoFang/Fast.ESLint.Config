//#region src/rules/sort-package.d.ts
/**
 * package.json 属性排序规则。
 *
 * `[高影响][可自动修复]`：仅在 `sortPackageJson: true` 时启用，首次修复可能重排大量字段。
 * 注意：这里故意不排序 `exports` 内部键；条件导出的键顺序具有模块解析语义。
 */
declare const packageJsonSortRules: {
  "jsonc/sort-array-values": ["error", {
    order: {
      type: "asc";
    };
    pathPattern: string;
  }];
  "jsonc/sort-keys": ["error", {
    order: string[];
    pathPattern: string;
  }, {
    order: {
      type: "asc";
    };
    pathPattern: string;
  }, {
    order: {
      type: "asc";
    };
    pathPattern: string;
  }];
};
//#endregion
export { packageJsonSortRules };
//# sourceMappingURL=sort-package.d.mts.map