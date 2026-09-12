# 默认规则与风险指南

本文说明当前配置模型、主要规则和自动修复风险。源码注释只解释现行意图；历史差异记录在 `CHANGELOG.md`。

## 规则原则

规则按以下顺序取舍：

1. 符合 JavaScript、TypeScript 与 Vue 社区的通用标准写法，并以简洁、可读为前提。
2. 发现真实 Bug 和类型安全问题。
3. 保持跨项目代码一致性。
4. 最后才采用 Fast 系列项目的风格偏好。

纯粹为了 ESLint 而改变正常语义、增加样板代码或强制冷门写法的规则，不进入默认配置。

## 配置模型

Vue 3 和 UniApp 是根入口的两个独立具名完整配置：

- `vueConfig` 仅处理普通 Vue 项目。
- `uniAppConfig` 在 Vue 能力之外增加 `.nvue`、UniApp globals、清单适配和 `unpackage` 忽略。

根入口不提供默认导出，公开 `vueConfig`、`uniAppConfig`、`createVueProjectConfigs()`、`createUniAppProjectConfigs()`、`createBaseConfigs()`、`defineRules()` 及相关类型。

SDK、Node.js 和其他无框架项目使用 `createBaseConfigs()`。React、Angular、Markdown 和 Lodash 从 `./configs` 显式组合；清单排序属于所有完整配置的基础能力。

## 预置来源

| 领域       | 预置或实现                                                              |
| ---------- | ----------------------------------------------------------------------- |
| JavaScript | `@eslint/js` recommended + 本地高置信度规则                             |
| TypeScript | typescript-eslint `recommendedTypeChecked` + Project Service            |
| Vue        | `eslint-plugin-vue` `flat/recommended` + 类型感知 TypeScript            |
| React      | `@eslint-react` recommended/type-checked + React Hooks Flat Recommended |
| Angular    | Angular ESLint TypeScript、模板及无障碍 recommended                     |
| JSON       | `eslint-plugin-jsonc` 三种方言 recommended                              |
| Import     | `eslint-plugin-import-x` recommended + 通用顺序警告                     |
| RegExp     | 显式正确性、安全和超线性回溯规则                                        |
| Prettier   | `eslint-config-prettier` 冲突关闭层                                     |

没有启用完整 `strictTypeChecked`、`stylisticTypeChecked` 或机械式 `all` 预置。额外规则只选择误报低、能直接改善正确性或可读性的部分。

## JavaScript 与 Import

- `camelcase: ["error", { properties: "never" }]`：变量和类型使用 camelCase，外部协议属性可以保留原名。
- `no-empty` 允许完全空的 `catch`；其他空块仍报错。
- `no-void` 为错误，不使用 `void` 隐藏 Promise 或表达“忽略返回值”。
- `no-eval`、`no-implied-eval`、`no-new-func`、`no-promise-executor-return`、`no-debugger` 等真实风险规则为错误。
- `curly` 只要求多行条件分支使用一致花括号；不会强制所有单行分支加括号。
- `import-x/first` 和 `import-x/no-duplicates` 为错误。
- `import-x/order` 为错误，支持修复声明顺序；在通用分组之上保留常用框架、工具和 `@/**` pathGroups。
- `pathGroupsExcludedImportTypes: ["type"]` 保证类型导入统一留在最后的 type 总分组。
- 非样式副作用导入参与顺序检查；样式导入由 `style-imports-last` 强制形成最后一个连续分组，但组内不排序，避免改变 CSS 层叠顺序。
- `sort-imports` 为错误，只统一同一 import 声明内的成员顺序；`prefer-object-has-own` 不启用。

## TypeScript

TypeScript 始终启用 Project Service 和 `recommendedTypeChecked`。被检查文件必须属于可发现的 `tsconfig.json`。

