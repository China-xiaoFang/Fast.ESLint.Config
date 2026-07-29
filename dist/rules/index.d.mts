import { t as RuleOptions } from "../typegen.mjs";
//#region src/rules/angular.d.ts
/**
 * Angular TypeScript 推荐规则。
 *
 * Angular ESLint 的拆分插件不直接导出 Flat Config 预置；本记录与 angular-eslint
 * 22.x 的 `tsRecommended` 保持一致，并逐条说明启用理由。
 */
declare const angularRules: {
  "@angular-eslint/contextual-lifecycle": "error";
  "@angular-eslint/no-empty-lifecycle-method": "error";
  "@angular-eslint/no-input-rename": "error";
  "@angular-eslint/no-inputs-metadata-property": "error";
  "@angular-eslint/no-output-native": "error";
  "@angular-eslint/no-output-on-prefix": "error";
  "@angular-eslint/no-output-rename": "error";
  "@angular-eslint/no-outputs-metadata-property": "error";
  "@angular-eslint/prefer-inject": "error";
  "@angular-eslint/prefer-on-push-component-change-detection": "error";
  "@angular-eslint/prefer-standalone": "error";
  "@angular-eslint/use-pipe-transform-interface": "error";
  "@angular-eslint/use-lifecycle-interface": "warn";
};
/** Angular HTML 模板推荐规则，与 angular-eslint 22.x 的 `templateRecommended` 对齐。 */
declare const angularTemplateRules: {
  "@angular-eslint/template/banana-in-box": "error";
  "@angular-eslint/template/eqeqeq": "error";
  "@angular-eslint/template/no-negated-async": "error";
  "@angular-eslint/template/prefer-control-flow": "error";
};
/** Angular 模板无障碍规则；可通过 `angular.templateAccessibility` 整组关闭。 */
declare const angularTemplateAccessibilityRules: {
  "@angular-eslint/template/alt-text": "error";
  "@angular-eslint/template/click-events-have-key-events": "error";
  "@angular-eslint/template/elements-content": "error";
  "@angular-eslint/template/interactive-supports-focus": "error";
  "@angular-eslint/template/label-has-associated-control": "error";
  "@angular-eslint/template/mouse-events-have-key-events": "error";
  "@angular-eslint/template/no-autofocus": "error";
  "@angular-eslint/template/no-distracting-elements": "error";
  "@angular-eslint/template/role-has-required-aria": "error";
  "@angular-eslint/template/table-scope": "error";
  "@angular-eslint/template/valid-aria": "error";
};
//#endregion
//#region src/rules/common.d.ts
/**
 * 跨 JavaScript、TypeScript 与 Vue 脚本生效的公共规则。
 *
 * 维护约定：每条本地覆写都要说明启用原因；可能造成大面积改动、采用成本或
 * 行为变化的规则使用 `[高影响]` 标记，并同步维护 `docs/rules-risk.zh.md`。
 */
declare const commonRules: {
  "array-callback-return": "error";
  "no-alert": "warn";
  "no-case-declarations": "error";
  "no-multi-str": "error";
  "no-with": "error";
  "no-void": ["error", {
    allowAsStatement: true;
  }];
  eqeqeq: ["error", "always", {
    null: "ignore";
  }];
  "prefer-exponentiation-operator": "error";
  "prefer-object-has-own": "error";
  "sort-imports": ["warn", {
    ignoreCase: false;
    ignoreDeclarationSort: true;
    ignoreMemberSort: false;
    memberSyntaxSortOrder: ["none", "all", "multiple", "single"];
    allowSeparatedGroups: false;
  }];
};
//#endregion
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
//#region src/rules/javascript.d.ts
/**
 * JavaScript 本地覆写规则。
 * 高影响规则的解释与关闭方式见 `docs/rules-risk.zh.md`。
 */
