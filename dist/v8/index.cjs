"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/constants/index.ts
var constants_exports = {};
__export(constants_exports, {
  CONST_DIST: () => CONST_DIST,
  CONST_DTS: () => CONST_DTS,
  CONST_JS: () => CONST_JS,
  CONST_JSON: () => CONST_JSON,
  CONST_JSON5: () => CONST_JSON5,
  CONST_JSON6: () => CONST_JSON6,
  CONST_JSONC: () => CONST_JSONC,
  CONST_JSX: () => CONST_JSX,
  CONST_LOCKFILE: () => CONST_LOCKFILE,
  CONST_MD: () => CONST_MD,
  CONST_NODE_MODULES: () => CONST_NODE_MODULES,
  CONST_PUBLIC: () => CONST_PUBLIC,
  CONST_TS: () => CONST_TS,
  CONST_TSCONFIG: () => CONST_TSCONFIG,
  CONST_TSX: () => CONST_TSX,
  CONST_VUE: () => CONST_VUE,
  CONST_YAML: () => CONST_YAML
});
var CONST_JS, CONST_JSX, CONST_TS, CONST_TSX, CONST_DTS, CONST_JSON, CONST_JSONC, CONST_JSON5, CONST_JSON6, CONST_MD, CONST_VUE, CONST_YAML, CONST_NODE_MODULES, CONST_DIST, CONST_LOCKFILE, CONST_PUBLIC, CONST_TSCONFIG;
var init_constants = __esm({
  "src/constants/index.ts"() {
    "use strict";
    CONST_JS = "**/*.?([cm])js";
    CONST_JSX = "**/*.?([cm])jsx";
    CONST_TS = "**/*.?([cm])ts";
    CONST_TSX = "**/*.?([cm])tsx";
    CONST_DTS = "**/*.d.ts";
    CONST_JSON = "**/*.json";
    CONST_JSONC = "**/*.jsonc";
    CONST_JSON5 = "**/*.json5";
    CONST_JSON6 = "**/*.json6";
    CONST_MD = "**/*.md";
    CONST_VUE = "**/*.vue";
    CONST_YAML = "**/*.y?(a)ml";
    CONST_NODE_MODULES = "**/node_modules";
    CONST_DIST = "**/dist";
    CONST_LOCKFILE = ["**/package-lock.json", "**/yarn.lock", "**/pnpm-lock.yaml", "**/bun.lockb"];
    CONST_PUBLIC = "**/public";
    CONST_TSCONFIG = ["**/tsconfig.json", "**/tsconfig.*.json"];
  }
});

// src/env/index.ts
var env_exports = {};
__export(env_exports, {
  isVue3: () => isVue3
});
var import_local_pkg, getVueVersion, isVue3;
var init_env = __esm({
  "src/env/index.ts"() {
    "use strict";
    import_local_pkg = require("local-pkg");
    getVueVersion = () => {
      const pkg = (0, import_local_pkg.getPackageInfoSync)("vue", { paths: [process.cwd()] });
      if (pkg && typeof pkg.version === "string" && !Number.isNaN(+pkg.version[0])) {
        return +pkg.version[0];
      }
      return 3;
    };
    isVue3 = getVueVersion() === 3;
  }
});

// src/rules/common.ts
var common_exports = {};
__export(common_exports, {
  commonRules: () => commonRules
});
var commonRules;
var init_common = __esm({
  "src/rules/common.ts"() {
    "use strict";
    commonRules = {
      // 确保数组的回调函数（如 Array.prototype.map、Array.prototype.filter、Array.prototype.reduce 等）总是有一个返回值
      "array-callback-return": "error",
      // 强制使用块级作用域变量（let 或 const），避免使用函数作用域变量（var）
      "block-scoped-var": "error",
      // 禁止使用 alert、confirm 和 prompt 等浏览器弹出对话框
      "no-alert": "warn",
      // 禁止在 switch 语句的 case 或 default 子句中声明变量
      "no-case-declarations": "error",
      // 禁止使用多行字符串，即不允许使用反斜杠 \ 来连接多行字符串
      "no-multi-str": "error",
      // 禁止使用 with 语句
      "no-with": "error",
      // 禁止使用 void 操作符
      "no-void": "error",
      // 禁止多个空行
      "no-multiple-empty-lines": [
        "error",
        {
          // 最多允许1行
          max: 1
        }
      ],
      // import 排序
      "sort-imports": [
        "warn",
        {
          // 不忽略导入语句中模块名的大小写
          ignoreCase: false,
          // 忽略导入声明的排序
          ignoreDeclarationSort: true,
          // 不忽略导入成员的排序
          ignoreMemberSort: false,
          // 成员语法排序顺序
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          // 不允许分组导入
          allowSeparatedGroups: false
        }
      ],
      // 强制在数学运算中使用 ** 运算符代替 Math.pow()
      "prefer-exponentiation-operator": "error"
    };
  }
});

