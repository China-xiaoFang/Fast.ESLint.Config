export { R as RuleOptions, d as defineRules } from '../define-rules-CSwQ8C1q.js';
import 'eslint';

/**
 * 跨 JavaScript、TypeScript 与 Vue 脚本生效的公共规则。
 *
 * 维护约定：每条本地覆写都要说明启用原因；可能造成大面积改动、迁移阻断或
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

/**
 * 按需启用：要求项目统一使用 lodash-unified。
 * 该组织偏好不会被默认配置加载，使用者需从 `@fast-china/eslint-config/rules` 显式导入。
 */
declare const importUseLodashUnifiedRules: {
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
 * 按需启用：要求项目统一使用 lodash。
 * 该组织偏好不会被默认配置加载，使用者需从 rules 子路径显式导入。
 */
declare const importUseLodashRules: {
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

/**
 * package.json 属性排序规则。
 *
 * `[高影响][可自动修复]`：默认随 `json: true` 启用，首次修复可能重排大量字段。
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

/**
 * tsconfig.json 属性排序规则。
 *
 * `[高影响][可自动修复]`：默认随 `json: true` 启用，首次修复会重排大量字段，
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

export { commonRules, importRules, importUseLodashRules, importUseLodashUnifiedRules, javascriptRules, packageJsonSortRules, tsconfigJsonSortRules, typescriptRules, vueRules };