declare const javascriptRules: {
  "no-console": ["warn", {
    allow: [string, string];
  }];
  "no-debugger": "error";
  "no-constant-condition": ["error", {
    checkLoops: false;
  }];
  "no-restricted-syntax": ["error", string];
  "no-var": "error";
  "no-empty": ["error", {
    allowEmptyCatch: true;
  }];
  "no-irregular-whitespace": "error";
  "no-use-before-define": ["warn", {
    classes: true;
    functions: false;
    variables: true;
  }];
  "prefer-const": ["warn", {
    destructuring: "all";
    ignoreReadBeforeAssign: true;
  }];
  "prefer-arrow-callback": ["error", {
    allowNamedFunctions: false;
    allowUnboundThis: true;
  }];
  "object-shorthand": ["error", "always", {
    ignoreConstructors: false;
    avoidQuotes: true;
  }];
  "logical-assignment-operators": ["error", "always", {
    enforceForIfStatements: true;
  }];
  "prefer-object-spread": "error";
  "prefer-rest-params": "error";
  "prefer-spread": "error";
  "prefer-template": "error";
  "no-redeclare": "error";
};
//#endregion
//#region src/rules/lodash.d.ts
/**
 * 统一使用 `lodash-unified` 的可选导入策略。
 *
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
//#region src/rules/react.d.ts
/**
 * React 本地覆写规则。
 *
 * `@eslint-react/recommended*` 负责组件、JSX、DOM 与 Web API 正确性，
 * `react-hooks/recommended` 负责 React 官方 Hooks 与 Compiler 诊断。这里关闭两套
 * 预置间的重复诊断，并补充少量明确的 DOM 安全约束。
 */
declare const reactRules: {
  "@eslint-react/error-boundaries": "off";
  "@eslint-react/exhaustive-deps": "off";
  "@eslint-react/purity": "off";
  "@eslint-react/rules-of-hooks": "off";
  "@eslint-react/set-state-in-effect": "off";
  "@eslint-react/set-state-in-render": "off";
  "@eslint-react/static-components": "off";
  "@eslint-react/unsupported-syntax": "off";
  "@eslint-react/use-memo": "off";
  "@eslint-react/dom-no-missing-button-type": "error";
  "@eslint-react/dom-no-missing-iframe-sandbox": "warn";
  "@eslint-react/dom-no-unknown-property": "error";
  "@eslint-react/dom-no-unsafe-target-blank": "error";
};
//#endregion
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
//#region src/rules/sort-tsconfig.d.ts
/**
 * tsconfig.json 属性排序规则。
 *
 * `[高影响][可自动修复]`：仅在 `sortTsconfig: true` 时启用，首次修复会重排大量字段，
 * 但只改变 JSONC 的阅读顺序，不改变 TypeScript 编译选项值。
 */
declare const tsconfigJsonSortRules: {
  "jsonc/no-comments": "off";
  "jsonc/sort-keys": ["error", {
    order: string[];
    pathPattern: string;
  }, {
    order: string[];
    pathPattern: string;
  }];
};
//#endregion
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
//#region src/rules/vue.d.ts
/**
 * Vue SFC 本地覆写规则。
 * 上游 `flat/recommended` 已覆盖基础正确性，这里只记录项目取舍与附加约束。
 */
declare const vueRules: {
  "vue/no-v-html": "warn";
  "vue/require-default-prop": "off";
  "vue/require-explicit-emits": "error";
  "vue/multi-word-component-names": "off";
  "vue/prefer-import-from-vue": "warn";
  "vue/no-dupe-keys": "error";
  "vue/no-mutating-props": "error";
  "vue/no-reserved-component-names": "error";
  "vue/no-v-text-v-html-on-component": "error";
  "vue/custom-event-name-casing": ["error", "camelCase"];
  "vue/one-component-per-file": "off";
  "vue/attributes-order": ["error", {
    order: ("DEFINITION" | "LIST_RENDERING" | "CONDITIONALS" | "RENDER_MODIFIERS" | "GLOBAL" | "UNIQUE" | "OTHER_ATTR" | "EVENTS" | "CONTENT")[];
  }];
};
//#endregion
export { type RuleOptions, angularRules, angularTemplateAccessibilityRules, angularTemplateRules, commonRules, importRules, javascriptRules, packageJsonSortRules, preferLodashRules, preferLodashUnifiedRules, reactRules, tsconfigJsonSortRules, typescriptRules, vueRules };
//# sourceMappingURL=index.d.mts.map