// src/rules/import.ts
var import_exports = {};
__export(import_exports, {
  importRules: () => importRules,
  importUseLodashRules: () => importUseLodashRules,
  importUseLodashUnifiedRules: () => importUseLodashUnifiedRules
});
var importUseLodashUnifiedRules, importUseLodashRules, importRules;
var init_import = __esm({
  "src/rules/import.ts"() {
    "use strict";
    importUseLodashUnifiedRules = {
      // 限制某些模块导入
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "lodash", message: "Use lodash-unified instead." },
            { name: "lodash-es", message: "Use lodash-unified instead." }
          ],
          patterns: [
            {
              group: ["lodash/*", "lodash-es/*"],
              message: "Use lodash-unified instead."
            }
          ]
        }
      ]
    };
    importUseLodashRules = {
      // 限制某些模块导入
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "lodash-es", message: "Use lodash instead." },
            { name: "lodash-unified", message: "Use lodash instead." }
          ],
          patterns: [
            {
              group: ["lodash-es/*", "lodash-unified/*"],
              message: "Use lodash instead."
            }
          ]
        }
      ]
    };
    importRules = {
      // 确保所有的 import 语句位于文件的顶部，紧接在文件的开头部分，且在任何其他代码之前
      "import/first": "error",
      // 禁止在同一文件中出现重复的 import 语句
      "import/no-duplicates": "error",
      // 导入模块排序风格
      "import/order": [
        "error",
        {
          // 导入模块分组
          groups: [
            // Node.js 内置模块
            "builtin",
            // 第三方模块
            "external",
            // 项目内部模块
            "internal",
            // 父级目录中的模块
            "parent",
            // 具有相同父级的模块
            "sibling",
            // 当前目录的 index.js 或 index.ts 文件
            "index",
            "object",
            "type",
            "unknown"
          ],
          pathGroups: [
            {
              pattern: "vue",
              group: "external",
              position: "before"
            },
            {
              pattern: "@vue/**",
              group: "external",
              position: "before"
            },
            {
              pattern: "element-plus",
              group: "external",
              position: "before"
            },
            {
              pattern: "@element-plus/**",
              group: "external",
              position: "before"
            },
            {
              pattern: "fast-element-plus",
              group: "external",
              position: "before"
            },
            {
              pattern: "@fast-element-plus/**",
              group: "external",
              position: "before"
            },
            {
              pattern: "@fast-china/**",
              group: "external",
              position: "before"
            }
          ],
          pathGroupsExcludedImportTypes: ["type"],
          // 禁止不同组之间进行换行
          "newlines-between": "never",
          //根据字母顺序对每个组内的顺序进行排序
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      // 关闭 - 禁用对无法解析的模块导入的检查
      "import/no-unresolved": "off",
      // 关闭 - 禁用对命名空间导入（例如，import * as）的检查
      "import/namespace": "off",
      // 关闭 - 禁用对默认导入的检查
      "import/default": "off",
      // 关闭 - 禁用对以默认导出方式作为命名导入的检查
      "import/no-named-as-default": "off",
      // 关闭 - 禁用对将默认导出成员当作命名导入的检查
      "import/no-named-as-default-member": "off",
      // 关闭 - 禁用对命名导入（即从模块中导入特定命名的内容）的检查
      "import/named": "off"
    };
  }
});

