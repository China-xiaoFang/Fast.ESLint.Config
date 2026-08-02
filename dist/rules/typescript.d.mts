//#region src/rules/typescript.d.ts
/**
 * TypeScript 本地覆写规则。
 * 这里补充 typescript-eslint 预置；高影响规则需同步维护风险文档。
 */
declare const typescriptRules: {
  "@typescript-eslint/no-redeclare": "error";
  "@typescript-eslint/no-unused-vars": ["error", {
    args: "after-used";
    argsIgnorePattern: string;
    caughtErrors: "all";
    caughtErrorsIgnorePattern: string;
    ignoreRestSiblings: true;
    varsIgnorePattern: string;
  }];
  "@typescript-eslint/no-namespace": "off";
  "@typescript-eslint/no-explicit-any": "warn";
  "@typescript-eslint/no-require-imports": "error";
  "@typescript-eslint/no-unused-expressions": ["error", {
    allowShortCircuit: true;
    allowTernary: true;
  }];
  "@typescript-eslint/no-inferrable-types": "error";
  "@typescript-eslint/no-non-null-assertion": "warn";
  "@typescript-eslint/no-non-null-asserted-optional-chain": "error";
  "@typescript-eslint/consistent-type-imports": ["error", {
    disallowTypeAnnotations: false;
    fixStyle: "inline-type-imports";
    prefer: "type-imports";
  }];
};
//#endregion
export { typescriptRules };
//# sourceMappingURL=typescript.d.mts.map