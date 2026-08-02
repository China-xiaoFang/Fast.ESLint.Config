//#region src/rules/import.d.ts
/** 默认启用的模块导入正确性与排序规则。 */
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