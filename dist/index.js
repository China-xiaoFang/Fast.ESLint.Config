import { defineConfig } from 'eslint/config';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
import globals from 'globals';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslint from '@eslint/js';
import eslintMarkdown from '@eslint/markdown';
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import eslintPluginRegexp from 'eslint-plugin-regexp';
import tseslint2 from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';
import vueEslintParser from 'vue-eslint-parser';

// src/configs/json.ts

// src/constants/index.ts
var CONST_JS = "**/*.?([cm])js";
var CONST_JSX = "**/*.?([cm])jsx";
var CONST_TS = "**/*.?([cm])ts";
var CONST_TSX = "**/*.?([cm])tsx";
var CONST_DTS = "**/*.d.ts";
var CONST_JSON = "**/*.json";
var CONST_JSONC = "**/*.jsonc";
var CONST_JSON5 = "**/*.json5";
var CONST_MD = "**/*.md";
var CONST_VUE = "**/*.vue";
var CONST_YAML = "**/*.y?(a)ml";
var CONST_NODE_MODULES = "**/node_modules/**";
var CONST_DIST = "**/dist/**";
var CONST_LOCKFILE = ["**/package-lock.json", "**/yarn.lock", "**/pnpm-lock.yaml", "**/bun.lock", "**/bun.lockb", "**/deno.lock"];
var CONST_PUBLIC = "**/public";
var CONST_TSCONFIG = ["**/tsconfig.json", "**/tsconfig.*.json"];
var GLOB_JAVASCRIPT = [CONST_JS, CONST_JSX];
var GLOB_TYPESCRIPT = [CONST_TS, CONST_TSX];
var GLOB_CODE = [...GLOB_JAVASCRIPT, ...GLOB_TYPESCRIPT, CONST_VUE];
var GLOB_NODE = [
  "**/*.{config,setup}.{js,cjs,mjs,ts,cts,mts}",
  "**/{scripts,bin}/**/*.{js,cjs,mjs,ts,cts,mts}",
  "**/{test,tests}/**/*.{js,cjs,mjs,ts,cts,mts}",
  "**/cli.{js,cjs,mjs,ts,cts,mts}"
];

// src/configs/json.ts
var jsonConfigs = defineConfig([
  {
    name: "@fast-china/json/strict",
    files: [CONST_JSON],
    extends: [eslintPluginJsonc.configs["flat/recommended-with-json"]]
  },
  {
    name: "@fast-china/json/jsonc",
    files: [CONST_JSONC],
    extends: [eslintPluginJsonc.configs["flat/recommended-with-jsonc"]]
  },
  {
    name: "@fast-china/json/json5",
    files: [CONST_JSON5],
    extends: [eslintPluginJsonc.configs["flat/recommended-with-json5"]]
  },
  {
    name: "@fast-china/json/settings",
    files: ["**/.vscode/settings.json"],
    rules: {
      // 允许注释
      "jsonc/no-comments": "off"
    }
  }
]);

// src/define-rules.ts
var defineRules = (rules) => rules;

// src/rules/common.ts
var commonRules = {
  // 要求数组回调在所有可到达分支返回值，避免 map/filter 等调用静默产生 undefined。
  "array-callback-return": "error",
  // 浏览器弹窗通常不适合生产代码，但保留为警告以兼容原型开发和已有项目。
  "no-alert": "warn",
  // switch 的 case 不创建词法作用域；要求用花括号包裹声明，避免跨 case 冲突。
  "no-case-declarations": "error",
  // 禁止反斜杠续行字符串，优先使用可读性更好的模板字符串。
  "no-multi-str": "error",
  // with 会让标识符解析不可预测，并且在严格模式和 ESM 中不可用。
  "no-with": "error",
  // 允许用 `void promise` 明确忽略 Promise，但禁止在普通表达式中滥用 void。
  "no-void": [
    "error",
    {
      allowAsStatement: true
    }
  ],
  // 要求严格相等；保留 `value == null` 同时判断 null/undefined 的常用写法。
  eqeqeq: ["error", "always", { null: "ignore" }],
  // 幂运算统一使用 **，减少 Math.pow 嵌套并保持现代语法风格。
  "prefer-exponentiation-operator": "error",
  // 使用 Object.hasOwn，避免对象覆盖或缺少 hasOwnProperty 时产生异常。
  "prefer-object-has-own": "error",
  // [可自动修复] 声明间顺序交给 import-x；这里只排序同一 import 的成员。
  "sort-imports": [
    "warn",
    {
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      allowSeparatedGroups: false
    }
  ]
};

