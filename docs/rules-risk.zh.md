# 默认规则、风险分级与维护约定

本文档回答三个维护问题：默认配置到底继承了什么、哪些规则会显著影响已有项目、修改规则时必须同步检查什么。

## 风险标记如何理解

源码中的标记采用以下含义：

- `[高影响]`：规则可能产生大面积差异、阻断既有写法，或要求人工确认运行时与公共 API 行为。
- `[可自动修复]`：当前锁定的 ESLint/插件版本声明该规则可被 `eslint --fix` 修改；不代表无需代码审查。
- `[安全关注]`：规则主要提示注入、信任边界等安全问题。
- `[默认关闭]`、`[按需启用]`：规则记录存在，但默认配置不会启用。

“高影响”不等于规则本身不安全。它表示规则的采用成本或修复审查成本较高。默认自动修复的目标仍是保持语义，但模块副作用、getter/Proxy、构建器约定和公共组件 API 都需要项目维护者复核。

## 默认继承的上游预置

`fastConfig()` 默认开启 Vue 3、TypeScript、JavaScript、import、RegExp、JSON、Markdown 与 Prettier 兼容层；TypeScript 类型感知和清单排序默认关闭。

| 范围             | 默认继承                                                                                  | 说明                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| JavaScript       | `@eslint/js` 的 `recommended`                                                             | 基础语法和运行时正确性，包括 `no-undef`、`no-unused-vars` 等。                   |
| TypeScript       | typescript-eslint 的 `recommended` + `stylistic`                                          | 默认不读取类型信息；本库规则在预置之后覆写。                                     |
| Vue 3            | `@eslint/js`、typescript-eslint 非类型感知预置、`eslint-plugin-vue` 的 `flat/recommended` | 处理 Vue 3 单文件组件，并让 TypeScript 规则正确作用于 `<script lang="ts">`。     |
| import           | `eslint-plugin-import-x` 的 `recommended`                                                 | 本库额外配置导入位置、去重和排序。解析器相关规则默认关闭，避免绑定具体别名方案。 |
| RegExp           | `eslint-plugin-regexp` 的 `flat/recommended`                                              | 部分规则可自动改写正则表达式，批量修复后需运行测试。                             |
| JSON/JSONC/JSON5 | `eslint-plugin-jsonc` 对应方言的 `flat/recommended-*`                                     | 三种方言按扩展名隔离，不会互相叠加。                                             |
| Markdown         | `@eslint/markdown` 的 `recommended`                                                       | 检查 Markdown 结构和语法。                                                       |
| Prettier 兼容    | `eslint-config-prettier/flat`                                                             | 只关闭冲突的格式规则，不会在 ESLint 内执行 Prettier。                            |

上游预置的具体规则集合由锁文件中的依赖版本决定，升级 ESLint 或任一插件时都可能变化。审查实际生效配置时，应以配置检查器和 `pnpm-lock.yaml` 为准，而不是复制一份很快过期的上游规则列表。

## 默认启用的高影响规则

下表覆盖本库主动设置的高影响规则，以及上游默认预置中采用成本较高、最需要审查的规则。

