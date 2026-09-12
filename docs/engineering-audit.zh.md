# 工程质量审查报告

审查日期：2026-09-12

审查对象：`@fast-china/eslint-config` 2.1.7 工作区

## 结论

当前配置已从“固定 Vue + UniApp 根预置”调整为根入口的两个独立具名完整配置，并将规则基线收敛到社区通用写法、简洁性和高置信度问题。普通 Vue 项目不再继承 UniApp globals、`.nvue` 解析、清单适配或 `unpackage` 忽略。

TypeScript 不再叠加完整 strict/stylistic 类型预置，而是在 `recommendedTypeChecked` 之上明确选择高价值规则。`.ts`/`.tsx` 导出边界继续按 SDK 公共 API 严格检查，内部实现则使用类型推断。

## 公共入口

- 根入口：命名导出 `vueConfig`、`uniAppConfig`、三个项目工厂、`defineRules()`、`ProjectConfigOptions` 和 `RuleOptions`，不提供默认导出或框架子入口。
- `./configs`：React、Angular、Markdown、Lodash、清单排序及低层配置片段；完整配置默认包含清单排序。
- `./constants`、`./rules`：glob/globals 和原始规则记录。

本轮不保留旧 `fastConfig()`、根默认导出或 `FastConfigOptions` 兼容层。

## 当前规则模型

- JavaScript、TypeScript、Import 和 RegExp 只有一套共享规则，SDK 与应用项目不设严格度档位。
- 完全空的 `catch` 被允许；其他空块继续报错。
- `no-void` 和 `require-await` 保持错误：不使用 `void` 规避检查，也不保留没有 `await`、会改变函数语义的 `async`。
- `camelcase: ["error", { properties: "never" }]` 保持错误，兼顾代码命名与外部协议字段。
- TypeScript 模块导出边界要求显式类型，内部函数返回类型不强制标注。
- `no-non-null-assertion` 和 `no-unnecessary-condition` 关闭，避免破坏标准断言和运行时防御。
- Import 位置、重复导入、成员顺序和声明顺序均为错误；保留常用 pathGroups，样式文件单独保持在最后。
- Vue 使用官方 `flat/recommended`，显式 emits、kebab-case、props 只读、关键正确性规则和属性顺序为错误，`v-html` 风险为警告。
- `package.json` 和 `tsconfig*.json` 排序保持为所有完整配置的基础能力。

## 工程能力

| 领域          | 状态 | 质量保障                                              |
| ------------- | ---- | ----------------------------------------------------- |
| 公共 API      | 通过 | 根入口具名导出独立 Vue、UniApp 配置和工厂             |
| JavaScript    | 通过 | recommended + 精选正确性和可读性规则                  |
| TypeScript    | 通过 | `recommendedTypeChecked` + Project Service + 边界规则 |
| Vue 3         | 通过 | `.vue` 独立 parser 扩展，不注入 UniApp                |
| UniApp        | 通过 | `.vue`/`.nvue`、globals、清单注释和独立忽略项         |
| Import        | 通过 | 正确性、成员/声明顺序和样式末尾均为 error             |
| React/Angular | 通过 | 从框架无关基础配置显式组合                            |
| JSON/RegExp   | 通过 | 方言解析与高置信度正确性、安全规则                    |
| 清单排序      | 通过 | 默认启用并保留 `exports` 条件顺序                     |
| 类型生成      | 通过 | 插件 schema 生成精确 `RuleOptions`                    |
| 构建发布      | 通过 | ESM、声明文件、根入口具名配置和根目录 `dist/`         |

## 配置顺序

完整配置按以下顺序组合：

1. 全局忽略项和 `.gitignore`。
2. 应用运行环境与 Node.js 工程文件 globals。
3. Common、JavaScript、Import、RegExp、TypeScript 与 JSON。
4. `package.json` 与 `tsconfig*.json` 排序。
5. Vue 或 Vue + UniApp 的独立框架层。
6. Prettier 冲突关闭层。
7. Node.js 工程文件末尾覆写。
8. 调用方后置 Flat Config。

## 发布前验证

```sh
pnpm typegen
pnpm check
pnpm pack --dry-run
```

发布归档必须包含根入口、`./configs`、`./constants` 和 `./rules`，不得包含源码缓存或本地依赖目录。CI 只负责验证，不自动发布 npm。

## 剩余风险

- 上游 recommended 会随依赖升级变化，升级 ESLint 或插件后必须检查最终生效配置。
- 类型感知依赖 tsconfig 覆盖和 Project Service，复杂 monorepo 需要维护清晰的项目边界。
- `explicit-module-boundary-types` 会要求应用项目中的 `.ts`/`.tsx` 导出也按 SDK 公共接口显式标注，这是本项目有意选择的统一边界。
- ESLint 无法验证 UniApp 条件编译对象是否处于正确平台分支。
- `.uvue` 与 `.uts` 仍不在支持范围。
