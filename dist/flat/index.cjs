"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/flat/index.ts
var index_exports = {};
__export(index_exports, {
  CONST_DIST: () => CONST_DIST,
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
  CONST_YAML: () => CONST_YAML,
  commonConfigs: () => commonConfigs,
  default: () => index_default,
  hasVue: () => hasVue,
  ignoresConfigs: () => ignoresConfigs,
  importConfigs: () => importConfigs,
  importUseLodashRules: () => importUseLodashRules,
  importUseLodashUnifiedRules: () => importUseLodashUnifiedRules,
  isVue3: () => isVue3,
  javascriptConfigs: () => javascriptConfigs,
  jsonConfigs: () => jsonConfigs,
  markdownConfigs: () => markdownConfigs,
  packageJsonSortConfigs: () => packageJsonSortConfigs,
  prettierConfigs: () => prettierConfigs,
  regexpConfigs: () => regexpConfigs,
  tsconfigJsonSortConfigs: () => tsconfigJsonSortConfigs,
  typescriptConfigs: () => typescriptConfigs,
  typescriptCoreConfigs: () => typescriptCoreConfigs,
  vueConfigs: () => vueConfigs
});
module.exports = __toCommonJS(index_exports);

// src/configs/common.ts
var import_typescript_eslint = __toESM(require("typescript-eslint"), 1);
var commonConfigs = import_typescript_eslint.default.config([
  {
    name: "@fast-china/common",
    rules: {
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
    }
  }
]);

// src/configs/ignores.ts
var import_typescript_eslint2 = __toESM(require("typescript-eslint"), 1);

// src/constants/index.ts
var CONST_JS = "**/*.?([cm])js";
var CONST_JSX = "**/*.?([cm])jsx";
var CONST_TS = "**/*.?([cm])ts";
var CONST_TSX = "**/*.?([cm])tsx";
var CONST_JSON = "**/*.json";
var CONST_JSONC = "**/*.jsonc";
var CONST_JSON5 = "**/*.json5";
var CONST_JSON6 = "**/*.json6";
var CONST_MD = "**/*.md";
var CONST_VUE = "**/*.vue";
var CONST_YAML = "**/*.y?(a)ml";
var CONST_NODE_MODULES = "**/node_modules";
var CONST_DIST = "**/dist";
var CONST_LOCKFILE = [
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb"
];
var CONST_PUBLIC = "**/public";
var CONST_TSCONFIG = ["**/tsconfig.json", "**/tsconfig.*.json"];

// src/configs/ignores.ts
var import_eslint_config_flat_gitignore = __toESM(require("eslint-config-flat-gitignore"), 1);
var ignoresConfigs = import_typescript_eslint2.default.config([
  {
    name: "@fast-china/ignores/global",
    ignores: [
      CONST_NODE_MODULES,
      CONST_DIST,
      CONST_PUBLIC,
      ...CONST_LOCKFILE,
      "**/output",
      "**/coverage",
      "**/temp",
      "**/fixtures",
      "**/.vitepress/cache",
      "**/.nuxt",
      "**/.vercel",
      "**/.changeset",
      "**/.idea",
      "**/.output",
      "**/.vite-inspect",
      "**/.nitro",
      "**/CHANGELOG*.md",
      "**/*.min.*",
      "**/LICENSE*",
      "**/__snapshots__",
      "**/auto-import?(s).d.ts",
      "**/components.d.ts"
    ]
  },
  {
    name: "@fast-china/ignores/git",
    ...(0, import_eslint_config_flat_gitignore.default)({ strict: false })
  }
]);

