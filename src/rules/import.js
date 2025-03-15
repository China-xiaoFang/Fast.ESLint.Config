const useLodashUnified = require("./use-lodash-unified");

module.exports = {
  // import

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
        "unknown",
      ],
      pathGroups: [
        {
          pattern: "vue",
          group: "external",
          position: "before",
        },
        {
          pattern: "@vue/**",
          group: "external",
          position: "before",
        },
        {
          pattern: "element-plus",
          group: "external",
          position: "before",
        },
        {
          pattern: "@element-plus/**",
          group: "external",
          position: "before",
        },
        {
          pattern: "fast-element-plus",
          group: "external",
          position: "before",
        },
        {
          pattern: "@fast-china/**",
          group: "external",
          position: "before",
        },
      ],
      pathGroupsExcludedImportTypes: ["type"],
      // 禁止不同组之间进行换行
      "newlines-between": "never",
      //根据字母顺序对每个组内的顺序进行排序
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    },
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

  ...useLodashUnified,
};
