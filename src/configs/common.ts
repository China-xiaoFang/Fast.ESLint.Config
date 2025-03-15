import tseslint from "typescript-eslint";

/**
 * 公共配置
 * @description 最佳实践
 */
export const commonConfigs = tseslint.config([
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
          max: 1,
        },
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
          allowSeparatedGroups: false,
        },
      ],

      // 强制在数学运算中使用 ** 运算符代替 Math.pow()
      "prefer-exponentiation-operator": "error",
    },
  },
]);
