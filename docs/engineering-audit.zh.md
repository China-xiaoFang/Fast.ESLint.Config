# 工程质量审查报告

审查日期：2026-08-30

审查对象：`@fast-china/eslint-config` 2.1.5 工作区

## 结论

仓库继续使用 ESLint 10 Flat Config、精确规则类型、可重复构建和发布包契约，并将根入口收敛为固定的 Vue 3 + TypeScript + UniApp 配置。SDK、React、Angular、Node.js 等其他项目通过不绑定框架的基础组合和对应框架片段接入，不继承 Vue 或 UniApp globals。

## 当前规则模型

- JavaScript、TypeScript、Import 和 RegExp 只有一套共享规则。
- `@/**` 根别名归入 internal；类型导入位于所有其他非样式导入之后，并在 type 总分组内按来源层级排序。
- 样式导入由独立规则约束为最后一个连续分组，不参与普通 import 字母排序，也不提供自动修复。
- TypeScript、Vue 和 React TypeScript 始终使用 `recommendedTypeChecked` 与 Project Service。
- Vue 使用 `flat/recommended`，并叠加事件声明、kebab-case 属性、闭合标签和排序规则。
- RegExp 使用显式审查过的正确性与安全规则，不继承完整偏好型推荐集合。
- React 使用 `@eslint-react` 推荐预置和 React 官方 Hooks Recommended，并关闭重复实现。
- Angular 与官方 TypeScript、模板和无障碍推荐规则保持一致。
- 规则源码注释只说明当前意图；历史版本差异由更新日志维护。

## 公共 API

根入口公开：

- 默认 Vue 3 + TypeScript + UniApp Flat Config。
- 只接收 `environment` 的 `fastConfig()`。
- `defineRules()`、`FastConfigOptions` 和 `RuleOptions`。

`defaultConfigOptions`、语言和插件布尔开关、`typeChecked`、`tsconfigRootDir`、工厂级 rules/globals/ignores 已删除。项目覆写使用原生后置 Flat Config。

根入口新增固定 `createBaseConfigs()`，供 React、Angular、Node.js 和 SDK 组合。框架、Markdown、Lodash 及其他低层片段仍从 `./configs` 显式引用。

## 工程能力

| 领域          | 状态 | 质量保障                                           |
| ------------- | ---- | -------------------------------------------------- |
| 公共 API      | 通过 | 根入口固定、其他能力由独立子路径组合               |
| JavaScript    | 通过 | 核心 recommended + 统一现代语法规则                |
| TypeScript    | 通过 | 固定 `recommendedTypeChecked` 与 Project Service   |
| Vue 3         | 通过 | `vue-eslint-parser` + `flat/recommended`           |
| UniApp        | 通过 | 默认 `.nvue`、globals、清单注释和 `unpackage` 忽略 |
| React         | 通过 | 显式组合 JSX/TSX、Hooks Recommended 与 DOM 安全    |
| Angular       | 通过 | 显式组合源码、外部/内联模板和无障碍规则            |
| Import        | 通过 | 正确性和排序为 error，副作用导入参与检查           |
| RegExp        | 通过 | 显式正确性、安全和超线性回溯规则                   |
| JSON          | 通过 | 三种方言、VS Code 与 UniApp 注释例外               |
| 清单排序      | 通过 | 默认启用并保留 `exports` 条件顺序                  |
| Markdown      | 通过 | 作为独立片段显式组合                               |
| Node 工具文件 | 通过 | Node globals、console 和 CommonJS 末尾覆写         |
| 类型生成      | 通过 | 插件 schema 生成精确 `RuleOptions`                 |
| 构建发布      | 通过 | TypeScript 6、tsdown、ESM 和根目录 `dist/`         |

## 根入口配置顺序

1. 内置忽略项和 `.gitignore`。
2. 应用运行环境与 Node.js 工程文件 globals。
3. Common、JavaScript、Import、RegExp、TypeScript 与 JSON。
4. `package.json` 和 `tsconfig*.json` 排序。
5. Vue、UniApp globals 与清单适配。
6. Prettier 冲突关闭层。
7. Node.js 工程文件末尾规则覆写。
8. 调用方后置 Flat Config。

## 发布前验证

```sh
pnpm typegen
pnpm check
pnpm pack --dry-run
```

发布归档必须包含根入口和 `./configs`、`./constants`、`./rules` 子入口，不得包含源码缓存或本地依赖目录。CI 只负责验证，不自动发布 npm。

## 剩余风险

- 上游 recommended 会随依赖升级变化，升级 ESLint 或插件后必须检查实际生效配置。
- 类型感知依赖 tsconfig 覆盖和 Project Service，复杂 monorepo 需要维护清晰的项目边界。
- Import、类型导入、Vue 属性和清单排序可能被 `eslint --fix` 修改，需要审查副作用顺序和纯排序差异。
- 根入口默认声明 UniApp 条件编译 globals，不能验证平台分支；普通 Vue 项目如需避免 globals 扩散应改用片段组合。
- `.uvue` 与 `.uts` 仍不在支持范围。
