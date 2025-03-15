import tseslint from "typescript-eslint";
import globals from "globals";
import eslint from "@eslint/js";
import { CONST_JSX } from "../constants";

/**
 * JavaScript配置
 */
export const javascriptConfigs = tseslint.config([
  {
    name: "@fast-china/javascript",
    // 继承某些已有的规则
    extends: [eslint.configs.recommended],
    languageOptions: {
      //  允许使用最新的 ECMAScript 语法特性
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
      },
      parserOptions: {
        // 允许使用 JSX 语法，适用于 Vue 组件中的 JSX 代码。
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
    },
    rules: {
      // JS/TS (http://eslint.cn/docs/rules)

      // 强制使用 camelCase 命名风格
      camelcase: [
        "error",
        {
          // 允许对象属性使用非 camelCase 风格
          properties: "never",
        },
      ],
      // 禁止使用控制台
      "no-console": [
        "warn",
        {
          // 允许除 warn/error 之外的其他 console.xx 方法
          allow: ["warn", "error"],
        },
      ],
      // 禁止使用 debugger
      "no-debugger": "warn",
      // 禁止在条件语句中使用常量条件
      "no-constant-condition": [
        "error",
        {
          // 允许在循环语句中使用常量条件
          checkLoops: false,
        },
      ],
      // 禁止使用某些特定的语法
      "no-restricted-syntax": [
        "error",
        // 禁止使用标记语句（labeled statements）
        "LabeledStatement",
        // 禁止使用 with 语句
        "WithStatement",
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
          allowEmptyCatch: true,
        },
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
          ignoreReadBeforeAssign: true,
        },
      ],
      // 强制使用箭头函数而非普通函数
      "prefer-arrow-callback": [
        "error",
        {
          // 不允许使用命名函数作为回调函数
          allowNamedFunctions: false,
          // 允许在箭头函数中使用 this 绑定的上下文
          allowUnboundThis: true,
        },
      ],
      // 强制使用对象字面量的方法和属性简写语法
      "object-shorthand": [
        "error",
        "always",
        {
          // 不忽略构造函数中的属性简写
          ignoreConstructors: false,
          // 强制避免在属性名中使用引号
          avoidQuotes: true,
        },
      ],
      // 强制使用 rest 参数代替 arguments 对象
      "prefer-rest-params": "error",
      // 强制使用展开运算符（...）代替 Function.prototype.apply
      "prefer-spread": "error",
      // 强制使用模板字面量代替字符串连接
      "prefer-template": "error",
      // 禁止在同一作用域中重新声明变量
      "no-redeclare": "error",
    },
  },
  {
    name: "@fast-china/javascript/jsx",
    files: [CONST_JSX],
    rules: {
      // 关闭 - 禁止使用未声明的变量，除非/*global *\/注释中提到
      "no-undef": "off",
    },
  },
  {
    name: "@fast-china/javascript/md/js",
    files: ["**/*.md/*.js"],
    rules: {
      // 使用使用控制台
      "no-console": "off",
      // 关闭 - 禁用对无法解析的模块导入的检查
      "import/no-unresolved": "off",
    },
  },
  {
    name: "@fast-china/javascript/script",
    files: ["**/scripts/*", "**/cli.*"],
    rules: {
      // 使用使用控制台
      "no-console": "off",
    },
  },
]);