// src/rules/javascript.ts
var javascript_exports = {};
__export(javascript_exports, {
  javascriptRules: () => javascriptRules
});
var javascriptRules;
var init_javascript = __esm({
  "src/rules/javascript.ts"() {
    "use strict";
    javascriptRules = {
      // JS/TS (http://eslint.cn/docs/rules)
      // 强制使用 camelCase 命名风格
      camelcase: [
        "error",
        {
          // 允许对象属性使用非 camelCase 风格
          properties: "never"
        }
      ],
      // 禁止使用控制台
      "no-console": [
        "warn",
        {
          // 允许除 warn/error 之外的其他 console.xx 方法
          allow: ["warn", "error"]
        }
      ],
      // 禁止使用 debugger
      "no-debugger": "warn",
      // 禁止在条件语句中使用常量条件
      "no-constant-condition": [
        "error",
        {
          // 允许在循环语句中使用常量条件
          checkLoops: false
        }
      ],
      // 禁止使用某些特定的语法
      "no-restricted-syntax": [
        "error",
        // 禁止使用标记语句（labeled statements）
        "LabeledStatement",
        // 禁止使用 with 语句
        "WithStatement"
      ],
      // 禁止在 return 语句中使用 await
      "no-return-await": "error",
      // 禁止使用 var 关键字，强制使用 let 或 const
      "no-var": "error",
      // 禁止使用空的块语句
      "no-empty": [
        "error",
        {
          // 允许空的 catch 块
          allowEmptyCatch: true
        }
      ],
      // 该规则禁止使用不规则或不标准的空白字符
      "no-irregular-whitespace": "error",
      // 禁止在函数或变量定义之前使用它们
      "no-use-before-define": "warn",
      // 强制使用 const 声明不被修改的变量
      "prefer-const": [
        "warn",
        {
          // 在解构赋值时也推荐使用 const
          destructuring: "all",
          // 允许在变量首次赋值前读取变量的值
          ignoreReadBeforeAssign: true
        }
      ],
      // 强制使用箭头函数而非普通函数
      "prefer-arrow-callback": [
        "error",
        {
          // 不允许使用命名函数作为回调函数
          allowNamedFunctions: false,
          // 允许在箭头函数中使用 this 绑定的上下文
          allowUnboundThis: true
        }
      ],
      // 强制使用对象字面量的方法和属性简写语法
      "object-shorthand": [
        "error",
        "always",
        {
          // 不忽略构造函数中的属性简写
          ignoreConstructors: false,
          // 强制避免在属性名中使用引号
          avoidQuotes: true
        }
      ],
      // 强制使用 rest 参数代替 arguments 对象
      "prefer-rest-params": "error",
      // 强制使用展开运算符（...）代替 Function.prototype.apply
      "prefer-spread": "error",
      // 强制使用模板字面量代替字符串连接
      "prefer-template": "error",
      // 禁止在同一作用域中重新声明变量
      "no-redeclare": "error"
    };
  }
});

// src/rules/sort-package.ts
var sort_package_exports = {};
__export(sort_package_exports, {
  packageJsonSortRules: () => packageJsonSortRules
});
var packageJsonSortRules;
var init_sort_package = __esm({
  "src/rules/sort-package.ts"() {
    "use strict";
    packageJsonSortRules = {
      "jsonc/sort-array-values": [
        "error",
        {
          order: { type: "asc" },
          pathPattern: "^files$"
        }
      ],
      "jsonc/sort-keys": [
        "error",
        {
          order: [
            "name",
            "version",
            "private",
            "packageManager",
            "description",
            "type",
            "keywords",
            "license",
            "homepage",
            "bugs",
            "repository",
            "author",
            "contributors",
            "funding",
            "files",
            "main",
            "module",
            "types",
            "exports",
            "typesVersions",
            "sideEffects",
            "unpkg",
            "jsdelivr",
            "browser",
            "bin",
            "man",
            "directories",
            "publishConfig",
            "scripts",
            "peerDependencies",
            "peerDependenciesMeta",
            "optionalDependencies",
            "dependencies",
            "devDependencies",
            "engines",
            "config",
            "overrides",
            "pnpm",
            "husky",
            "lint-staged",
            "eslintConfig",
            "prettier"
          ],
          pathPattern: "^$"
        },
        {
          order: { type: "asc" },
          pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$"
        },
        {
          order: ["types", "require", "import", "default"],
          pathPattern: "^exports.*$"
        },
        {
          order: { type: "asc" },
          pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$"
        }
      ]
    };
  }
});

