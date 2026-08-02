//#region src/rules/import.d.ts
/**
 * 默认启用的模块导入正确性与排序规则。
 *
 * @remarks
 * 该记录补充 import-x 推荐预置，统一导入位置、重复导入及分组顺序。依赖项目 resolver
 * 的静态导出分析默认关闭，避免共享配置误判路径别名或自定义模块解析方式。
 */
declare const importRules: {
  "import-x/first": "error";
  "import-x/no-duplicates": "error";
  "import-x/order": ["error", {
    groups: string[];
    "newlines-between": "always";
    alphabetize: {
      order: "asc";
      caseInsensitive: true;
    };
    warnOnUnassignedImports: true;
  }];
  "import-x/no-unresolved": "off";
  "import-x/namespace": "off";
  "import-x/default": "off";
  "import-x/no-named-as-default": "off";
  "import-x/no-named-as-default-member": "off";
  "import-x/named": "off";
};
//#endregion
export { importRules };
//# sourceMappingURL=import.d.mts.map