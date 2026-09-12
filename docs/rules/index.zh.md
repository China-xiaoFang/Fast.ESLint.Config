<!-- 此文件由 scripts/rules-docs.ts 生成，请勿手工编辑。 -->

# 完整规则手册

本手册从仓库的 Flat Config 工厂计算最终配置，不只枚举本地覆写，还包含 ESLint、typescript-eslint、Vue、Import、RegExp、JSONC、React、Angular 和 Markdown 等第三方预置带入的规则。

- 当前记录 441 条至少在一个配置范围内启用的规则。
- 另记录 33 条由本仓库显式关闭的规则，避免用户误以为仍会报告。
- `error`、`warn` 和关闭范围均来自代表性文件的 `ESLint.calculateConfigForFile()` 结果。
- “自动修复”来自规则 `meta.fixable`；即使支持修复，也应审查最终差异。
- 每条规则都提供经过显式编写的错误与正确代码示例；生成器会拒绝缺失、相同或只有注释的代码块。
- 代码示例保留刻意展示的错误格式，不由 Prettier 自动改写为另一种结构。
- 每个分类先列仓库显式配置的规则，再列第三方预置带入的规则；组内按规则名排序。
- Prettier 兼容层中仅用于关闭冲突、且从未由本仓库启用的规则不计入“使用的规则”。

## 分类

- [ESLint 核心、Import 与 RegExp](./core.zh.md)：123 条
- [TypeScript](./typescript.zh.md)：79 条
- [Vue 3、JSX/TSX 与 UniApp](./vue.zh.md)：109 条
- [JSON、JSONC 与 JSON5](./json.zh.md)：32 条
- [React 与 React Hooks](./react.zh.md)：86 条
- [Angular 与 Angular 模板](./angular.zh.md)：28 条
- [Markdown](./markdown.zh.md)：17 条

## 维护方式

修改规则或升级依赖后运行：

```bash
pnpm run docs:rules
```

CI 使用以下命令检查文档是否与实际配置一致：

```bash
pnpm run docs:rules:check
```