// src/rules/sort-tsconfig.ts
var sort_tsconfig_exports = {};
__export(sort_tsconfig_exports, {
  tsconfigJsonSortRules: () => tsconfigJsonSortRules
});
var tsconfigJsonSortRules;
var init_sort_tsconfig = __esm({
  "src/rules/sort-tsconfig.ts"() {
    "use strict";
    tsconfigJsonSortRules = {
      "jsonc/sort-keys": [
        "error",
        {
          order: ["extends", "compilerOptions", "references", "files", "include", "exclude"],
          pathPattern: "^$"
        },
        {
          order: [
            /* Projects */
            "incremental",
            "composite",
            "tsBuildInfoFile",
            "disableSourceOfProjectReferenceRedirect",
            "disableSolutionSearching",
            "disableReferencedProjectLoad",
            /* Language and Environment */
            "target",
            "jsx",
            "jsxFactory",
            "jsxFragmentFactory",
            "jsxImportSource",
            "lib",
            "moduleDetection",
            "noLib",
            "reactNamespace",
            "useDefineForClassFields",
            "emitDecoratorMetadata",
            "experimentalDecorators",
            /* Modules */
            "baseUrl",
            "rootDir",
            "rootDirs",
            "customConditions",
            "module",
            "moduleResolution",
            "moduleSuffixes",
            "noResolve",
            "paths",
            "resolveJsonModule",
            "resolvePackageJsonExports",
            "resolvePackageJsonImports",
            "typeRoots",
            "types",
            "allowArbitraryExtensions",
            "allowImportingTsExtensions",
            "allowUmdGlobalAccess",
            /* JavaScript Support */
            "allowJs",
            "checkJs",
            "maxNodeModuleJsDepth",
            /* Type Checking */
            "strict",
            "strictBindCallApply",
            "strictFunctionTypes",
            "strictNullChecks",
            "strictPropertyInitialization",
            "allowUnreachableCode",
            "allowUnusedLabels",
            "alwaysStrict",
            "exactOptionalPropertyTypes",
            "noFallthroughCasesInSwitch",
            "noImplicitAny",
            "noImplicitOverride",
            "noImplicitReturns",
            "noImplicitThis",
            "noPropertyAccessFromIndexSignature",
            "noUncheckedIndexedAccess",
            "noUnusedLocals",
            "noUnusedParameters",
            "useUnknownInCatchVariables",
            /* Emit */
            "declaration",
            "declarationDir",
            "declarationMap",
            "downlevelIteration",
            "emitBOM",
            "emitDeclarationOnly",
            "importHelpers",
            "importsNotUsedAsValues",
            "inlineSourceMap",
            "inlineSources",
            "isolatedDeclarations",
            "mapRoot",
            "newLine",
            "noEmit",
            "noEmitHelpers",
            "noEmitOnError",
            "outDir",
            "outFile",
            "preserveConstEnums",
            "preserveValueImports",
            "removeComments",
            "sourceMap",
            "sourceRoot",
            "stripInternal",
            /* Interop Constraints */
            "allowSyntheticDefaultImports",
            "esModuleInterop",
            "forceConsistentCasingInFileNames",
            "isolatedModules",
            "preserveSymlinks",
            "verbatimModuleSyntax",
            /* Completeness */
            "skipDefaultLibCheck",
            "skipLibCheck"
          ],
          pathPattern: "^compilerOptions$"
        }
      ]
    };
  }
});

// src/rules/typescript.ts
var typescript_exports = {};
__export(typescript_exports, {
  typescriptRules: () => typescriptRules
});
var typescriptRules;
var init_typescript = __esm({
  "src/rules/typescript.ts"() {
    "use strict";
    typescriptRules = {
      // TS (https://typescript-eslint.io/rules)
      // 要求在导出函数和类的公共方法上显式声明返回类型
      "@typescript-eslint/explicit-module-boundary-types": "error",
      // 要求在 TypeScript 函数和方法中显式地指定返回类型
      "@typescript-eslint/explicit-function-return-type": "error",
      // 禁止在同一作用域中重新声明 TypeScript 变量
      "@typescript-eslint/no-redeclare": "error",
      // 禁止定义未使用的变量，方法参数排除。
      "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
      // 允许使用自定义TypeScript模块和命名空间
      "@typescript-eslint/no-namespace": "off",
      // 允许使用 any 类型
      "@typescript-eslint/no-explicit-any": "off",
      // 禁止在 TypeScript 文件中使用 require 函数进行模块导入
      "@typescript-eslint/no-var-requires": "error",
      // 禁止定义空函数
      "@typescript-eslint/no-empty-function": ["error", { allow: [] }],
      // 禁止无用的表达式
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          // 允许短路操作符（&& 和 ||）中的无副作用表达式
          allowShortCircuit: true,
          // 允许三元操作符中的无副作用表达式
          allowTernary: true
        }
      ],
      // 禁止在 TypeScript 代码中对类型已经可以被推断的变量或参数进行显式的类型注解
      "@typescript-eslint/no-inferrable-types": "error",
      // 禁止使用后缀运算符的非空断言(!)
      "@typescript-eslint/no-non-null-assertion": "error",
      // 禁止在可选链(?)后使用非空断言(!)
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      // 禁止在代码中使用 @ts-ignore 注释
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": false }],
      // 一致地使用 TypeScript 类型导入
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          // 允许使用类型注解
          disallowTypeAnnotations: false
        }
      ]
    };
  }
});