// src/rules/import.ts
var importRules = {
  // import 必须位于其他语句之前，避免模块依赖散落在执行逻辑中。
  "import-x/first": "error",
  // 合并同一模块的重复 import，避免绑定分散或副作用被误读。
  "import-x/no-duplicates": "error",
  // [高影响][可自动修复] 按来源分组并排序；带副作用的裸 import 仅报告，人工移动前必须确认执行顺序。
  "import-x/order": [
    "error",
    {
      groups: [
        // Node.js 内置模块
        "builtin",
        // 第三方依赖
        "external",
        // 项目内部别名模块
        "internal",
        // 父级目录模块
        "parent",
        // 同级目录模块
        "sibling",
        // 当前目录入口模块
        "index",
        // TypeScript import = require() 导入
        "object",
        // TypeScript 类型导入
        "type",
        // 无法识别分类的导入
        "unknown"
      ],
      // 不同 import 分组之间必须保留一个空行
      "newlines-between": "always",
      // 同一分组内按照模块路径字母升序排列
      alphabetize: {
        order: "asc",
        caseInsensitive: true
      },
      // 对没有赋值给变量的副作用导入进行排序检查
      warnOnUnassignedImports: true
    }
  ],
  // [默认关闭] Vite/TypeScript 别名由项目解析器校验，避免共享配置绑定特定 resolver。
  "import-x/no-unresolved": "off",
  // [默认关闭] 未配置 resolver 时，namespace 导出的静态分析容易产生误报。
  "import-x/namespace": "off",
  // [默认关闭] 未配置 resolver 时，默认导出的静态分析容易产生误报。
  "import-x/default": "off",
  // [默认关闭] 不限制同时存在默认导出与相近命名导出的模块 API 风格。
  "import-x/no-named-as-default": "off",
  // [默认关闭] 不限制通过默认导入对象访问同名属性的项目 API 风格。
  "import-x/no-named-as-default-member": "off",
  // [默认关闭] 未配置 resolver 时，命名导出的静态分析容易产生误报。
  "import-x/named": "off"
};

// src/rules/javascript.ts
var javascriptRules = {
  // 控制台调用在应用源码中需要人工确认；warn/error 仍可用于必要的诊断输出。
  "no-console": [
    "warn",
    {
      allow: ["warn", "error"]
    }
  ],
  // 防止调试断点进入发布代码并中断运行。
  "no-debugger": "error",
  // 禁止意外的恒定条件，但允许 while (true) 等有明确退出逻辑的循环。
  "no-constant-condition": [
    "error",
    {
      checkLoops: false
    }
  ],
  // [高影响] 禁止标签语句；迁移包含多层循环 labeled break/continue 的代码时需先重构控制流。
  "no-restricted-syntax": ["error", "LabeledStatement"],
  // [高影响][可自动修复] 使用 let/const 替代 var；首次迁移需复核循环闭包和声明提升行为。
  "no-var": "error",
  // 禁止无说明的空代码块；允许用于“忽略失败”语义的空 catch。
  "no-empty": [
    "error",
    {
      allowEmptyCatch: true
    }
  ],
  // 拒绝肉眼难以识别、可能导致解析差异的非常规空白字符。
  "no-irregular-whitespace": "error",
  // 变量和类先声明后使用；函数声明允许提升。使用 warn 降低旧项目迁移阻力。
  "no-use-before-define": [
    "warn",
    {
      classes: true,
      functions: false,
      variables: true
    }
  ],
  // [可自动修复] 能保持引用不变的变量优先使用 const；读取发生在赋值前时不做不可靠判断。
  "prefer-const": [
    "warn",
    {
      destructuring: "all",
      ignoreReadBeforeAssign: true
    }
  ],
  // [高影响][可自动修复] 优先箭头回调；批量迁移后应复核 this/arguments 与函数名栈信息。
  "prefer-arrow-callback": [
    "error",
    {
      allowNamedFunctions: false,
      allowUnboundThis: true
    }
  ],
  // [可自动修复] 属性和值同名时使用对象简写，带引号键名不强制改写。
  "object-shorthand": [
    "error",
    "always",
    {
      ignoreConstructors: false,
      avoidQuotes: true
    }
  ],
  // [高影响][可自动修复] 使用 ||=、&&=、??=；涉及 getter/Proxy 的代码应复核求值次数。
  "logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
  // [可自动修复] 合并对象时优先展开语法，避免 Object.assign 的额外目标对象样板。
  "prefer-object-spread": "error",
  // 可变参数函数优先 rest 参数，避免依赖类数组 arguments；该规则只报告，不自动改写签名。
  "prefer-rest-params": "error",
  // 调用可迭代对象时优先 spread；该规则只报告，避免自动改变 apply 的 this 语义。
  "prefer-spread": "error",
  // [可自动修复] 字符串拼接优先模板字符串，便于阅读和多段插值。
  "prefer-template": "error",
  // 同一作用域禁止重复声明，避免后声明遮盖前声明。
  "no-redeclare": "error"
};