- `.ts`、`.mts`、`.cts` 视为 SDK 式模块封装：`explicit-module-boundary-types` 为错误，导出函数及导出类的公共边界必须显式声明类型。
- `.tsx` 视为 UI 组件文件：保留类型感知正确性规则，但关闭模块边界类型强制，不要求补写可推断的 JSX 返回类型。
- `explicit-function-return-type` 关闭，内部函数、局部处理函数和回调使用 TypeScript 推断。
- `no-inferrable-types` 保留参数和属性上的显式类型，只清理局部变量等没有契约价值的冗余标注。
- Vue/NVue SFC 与独立 TSX 组件关闭模块边界和函数返回类型要求，保留常见组件写法。
- `no-floating-promises` 关闭；是否等待、返回或处理 Promise 由业务语义决定。
- `require-await` 为错误；没有 `await` 的 `async` 会改变返回值和异常语义，应删除 `async`。
- `no-misused-promises`、`await-thenable`、unsafe 类型规则、穷尽 switch、getter/setter 类型一致性等高置信度检查为错误。
- `return-await` 只在错误处理正确性需要时要求 `await`。
- 标准非空断言允许使用；可选链后非空断言、空值合并前非空断言等矛盾组合仍报错。
- `no-explicit-any` 和 `no-deprecated` 为警告。
- `no-unnecessary-condition`、`unified-signatures` 及纯语法偏好关闭，避免删除运行时防御或改写公共重载。
- 模板字符串允许 number 和 boolean；动态字段删除和纯静态工具类不强制改写。
- `prefer-nullish-coalescing` 不强制原始类型从 `||` 改为 `??`；`prefer-optional-chain` 只在类型明确包含 null/undefined 时要求改写。

## Vue

- 使用官方 `flat/recommended` 作为通用 Vue 基线。
- `no-v-html` 为警告，提醒审查 XSS 风险但允许已净化内容。
- `require-explicit-emits`、`no-dupe-keys`、`no-mutating-props`、`no-setup-props-reactivity-loss`、`no-ref-object-reactivity-loss` 和 `no-reserved-component-names` 为错误，并应用于 Vue SFC 与 Vue JSX/TSX 的组件脚本。
- `attribute-hyphenation`、`no-v-text-v-html-on-component` 和 `attributes-order` 仅应用于 `.vue/.nvue` 模板；`attributes-order` 按定义、循环、条件、渲染修饰、唯一属性、全局属性、普通属性、事件和内容排序。
- JSX 属性继续使用 JavaScript 的 camelCase 约定，不受模板 kebab-case 规则影响。
- setup props/ref 响应性丢失和自定义事件命名错误仍为错误。

## UniApp 边界

只有 UniApp 入口声明 `uni`、`uniCloud`、页面 API 及 `wx`、`plus`、`my`、`tt` 等条件编译平台对象。普通 Vue 入口不会获得这些 globals，也不会忽略 `unpackage`。

ESLint 不执行条件编译，所以能避免平台分支中的 `no-undef`，但不能验证对象是否出现在正确的 `#ifdef` 分支。

## 清单排序与自动修复

`package.json` 和 `tsconfig*.json` 排序属于 `createBaseConfigs()`、`vueConfig` 和 `uniAppConfig` 的默认配置。独立片段工厂仍可用于自定义组合。

重点审查以下自动修复：

- Import 分组、pathGroups、类型导入位置与非样式副作用导入顺序。
- 样式导入只检查是否位于最后，不自动移动或重排。
- TypeScript 独立 `import type` / `export type`。
- 默认启用的清单字段排序。

先检查，再修复：

```sh
pnpm exec eslint .
pnpm exec eslint . --fix
```

## 维护约定

1. 升级 recommended 预置后检查最终生效配置，避免上游变化静默改变严重级别。
2. 新规则必须说明它解决的真实问题、误报边界和是否自动修复。
3. 框架只增加解析器、文件范围和框架语义，不建立第二套语言严格度。
4. 公共入口、解析器范围或自动修复行为变化时同步更新类型、运行时和发布测试。
