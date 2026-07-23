**中文** | [English](./README.md)

# @fast-china/eslint-config

面向 Vue 3、Vite、TypeScript 与 JavaScript 项目的实用型 ESLint Flat Config 规则库。

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config)
[![license](https://img.shields.io/npm/l/@fast-china/eslint-config)](./LICENSE)

## 特性

- 基于 ESLint 10 与原生 Flat Config，不再兼容旧式 `.eslintrc`。
- 默认针对 Vue 3 + TypeScript + Vite，同时可显式选择 Vue 2 或类型感知规则。
- 完整覆盖 JavaScript、TypeScript、Vue SFC、JSON、JSONC、JSON5、Markdown、正则表达式与导入规则。
- 保留零配置的默认数组，并提供轻量的 `createConfig()` 工厂适配其他类型项目。
- 根据 ESLint 与内置插件的规则 schema 生成精确类型，提供规则名和规则选项自动补全。
- 插件与解析器均由本包直接声明依赖，使用者不需要手工拼装插件依赖树。
- Prettier 只负责格式化：默认配置仅关闭冲突规则，不在 ESLint 内重复运行 Prettier。

## 环境要求

- Node.js `^20.19.0`、`^22.13.0` 或 `>=24`
- ESLint `^10.0.0`
- TypeScript `>=5.3.0 <6.1.0`

这些版本范围与 ESLint 10 及内置语言插件的运行要求保持一致。

## 安装

```sh
pnpm add -D eslint typescript @fast-china/eslint-config
```

也可以使用 npm、Yarn 或 Bun 的等价命令。

## 快速开始：Vue 3 + Vite

创建 `eslint.config.mjs`：

```js
import { defineConfig } from "eslint/config";

import fastChina from "@fast-china/eslint-config";

export default defineConfig([...fastChina]);
```

默认配置会启用 Vue 3、TypeScript、JavaScript、JSON 各方言、Markdown、导入排序、正则检查、`.gitignore` 与浏览器全局变量；常见配置文件、脚本、测试和 CLI 文件会额外获得 Node.js 全局变量。

## 适配其他项目

通过 `createConfig()` 只保留项目真正需要的能力。

### Node.js + TypeScript

```js
import { defineConfig } from "eslint/config";

import { createConfig } from "@fast-china/eslint-config";

export default defineConfig(
	createConfig({
		environment: "node",
		vue: false,
	})
);
```

### 纯 JavaScript

```js
import { defineConfig } from "eslint/config";

import { createConfig } from "@fast-china/eslint-config";

export default defineConfig(
	createConfig({
		environment: "node",
		json: false,
		markdown: false,
		typescript: false,
		vue: false,
	})
);
```

### 启用 TypeScript 类型感知规则

```js
import { defineConfig } from "eslint/config";

import { createConfig } from "@fast-china/eslint-config";

export default defineConfig(
	createConfig({
		typescript: { typeChecked: true },
		vue: { typeChecked: true, version: 3 },
	})
);
```

类型感知模式使用 typescript-eslint project service，被检查的文件必须属于某个 `tsconfig.json`。

## 配置选项

| 选项          | 默认值      | 作用                                                   |
| ------------- | ----------- | ------------------------------------------------------ |
| `environment` | `"browser"` | 可选 `"browser"`、`"node"` 或 `"universal"` 全局变量。 |
| `gitignore`   | `true`      | 读取项目根目录的 `.gitignore`。                        |
| `ignores`     | `[]`        | 增加项目自己的全局忽略模式。                           |
| `imports`     | `true`      | 启用 import-x 正确性与排序规则。                       |
| `json`        | `true`      | 启用 JSON/JSONC/JSON5 及 package/tsconfig 排序。       |
| `markdown`    | `true`      | 启用官方 Markdown 语言规则。                           |
| `prettier`    | `true`      | 关闭与 Prettier 冲突的 ESLint 规则。                   |
| `regexp`      | `true`      | 启用推荐的正则表达式规则。                             |
| `typescript`  | `true`      | 可关闭，或传入 `{ typeChecked: true }`。               |
| `vue`         | `3`         | 可关闭、传入 `2`/`3`，或传入 Vue 选项对象。            |

## 精确规则类型与自动补全

本包根据 ESLint 核心规则和所有随包插件公开的 JSON Schema 生成 `RuleOptions`，并提供不会改变运行时对象的 `defineRules()`。在输入规则名、严重级别或选项时，TypeScript 与支持类型分析的编辑器会给出补全；拼错规则名或填写无效选项时会立即报错。

```js
// @ts-check
import { defineConfig } from "eslint/config";

import { createConfig, defineRules } from "@fast-china/eslint-config";

const projectRules = defineRules({
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used" }],
	"import-x/order": ["error", { "newlines-between": "always" }],
	"vue/attributes-order": ["error", { order: ["DEFINITION", "EVENTS", "CONTENT"] }],
});

export default defineConfig([
	...createConfig(),
	{
		name: "project/rules",
		rules: projectRules,
	},
]);
```

在 TypeScript 配置或工具代码中，也可以直接使用：

```ts
import type { RuleOptions } from "@fast-china/eslint-config";

const rules = {
	"no-console": ["warn", { allow: ["warn", "error"] }],
} satisfies RuleOptions;
```

精确类型覆盖 ESLint 核心规则和本包附带的插件规则；项目自行安装的额外插件不在该类型集合内。类型精度取决于对应规则公开的 schema。

## 规则风险与维护

默认配置包含少量高影响规则：它们可能在首次启用时产生大面积排序差异、阻断旧项目写法，或要求复核 import 副作用、类型导入和组件公共事件。源码使用 `[高影响]`、`[可自动修复]` 与 `[安全关注]` 标记这类规则。

完整的默认预置来源、高影响规则清单、关闭示例和维护约定见 [默认规则与风险指南](./docs/rules-risk.zh.md)。运行 `eslint --fix` 前建议先只检查，在独立提交中应用修复，并审查 import、`package.json`、组件事件和构建产物。

## 覆盖项目规则

将项目规则放在共享配置之后即可覆盖：

```js
import { defineConfig } from "eslint/config";

import { createConfig } from "@fast-china/eslint-config";

export default defineConfig([
	...createConfig({ vue: 3 }),
	{
		name: "project/overrides",
		rules: {
			"no-console": "off",
		},
	},
]);
```

可复用导出包括 `PresetJavascriptConfigs`、`PresetTypeScriptConfigs`、`PresetBasicConfigs`、`PresetJsonConfigs`、`PresetVueConfigs`、各独立配置组和常量；原始规则记录可从 `@fast-china/eslint-config/rules` 导入。

## Prettier

Prettier 不再是 peer dependency，也不会作为 ESLint 规则运行。项目需要格式化时单独安装并执行：

```sh
pnpm add -D prettier
pnpm exec prettier --check .
```

如果使用其他格式化工具，或希望保留完整的样式类 ESLint 规则，请设置 `prettier: false`。

## 开发与贡献

```sh
pnpm install
pnpm typegen
pnpm check
```

升级 ESLint 或插件后运行 `pnpm typegen` 并提交 `src/typegen.d.ts`；不要手工编辑生成文件。`pnpm check` 会验证生成类型没有漂移，然后依次构建、类型检查、检查所有支持的文件类型、验证格式，并针对构建后的真实包运行运行时和消费者类型测试。

贡献流程见 [CONTRIBUTING.md](./CONTRIBUTING.md)，规则维护约定见 [默认规则与风险指南](./docs/rules-risk.zh.md)，本次工程审查和质量基线见 [工程质量审查报告](./docs/engineering-audit.zh.md)。

## 从 1.0.48 及更早版本迁移

- 现有 `export default [...fastChina]` 用法继续有效。
- 包现在明确为 ESM-only，不再暴露指向 ESM 文件的伪 CommonJS 条件。
- Vue 3 成为明确默认值；Vue 2 请使用 `createConfig({ vue: 2 })`。
- 默认不再强制项目改用 `lodash-unified`，组织定制规则仍保留在 rules 子路径中供显式使用。
- Prettier 不再运行于 ESLint 内部，请改用 Prettier CLI 或编辑器集成。
- Node.js 最低版本调整为 ESLint 10 的实际要求。

## 开源协议

[Apache-2.0](./LICENSE)
