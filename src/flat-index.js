const eslint = require("@eslint/js");
const eslintConfigPrettier = require("eslint-config-prettier");
const eslintPluginImport = require("eslint-plugin-import");
const eslintPluginJsonc = require("eslint-plugin-jsonc");
const eslintPluginMarkdown = require("eslint-plugin-markdown");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const eslintPluginVue = require("eslint-plugin-vue");
const globals = require("globals");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  {
    // Eslint 会忽略的文件
    ignores: ["**/node_modules", "**/dist"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: { ...globals.browser, ...globals.node },
    },
    // 继承某些已有的规则
    extends: [
      eslint.configs.recommended,
      eslintPluginImport.flatConfigs.recommended,
      ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
      ...eslintPluginMarkdown.configs.recommended,
      ...eslintPluginVue.configs["flat/recommended"],
      tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
      eslintConfigPrettier,
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
  },
  ...require("./files/index"),
  {
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
  }
);
