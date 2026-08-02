**中文** | [English](./README.md)

# @fast-china/eslint-config

面向 Vue 3、React、Angular、Vite、TypeScript 与 JavaScript 项目的实用型 ESLint Flat Config 规则库。

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config)
[![license](https://img.shields.io/npm/l/@fast-china/eslint-config)](./LICENSE)

## 特性

- 基于 ESLint 10，仅提供原生 Flat Config。
- 默认针对 Vue 3 + TypeScript + Vite；React 与 Angular 是完整但按需启用的框架集成，Vue 项目不会意外接管无关文件。
- 完整覆盖 JavaScript、TypeScript、Vue SFC、JSX/TSX、Angular TypeScript 与模板、JSON 各方言、Markdown、正则表达式与导入规则。
- 默认导出单一 `fastConfig()` 工厂，公共 API 清晰，并且不会在导入模块时读取项目文件。
- 根据 ESLint 与内置插件的规则 schema 生成精确类型，提供规则名和规则选项自动补全。
- 插件与解析器均由本包直接声明依赖，使用者不需要手工拼装插件依赖树。
- Prettier 只负责格式化：默认配置仅关闭冲突规则，不在 ESLint 内重复运行 Prettier。
- `package.json` 与 `tsconfig.json` 排序为显式 opt-in，避免安装后首次修复产生非预期大 diff。
- 可选统一使用 `lodash` 或 `lodash-unified`，避免同一项目混用多个 Lodash 入口。

## 环境要求

- Node.js `^22.18.0` 或 `^24.18.0`
- ESLint `^10.0.0`
- TypeScript `^6.0.0`

这些版本范围与 ESLint 10 及内置语言插件的运行要求保持一致。

## 安装

```sh
pnpm add -D eslint typescript @fast-china/eslint-config
```

也可以使用 npm、Yarn 或 Bun 的等价命令。

## 快速开始：Vue 3 + Vite

创建 `eslint.config.mjs`：

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina();
```

默认配置面向普通 Vue 3 浏览器后台管理项目，启用 Vue 3、TypeScript、JavaScript、JSON 各方言、导入排序、正则检查、`.gitignore` 与浏览器全局变量；常见配置文件、脚本、测试和 CLI 文件会额外获得 Node.js 全局变量。Markdown、React、Angular 和清单排序按需启用；Lodash 策略通过 `configs` 子路径独立组合。

## 适配其他项目

其他项目可以配置根工厂，也可以完全绕过根工厂，直接组合所需片段。

### 使用 `fastConfig()`

#### React + Vite

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina({
	react: true,
	vue: false,
});
```

React 集成会应用现代 `@eslint-react` JavaScript/TypeScript 预置、React 官方 Hooks Flat Config，以及额外的 DOM 安全检查。JSX 与 TSX 分别复用现有 JavaScript、TypeScript 解析能力。Preact 等兼容 React 的 JSX 运行时可设置 `react: { importSource: "preact" }`。

#### Angular

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina({
	angular: true,
	vue: false,
});
```

Angular 集成会检查框架 TypeScript、外部 `.html` 模板和组件内联模板。模板无障碍规则与内联模板提取默认开启，也可以显式配置：

```js
export default fastChina({
	angular: {
		inlineTemplates: true,
		templateAccessibility: true,
	},
	vue: false,
});
```

Angular 依赖 TypeScript 集成；同时设置 `angular: true` 与 `typescript: false` 时会立即抛出清晰的配置错误。

#### Node.js + TypeScript

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina({
	environment: "node",
	vue: false,
});
```

#### 纯 JavaScript

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina({
	environment: "node",
	json: false,
	markdown: false,
	typescript: false,
	vue: false,
});
```

#### 启用 TypeScript 类型感知规则

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina({
	typescript: {
		tsconfigRootDir: import.meta.dirname,
		typeChecked: true,
	},
});
```

类型感知模式使用 typescript-eslint Project Service，被检查的文件必须属于某个 `tsconfig.json`。普通项目通常可省略 `tsconfigRootDir`；复杂 monorepo 建议显式传入配置文件所在目录。

### 直接组合配置片段

不希望使用根工厂的项目可以只组装需要的片段。以下 React 浏览器项目示例完全不依赖 `fastConfig()`：

```js
import { defineConfig } from "eslint/config";

import {
	createCommonConfigs,
	createEnvironmentConfigs,
	createGitignoreConfigs,
	createGlobalIgnores,
	createImportConfigs,
	createJavaScriptConfigs,
	createPrettierConfigs,
	createReactConfigs,
	createRegexpConfigs,
	createTypeScriptConfigs,
} from "@fast-china/eslint-config/configs";
import { GLOBS_JAVASCRIPT, GLOBS_TYPESCRIPT } from "@fast-china/eslint-config/constants";

const codeFiles = [...GLOBS_JAVASCRIPT, ...GLOBS_TYPESCRIPT];

export default defineConfig([
	...createGlobalIgnores(),
	...createGitignoreConfigs(),
	...createEnvironmentConfigs({ environment: "browser", files: codeFiles, nodeFiles: codeFiles }),
	...createCommonConfigs(codeFiles),
	...createJavaScriptConfigs(),
	...createImportConfigs(codeFiles),
	...createRegexpConfigs(codeFiles),
	...createTypeScriptConfigs(),
	...createReactConfigs({}, { javascript: true, typescript: true }),
	...createPrettierConfigs(),
]);
```

Vue SFC 可增加 `createVueConfigs()`，Angular 可增加 `createAngularConfigs()`，Node.js 项目则将环境设为 `"node"`。配置片段的顺序具有语义，项目覆写应始终放在最后。

## 配置选项

| 选项              | 默认值      | 作用                                                           |
| ----------------- | ----------- | -------------------------------------------------------------- |
| `angular`         | `false`     | 启用 Angular TypeScript 与模板，或传入 Angular 专用选项。      |
| `environment`     | `"browser"` | 可选 `"browser"`、`"node"` 或 `"universal"` 全局变量。         |
| `globals`         | 无          | 增加项目宿主、测试运行器等提供的全局变量。                     |
| `gitignore`       | `true`      | 读取项目根目录的 `.gitignore`。                                |
| `ignores`         | `[]`        | 追加项目自己的全局忽略模式。                                   |
| `imports`         | `true`      | 启用 import-x 正确性与排序规则。                               |
| `javascript`      | `true`      | 处理 JavaScript 与 JSX。                                       |
| `json`            | `true`      | 启用 JSON、JSONC 与 JSON5 推荐规则。                           |
| `markdown`        | `false`     | 启用官方 Markdown 语言规则。                                   |
| `prettier`        | `true`      | 关闭与 Prettier 冲突的 ESLint 规则。                           |
| `react`           | `false`     | 启用 React、JSX 与 Hooks，或传入运行时和 React 版本设置。      |
| `regexp`          | `true`      | 启用推荐的正则表达式规则。                                     |
| `rules`           | 无          | 对所有已启用代码文件追加具有精确类型的项目规则。               |
| `sortPackageJson` | `false`     | 按安全白名单排序 `package.json`，不会进入 `exports` 条件对象。 |
| `sortTsconfig`    | `false`     | 按 TypeScript 文档主题排序 `tsconfig*.json`。                  |
| `typescript`      | `true`      | 可关闭，或传入 `{ typeChecked: true, tsconfigRootDir }`。      |
| `vue`             | `true`      | 启用 Vue 3 单文件组件支持。                                    |

## 框架覆盖范围

Vue 3、React 与 Angular 都有专用解析器或处理器、推荐规则、配置选项、生成规则类型与集成测试。Nuxt 可使用 Vue 基础配置；Next.js 与 Remix 可使用 React 基础配置，并在 `fastConfig()` 后追加各自的框架 Flat Config。兼容 React 的 JSX 运行时可以使用 `react.importSource`。

Svelte、Astro 与 Solid 具有不同的模板或编译器语义，目前不会被包装成名义上的“一键支持”。项目已经可以把它们的官方 Flat Config 作为末尾覆写传入；将来只有在解析器、处理器、规则 schema、文档和真实运行时 fixture 一并完成时，才会增加对应的一等开关。

## Lodash 导入策略

Lodash 策略不是 `fastConfig()` 选项。只有需要统一静态导入来源时，才从 `@fast-china/eslint-config/configs` 导入 `createLodashConfigs()`：

- `createLodashConfigs("lodash-unified")`：禁止从 `lodash`、`lodash-es` 及其子路径静态导入或重新导出。
- `createLodashConfigs("lodash")`：禁止从 `lodash-es`、`lodash-unified` 及其子路径静态导入或重新导出；允许 `lodash` 根入口和 `lodash/*` 按方法导入。

选择 `lodash-unified`：

```sh
pnpm add lodash-unified
```

```js
import { defineConfig } from "eslint/config";

import fastChina from "@fast-china/eslint-config";
import { createLodashConfigs } from "@fast-china/eslint-config/configs";
import { cloneDeep, debounce } from "lodash-unified";

export default defineConfig([...fastChina(), ...createLodashConfigs("lodash-unified")]);
```

选择标准 `lodash`：

```sh
pnpm add lodash
pnpm add -D @types/lodash
```

```js
import { defineConfig } from "eslint/config";

import fastChina from "@fast-china/eslint-config";
import { createLodashConfigs } from "@fast-china/eslint-config/configs";
import debounce from "lodash/debounce";

export default defineConfig([...fastChina(), ...createLodashConfigs("lodash")]);
```

该片段使用 ESLint 核心 `no-restricted-imports`，不需要额外插件，也不会替项目安装 Lodash。它只检查静态 `import`/`export`，不检查动态 `import()` 或 CommonJS `require()`，并且独立于根工厂的 `imports` 选项。

如果后续 `rules` 或文件级覆写再次设置 `no-restricted-imports`，ESLint 会用后面的完整规则替换这套策略，而不是合并选项。需要组合更多包限制时，可从 `@fast-china/eslint-config/rules` 导入原始 `preferLodashRules` 或 `preferLodashUnifiedRules`，统一维护一份完整规则。

## 精确规则类型与自动补全

本包根据 ESLint 核心规则和所有随包插件公开的 JSON Schema 生成 `RuleOptions`，并提供不会改变运行时对象的 `defineRules()`。在输入规则名、严重级别或选项时，TypeScript 与支持类型分析的编辑器会给出补全；拼错规则名或填写无效选项时会立即报错。

```js
// @ts-check
import fastChina, { defineRules } from "@fast-china/eslint-config";

const projectRules = defineRules({
	"@angular-eslint/template/alt-text": "error",
	"@eslint-react/dom-no-missing-button-type": "error",
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used" }],
	"import-x/order": ["error", { "newlines-between": "always" }],
	"react-hooks/exhaustive-deps": "warn",
	"vue/attributes-order": ["error", { order: ["DEFINITION", "EVENTS", "CONTENT"] }],
});

export default fastChina(
	{ rules: projectRules },
	{
		files: ["**/*.generated.ts"],
		name: "project/generated",
		rules: defineRules({ "@typescript-eslint/no-unused-vars": "off" }),
	}
);
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

默认配置包含少量高影响规则：它们可能阻断特定写法，或要求复核 import 副作用、类型导入和组件公共事件。React 与 Angular 在全局默认关闭，但启用框架后也会启用文档中列出的现代框架约束和无障碍规则。清单排序同样属于高影响能力，但默认关闭。源码使用 `[高影响]`、`[可自动修复]`、`[安全关注]` 与 `[按需启用]` 标记这类规则。

完整的默认预置来源、高影响规则清单、关闭示例和维护约定见 [默认规则与风险指南](./docs/rules-risk.zh.md)。运行 `eslint --fix` 前建议先只检查，在独立提交中应用修复，并审查 import、`package.json`、组件事件和构建产物。

## 覆盖项目规则

最常用的全局覆盖可以直接放入 `rules`；按文件覆盖作为后续参数传入，后面的配置优先级更高：

```js
import fastChina, { defineRules } from "@fast-china/eslint-config";

export default fastChina(
	{
		rules: {
			"no-console": "warn",
		},
	},
	{
		files: ["**/{scripts,tests}/**/*.{js,ts}"],
		name: "project/node-files",
		rules: defineRules({ "no-console": "off" }),
	}
);
```

根入口只公开 `fastConfig`、`defaultConfigOptions`、`defineRules`、`FastConfigOptions` 和 `RuleOptions`。高级组合通过职责明确的子路径完成，避免扩大根入口：

- `@fast-china/eslint-config/configs` 导出全部配置创建函数及其选项类型。
- `@fast-china/eslint-config/constants` 导出项目维护的全部文件 glob。
- `@fast-china/eslint-config/rules` 导出带完整注释的原始规则记录和 `RuleOptions`。

```js
import { defineConfig } from "eslint/config";

import { createCommonConfigs, createTypeScriptConfigs } from "@fast-china/eslint-config/configs";
import { GLOBS_TYPESCRIPT } from "@fast-china/eslint-config/constants";

export default defineConfig([...createCommonConfigs(GLOBS_TYPESCRIPT), ...createTypeScriptConfigs({ typeChecked: true })]);
```

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
pnpm pack --dry-run
```

升级 ESLint 或插件后运行 `pnpm typegen` 并提交 `src/typegen.d.ts`；不要手工编辑生成文件。`pnpm check` 会验证生成类型没有漂移，然后依次构建、类型检查、检查所有支持的文件类型、验证格式，并针对构建后的真实包运行运行时和消费者类型测试。

贡献流程见 [CONTRIBUTING.md](./CONTRIBUTING.md)，规则维护约定见 [默认规则与风险指南](./docs/rules-risk.zh.md)，本次工程审查和质量基线见 [工程质量审查报告](./docs/engineering-audit.zh.md)。

## 开源协议

[Apache-2.0](./LICENSE)
