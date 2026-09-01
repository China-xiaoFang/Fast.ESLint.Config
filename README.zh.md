<p align="left">
	<strong>简体中文</strong> | <a href="./README.md">English</a>
</p>

<p align="center">
	<img src="./Fast.png" alt="logo" width="160" />
</p>

# @fast-china/eslint-config

面向 Vue 3、UniApp、React、Angular、Vite、TypeScript 与 JavaScript 项目的实用型 ESLint Flat Config 规则库。

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config) [![Node.js](https://img.shields.io/badge/node-%5E22.18%20%7C%7C%20%5E24.18-brightgreen)](https://nodejs.org/) [![ESLint](https://img.shields.io/badge/eslint-%5E10.0-4b32c3)](https://eslint.org/) [![license](https://img.shields.io/npm/l/@fast-china/eslint-config)](./LICENSE)

## 特性

- 基于 ESLint 10，仅提供原生 Flat Config。
- 根入口固定面向 Vue 3 + TypeScript + UniApp，不再通过布尔选项启停语言和插件。
- TypeScript、Vue 与 React TypeScript 始终使用类型感知推荐规则和 Project Service。
- SDK、OA、Admin 与客户端使用同一套 JavaScript、TypeScript、Import 和 RegExp 规则，不提供严格度档位。
- 默认启用 JavaScript、TypeScript、Vue/`.nvue`、UniApp globals、JSON 各方言、Import、RegExp、清单排序、`.gitignore` 与 Prettier 兼容层。
- React、Angular、Markdown 和 Lodash 策略通过 `@fast-china/eslint-config/configs` 显式组合。
- 根据规则 schema 生成精确 `RuleOptions`，提供规则名和规则选项自动补全。
- 插件与解析器均由本包声明依赖，使用者不需要手工拼装依赖树。

## 环境要求

- Node.js `^22.18.0` 或 `^24.18.0`
- ESLint `^10.0.0`
- TypeScript `^6.0.0`

## 安装

```sh
pnpm add -D eslint typescript @fast-china/eslint-config
```

## Vue 3 / UniApp 快速开始

创建 `eslint.config.mjs`：

```js
import fastChina from "@fast-china/eslint-config";

export default fastChina;
```

默认入口固定包含：

- 浏览器运行环境和 Node.js 工程文件 globals。
- JavaScript、类型感知 TypeScript、Vue 3 与 `.nvue`。
- `uni`、`uniCloud`、页面 API 以及 `wx`、`plus`、`my`、`tt` 等条件编译平台 globals。
- JSON、JSONC、JSON5，以及允许注释的 `pages.json`、`manifest.json` 和 VS Code `settings.json`、`extensions.json`。
- Import、RegExp、`package.json`/`tsconfig*.json` 排序、`.gitignore` 和 Prettier 冲突关闭层。

ESLint 不执行 UniApp 的 `#ifdef`/`#endif`，因此只能识别平台对象，不能验证对象是否位于正确的平台分支。当前不处理需要专用解析器的 `.uvue` 与 `.uts`。

## `fastConfig()`

根工厂只保留 `environment`，默认值为 `"browser"`：

```js
import { fastConfig } from "@fast-china/eslint-config";

export default fastConfig({
	environment: "universal",
});
```

可选值：

| 值            | 应用源码 globals |
| ------------- | ---------------- |
| `"browser"`   | 浏览器           |
| `"node"`      | Node.js          |
| `"universal"` | 浏览器和 Node.js |

配置文件、脚本、测试和 CLI 文件始终单独获得 Node.js globals，并允许必要的 `console` 和 CommonJS 兼容加载。

## 项目覆写

规则、globals、ignores 和解析器特殊设置直接使用后置 Flat Config，不再包装成根工厂选项：

```js
import { defineRules, fastConfig } from "@fast-china/eslint-config";

export default fastConfig(
	{ environment: "browser" },
	{
		ignores: ["public/vendor/**"],
		languageOptions: {
			globals: {
				__APP_VERSION__: "readonly",
			},
		},
		rules: defineRules({
			"no-console": "warn",
		}),
	},
	{
		files: ["**/*.generated.ts"],
		rules: defineRules({
			"@typescript-eslint/no-unused-vars": "off",
		}),
	}
);
```

后置配置拥有最高优先级。`defineRules()` 不修改对象，只提供精确的规则类型检查。

## TypeScript

`createTypeScriptConfigs()`、Vue SFC 和 React TSX 始终使用 `recommendedTypeChecked` 与：

```js
parserOptions: {
	projectService: true,
	extraFileExtensions: [".vue", ".nvue"],
}
```

被检查文件必须属于可发现的 `tsconfig.json`。TypeScript、TSX、Vue 与 NVue 统一使用相同的 `extraFileExtensions`，避免混合检查文件时 Project Service 重载项目。不再提供 `typeChecked` 和 `tsconfigRootDir` 包装选项；复杂 monorepo 如需指定根目录，可在后置 Flat Config 中直接覆盖 `languageOptions.parserOptions`，但同一项目中所有类型感知文件覆盖必须保持 `extraFileExtensions` 完全一致。

## React

React 项目从不绑定框架的基础配置开始组合：

```js
import { createBaseConfigs } from "@fast-china/eslint-config";
import { createReactConfigs } from "@fast-china/eslint-config/configs";
import { defineConfig } from "eslint/config";

export default defineConfig([...createBaseConfigs(), ...createReactConfigs()]);
```

基础配置提供统一的 JavaScript、类型感知 TypeScript、JSON、Import、RegExp、清单排序和 Prettier 兼容层；React 片段追加 `@eslint-react`、React 官方 Hooks Recommended 和 DOM 安全规则，不会加载 Vue 或 UniApp globals。

Preact 等兼容运行时可以传入 React 识别设置：

```js
export default defineConfig([...createBaseConfigs(), ...createReactConfigs({ importSource: "preact", version: "detect" })]);
```

## Angular

```js
import { createBaseConfigs } from "@fast-china/eslint-config";
import { createAngularConfigs } from "@fast-china/eslint-config/configs";
import { defineConfig } from "eslint/config";

export default defineConfig([...createBaseConfigs(), ...createAngularConfigs()]);
```

Angular 片段检查 TypeScript 源码、外部 HTML 模板和组件内联模板，默认启用官方模板无障碍规则。特殊项目仍可配置：

```js
createAngularConfigs({
	inlineTemplates: false,
	templateAccessibility: false,
});
```

## Node.js / SDK

不需要 Vue、UniApp、React 或 Angular 的项目直接使用基础配置：

```js
import { createBaseConfigs } from "@fast-china/eslint-config";

export default createBaseConfigs({ environment: "node" });
```

`createBaseConfigs()` 固定启用 JavaScript、类型感知 TypeScript、JSON、Import、RegExp、清单排序、`.gitignore` 和 Prettier 兼容层，但不接管任何框架文件。

## Markdown 与 Lodash

Markdown 需要显式组合：

```js
import { createBaseConfigs } from "@fast-china/eslint-config";
import { createMarkdownConfigs } from "@fast-china/eslint-config/configs";
import { defineConfig } from "eslint/config";

export default defineConfig([...createBaseConfigs(), ...createMarkdownConfigs()]);
```

Lodash 静态导入策略同样独立：

```js
import { createLodashConfigs } from "@fast-china/eslint-config/configs";

createLodashConfigs("lodash");
createLodashConfigs("lodash-unified");
```

## 公共入口

根入口只公开：

- 默认 Vue 3 + TypeScript + UniApp Flat Config。
- `fastConfig`、`createBaseConfigs`、`FastConfigOptions`。
- `defineRules`、`RuleOptions`。

高级组合通过职责明确的子路径提供：

- `@fast-china/eslint-config/configs`：框架和功能配置片段。
- `@fast-china/eslint-config/constants`：文件 glob 与 UniApp globals。
- `@fast-china/eslint-config/rules`：带类型的原始规则记录。

## Prettier

Prettier 不作为 ESLint 规则运行。默认配置只加载 `eslint-config-prettier` 关闭冲突规则；项目需要自行安装并执行格式化：

```sh
pnpm add -D prettier
pnpm exec prettier --check .
```

## 文档

- [默认规则与风险指南](./docs/rules-risk.zh.md)
- [工程质量审查报告](./docs/engineering-audit.zh.md)
- [贡献指南](./CONTRIBUTING.md)
- [安全策略](./SECURITY.md)
- [更新日志](./CHANGELOG.md)

## 开发与贡献

```sh
pnpm install --frozen-lockfile
pnpm typegen
pnpm check
pnpm pack --dry-run
```

升级 ESLint 或插件后运行 `pnpm typegen` 并提交 `src/typegen.d.ts`。`pnpm check` 会验证类型、构建、运行时行为、发布包契约、ESLint 和格式。

## 开源协议

[Apache-2.0](./LICENSE)
