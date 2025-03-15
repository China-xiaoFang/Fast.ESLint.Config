module.exports = {
  // 强制使用 lodash-unified

  // 限制某些模块导入
  "no-restricted-imports": [
    "error",
    {
      paths: [
        { name: "lodash", message: "Use lodash-unified instead." },
        { name: "lodash-es", message: "Use lodash-unified instead." },
      ],
      patterns: [
        {
          group: ["lodash/*", "lodash-es/*"],
          message: "Use lodash-unified instead.",
        },
      ],
    },
  ],
};
