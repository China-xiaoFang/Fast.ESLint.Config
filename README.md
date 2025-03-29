[中](https://gitee.com/China-xiaoFang/fast.eslint.config) | **En**

<h1 align="center">Fast.ESLint.Config</h1>

<p align="center">
  <code>Fast</code> platform An rule library built based on <code>ESLint</code>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fast-china/eslint-config">
    <img src="https://img.shields.io/npm/v/@fast-china/eslint-config?color=orange&label=" alt="version" />
  </a>
  <a href="https://gitee.com/China-xiaoFang/fast.eslint.config/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@fast-china/eslint-config" alt="license" />
  </a>
</p>

## Install

#### Using a Package Manager

```sh
# Choose a package manager of your choice

# NPM
npm install @fast-china/eslint-config --save-dev

# Yarn
yarn add @fast-china/eslint-config --dev

# pnpm (recommend)
pnpm install @fast-china/eslint-config --save-dev
```

## Use

#### .eslintrc.cjs Example

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

#### eslint.config.mjs Example

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

## Update log

Update log [Click to view](https://gitee.com/China-xiaoFang/fast.eslint.config/commits/master)

## Protocol

[Fast.ESLint.Config](https://gitee.com/China-xiaoFang/fast.eslint.config) complies with the [Apache-2.0](https://gitee.com/China-xiaoFang/fast.eslint.config/blob/master/LICENSE) open source agreement. Welcome to submit `PR` or `Issue`.

```
Apache Open Source License

Copyright © 2018-Now xiaoFang

License:
This Agreement grants any individual or organization that obtains a copy of this software and its related documentation (hereinafter referred to as the "Software").
Subject to the terms of this Agreement, you have the right to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the Software:
1.All copies or major parts of the Software must retain this Copyright Notice and this License Agreement.
2.The use, copying, modification, or distribution of the Software shall not violate applicable laws or infringe upon the legitimate rights and interests of others.
3.Modified or derivative works must clearly indicate the original author and the source of the original Software.

Special Statement:
- This Software is provided "as is" without any express or implied warranty of any kind, including but not limited to the warranty of merchantability, fitness for purpose, and non-infringement.
- In no event shall the author or copyright holder be liable for any direct or indirect loss caused by the use or inability to use this Software.
- Including but not limited to data loss, business interruption, etc.

Disclaimer:
It is prohibited to use this software to engage in illegal activities such as endangering national security, disrupting social order, or infringing on the legitimate rights and interests of others.
The author does not assume any responsibility for any legal disputes and liabilities caused by the secondary development of this software.
```

## Disclaimer

```
Please do not use it for projects that violate our country's laws
```

## Contributors

Thank you for all their contributions!

<a href="https://github.com/China-xiaoFang/Fast.ESLint.Config/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=China-xiaoFang/Fast.ESLint.Config" />
</a>

## Supplementary instructions

```
If it is helpful to you, you can click ⭐Star in the upper right corner to collect it and get the latest updates. Thank you!
```