// src/rules/vue.ts
var vue_exports = {};
__export(vue_exports, {
  vueRules: () => vueRules
});
var vueRules;
var init_vue = __esm({
  "src/rules/vue.ts"() {
    "use strict";
    vueRules = {
      // vue (https://eslint.vuejs.org/rules)
      // 允许使用 v-html
      "vue/no-v-html": "off",
      // 禁用所有 props 必填时，必须提供默认值
      "vue/require-default-prop": "off",
      // 强制组件中必须使用 emits 选项声明事件
      "vue/require-explicit-emits": "error",
      // 禁用组件名称必须是多单词
      "vue/multi-word-component-names": "off",
      // 关闭 - 强制从 vue 中导入 Vue相关 API
      "vue/prefer-import-from-vue": "off",
      // 强制 HTML 属性使用 camelCase 风格
      "vue/attribute-hyphenation": [
        "error",
        "never",
        {
          ignore: [
            // 忽略 Element-Plus 加载文案"element-loading-text"
            "element-loading-text"
          ]
        }
      ],
      // 禁止重复的字段名
      "vue/no-dupe-keys": "error",
      // 禁止直接修改 props 的值
      "vue/no-mutating-props": "error",
      // 禁止使用 Vue.js 内置的保留组件名称（如 transition、keep-alive 等）作为自定义组件名称
      "vue/no-reserved-component-names": "error",
      // 禁止在自定义组件上使用 v-text 或 v-html 指令
      "vue/no-v-text-v-html-on-component": "off",
      // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
      // "vue/script-setup-uses-vars": "error",
      // 强制自定义事件名称使用 camelCase 风格命名
      "vue/custom-event-name-casing": ["error", "camelCase"],
      // 强制每个 Vue 文件中只包含一个 Vue 组件
      "vue/one-component-per-file": "off",
      // 闭合标签换行风格
      "vue/html-closing-bracket-newline": [
        "error",
        {
          // 强制要求当 HTML 元素跨多行时，闭合标签必须出现在新的一行上
          multiline: "always",
          // 强制要求当 HTML 元素只有一行时，闭合标签应与开始标签在同一行上
          singleline: "never"
        }
      ],
      // 强制 Vue 模板中 HTML 元素的属性按照指定的顺序排列
      "vue/attributes-order": [
        "error",
        {
          order: ["DEFINITION", "LIST_RENDERING", "CONDITIONALS", "RENDER_MODIFIERS", "GLOBAL", "UNIQUE", "OTHER_ATTR", "EVENTS", "CONTENT"]
        }
      ]
    };
  }
});

