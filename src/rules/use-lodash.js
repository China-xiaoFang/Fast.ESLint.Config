module.exports = {
  // 强制使用 lodash

  // 限制某些模块导入
  "no-restricted-imports": [
    "error",
    {
      paths: [
        { name: "lodash-es", message: "Use lodash instead." },
        { name: "lodash-unified", message: "Use lodash instead." },
      ],
      patterns: [
        {
          group: ["lodash-es/*", "lodash-unified/*"],
          message: "Use lodash instead.",
        },
      ],
    },
  ],
};