// src/rules/sort-package.ts
var packageJsonSortRules = {
  // [高影响][可自动修复] npm 的 files 清单按字母排序；数组顺序不改打包集合，但首次 diff 较大。
  "jsonc/sort-array-values": [
    "error",
    {
      order: { type: "asc" },
      pathPattern: "^files$"
    }
  ],
  // [高影响][可自动修复] 仅排序明确安全的 package.json 区域，不进入 exports 条件对象。
  "jsonc/sort-keys": [
    "error",
    // 根字段按常见阅读顺序组织，减少不同项目之间的清单噪声。
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
    // 各类依赖映射按包名排序，方便发现重复或异常依赖。
    {
      order: { type: "asc" },
      pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$"
    },
    // overrides/resolutions 只排序直接键；修改前仍应关注包管理器的模式匹配语义。
    {
      order: { type: "asc" },
      pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$"
    }
  ]
};

// src/rules/sort-tsconfig.ts
var tsconfigJsonSortRules = {
  // tsconfig 是 JSONC，注释用于解释不直观的编译器取舍，必须保留。
  "jsonc/no-comments": "off",
  // [高影响][可自动修复] 只调整顶层和 compilerOptions 的键顺序，不改写任何选项值或数组。
  "jsonc/sort-keys": [
    "error",
    // 顶层按继承、选项、项目引用和文件范围的阅读顺序排列。
    {
      order: ["extends", "compilerOptions", "references", "files", "include", "exclude"],
      pathPattern: "^$"
    },
    // compilerOptions 的顺序跟随 TypeScript 文档主题，便于检索和代码审查。
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

// src/rules/typescript.ts
var typescriptRules = {
  // 使用 TypeScript 版本避免核心规则误判声明合并、类型和值的同名声明。
  "@typescript-eslint/no-redeclare": "error",
  // [高影响][可自动修复] 未使用符号视为错误；以下划线开头可显式表示参数或变量被有意忽略。
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      args: "after-used",
      argsIgnorePattern: "^_",
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      ignoreRestSiblings: true,
      varsIgnorePattern: "^_"
    }
  ],
  // [默认关闭] 声明文件、全局扩展和部分 SDK 仍需要 namespace。
  "@typescript-eslint/no-namespace": "off",
  // any 会绕过类型检查，但在迁移和第三方边界中有合理用途，因此只警告。
  "@typescript-eslint/no-explicit-any": "warn",
  // [高影响] 默认要求 ESM import；CommonJS、动态加载或工具链互操作代码可能需要按文件关闭。
  "@typescript-eslint/no-require-imports": "error",
  // 使用 TS 版本识别类型断言等语法；允许常见的短路和三元表达式调用模式。
  "@typescript-eslint/no-unused-expressions": [
    "error",
    {
      allowShortCircuit: true,
      allowTernary: true
    }
  ],
  // [可自动修复] 删除可由 TypeScript 明确推断的原始值类型标注，减少重复信息。
  "@typescript-eslint/no-inferrable-types": "error",
  // 非空断言可能隐藏空值缺陷；以警告提示逐步消除而不阻断迁移。
  "@typescript-eslint/no-non-null-assertion": "warn",
  // 可选链之后再做非空断言逻辑矛盾，通常表示边界条件设计有误。
  "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
  // [高影响][可自动修复] 类型依赖改用内联 type import；需复核仅靠 import 触发的模块副作用。
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      disallowTypeAnnotations: false,
      fixStyle: "inline-type-imports",
      prefer: "type-imports"
    }
  ]
};

