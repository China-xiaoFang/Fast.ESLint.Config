const { defineConfig } = require("eslint-define-config");

// @see: http://eslint.cn
module.exports = defineConfig({
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  // 继承某些已有的规则
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:jsonc/recommended-with-jsonc",
    "plugin:markdown/recommended-legacy",
    "plugin:vue/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: {
    // 确保 ESLint 和 eslint-plugin-import 能够正确解析项目中的所有相关文件类型
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".mjs",
          ".cjs",
          ".jsx",
          ".ts",
          ".mts",
          ".d.ts",
          ".tsx",
        ],
      },
    },
  },
  overrides: [...require("./files/index")],
  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    ...require("./rules/javascript"),

    ...require("./rules/typescript"),

    ...require("./rules/best"),

    ...require("./rules/vue"),

    ...require("./rules/import"),

    ...require("./rules/use-lodash-unified"),
  },
});