// src/v8/index.cjs
var { defineConfig } = require("eslint-define-config");
var {
  CONST_JS: CONST_JS2,
  CONST_JSX: CONST_JSX2,
  CONST_TS: CONST_TS2,
  CONST_TSX: CONST_TSX2,
  CONST_DTS: CONST_DTS2,
  CONST_TSCONFIG: CONST_TSCONFIG2,
  CONST_VUE: CONST_VUE2,
  CONST_JSON: CONST_JSON2,
  CONST_JSONC: CONST_JSONC2,
  CONST_JSON5: CONST_JSON52,
  CONST_JSON6: CONST_JSON62
} = (init_constants(), __toCommonJS(constants_exports));
var { isVue3: isVue32 } = (init_env(), __toCommonJS(env_exports));
var { commonRules: commonRules2 } = (init_common(), __toCommonJS(common_exports));
var { importRules: importRules2, importUseLodashUnifiedRules: importUseLodashUnifiedRules2 } = (init_import(), __toCommonJS(import_exports));
var { javascriptRules: javascriptRules2 } = (init_javascript(), __toCommonJS(javascript_exports));
var { packageJsonSortRules: packageJsonSortRules2 } = (init_sort_package(), __toCommonJS(sort_package_exports));
var { tsconfigJsonSortRules: tsconfigJsonSortRules2 } = (init_sort_tsconfig(), __toCommonJS(sort_tsconfig_exports));
var { typescriptRules: typescriptRules2 } = (init_typescript(), __toCommonJS(typescript_exports));
var { vueRules: vueRules2 } = (init_vue(), __toCommonJS(vue_exports));
module.exports = defineConfig({
  env: {
    es6: true,
    browser: true,
    node: true
  },
  plugins: ["regexp", "@typescript-eslint", "prettier"],
  // 继承某些已有的规则
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:regexp/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsonc/recommended-with-jsonc",
    isVue32 ? "plugin:vue/recommended" : "plugin:vue/vue2-recommended",
    "plugin:prettier/recommended",
    "plugin:markdown/recommended-legacy"
  ],
  globals: {
    $: "readonly",
    $$: "readonly",
    $computed: "readonly",
    $customRef: "readonly",
    $ref: "readonly",
    $shallowRef: "readonly",
    $toRef: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      // 允许使用 JSX 语法，适用于 Vue 组件中的 JSX 代码。
      jsx: true
    },
    sourceType: "module"
  },
  settings: {
    // 确保 ESLint 和 eslint-plugin-import 能够正确解析项目中的所有相关文件类型
    "import/resolver": {
      node: {
        extensions: [CONST_JS2, CONST_JSX2, CONST_TS2, CONST_TSX2, CONST_DTS2]
      }
    }
  },
  overrides: [
    {
      files: ["**/*.md/*.js"],
      rules: {
        // 使用使用控制台
        "no-console": "off",
        // 关闭 - 禁止使用未声明的变量，除非/*global *\/注释中提到
        "no-undef": "off",
        // 关闭 - 禁用对无法解析的模块导入的检查
        "import/no-unresolved": "off",
        // 关闭 - 禁止在文件中重复导入相同的模块
        "import/no-duplicates": "off"
      }
    },
    {
      files: ["**/scripts/*", "**/cli.*"],
      rules: {
        // 使用使用控制台
        "no-console": "off"
      }
    },
    {
      files: [CONST_TS2, CONST_TSX2],
      parserOptions: {
        ecmaFeatures: {
          // 允许使用 TSX 语法，适用于 Vue 组件中的 TSX 代码。
          tsx: true
        },
        sourceType: "module"
      }
    },
    {
      files: [CONST_DTS2],
      rules: {
        // 关闭 - 一致地使用 TypeScript 类型导入
        "@typescript-eslint/consistent-type-imports": "off"
      }
    },
    {
      files: ["**/*.md/*.ts"],
      rules: {
        // 允许定义未使用的变量
        "@typescript-eslint/no-unused-vars": "off"
      }
    },
    {
      files: [CONST_JSON2, CONST_JSONC2, CONST_JSON52, CONST_JSON62],
      // 允许 ESLint 处理 JSON 文件中的模板和脚本
      parser: "jsonc-eslint-parser"
    },
    {
      files: ["**/package.json"],
      rules: packageJsonSortRules2
    },
    {
      files: CONST_TSCONFIG2,
      rules: tsconfigJsonSortRules2
    },
    {
      files: [CONST_VUE2],
      // 允许 ESLint 处理 Vue 文件中的模板和脚本
      parser: "vue-eslint-parser",
      parserOptions: {
        // 允许在 Vue 文件中的脚本部分使用 TypeScript 语法
        parser: "@typescript-eslint/parser",
        // 指定额外的文件扩展名，告诉解析器 .vue 文件也需要处理
        extraFileExtensions: [".vue"],
        // 允许使用 JSX/TSX 语法，适用于 Vue 组件中的 JSX/TSX 代码。
        ecmaFeatures: {
          jsx: true,
          tsx: true
        },
        sourceType: "module"
      },
      rules: {
        // 关闭 - 禁止使用未声明的变量，以避免在 .vue 文件中出现关于未定义变量的警告，这在 Vue 单文件组件中可能不适用或会导致不必要的警告
        "no-undef": "off",
        // 要求在 TypeScript 函数和方法中显式地指定返回类型
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ],
  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    ...commonRules2,
    ...javascriptRules2,
    ...importRules2,
    ...importUseLodashUnifiedRules2,
    ...typescriptRules2,
    ...vueRules2,
    // 确保 Prettier 错误被 ESLint 捕获
    "prettier/prettier": "error"
  }
});
//# sourceMappingURL=index.cjs.map