| 规则                                                | 等级       | 自动修复           | 主要影响                                                                                            | 建议                                                   |
| --------------------------------------------------- | ---------- | ------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `import-x/order`                                    | error      | 是                 | 重排并分组 import。带副作用的裸 import 会被报告但不会安全地自动移动，人工调整顺序可能改变启动行为。 | 先检查入口、polyfill、样式和注册器 import。            |
| `@typescript-eslint/no-unused-vars`                 | error      | 是（当前插件版本） | 可能删除未使用的 import、变量或声明；以下划线开头是显式保留出口。                                   | 在独立提交中修复并运行类型检查、构建和测试。           |
| `@typescript-eslint/consistent-type-imports`        | error      | 是                 | 将纯类型依赖改成内联 `type` import；若原 import 还承担模块副作用，编译后行为可能变化。              | 副作用应改成独立的 `import "module"`，并复核构建产物。 |
| `@typescript-eslint/no-require-imports`             | error      | 否                 | 阻断 CommonJS、条件加载和部分工具链互操作写法。                                                     | 仅在确实需要的配置文件上按范围关闭，不要全局隐藏。     |
| `no-var`                                            | error      | 是                 | 将 `var` 改为块级声明；声明提升和循环闭包行为需要关注。                                             | 先运行现有测试，重点复核循环内回调。                   |
| `prefer-arrow-callback`                             | error      | 是                 | 批量改写回调形式，影响 `this`、`arguments` 或函数名调试体验的代码需要人工确认。                     | 检查事件处理器、类库回调和栈追踪。                     |
| `logical-assignment-operators`                      | error      | 是                 | 将条件赋值改成 `\|\|=`、`&&=`、`??=`；getter 或 Proxy 场景要确认读取和写入次数。                    | 对状态容器和响应式对象运行行为测试。                   |
| `no-restricted-syntax`（`LabeledStatement`）        | error      | 否                 | 禁止 labeled break/continue，可能要求重构多层循环控制流。                                           | 必要时按文件降级，重构后再恢复。                       |
| `sort-imports`                                      | warn       | 是                 | 排序同一 import 声明中的成员，通常只产生文本差异。                                                  | 与 `import-x/order` 一起在独立整理提交中执行。         |
| `vue/require-explicit-emits`                        | error      | 否                 | 要求组件声明事件，相当于补全组件公共 API；旧组件可能大量报错。                                      | 先补齐实际事件清单，不要盲目关闭。                     |
| `vue/no-mutating-props`                             | error      | 否                 | 强制单向数据流，可能要求引入本地状态或事件。                                                        | 把修复当作组件设计变更审查。                           |
| `vue/attributes-order`                              | error      | 是                 | 首次运行会重排大量模板属性，通常不改变运行逻辑但会形成大 diff。                                     | 单独提交模板排序，不与业务修改混合。                   |
| `no-unused-vars`、`no-undef`（JavaScript 上游预置） | error      | 否                 | JavaScript 代码可能出现较多阻断错误；`no-undef` 还会暴露缺失的运行时全局变量声明。                  | 正确选择 `environment`，再逐步清理无用代码。           |
| RegExp 推荐预置                                     | 由上游决定 | 部分规则是         | 可能改写字符类、量词或断言；语法等价不代表业务输入覆盖充分。                                        | 修复后运行覆盖真实输入的正则测试。                     |

另外，`vue/no-v-html` 默认是 `warn`，属于安全关注而非自动重写规则。它提示调用方必须保证 HTML 来自可信来源或经过可靠净化。

## 明确不默认启用的高影响能力

- TypeScript 和 Vue 的类型感知预置仅在 `typeChecked: true` 时启用；它们会增加项目服务开销，并启用 `no-floating-promises` 等需要类型信息的规则。
- 清单排序规则 `jsonc/sort-keys`、`jsonc/sort-array-values` 分别仅在 `sortPackageJson: true`、`sortTsconfig: true` 时启用；首次修复应单独提交并核对发布清单。
- Lodash 静态导入限制仅在 `lodash: "lodash"` 或 `lodash: "lodash-unified"` 时启用。该策略使用 `no-restricted-imports` 阻止混用包入口，但不会检查动态 `import()` 或 CommonJS `require()`。
- `import-x/no-unresolved`、`import-x/named` 等依赖 resolver 的检查默认关闭。
- `package.json` 的 `exports` 条件键永不自动排序。Node 条件导出按键顺序匹配，改写顺序可能改变实际加载文件。

## 按项目降低规则强度

覆盖项必须放在共享配置之后，并尽量限定文件范围：

```js
import fastChina, { defineRules } from "@fast-china/eslint-config";

export default fastChina(
	{},
	{
		name: "project/typescript-exceptions",
		files: ["**/*.{ts,tsx,mts,cts,vue}"],
		rules: defineRules({
			"@typescript-eslint/consistent-type-imports": "warn",
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-unused-vars": "warn",
		}),
	},
	{
		name: "project/vue-exceptions",
		files: ["**/*.vue"],
		rules: defineRules({
			"vue/attributes-order": "warn",
			"vue/require-explicit-emits": "warn",
		}),
	}
);
```

建议先执行只读检查，再在独立分支或独立提交中运行 `eslint --fix`。重点审查 import、副作用入口、包导出、组件事件和清单文件，并运行项目的类型检查、构建与测试。

## 修改规则时的维护清单

1. 在 `src/rules/` 对每条本地规则写明“作用、为什么启用、例外或风险”，不要只翻译规则名。
2. 新增或升级高影响规则时添加 `[高影响]`；可修复规则同时核对当前版本的 `meta.fixable`，不要凭印象标注。
3. 同步更新本文件和英文版 `rules-risk.md`；默认行为变化还要更新两份 README 与 `CHANGELOG.md`。
4. 排序规则不得触碰顺序具有语义的映射，例如 `package.json#exports` 条件对象。
5. ESLint 或任一内置插件版本变化后运行 `pnpm typegen`，审查并提交 `src/typegen.d.ts`；不得手工修改生成声明。
6. 为解析器、插件、作用域、自动修复、生成类型或公开导出的变化增加集成测试。
7. 完成后运行 `pnpm check` 和 `pnpm pack --dry-run`，并检查自动修复后的真实 diff。
