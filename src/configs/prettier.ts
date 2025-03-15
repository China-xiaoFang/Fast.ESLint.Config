import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/**
 * prettier配置
 */
export const prettierConfigs = tseslint.config([
  {
    name: "@fast-china/prettier",
    // 继承某些已有的规则
    extends: [eslintPluginPrettierRecommended],
    plugins: {
      prettier: eslintConfigPrettier as any,
    },
    rules: {
      // 确保 Prettier 错误被 ESLint 捕获
      "prettier/prettier": "error",
    },
  },
]);
