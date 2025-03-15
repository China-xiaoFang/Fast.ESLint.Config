module.exports = [
  {
    files: ["*.ts", "*.vue", "*.tsx"],
    rules: {
      // 关闭 - 禁止使用未声明的变量，除非/*global *\/注释中提到
      "no-undef": "off",
    },
  },
  {
    files: ["*.d.ts"],
    rules: {
      // 关闭 - 禁止在文件中重复导入相同的模块
      "import/no-duplicates": "off",
      // 关闭 - 一致地使用 TypeScript 类型导入
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },
  {
    files: ["*.js"],
    rules: {
      // 关闭 - 不允许使用 require 语句
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["*.cjs"],
    rules: {
      // 关闭 - 不允许使用 require 语句
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["*.tsx"],
    rules: {
      // 关闭 - 要求在 TypeScript 函数和方法中显式地指定返回类型
      // "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
  {
    files: ["**/*.md/*.js", "**/*.md/*.ts"],
    rules: {
      // 使用使用控制台
      "no-console": "off",
      // 关闭 - 禁用对无法解析的模块导入的检查
      "import/no-unresolved": "off",
      // 允许定义未使用的变量
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["*.json", "*.json5", "*.jsonc"],
    // 允许 ESLint 处理 JSON 文件中的模板和脚本
    parser: "jsonc-eslint-parser",
  },
  {
    files: ["*.vue"],
    // 允许 ESLint 处理 Vue 文件中的模板和脚本
    parser: "vue-eslint-parser",
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
        tsx: true,
      },
    },
    rules: {
      // 关闭 - 禁止使用未声明的变量，以避免在 .vue 文件中出现关于未定义变量的警告，这在 Vue 单文件组件中可能不适用或会导致不必要的警告
      "no-undef": "off",
    },
  },
];