// src/rules/vue.ts
var vueRules = {
  // [安全关注] v-html 可能引入 XSS；保留 warn 以兼容经过净化的富文本场景。
  "vue/no-v-html": "warn",
  // [默认关闭] TypeScript 类型 props 和 required 声明已能表达可选性，不强制每个可选 prop 提供默认值。
  "vue/require-default-prop": "off",
  // [高影响] 组件必须声明对外事件；旧组件迁移时会暴露未建模的公共事件 API。
  "vue/require-explicit-emits": "error",
  // [默认关闭] 允许 App、Layout 等约定俗成的单词组件名。
  "vue/multi-word-component-names": "off",
  // 优先从 vue 入口导入由 Vue 重新导出的 API，避免依赖内部包边界。
  "vue/prefer-import-from-vue": "warn",
  // 防止 props、data、computed、methods 等组件命名空间出现冲突。
  "vue/no-dupe-keys": "error",
  // [高影响] 禁止组件直接修改 props，要求通过事件或本地状态维持单向数据流。
  "vue/no-mutating-props": "error",
  // 避免自定义组件名与 Vue 内置组件冲突。
  "vue/no-reserved-component-names": "error",
  // [安全关注] 禁止在组件节点上使用 v-text/v-html，避免覆盖组件内容和模糊数据边界。
  "vue/no-v-text-v-html-on-component": "error",
  // 统一模板与脚本中的自定义事件名称为 camelCase。
  "vue/custom-event-name-casing": ["error", "camelCase"],
  // [默认关闭] 允许在一个 SFC 中声明仅供当前文件使用的小型辅助组件。
  "vue/one-component-per-file": "off",
  // [高影响][可自动修复] 统一模板属性分组；首次启用可能产生大量仅排序的模板差异。
  "vue/attributes-order": [
    "error",
    {
      order: ["DEFINITION", "LIST_RENDERING", "CONDITIONALS", "RENDER_MODIFIERS", "GLOBAL", "UNIQUE", "OTHER_ATTR", "EVENTS", "CONTENT"]
    }
  ]
};

