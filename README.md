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

```typescript
// < v9.x version. The following is an example of '.eslintrc.cjs'.

// Simple.
module.exports = {
  root: true,
  extends: ["@fast-china"],
};

// With TypeScript type hints.
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  extends: ["@fast-china/eslint-config"],
});

// >= v9.x version. The following is an example of 'eslint.config.mjs'.

// Simple.
import fastChinaFlat from "@fast-china/eslint-config/flat";

export default [...fastChinaFlat];

// With TypeScript type hints.
import tseslint from "typescript-eslint";
import fastChinaFlat from "@fast-china/eslint-config/flat";

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

The right to deal in the Software is hereby granted free of charge to any person obtaining a copy of this software and its related documentation (the "Software"),
Including but not limited to using, copying, modifying, merging, publishing, distributing, sublicensing, selling copies of the Software,
and permit individuals in possession of a copy of the software to do so, subject to the following conditions:

The above copyright notice and this license notice must be included on all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS AND NON-INFRINGEMENT.
In no event shall the author or copyright holder be liable for any claim, damages or other liability,
WHETHER ARISING IN CONTRACT, TORT OR OTHERWISE, IN CONNECTION WITH THE SOFTWARE OR ITS USE OR OTHER DEALINGS.
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
