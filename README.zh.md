**中** | [En](https://github.com/China-xiaoFang/fast.eslint.config)

<h1 align="center">Fast.ESLint.Config</h1>

<p align="center">
  <code>Fast</code> 平台下基于 <code>ESLint</code> 构建的规则库。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fast-china/eslint-config">
    <img src="https://img.shields.io/npm/v/@fast-china/eslint-config?color=orange&label=" alt="version" />
  </a>
  <a href="https://gitee.com/China-xiaoFang/fast.eslint.config/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@fast-china/eslint-config" alt="license" />
  </a>
</p>

## 安装

#### 使用包管理器

```sh
# 选择一个你喜欢的包管理器

# NPM
npm install @fast-china/eslint-config --save-dev

# Yarn
yarn add @fast-china/eslint-config --dev

# pnpm（推荐）
pnpm install @fast-china/eslint-config --save-dev
```

## 使用

#### .eslintrc.cjs 示例

```javascript
module.exports = {
	root: true,
	extends: ["@fast-china"],
};
```

```javascript
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	root: true,
	extends: ["@fast-china/eslint-config"],
});
```

#### eslint.config.mjs 示例

```typescript
import fastChinaFlat from "@fast-china/eslint-config/flat";

export default [...fastChinaFlat];
```

```typescript
import fastChinaFlat from "@fast-china/eslint-config/flat";
import { defineConfig } from "eslint/config";

export default defineConfig(...fastChinaFlat);
```

```typescript
import fastChinaFlat from "@fast-china/eslint-config/flat";
import tseslint from "typescript-eslint";

export default tseslint.config({
	extends: [...fastChinaFlat],
});
```

## 更新日志

更新日志 [点击查看](https://gitee.com/China-xiaoFang/fast.eslint.config/commits/master)

## 协议

[Fast.ESLint.Config](https://gitee.com/China-xiaoFang/fast.eslint.config) 遵循 [Apache-2.0](https://gitee.com/China-xiaoFang/fast.eslint.config/blob/master/LICENSE) 开源协议，欢迎大家提交 `PR` 或 `Issue`。

```
Apache开源许可证

版权所有 © 2018-Now 小方

特此免费授予获得本软件及其相关文档文件（以下简称“软件”）副本的任何人以处理本软件的权利，
包括但不限于使用、复制、修改、合并、发布、分发、再许可、销售软件的副本，
以及允许拥有软件副本的个人进行上述行为，但须遵守以下条件：

在所有副本或重要部分的软件中必须包括上述版权声明和本许可声明。

软件按“原样”提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、适用性和非侵权的保证。
在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，
无论是因合同、侵权或其他方式引起的，与软件或其使用或其他交易有关。
```

## 免责申明

```
请勿用于违反我国法律的项目上
```

## 贡献者

感谢他们的所做的一切贡献！

<a href="https://github.com/China-xiaoFang/Fast.ESLint.Config/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=China-xiaoFang/Fast.ESLint.Config" />
</a>

## 补充说明

```
如果对您有帮助，您可以点右上角 ⭐Star 收藏一下 ，获取第一时间更新，谢谢！
```
