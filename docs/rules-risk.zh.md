# 默认规则与风险指南

本文说明 2.1.2 当前配置模型、主要规则和迁移风险。规则源码注释只解释现行意图；历史差异统一记录在 `CHANGELOG.md`。

## 配置模型

SDK、OA、Admin、Vue Web 与 UniApp 客户端共享同一套 JavaScript、TypeScript、Import 和 RegExp 规则，不提供严格度档位。

根入口固定面向 Vue 3 + TypeScript + UniApp：

- `environment: "browser"`
- `.gitignore`
- JavaScript、类型感知 TypeScript
- Vue 3、`.nvue`、UniApp globals 与清单适配
- Import、RegExp、JSON/JSONC/JSON5
- `package.json` 和 `tsconfig*.json` 排序
- Prettier 冲突关闭层
- Node.js 工程文件 globals 与末尾规则覆写

`fastConfig()` 只保留 `environment`。React、Angular、Markdown 和 Lodash 通过 `./configs` 子路径组合；规则、globals、ignores 和解析器特殊设置使用后置 Flat Config。

## 预置来源

| 领域       | 预置或实现                                                              |
| ---------- | ----------------------------------------------------------------------- |
| JavaScript | `@eslint/js` recommended + 本地规则                                     |
| TypeScript | typescript-eslint `recommendedTypeChecked` + Project Service            |
| Vue        | `eslint-plugin-vue` `flat/recommended` + 类型感知 TypeScript            |
| React      | `@eslint-react` recommended/type-checked + React Hooks Flat Recommended |
| Angular    | Angular ESLint TypeScript、模板及无障碍 recommended                     |
| JSON       | `eslint-plugin-jsonc` 三种方言 recommended                              |
| Import     | `eslint-plugin-import-x` recommended + 固定顺序策略                     |
| RegExp     | 显式正确性、安全和超线性回溯规则                                        |
| Prettier   | `eslint-config-prettier` 冲突关闭层                                     |

## 主要规则

### JavaScript

- `camelcase: ["error", { properties: "never" }]`
- `no-debugger: "error"`
- `no-use-before-define` 为 `warn`；类和变量必须先声明，函数声明允许提升。
- `prefer-arrow-callback`、`logical-assignment-operators`、`prefer-object-spread` 为 `error`。
- `prefer-exponentiation-operator`、`prefer-object-has-own` 为 `error`。
- `sort-imports` 为 `warn`，只排序同一 import 的成员。
- `import-x/order` 为 `error`，并设置 `warnOnUnassignedImports: true`；它继续检查普通副作用导入，但样式导入不参与该规则。
- `import-x/style-imports-last` 为 `error`；CSS、SCSS、LESS 等样式必须形成最后一个连续导入分组，组内顺序保持不变且不自动修复。

### TypeScript

- 始终启用 `recommendedTypeChecked` 与 `projectService: true`。
- `explicit-module-boundary-types` 为 `error`，模块导出边界必须显式声明类型，不允许用显式 `any` 参数规避。
- `explicit-function-return-type` 不额外启用，内部函数和回调可以依赖推断。
- `no-explicit-any` 为 `warn`。
- `no-unused-vars` 为 `error`；`_` 前缀表示有意忽略，rest siblings 不误报。
- `no-empty-function` 仅允许空构造函数和空覆写方法。
- `consistent-type-imports` 使用独立 `import type` 修复形式。
- `no-non-null-assertion` 为 `error`。

### Vue

- 使用 `flat/recommended`。
- `attribute-hyphenation: ["error", "always"]`。
- `no-v-html` 为 `warn`。
- `no-v-text-v-html-on-component` 为 `error`。
- `require-explicit-emits`、`attributes-order`、`no-mutating-props` 为 `error`。
- `.vue` 与 `.nvue` 统一使用 TypeScript parser 和 Project Service。

## 类型感知要求

TypeScript、Vue 和 React TSX 始终依赖类型信息。被检查文件必须属于可发现的 `tsconfig.json`，否则 Project Service 会报告配置错误。

本包不再提供 `typeChecked` 或 `tsconfigRootDir` 包装选项。复杂 monorepo 可以通过后置 Flat Config 直接覆盖 `languageOptions.parserOptions`，但不应通过关闭类型检查绕过项目边界问题。

## UniApp 边界

根入口默认声明 `uni`、`uniCloud`、页面 API 及条件编译平台对象，并允许 `pages.json`、`manifest.json` 中的注释。

ESLint 不执行条件编译，因此 `wx`、`plus` 等对象在根入口处理的全部代码文件中可见。这避免平台分支中的 `no-undef`，但不能验证对象是否位于正确的 `#ifdef` 分支。普通 Vue 项目如不希望获得这些 globals，应直接组合所需配置片段，而不是使用根入口。

## 自动修复风险

重点审查以下自动修复：

- Import 分组、成员顺序和副作用导入位置。
- TypeScript 独立 `import type` 声明。
- Vue 属性命名与排序。
- `package.json` 和 `tsconfig*.json` 字段顺序。

`package.json` 排序不会进入顺序具有运行时语义的条件 `exports` 对象。

建议先运行：

```sh
pnpm exec eslint .
```

确认问题范围后再运行：

```sh
pnpm exec eslint . --fix
```

## 维护约定

1. 修改规则时解释当前行为、风险和例外，不在源码注释中引用历史版本。
2. 升级 recommended 预置后检查最终生效规则，避免上游变化静默改变严重级别。
3. 新增框架只增加解析器、文件范围和框架语义，不建立第二套语言规则档位。
4. 新增公共配置工厂、解析器或自动修复行为时同步增加类型和运行时测试。