// src/configs/sort-package.ts
var packageJsonSortConfigs = defineConfig([
  {
    name: "@fast-china/sort/package",
    files: ["**/package.json"],
    rules: packageJsonSortRules
  }
]);
var tsconfigJsonSortConfigs = defineConfig([
  {
    name: "@fast-china/sort/tsconfig",
    files: CONST_TSCONFIG,
    rules: tsconfigJsonSortRules
  }
]);
var createCommonConfigs = (files = GLOB_CODE) => defineConfig([
  {
    name: "@fast-china/common",
    files: [...files],
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    },
    rules: commonRules
  }
]);
var commonConfigs = createCommonConfigs();
var createEnvironmentConfigs = (environment = "browser", files = GLOB_CODE) => {
  const runtimeGlobals = {
    ...environment !== "node" ? globals.browser : {},
    ...environment !== "browser" ? globals.node : {}
  };
  const nodeToolingFiles = GLOB_NODE.flatMap((nodeGlob) => files.map((fileGlob) => [nodeGlob, fileGlob]));
  return defineConfig([
    {
      name: `@fast-china/globals/${environment}`,
      files: [...files],
      languageOptions: {
        globals: runtimeGlobals
      }
    },
    {
      name: "@fast-china/globals/node-tooling",
      files: nodeToolingFiles,
      languageOptions: {
        globals: globals.node
      },
      rules: {
        "no-console": "off"
      }
    }
  ]);
};
var browserConfigs = createEnvironmentConfigs("browser");
var nodeConfigs = createEnvironmentConfigs("node");
var universalConfigs = createEnvironmentConfigs("universal");
var globalIgnoresConfigs = defineConfig([
  {
    name: "@fast-china/ignores/global",
    ignores: [
      CONST_NODE_MODULES,
      CONST_DIST,
      ...CONST_LOCKFILE,
      "**/{coverage,output,temp}/**",
      "**/{.nuxt,.output,.vercel,.nitro}/**",
      "**/{.vitepress/cache,.vite-inspect}/**",
      "**/CHANGELOG*.md",
      "**/*.min.*",
      "**/LICENSE*",
      "**/__snapshots__/**",
      "**/auto-import?(s).d.ts",
      "**/components.d.ts"
    ]
  }
]);
var gitignoreConfigs = defineConfig([
  {
    name: "@fast-china/ignores/git",
    ...eslintConfigFlatGitignore({ strict: false })
  }
]);
var ignoresConfigs = defineConfig([...globalIgnoresConfigs, ...gitignoreConfigs]);
var createImportConfigs = (files = GLOB_CODE) => defineConfig([
  {
    name: "@fast-china/import",
    files: [...files],
    extends: [eslintPluginImportX.flatConfigs.recommended],
    rules: importRules
  }
]);
var importConfigs = createImportConfigs();
var javascriptConfigs = defineConfig([
  {
    name: "@fast-china/javascript",
    files: [...GLOB_JAVASCRIPT],
    // 继承某些已有的规则
    extends: [eslint.configs.recommended],
    languageOptions: {
      // 允许使用最新的 ECMAScript 语法特性
      ecmaVersion: "latest",
      parserOptions: {
        ecmaFeatures: {
          // 允许在 JavaScript 文件中使用 JSX。
          jsx: true
        }
      }
    },
    rules: javascriptRules
  }
]);
var markdownConfigs = defineConfig([
  {
    name: "@fast-china/markdown",
    files: [CONST_MD],
    extends: [eslintMarkdown.configs.recommended]
  }
]);
var prettierConfigs = defineConfig([
  {
    ...eslintConfigPrettierFlat,
    name: "@fast-china/prettier"
  }
]);
var createRegexpConfigs = (files = GLOB_CODE) => defineConfig([
  {
    name: "@fast-china/regexp",
    files: [...files],
    extends: [eslintPluginRegexp.configs["flat/recommended"]]
  }
]);
var regexpConfigs = createRegexpConfigs();
var createTypeScriptCoreConfigs = ({ typeChecked = false } = {}) => defineConfig([
  {
    name: typeChecked ? "@fast-china/typescript/type-checked" : "@fast-china/typescript",
    files: [...GLOB_TYPESCRIPT],
    extends: [
      ...typeChecked ? tseslint2.configs.recommendedTypeChecked : tseslint2.configs.recommended,
      ...typeChecked ? tseslint2.configs.stylisticTypeChecked : tseslint2.configs.stylistic
    ],
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: {
        ...typeChecked ? { projectService: true } : {}
      }
    },
    rules: typescriptRules
  }
]);
var typescriptCoreConfigs = createTypeScriptCoreConfigs();
var createTypeScriptConfigs = (options = {}) => defineConfig([
  ...createTypeScriptCoreConfigs(options),
  {
    name: "@fast-china/typescript/declarations",
    files: [CONST_DTS],
    rules: {
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
]);
var typescriptConfigs = createTypeScriptConfigs();
var typescriptTypeCheckedConfigs = createTypeScriptConfigs({ typeChecked: true });
var withoutFileScope = (config) => {
  const { files: _files, ...unscopedConfig } = config;
  return unscopedConfig;
};
var createVueConfigs = ({ typeChecked = false, version = 3 } = {}) => {
  const typeScriptConfigs = [
    ...typeChecked ? tseslint2.configs.recommendedTypeChecked : tseslint2.configs.recommended,
    ...typeChecked ? tseslint2.configs.stylisticTypeChecked : tseslint2.configs.stylistic
  ].map((config) => withoutFileScope(config));
  const vueRecommendedConfigs = version === 3 ? eslintPluginVue.configs["flat/recommended"] : eslintPluginVue.configs["flat/vue2-recommended"];
  return defineConfig([
    {
      name: version === 3 ? "@fast-china/vue3" : "@fast-china/vue2",
      files: [CONST_VUE],
      extends: [eslint.configs.recommended, ...typeScriptConfigs, ...vueRecommendedConfigs],
      languageOptions: {
        ecmaVersion: "latest",
        parser: vueEslintParser,
        parserOptions: {
          parser: tseslint2.parser,
          extraFileExtensions: [".vue"],
          ecmaFeatures: {
            jsx: true
          },
          sourceType: "module",
          ...typeChecked ? { projectService: true } : {}
        }
      },
      rules: {
        ...typescriptRules,
        ...vueRules
      }
    }
  ]);
};
var vueConfigs = createVueConfigs();
var vue2Configs = createVueConfigs({ version: 2 });
var vueTypeCheckedConfigs = createVueConfigs({ typeChecked: true });

// src/factory.ts
var defaultOptions = Object.freeze({
  environment: "browser",
  gitignore: true,
  imports: true,
  json: true,
  markdown: true,
  prettier: true,
  regexp: true,
  typescript: true,
  vue: 3
});
var createConfig = (options = {}) => {
  const resolvedOptions = { ...defaultOptions, ...options };
  const typeScriptEnabled = resolvedOptions.typescript !== false;
  const typeScriptOptions = typeof resolvedOptions.typescript === "object" ? resolvedOptions.typescript : {};
  const vueEnabled = resolvedOptions.vue !== false;
  let vueOptions = {
    typeChecked: typeScriptOptions.typeChecked,
    version: 3
  };
  if (typeof resolvedOptions.vue === "number") {
    vueOptions = { ...vueOptions, version: resolvedOptions.vue };
  } else if (typeof resolvedOptions.vue === "object") {
    vueOptions = { ...vueOptions, ...resolvedOptions.vue };
  }
  const codeFiles = [...GLOB_JAVASCRIPT, ...typeScriptEnabled ? GLOB_TYPESCRIPT : [], ...vueEnabled ? [CONST_VUE] : []];
  return defineConfig([
    ...globalIgnoresConfigs,
    ...resolvedOptions.gitignore ? gitignoreConfigs : [],
    ...resolvedOptions.ignores?.length ? [
      {
        name: "@fast-china/ignores/custom",
        ignores: resolvedOptions.ignores
      }
    ] : [],
    ...createEnvironmentConfigs(resolvedOptions.environment, codeFiles),
    ...createCommonConfigs(codeFiles),
    ...javascriptConfigs,
    ...resolvedOptions.imports ? createImportConfigs(codeFiles) : [],
    ...resolvedOptions.regexp ? createRegexpConfigs(codeFiles) : [],
    ...typeScriptEnabled ? createTypeScriptConfigs(typeScriptOptions) : [],
    ...resolvedOptions.json ? [...jsonConfigs, ...packageJsonSortConfigs, ...tsconfigJsonSortConfigs] : [],
    ...vueEnabled ? createVueConfigs(vueOptions) : [],
    ...resolvedOptions.markdown ? markdownConfigs : [],
    ...resolvedOptions.prettier ? prettierConfigs : []
  ]);
};

// src/index.ts
var PresetJavascriptConfigs = createConfig({
  json: false,
  markdown: false,
  typescript: false,
  vue: false
});
var PresetJsonConfigs = [...jsonConfigs, ...packageJsonSortConfigs, ...tsconfigJsonSortConfigs];
var PresetTypescriptConfigs = createConfig({
  json: false,
  markdown: false,
  vue: false
});
var PresetTypeScriptConfigs = PresetTypescriptConfigs;
var PresetBasicConfigs = createConfig({ markdown: false, vue: false });
var PresetVueConfigs = createConfig();
var src_default = PresetVueConfigs;

export { CONST_DIST, CONST_DTS, CONST_JS, CONST_JSON, CONST_JSON5, CONST_JSONC, CONST_JSX, CONST_LOCKFILE, CONST_MD, CONST_NODE_MODULES, CONST_PUBLIC, CONST_TS, CONST_TSCONFIG, CONST_TSX, CONST_VUE, CONST_YAML, GLOB_CODE, GLOB_JAVASCRIPT, GLOB_NODE, GLOB_TYPESCRIPT, PresetBasicConfigs, PresetJavascriptConfigs, PresetJsonConfigs, PresetTypeScriptConfigs, PresetTypescriptConfigs, PresetVueConfigs, browserConfigs, commonConfigs, createCommonConfigs, createConfig, createEnvironmentConfigs, createImportConfigs, createRegexpConfigs, createTypeScriptConfigs, createTypeScriptCoreConfigs, createVueConfigs, src_default as default, defaultOptions, defineRules, gitignoreConfigs, globalIgnoresConfigs, ignoresConfigs, importConfigs, javascriptConfigs, jsonConfigs, markdownConfigs, nodeConfigs, packageJsonSortConfigs, prettierConfigs, regexpConfigs, tsconfigJsonSortConfigs, typescriptConfigs, typescriptCoreConfigs, typescriptTypeCheckedConfigs, universalConfigs, vue2Configs, vueConfigs, vueTypeCheckedConfigs };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map