// src/configs/import.ts
var import_typescript_eslint3 = __toESM(require("typescript-eslint"), 1);
var import_eslint_plugin_import = __toESM(require("eslint-plugin-import"), 1);
var importUseLodashUnifiedRules = {
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
var importUseLodashRules = {
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
var importConfigs = import_typescript_eslint3.default.config([
  {
    name: "@fast-china/import",
    // 继承某些已有的规则
    extends: [import_eslint_plugin_import.default.flatConfigs.recommended],
    settings: {
      // 确保 ESLint 和 eslint-plugin-import 能够正确解析项目中的所有相关文件类型
      "import/resolver": {
        node: {
          extensions: [CONST_JS, CONST_JSX, CONST_TS, CONST_TSX, ".d.ts"]
        }
      }
    },
    rules: {
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
      "import/named": "off",
      ...importUseLodashUnifiedRules
    }
  }
]);

// src/configs/javascript.ts
var import_typescript_eslint4 = __toESM(require("typescript-eslint"), 1);
var import_globals = __toESM(require("globals"), 1);
var import_js = __toESM(require("@eslint/js"), 1);
var javascriptConfigs = import_typescript_eslint4.default.config([
  {
    name: "@fast-china/javascript",
    // 继承某些已有的规则
    extends: [import_js.default.configs.recommended],
    languageOptions: {
      //  允许使用最新的 ECMAScript 语法特性
      ecmaVersion: "latest",
      globals: {
        ...import_globals.default.browser,
        ...import_globals.default.es2022,
        ...import_globals.default.node
      },
      parserOptions: {
        // 允许使用 JSX 语法，适用于 Vue 组件中的 JSX 代码。
        ecmaFeatures: {
          jsx: true
        },
        sourceType: "module"
      }
    },
    rules: {
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
    }
  },
  {
    name: "@fast-china/javascript/jsx",
    files: [CONST_JSX],
    rules: {
      // 关闭 - 禁止使用未声明的变量，除非/*global *\/注释中提到
      "no-undef": "off"
    }
  },
  {
    name: "@fast-china/javascript/md/js",
    files: ["**/*.md/*.js"],
    rules: {
      // 使用使用控制台
      "no-console": "off",
      // 关闭 - 禁用对无法解析的模块导入的检查
      "import/no-unresolved": "off"
    }
  },
  {
    name: "@fast-china/javascript/script",
    files: ["**/scripts/*", "**/cli.*"],
    rules: {
      // 使用使用控制台
      "no-console": "off"
    }
  }
]);

// src/configs/json.ts
var import_typescript_eslint5 = __toESM(require("typescript-eslint"), 1);
var import_eslint_plugin_jsonc = __toESM(require("eslint-plugin-jsonc"), 1);
var import_jsonc_eslint_parser = __toESM(require("jsonc-eslint-parser"), 1);
var jsonConfigs = import_typescript_eslint5.default.config([
  {
    name: "@fast-china/json",
    files: [CONST_JSON, CONST_JSONC, CONST_JSON5, CONST_JSON6],
    // 继承某些已有的规则
    extends: [...import_eslint_plugin_jsonc.default.configs["flat/recommended-with-jsonc"]],
    languageOptions: {
      parser: import_jsonc_eslint_parser.default
    },
    plugins: {
      jsonc: import_eslint_plugin_jsonc.default
    },
    rules: {}
  }
]);

// src/configs/markdown.ts
var import_typescript_eslint6 = __toESM(require("typescript-eslint"), 1);
var import_eslint_plugin_markdown = __toESM(require("eslint-plugin-markdown"), 1);
var markdownConfigs = import_typescript_eslint6.default.config([
  {
    name: "@fast-china/markdown",
    files: [CONST_MD],
    rules: {}
  },
  ...import_eslint_plugin_markdown.default.configs.recommended.map((config) => ({
    ...config,
    name: `@fast-china/${config.name || "markdown/anonymous"}`
  }))
]);

// src/configs/prettier.ts
var import_typescript_eslint7 = __toESM(require("typescript-eslint"), 1);
var import_eslint_config_prettier = __toESM(require("eslint-config-prettier"), 1);
var import_recommended = __toESM(require("eslint-plugin-prettier/recommended"), 1);
var prettierConfigs = import_typescript_eslint7.default.config([
  {
    name: "@fast-china/prettier",
    // 继承某些已有的规则
    extends: [import_recommended.default],
    plugins: {
      prettier: import_eslint_config_prettier.default
    },
    rules: {
      // 确保 Prettier 错误被 ESLint 捕获
      "prettier/prettier": "error"
    }
  }
]);

// src/configs/regexp.ts
var import_typescript_eslint8 = __toESM(require("typescript-eslint"), 1);
var import_eslint_plugin_regexp = __toESM(require("eslint-plugin-regexp"), 1);
var regexpConfigs = import_typescript_eslint8.default.config([
  {
    name: "@fast-china/regexp",
    ...import_eslint_plugin_regexp.default.configs["flat/recommended"]
  }
]);

// src/configs/sort-package.ts
var import_typescript_eslint9 = __toESM(require("typescript-eslint"), 1);
var packageJsonSortConfigs = import_typescript_eslint9.default.config([
  {
    name: "@fast-china/sort/package",
    files: ["**/package.json"],
    rules: {
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
    }
  }
]);

// src/configs/sort-tsconfig.ts
var import_typescript_eslint10 = __toESM(require("typescript-eslint"), 1);
var tsconfigJsonSortConfigs = import_typescript_eslint10.default.config([
  {
    name: "@fast-china/sort/tsconfig",
    files: [CONST_TSCONFIG],
    rules: {
      "jsonc/sort-keys": [
        "error",
        {
          order: [
            "extends",
            "compilerOptions",
            "references",
            "files",
            "include",
            "exclude"
          ],
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
    }
  }
]);

// src/configs/typescript.ts
var import_typescript_eslint11 = __toESM(require("typescript-eslint"), 1);
var typescriptCoreConfigs = import_typescript_eslint11.default.config([
  {
    name: "@fast-china/typescript",
    files: [CONST_TS, CONST_TSX],
    // 继承某些已有的规则
    extends: [import_typescript_eslint11.default.configs.recommended],
    languageOptions: {
      //  允许使用最新的 ECMAScript 语法特性
      ecmaVersion: "latest",
      parser: import_typescript_eslint11.default.parser,
      parserOptions: {
        // 允许使用 TSX 语法，适用于 Vue 组件中的 TSX 代码。
        ecmaFeatures: {
          tsx: true
        },
        sourceType: "module"
      }
    },
    rules: {
      // TS (https://typescript-eslint.io/rules)
      // 要求在导出函数和类的公共方法上显式声明返回类型
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // 要求在 TypeScript 函数和方法中显式地指定返回类型
      "@typescript-eslint/explicit-function-return-type": "error",
      // 禁止在同一作用域中重新声明 TypeScript 变量
      "@typescript-eslint/no-redeclare": "error",
      // 允许定义未使用的变量
      "@typescript-eslint/no-unused-vars": "off",
      // 允许使用自定义TypeScript模块和命名空间
      "@typescript-eslint/no-namespace": "off",
      // 允许使用 any 类型
      "@typescript-eslint/no-explicit-any": "off",
      // 禁止在 TypeScript 文件中使用 require 函数进行模块导入
      "@typescript-eslint/no-var-requires": "error",
      // 禁止定义空函数
      "@typescript-eslint/no-empty-function": "error",
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
    }
  }
]);
var typescriptConfigs = import_typescript_eslint11.default.config([
  ...typescriptCoreConfigs,
  {
    name: "@fast-china/typescript/dts",
    files: ["**/*.d.ts"],
    rules: {
      // 关闭 - 禁止在文件中重复导入相同的模块
      "import/no-duplicates": "off",
      // 关闭 - 一致地使用 TypeScript 类型导入
      "@typescript-eslint/consistent-type-imports": "off"
    }
  },
  {
    name: "@fast-china/typescript/tsx",
    files: [CONST_TSX],
    rules: {
      // 关闭 - 要求在 TypeScript 函数和方法中显式地指定返回类型
      // "@typescript-eslint/explicit-function-return-type": "off",
    }
  },
  {
    name: "@fast-china/typescript/cjs",
    files: [CONST_JS],
    rules: {
      // 关闭 - 不允许使用 require 语句
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off"
    }
  },
  {
    name: "@fast-china/typescript/md/js",
    files: ["**/*.md/*.ts"],
    rules: {
      // 允许定义未使用的变量
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
]);

// src/configs/vue.ts
var import_typescript_eslint12 = __toESM(require("typescript-eslint"), 1);
var import_eslint_plugin_vue = __toESM(require("eslint-plugin-vue"), 1);
var import_vue_eslint_parser = __toESM(require("vue-eslint-parser"), 1);

// src/env/index.ts
var import_node_process = __toESM(require("process"), 1);
var import_local_pkg = require("local-pkg");
var import_local_pkg2 = require("local-pkg");
var getVueVersion = () => {
  const pkg = (0, import_local_pkg.getPackageInfoSync)("vue", { paths: [import_node_process.default.cwd()] });
  if (pkg && typeof pkg.version === "string" && !Number.isNaN(+pkg.version[0])) {
    return +pkg.version[0];
  }
  return 3;
};
var hasVue = (0, import_local_pkg2.isPackageExists)("vue") || (0, import_local_pkg2.isPackageExists)("nuxt");
var isVue3 = getVueVersion() === 3;

// src/configs/vue.ts
var vueConfigs = import_typescript_eslint12.default.config([
  {
    name: "@fast-china/vue",
    files: [CONST_VUE],
    // 继承某些已有的规则
    extends: [
      ...isVue3 ? import_eslint_plugin_vue.default.configs["flat/recommended"] : import_eslint_plugin_vue.default.configs["flat/vue2-recommended"]
    ],
    languageOptions: {
      parser: import_vue_eslint_parser.default,
      parserOptions: {
        // 允许在 Vue 文件中的脚本部分使用 TypeScript 语法
        parser: "@typescript-eslint/parser",
        // 指定额外的文件扩展名，告诉解析器 .vue 文件也需要处理
        extraFileExtensions: [".vue"],
        //  允许使用最新的 ECMAScript 语法特性
        ecmaVersion: "latest",
        // 允许使用 JSX/TSX 语法，适用于 Vue 组件中的 JSX/TSX 代码。
        ecmaFeatures: {
          jsx: true,
          tsx: true
        },
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": import_typescript_eslint12.default.plugin,
      vue: import_vue_eslint_parser.default
    },
    processor: import_eslint_plugin_vue.default.processors[".vue"],
    rules: {
      // vue (https://eslint.vuejs.org/rules)
      // 关闭 - 禁止使用未声明的变量，以避免在 .vue 文件中出现关于未定义变量的警告，这在 Vue 单文件组件中可能不适用或会导致不必要的警告
      "no-undef": "off",
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
        "always",
        {
          ignore: [
            // 忽略 Element-Plus 加载文案"element-loading-text"
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
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            "UNIQUE",
            "OTHER_ATTR",
            "EVENTS",
            "CONTENT"
          ]
        }
      ]
    }
  },
  {
    name: "@fast-china/vue/ts",
    files: [CONST_VUE],
    // 继承某些已有的规则
    extends: [...typescriptCoreConfigs]
  },
  {
    name: "@fast-china/reactivity",
    languageOptions: {
      globals: {
        $: "readonly",
        $$: "readonly",
        $computed: "readonly",
        $customRef: "readonly",
        $ref: "readonly",
        $shallowRef: "readonly",
        $toRef: "readonly"
      }
    },
    plugins: {
      vue: import_eslint_plugin_vue.default
    }
  }
]);

// src/flat/index.ts
var index_default = [
  ...ignoresConfigs,
  ...commonConfigs,
  ...regexpConfigs,
  ...javascriptConfigs,
  ...typescriptConfigs,
  ...importConfigs,
  ...prettierConfigs,
  ...packageJsonSortConfigs,
  ...tsconfigJsonSortConfigs,
  ...vueConfigs,
  ...jsonConfigs,
  ...markdownConfigs
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CONST_DIST,
  CONST_JS,
  CONST_JSON,
  CONST_JSON5,
  CONST_JSON6,
  CONST_JSONC,
  CONST_JSX,
  CONST_LOCKFILE,
  CONST_MD,
  CONST_NODE_MODULES,
  CONST_PUBLIC,
  CONST_TS,
  CONST_TSCONFIG,
  CONST_TSX,
  CONST_VUE,
  CONST_YAML,
  commonConfigs,
  hasVue,
  ignoresConfigs,
  importConfigs,
  importUseLodashRules,
  importUseLodashUnifiedRules,
  isVue3,
  javascriptConfigs,
  jsonConfigs,
  markdownConfigs,
  packageJsonSortConfigs,
  prettierConfigs,
  regexpConfigs,
  tsconfigJsonSortConfigs,
  typescriptConfigs,
  typescriptCoreConfigs,
  vueConfigs
});
//# sourceMappingURL=index.cjs.map