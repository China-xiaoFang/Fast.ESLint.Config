<!-- 此文件由 scripts/rules-docs.ts 生成，请勿手工编辑。 -->

# ESLint 核心、Import 与 RegExp

本页记录当前依赖版本和仓库配置最终产生的 123 条规则。每条规则均列出实际严重级别、生效范围、上游说明、常见报告以及错误/正确示例。

## 仓库显式规则（69 条）

### `array-callback-return`

要求数组回调在所有可到达分支返回值，避免 `map`、`filter` 等调用静默产生 `undefined`。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/array-callback-return)
- 常见报告：`{{arrayMethodName}}() expects a value to be returned at the end of {{name}}.`；`{{arrayMethodName}}() expects a return value from {{name}}.`；`{{arrayMethodName}}() expects no useless return value from {{name}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
items.map((item) => { item.id; });
````

正确示例：

<!-- prettier-ignore -->
````js
items.map((item) => item.id);
````

### `camelcase`

变量和类型使用 camelCase；对象属性允许沿用外部协议字段名。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/camelcase)
- 常见报告：`Identifier '{{name}}' is not in camel case.`；`#{{name}} is not in camel case.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const user_name = "Fast";
````

正确示例：

<!-- prettier-ignore -->
````js
const userName = "Fast";
const payload = { user_name: userName };
````

### `curly`

简单单行分支允许省略花括号；多行分支必须使用花括号，同一条件链保持一致。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/curly)
- 常见报告：`Expected { after '{{name}}'.`；`Expected { after '{{name}}' condition.`；`Unnecessary { after '{{name}}'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (ready)
	start();
	log();
````

正确示例：

<!-- prettier-ignore -->
````js
if (ready) {
	start();
	log();
}
````

### `default-case-last`

`default` 分支不是强制项，但存在时统一位于其他 `case` 之后。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/default-case-last)
- 常见报告：`Default clause should be the last clause.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
switch (status) { default: reset(); break; case "ready": start(); }
````

正确示例：

<!-- prettier-ignore -->
````js
switch (status) { case "ready": start(); break; default: reset(); }
````

### `eqeqeq`

要求严格相等；保留 `value == null` 同时判断 `null` 与 `undefined` 的常用写法。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/eqeqeq)
- 常见报告：`Expected '{{expectedOperator}}' and instead saw '{{actualOperator}}'.`；`Use '{{expectedOperator}}' instead of '{{actualOperator}}'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (count == 0) reset();
````

正确示例：

<!-- prettier-ignore -->
````js
if (count === 0) reset();
if (value == null) useFallback();
````

### `import-x/default`

未配置 resolver 时，默认导出的静态分析容易产生误报。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/default.md)
- 常见报告：`No default export found in imported module "{{module}}".`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
import api from "./named-only.js";
````

正确示例：

<!-- prettier-ignore -->
````js
import { api } from "./named-only.js";
````

### `import-x/first`

`import` 必须位于其他语句之前，避免模块依赖散落在执行逻辑中。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/first.md)
- 常见报告：`Absolute imports should come before relative imports.`；`Import in body of module; reorder to top.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
initialize();
import { api } from "./api";
````

正确示例：

<!-- prettier-ignore -->
````js
import { api } from "./api";
initialize(api);
````

### `import-x/named`

未配置 resolver 时，命名导出的静态分析容易产生误报。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/named.md)
- 常见报告：`{{name}} not found in '{{path}}'`；`{{name}} not found via {{deepPath}}`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
import { missing } from "./api.js";
````

正确示例：

<!-- prettier-ignore -->
````js
import { request } from "./api.js";
````

### `import-x/namespace`

未配置 resolver 时，namespace 导出的静态分析容易产生误报。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/namespace.md)
- 常见报告：`No exported names found in module '{{module}}'.`；`Unable to validate computed reference to imported namespace '{{namespace}}'.`；`Assignment to member of namespace '{{namespace}}'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
import * as api from "./api.js";
api.missing();
````

正确示例：

<!-- prettier-ignore -->
````js
import * as api from "./api.js";
api.request();
````

### `import-x/no-duplicates`

合并同一模块的重复 `import`，避免绑定分散或副作用被误读。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/no-duplicates.md)
- 常见报告：`'{{module}}' imported multiple times.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
import { readFile } from "node:fs";
import { writeFile } from "node:fs";
````

正确示例：

<!-- prettier-ignore -->
````js
import { readFile, writeFile } from "node:fs";
````

### `import-x/no-named-as-default`

不限制同时存在默认导出与相近命名导出的模块 API 风格。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/no-named-as-default.md)
- 常见报告：`Using exported name '{{name}}' as identifier for default export.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
import request from "./request.js";
request();
````

正确示例：

<!-- prettier-ignore -->
````js
import { request } from "./request.js";
request();
````

### `import-x/no-named-as-default-member`

不限制通过默认导入对象访问同名属性的项目 API 风格。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/no-named-as-default-member.md)
- 常见报告：`Caution: '{{objectName}}' also has a named export '{{propName}}'. Check if you meant to write 'import {{{propName}}} from '{{sourcePath}}'' instead.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
import api from "./api.js";
api.request();
````

正确示例：

<!-- prettier-ignore -->
````js
import { request } from "./api.js";
request();
````

### `import-x/no-unresolved`

Vite 与 TypeScript 别名由项目解析器校验，避免共享配置绑定特定 resolver。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/no-unresolved.md)
- 常见报告：`Unable to resolve path to module '{{module}}'.`；`Casing of {{module}} does not match the underlying filesystem.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
import value from "./missing.js";
````

正确示例：

<!-- prettier-ignore -->
````js
import value from "./value.js";
````

### `import-x/order`

`import` 按来源分组并排序，错误顺序可由 ESLint 自动修复。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/order.md)
- 常见报告：`{{error}}`；`There should be no empty line within import group`；`There should be no empty line between import groups`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { local } from "./local";
import path from "node:path";
import { ref } from "vue";
````

正确示例：

<!-- prettier-ignore -->
````ts
import path from "node:path";
import { ref } from "vue";
import { local } from "./local";
````

### `import-x/style-imports-last`

样式导入必须形成最后一个连续分组；规则不提供修复，避免改变 CSS 层叠顺序。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：未提供
- 常见报告：`Style import '{{source}}' must occur after all non-style imports.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import "./app.css";
import { createApp } from "vue";
````

正确示例：

<!-- prettier-ignore -->
````ts
import { createApp } from "vue";
import "./app.css";
````

### `logical-assignment-operators`

将可等价改写的逻辑赋值统一为 `||=`、`&&=`、`??=`，并覆盖对应的 `if` 赋值写法。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/logical-assignment-operators)
- 常见报告：`Assignment (=) can be replaced with operator assignment ({{operator}}).`；`Convert this assignment to use the operator {{ operator }}.`；`Logical expression can be replaced with an assignment ({{ operator }}).`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
options.timeout = options.timeout || 3000;
````

正确示例：

<!-- prettier-ignore -->
````js
options.timeout ||= 3000;
````

### `no-alert`

浏览器弹窗通常不适合生产代码；使用警告允许原型调试，同时确保发布前能够被发现。

- 生效级别与范围：warn: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-alert)
- 常见报告：`Unexpected {{name}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
alert("Saved");
````

正确示例：

<!-- prettier-ignore -->
````js
showMessage("Saved");
````

### `no-case-declarations`

`switch` 的 `case` 不创建词法作用域；要求用花括号包裹声明，避免跨分支冲突。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-case-declarations)
- 常见报告：`Add {} brackets around the case block.`；`Unexpected lexical declaration in case block.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
switch (kind) { case "user": const name = getName(); use(name); break; }
````

正确示例：

<!-- prettier-ignore -->
````js
switch (kind) { case "user": { const name = getName(); use(name); break; } }
````

### `no-console`

构建、测试和 CLI 脚本允许把执行进度与诊断信息输出到终端。

- 生效级别与范围：warn: JavaScript 基础、Vue SFC、Vue JSX、UniApp NVue、React JSX、Angular TypeScript、Lodash、Lodash Unified
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue TSX、UniApp TSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-console)
- 常见报告：`Unexpected console statement.`；`Unexpected console statement. Only these console methods are allowed: {{ allowed }}.`；`Remove the console.{{ propertyName }}().`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
console.log("debug");
````

正确示例：

<!-- prettier-ignore -->
````js
console.warn("retrying");
console.error(error);
````

### `no-constant-condition`

禁止意外的恒定条件，但允许 `while (true)` 等有明确退出逻辑的循环。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-constant-condition)
- 常见报告：`Unexpected constant condition.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (true) start();
````

正确示例：

<!-- prettier-ignore -->
````js
if (ready) start();
````

### `no-control-regex`

控制字符通常来自复制或编码错误，要求使用可识别的转义写法。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-control-regex)
- 常见报告：`Unexpected control character(s) in regular expression: {{controlChars}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const separator = /\x00/;
````

正确示例：

<!-- prettier-ignore -->
````js
const separator = String.fromCharCode(0);
````

### `no-debugger`

防止调试断点进入发布代码并中断运行。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-debugger)
- 常见报告：`Unexpected 'debugger' statement.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
debugger;
start();
````

正确示例：

<!-- prettier-ignore -->
````js
start();
````

### `no-empty`

允许明确表示忽略失败的空 `catch`，其他空代码块视为遗漏。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-empty)
- 常见报告：`Empty {{type}} statement.`；`Add comment inside empty {{type}} statement.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (ready) {}
````

正确示例：

<!-- prettier-ignore -->
````js
try { connect(); } catch {}
````

### `no-eval`

禁止动态执行字符串代码，避免代码注入和静态分析失效。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-eval)
- 常见报告：`'eval' can be harmful.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
eval("run()")
````

正确示例：

<!-- prettier-ignore -->
````js
run()
````

### `no-implied-eval`

禁止 `setTimeout`、`setInterval` 等 API 通过字符串间接执行代码。

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-implied-eval)
- 常见报告：`Implied eval. Consider passing a function instead of a string.`；`Implied eval. Do not use execScript().`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
setTimeout("refresh()", 1000);
````

正确示例：

<!-- prettier-ignore -->
````js
setTimeout(() => refresh(), 1000);
````

### `no-irregular-whitespace`

禁止肉眼难以识别、可能导致解析差异的非常规空白字符。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-irregular-whitespace)
- 常见报告：`Irregular whitespace not allowed.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const value = 1;
````

正确示例：

<!-- prettier-ignore -->
````js
const value = 1;
````

### `no-misleading-character-class`

Unicode 组合字符可能让字符类匹配结果与视觉含义不一致。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-misleading-character-class)
- 常见报告：`Unexpected surrogate pair in character class. Use 'u' flag.`；`Unexpected surrogate pair in character class.`；`Unexpected combined character in character class.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const emoji = /[👍]/;
````

正确示例：

<!-- prettier-ignore -->
````js
const emoji = /[👍]/u;
````

### `no-multi-str`

禁止反斜杠续行字符串，优先使用可读性更好的模板字符串。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-multi-str)
- 常见报告：`Multiline support is limited to browsers supporting ES5 only.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const message = "first\
second";
````

正确示例：

<!-- prettier-ignore -->
````js
const message = "first" +
	"second";
````

### `no-new-func`

禁止使用 `Function` 构造器动态编译字符串代码，避免绕过静态分析和安全策略。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-new-func)
- 常见报告：`The Function constructor is eval.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const add = new Function("left", "right", "return left + right");
````

正确示例：

<!-- prettier-ignore -->
````js
const add = (left, right) => left + right;
````

### `no-promise-executor-return`

Promise executor 的返回值会被忽略，禁止误把 `return` 当作 Promise 的解析结果。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-promise-executor-return)
- 常见报告：`Return values from promise executor functions cannot be read.`；`Prepend 'void' to the expression.`；`Wrap the expression in '{}'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const value = new Promise((resolve) => resolve(1));
````

正确示例：

<!-- prettier-ignore -->
````js
const value = new Promise((resolve) => { resolve(1); });
````

### `no-redeclare`

TypeScript 重载与声明合并由扩展规则识别，关闭会把合法重载误判为重复声明的核心规则。

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-redeclare)
- 常见报告：`'{{id}}' is already defined.`；`'{{id}}' is already defined as a built-in global variable.`；`'{{id}}' is already defined by a variable declaration.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
var value = 1;
var value = 2;
````

正确示例：

<!-- prettier-ignore -->
````js
let value = 1;
value = 2;
````

### `no-regex-spaces`

正则中的连续普通空格容易漏看，使用量词或明确转义更清晰。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-regex-spaces)
- 常见报告：`Spaces are hard to count. Use {{{length}}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const words = /fast  china/;
````

正确示例：

<!-- prettier-ignore -->
````js
const words = /fast {2}china/;
````

### `no-restricted-imports`

禁止混用 `lodash-es` 与 `lodash-unified`，保持运行时和类型来源一致。

- 生效级别与范围：error: Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-restricted-imports)
- 常见报告：`'{{importSource}}' import is restricted from being used.`；`'{{importSource}}' import is restricted from being used. {{customMessage}}`；`'{{importSource}}' import is restricted from being used by a pattern.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
import debounce from "lodash-es/debounce";
````

正确示例：

<!-- prettier-ignore -->
````js
import debounce from "lodash/debounce";
````

### `no-restricted-syntax`

禁止标签语句和 `with`，避免难以追踪的跳转与动态标识符解析。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-restricted-syntax)
- 常见报告：`{{message}}`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
retryLoop: while (ready) { break retryLoop; }
````

正确示例：

<!-- prettier-ignore -->
````js
while (ready) { break; }
````

### `no-use-before-define`

变量和类先声明后使用；函数声明允许使用 JavaScript 提升语义。

- 生效级别与范围：warn: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-use-before-define)
- 常见报告：`'{{name}}' was used before it was defined.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const value = load();
const load = () => 1;
````

正确示例：

<!-- prettier-ignore -->
````js
const load = () => 1;
const value = load();
````

### `no-var`

现代项目使用 `let` 或 `const` 替代 `var`，避免函数作用域和循环闭包陷阱。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-var)
- 常见报告：`Unexpected var, use let or const instead.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
var count = 1;
````

正确示例：

<!-- prettier-ignore -->
````js
let count = 1;
const limit = 10;
````

### `no-void`

单独组合 `createTypeScriptConfigs()` 时也禁止用 `void` 操作符标记被忽略的 Promise。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-void)
- 常见报告：`Expected 'undefined' and instead saw 'void'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
void save();
````

正确示例：

<!-- prettier-ignore -->
````ts
save();
````

### `no-with`

`with` 会让标识符解析不可预测，并且在严格模式和 ESM 中不可用。

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-with)
- 常见报告：`Unexpected use of 'with' statement.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
with (settings) { apply(theme); }
````

正确示例：

<!-- prettier-ignore -->
````js
apply(settings.theme);
````

### `object-shorthand`

属性和值同名时强制使用对象简写，带引号键名不强制改写。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/object-shorthand)
- 常见报告：`Expected shorthand for all properties.`；`Expected longform method syntax for string literal keys.`；`Expected property shorthand.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const timeout = 1000;
const options = { timeout: timeout };
````

正确示例：

<!-- prettier-ignore -->
````js
const timeout = 1000;
const options = { timeout };
````

### `prefer-arrow-callback`

不依赖动态 `this` 的回调使用箭头函数；允许确实需要调用方绑定 `this` 的普通函数。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/prefer-arrow-callback)
- 常见报告：`Unexpected function expression.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
items.map(function (item) { return item.id; });
````

正确示例：

<!-- prettier-ignore -->
````js
items.map((item) => item.id);
````

### `prefer-const`

能保持引用不变的变量优先使用 `const`；读取发生在赋值前时不做不可靠判断。

- 生效级别与范围：warn: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/prefer-const)
- 常见报告：`'{{name}}' is never reassigned. Use 'const' instead.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
let timeout = 3000;
````

正确示例：

<!-- prettier-ignore -->
````js
const timeout = 3000;
````

### `prefer-exponentiation-operator`

使用幂运算符代替 `Math.pow`，使数学表达式更直接。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/prefer-exponentiation-operator)
- 常见报告：`Use the '**' operator instead of 'Math.pow'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const area = Math.pow(size, 2);
````

正确示例：

<!-- prettier-ignore -->
````js
const area = size ** 2;
````

### `prefer-object-spread`

创建新对象时用对象展开代替 `Object.assign({}, source)`，不改写会修改既有目标对象的调用。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/prefer-object-spread)
- 常见报告：`Use an object spread instead of 'Object.assign' eg: '{ ...foo }'.`；`Use an object literal instead of 'Object.assign'. eg: '{ foo: bar }'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const next = Object.assign({}, current, patch);
````

正确示例：

<!-- prettier-ignore -->
````js
const next = { ...current, ...patch };
````

### `prefer-rest-params`

使用具名 rest 参数代替 `arguments`，使参数范围明确并获得真实数组和类型推断能力。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/prefer-rest-params)
- 常见报告：`Use the rest parameters instead of 'arguments'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
function join() { return Array.from(arguments).join(","); }
````

正确示例：

<!-- prettier-ignore -->
````js
function join(...values) { return values.join(","); }
````

### `prefer-spread`

参数数组展开调用时使用 `fn(...args)` 代替 `fn.apply(thisArg, args)`，使调用目标和参数更直观。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/prefer-spread)
- 常见报告：`Use the spread operator instead of '.apply()'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
items.push.apply(items, nextItems);
````

正确示例：

<!-- prettier-ignore -->
````js
items.push(...nextItems);
````

### `prefer-template`

字符串中包含变量时使用模板字符串，减少多段 `+` 拼接和隐式类型转换造成的歧义。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/prefer-template)
- 常见报告：`Unexpected string concatenation.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const name = "Fast";
const message = "Hello, " + name + "!";
````

正确示例：

<!-- prettier-ignore -->
````js
const name = "Fast";
const message = `Hello, ${name}!`;
````

### `regexp/confusing-quantifier`

相邻量词的作用范围容易被误读，保留警告供人工复核。

- 生效级别与范围：warn: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/confusing-quantifier.html)
- 常见报告：`This quantifier is confusing because its minimum is {{min}} but it can match the empty string. Maybe replace it with '{{proposal}}' to reflect that it can match the empty string?`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /(?:a*)+/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /a*/;
````

### `regexp/no-contradiction-with-assertion`

断言与其内部条件矛盾时表达式永远无法按预期匹配。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-contradiction-with-assertion.html)
- 常见报告：`The alternative {{ alt }} can never be entered because it contradicts with the assertion {{ assertion }}. Either change the alternative or assertion to resolve the contradiction.`；`The quantifier {{ quant }} can never be entered because its element contradicts with the assertion {{ assertion }}. Change or remove the quantifier or change the assertion to resolve the contradiction.`；`The quantifier {{ quant }} is always entered despite having a minimum of 0. This is because the assertion {{ assertion }} contradicts with the element(s) after the quantifier. Either set the minimum to 1 ({{ newQuant }}) or change the assertion.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /(?=a)b*/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /(?=a)a+/;
````

### `regexp/no-dupe-characters-character-class`

字符类中的重复字符通常表示拼写或范围设计错误。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-dupe-characters-character-class.html)
- 常见报告：`Unexpected duplicate {{duplicate}}.`；`Unexpected duplicate. {{duplicate}} is a duplicate of {{element}}.`；`{{subsetElement}} is already included in {{element}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /[aa-z]/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /[a-z]/;
````

### `regexp/no-dupe-disjunctions`

重复或被完全覆盖的分支通常表示条件遗漏。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-dupe-disjunctions.html)
- 常见报告：`Unexpected duplicate alternative. This alternative can be removed.{{cap}}{{exp}}`；`Unexpected useless alternative. This alternative is a strict subset of {{others}} and can be removed.{{cap}}{{exp}}`；`Unexpected useless element. All paths of {{root}} that go through {{nested}} are a strict subset of {{others}}. This element can be removed.{{cap}}{{exp}}`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /(?:fast|fast)/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /(?:fast|slow)/;
````

### `regexp/no-empty-alternative`

空分支可能是有意匹配空字符串，也可能是遗漏，因此只警告。

- 生效级别与范围：warn: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-empty-alternative.html)
- 常见报告：`This empty alternative might be a mistake. If not, use a quantifier instead.`；`Use a quantifier instead.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /(?:fast|)/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /(?:fast|slow)/;
````

### `regexp/no-empty-capturing-group`

空捕获组不会捕获有效内容，通常属于表达式残留。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-empty-capturing-group.html)
- 常见报告：`Unexpected capture empty.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /()/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /(fast)/;
````

### `regexp/no-empty-character-class`

空字符类永远无法匹配字符。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-empty-character-class.html)
- 常见报告：`This character class matches no characters because it is empty.`；`This character class cannot match any characters.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /[]/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /[a-z]/;
````

### `regexp/no-empty-group`

空分组通常表示编辑遗漏。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-empty-group.html)
- 常见报告：`Unexpected empty group.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /(?:)/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /(?:fast)/;
````

### `regexp/no-empty-lookarounds-assertion`

空前后查找不会表达有效约束。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-empty-lookarounds-assertion.html)
- 常见报告：`Unexpected empty {{kind}}. It will trivially {{result}} all inputs.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /(?=)fast/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /(?=fast)fast/;
````

### `regexp/no-extra-lookaround-assertions`

多余嵌套断言可能改变捕获或回溯边界，应视为结构错误。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-extra-lookaround-assertions.html)
- 常见报告：`This {{kind}} assertion is useless and can be inlined.`；`This {{kind}} assertion is useless and can be converted into a group.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /(?=(?=fast))fast/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /(?=fast)fast/;
````

### `regexp/no-invalid-regexp`

检查 `RegExp` 构造器字符串和字面量中的无效语法及标志。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-invalid-regexp.html)
- 常见报告：`{{message}}`；`Duplicate {{flag}} flag.`；`Regex 'u' and 'v' flags cannot be used together.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = new RegExp("[");
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = new RegExp("[a-z]");
````

### `regexp/no-invisible-character`

不可见字符容易造成审查遗漏和匹配异常。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-invisible-character.html)
- 常见报告：`Unexpected invisible character. Use '{{instead}}' instead.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /​/u;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /\u200B/u;
````

### `regexp/no-misleading-capturing-group`

捕获组边界具有误导性时，反向引用和替换结果可能不符合预期。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-misleading-capturing-group.html)
- 常见报告：`{{quant}} can be removed because it is already included by {{cause}}. This makes the capturing group misleading, because it actually captures less text than its pattern suggests.`；`{{quant}} can be replaced with {{fix}} because of {{cause}}. This makes the capturing group misleading, because it actually captures less text than its pattern suggests.`；`Remove {{quant}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /(a+)+/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /a+/;
````

### `regexp/no-misleading-unicode-character`

Unicode 字符的视觉形式与代码点不一致时容易产生错误匹配。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-misleading-unicode-character.html)
- 常见报告：`The character(s) {{ graphemes }} are all represented using multiple {{ unit }}.{{ uFlag }}`；`The character {{ grapheme }} is represented using multiple Unicode code points. The quantifier only applies to the last code point {{ last }} and not to the whole character.`；`The character {{ grapheme }} is represented using a surrogate pair. The quantifier only applies to the tailing surrogate {{ last }} and not to the whole character.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /[👍]/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /[👍]/u;
````

### `regexp/no-missing-g-flag`

`replaceAll` 等全局操作缺少 `g` 标志时会在运行时失败或行为不一致。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-missing-g-flag.html)
- 常见报告：`The pattern given to the argument of 'String#{{method}}()' requires the 'g' flag, but is missing it.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const text = "item item";
const matches = text.matchAll(/item/);
````

正确示例：

<!-- prettier-ignore -->
````js
const text = "item item";
const matches = text.matchAll(/item/g);
````

### `regexp/no-non-standard-flag`

禁止 JavaScript 不支持的非标准正则标志。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-non-standard-flag.html)
- 常见报告：`Unexpected non-standard flag '{{flag}}'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = new RegExp("item", "x");
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = new RegExp("item", "u");
````

### `regexp/no-optional-assertion`

可选断言几乎总能通过，通常无法表达预期约束。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-optional-assertion.html)
- 常见报告：`This assertion effectively optional and does not change the pattern. Either remove the assertion or change the parent quantifier '{{quantifier}}'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /(?:^)?item/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /^item/;
````

### `regexp/no-super-linear-backtracking`

阻止可被构造输入触发的超线性回溯，降低拒绝服务风险。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-super-linear-backtracking.html)
- 常见报告：`This quantifier can reach itself via the loop {{parent}}. Using any string accepted by {{attack}}, this can be exploited to cause at least polynomial backtracking.{{exp}}`；`The quantifier {{start}} can exchange characters with {{end}}. Using any string accepted by {{attack}}, this can be exploited to cause at least polynomial backtracking.{{exp}}`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /(a+)+$/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /^a+$/;
````

### `regexp/no-useless-backreference`

无效反向引用无法引用预期捕获内容。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-useless-backreference.html)
- 常见报告：`Backreference {{ bref }} will be ignored. It references group {{ group }}{{ otherGroups }} from within that group.`；`Backreference {{ bref }} will be ignored. It references group {{ group }}{{ otherGroups }} which appears later in the pattern.`；`Backreference {{ bref }} will be ignored. It references group {{ group }}{{ otherGroups }} which appears before in the same lookbehind.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /\1(a)/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /(a)\1/;
````

### `regexp/no-useless-dollar-replacements`

替换字符串引用不存在的捕获组时不会得到预期结果。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-useless-dollar-replacements.html)
- 常见报告：`'${{ refText }}' replacement will insert '${{ refText }}' because there are less than {{ num }} capturing groups. Use '$$' if you want to escape '$'.`；`'${{ refText }}' replacement will insert '${{ refText }}' because capturing group is not found. Use '$$' if you want to escape '$'.`；`'$<{{ refText }}>' replacement will be ignored because the named capturing group is not found. Use '$$' if you want to escape '$'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const text = "item";
const value = text.replace(/item/g, "$1");
````

正确示例：

<!-- prettier-ignore -->
````js
const text = "item";
const value = text.replace(/(item)/g, "$1");
````

### `regexp/no-zero-quantifier`

零次量词会让对应模式永远不参与匹配，通常是边界笔误。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-zero-quantifier.html)
- 常见报告：`Unexpected zero quantifier. The quantifier and its quantified element can be removed without affecting the pattern.`；`Unexpected zero quantifier. The quantifier and its quantified element do not affecting the pattern. Try to remove the elements but be careful because it contains at least one capturing group.`；`Remove this zero quantifier.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /item{0}/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /item/;
````

### `regexp/strict`

使用严格模式检查容易产生歧义或跨引擎差异的正则结构。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-regexp/rules/strict.html)
- 常见报告：`Invalid or incomplete control escape sequence. Either use a valid control escape sequence or escaping the standalone backslash.`；`Incomplete escape sequence {{expr}}. Either use a valid escape sequence or remove the useless escaping.`；`Invalid property escape sequence {{expr}}. Either use a valid property escape sequence or remove the useless escaping.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /\q/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /q/;
````

### `sort-imports`

`import` 声明内部的成员按名称排序；声明之间的分组和顺序交给 `import-x/order`。

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/sort-imports)
- 常见报告：`Imports should be sorted alphabetically.`；`Member '{{memberName}}' of the import declaration should be sorted alphabetically.`；`Expected '{{syntaxA}}' syntax before '{{syntaxB}}' syntax.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { zebra, alpha } from "./names";
````

正确示例：

<!-- prettier-ignore -->
````ts
import { alpha, zebra } from "./names";
````

## 第三方预置规则（54 条）

### `constructor-super`

检查该规则对应的代码约束。上游说明：Require `super()` calls in constructors

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/constructor-super)
- 常见报告：`Lacked a call of 'super()' in some code paths.`；`Expected to call 'super()'.`；`Unexpected duplicate 'super()'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
class User extends Entity { constructor() {} }
````

正确示例：

<!-- prettier-ignore -->
````js
class User extends Entity { constructor() { super(); } }
````

### `for-direction`

检查该规则对应的代码约束。上游说明：Enforce `for` loop update clause moving the counter in the right direction

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/for-direction)
- 常见报告：`The update clause in this loop moves the variable in the wrong direction.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
for (let index = 0; index < 10; index--) process(index);
````

正确示例：

<!-- prettier-ignore -->
````js
for (let index = 0; index < 10; index++) process(index);
````

### `getter-return`

检查该规则对应的代码约束。上游说明：Enforce `return` statements in getters

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/getter-return)
- 常见报告：`Expected to return a value in {{name}}.`；`Expected {{name}} to always return a value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const user = { get name() { logAccess(); } };
````

正确示例：

<!-- prettier-ignore -->
````js
const user = { get name() { return "Fast"; } };
````

### `import-x/export`

检查该规则对应的代码约束。上游说明：Forbid any invalid exports, i.e. re-export of the same name.

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.17.1/docs/rules/export.md)
- 常见报告：`No named exports found in module '{{module}}'.`；`Multiple default exports.`；`Multiple exports of name '{{name}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
export const value = 1;
export { value };
````

正确示例：

<!-- prettier-ignore -->
````js
export const value = 1;
````

### `no-async-promise-executor`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow using an async function as a Promise executor

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-async-promise-executor)
- 常见报告：`Promise executor functions should not be async.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const value = new Promise(async (resolve) => resolve(await load()));
````

正确示例：

<!-- prettier-ignore -->
````js
const value = Promise.resolve(load());
````

### `no-class-assign`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow reassigning class members

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-class-assign)
- 常见报告：`'{{name}}' is a class.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
class User {}
User = class Admin {};
````

正确示例：

<!-- prettier-ignore -->
````js
class User {}
const Admin = class extends User {};
````

### `no-compare-neg-zero`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow comparing against `-0`

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-compare-neg-zero)
- 常见报告：`Do not use the '{{operator}}' operator to compare against -0.`；`Replace '-0' with '0' (keeps the current comparison behavior).`；`Replace with 'Object.is()' (changes the comparison to distinguish -0 from +0).`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (value === -0) handle();
````

正确示例：

<!-- prettier-ignore -->
````js
if (Object.is(value, -0)) handle();
````

### `no-cond-assign`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow assignment operators in conditional expressions

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-cond-assign)
- 常见报告：`Unexpected assignment within {{type}}.`；`Expected a conditional expression and instead saw an assignment.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (user = findUser()) render(user);
````

正确示例：

<!-- prettier-ignore -->
````js
const user = findUser();
if (user) render(user);
````

### `no-const-assign`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow reassigning `const`, `using`, and `await using` variables

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-const-assign)
- 常见报告：`'{{name}}' is constant.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const timeout = 1000;
timeout = 2000;
````

正确示例：

<!-- prettier-ignore -->
````js
let timeout = 1000;
timeout = 2000;
````

### `no-constant-binary-expression`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow expressions where the operation doesn't affect the value

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-constant-binary-expression)
- 常见报告：`Unexpected constant binary expression. Compares constantly with the {{otherSide}}-hand side of the '{{operator}}'.`；`Unexpected constant {{property}} on the left-hand side of a '{{operator}}' expression.`；`Unexpected comparison to newly constructed object. These two values can never be equal.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const allowed = true || ready;
````

正确示例：

<!-- prettier-ignore -->
````js
const allowed = ready || fallbackAllowed;
````

### `no-delete-var`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow deleting variables

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-delete-var)
- 常见报告：`Variables should not be deleted.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
var token;
delete token;
````

正确示例：

<!-- prettier-ignore -->
````js
let token;
token = undefined;
````

### `no-dupe-args`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow duplicate arguments in `function` definitions

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-dupe-args)
- 常见报告：`Duplicate param '{{name}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
function add(value, value) { return value; }
````

正确示例：

<!-- prettier-ignore -->
````js
function add(left, right) { return left + right; }
````

### `no-dupe-class-members`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow duplicate class members

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-dupe-class-members)
- 常见报告：`Duplicate name '{{name}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
class User { save() {} save() {} }
````

正确示例：

<!-- prettier-ignore -->
````js
class User { save() {} cancel() {} }
````

### `no-dupe-else-if`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow duplicate conditions in if-else-if chains

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-dupe-else-if)
- 常见报告：`This branch can never execute. Its condition is a duplicate or covered by previous conditions in the if-else-if chain.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (ready) start(); else if (ready) retry();
````

正确示例：

<!-- prettier-ignore -->
````js
if (ready) start(); else if (retryable) retry();
````

### `no-dupe-keys`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow duplicate keys in object literals

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-dupe-keys)
- 常见报告：`Duplicate key '{{name}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const user = { name: "A", name: "B" };
````

正确示例：

<!-- prettier-ignore -->
````js
const user = { firstName: "A", lastName: "B" };
````

### `no-duplicate-case`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow duplicate case labels

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-duplicate-case)
- 常见报告：`Duplicate case label.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
switch (status) { case "ready": start(); break; case "ready": retry(); }
````

正确示例：

<!-- prettier-ignore -->
````js
switch (status) { case "ready": start(); break; case "failed": retry(); }
````

### `no-empty-character-class`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow empty character classes in regular expressions

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-empty-character-class)
- 常见报告：`Empty class.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /[]/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /[a-z]/;
````

### `no-empty-pattern`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow empty destructuring patterns

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-empty-pattern)
- 常见报告：`Unexpected empty {{type}} pattern.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const {} = user;
````

正确示例：

<!-- prettier-ignore -->
````js
const { id } = user;
use(id);
````

### `no-empty-static-block`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow empty static blocks

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-empty-static-block)
- 常见报告：`Unexpected empty static block.`；`Add comment inside empty static block.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
class Cache { static {} }
````

正确示例：

<!-- prettier-ignore -->
````js
class Cache { static { Cache.initialize(); } }
````

### `no-ex-assign`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow reassigning exceptions in `catch` clauses

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-ex-assign)
- 常见报告：`Do not assign to the exception parameter.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
try { run(); } catch (error) { error = normalize(error); throw error; }
````

正确示例：

<!-- prettier-ignore -->
````js
try { run(); } catch (error) { throw normalize(error); }
````

### `no-extra-boolean-cast`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow unnecessary boolean casts

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-extra-boolean-cast)
- 常见报告：`Redundant Boolean call.`；`Redundant double negation.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (!!ready) start();
````

正确示例：

<!-- prettier-ignore -->
````js
if (ready) start();
````

### `no-fallthrough`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow fallthrough of `case` statements

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-fallthrough)
- 常见报告：`Found a comment that would permit fallthrough, but case cannot fall through.`；`Expected a 'break' statement before 'case'.`；`Expected a 'break' statement before 'default'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
switch (status) { case "ready": start(); case "done": finish(); }
````

正确示例：

<!-- prettier-ignore -->
````js
switch (status) { case "ready": start(); break; case "done": finish(); }
````

### `no-func-assign`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow reassigning `function` declarations

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-func-assign)
- 常见报告：`'{{name}}' is a function.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
function load() {}
load = createLoader();
````

正确示例：

<!-- prettier-ignore -->
````js
let load = createLoader();
load = createCachedLoader();
````

### `no-global-assign`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow assignments to native objects or read-only global variables

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-global-assign)
- 常见报告：`Read-only global '{{name}}' should not be modified.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
undefined = 1;
````

正确示例：

<!-- prettier-ignore -->
````js
const missingValue = undefined;
````

### `no-import-assign`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow assigning to imported bindings

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-import-assign)
- 常见报告：`'{{name}}' is read-only.`；`The members of '{{name}}' are read-only.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
import * as api from "./api.js";
api = {};
````

正确示例：

<!-- prettier-ignore -->
````js
import * as api from "./api.js";
api.request();
````

### `no-invalid-regexp`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow invalid regular expression strings in `RegExp` constructors

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-invalid-regexp)
- 常见报告：`{{message}}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = new RegExp("[");
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = new RegExp("[a-z]");
````

### `no-loss-of-precision`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow literal numbers that lose precision

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-loss-of-precision)
- 常见报告：`This number literal will lose precision at runtime.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const id = 9007199254740993;
````

正确示例：

<!-- prettier-ignore -->
````js
const id = 9007199254740993n;
````

### `no-new-native-nonconstructor`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow `new` operators with global non-constructor functions

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-new-native-nonconstructor)
- 常见报告：`'{{name}}' cannot be called as a constructor.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const token = new Symbol();
````

正确示例：

<!-- prettier-ignore -->
````js
const token = Symbol();
````

### `no-nonoctal-decimal-escape`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow `\8` and `\9` escape sequences in string literals

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape)
- 常见报告：`Don't use '{{decimalEscape}}' escape sequence.`；`Replace '{{original}}' with '{{replacement}}'. This maintains the current functionality.`；`Replace '{{original}}' with '{{replacement}}' to include the actual backslash character.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const digit = "\8";
````

正确示例：

<!-- prettier-ignore -->
````js
const digit = "8";
````

### `no-obj-calls`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow calling global object properties as functions

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-obj-calls)
- 常见报告：`'{{name}}' is not a function.`；`'{{name}}' is reference to '{{ref}}', which is not a function.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const value = Math();
````

正确示例：

<!-- prettier-ignore -->
````js
const value = Math.max(1, 2);
````

### `no-octal`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow octal literals

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-octal)
- 常见报告：`Octal literals should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const mode = 071;
````

正确示例：

<!-- prettier-ignore -->
````js
const mode = 0o71;
````

### `no-prototype-builtins`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow calling some `Object.prototype` methods directly on objects

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-prototype-builtins)
- 常见报告：`Do not access Object.prototype method '{{prop}}' from target object.`；`Call Object.prototype.{{prop}} explicitly.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (payload.hasOwnProperty(key)) use(payload[key]);
````

正确示例：

<!-- prettier-ignore -->
````js
if (Object.hasOwn(payload, key)) use(payload[key]);
````

### `no-self-assign`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow assignments where both sides are exactly the same

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-self-assign)
- 常见报告：`'{{name}}' is assigned to itself.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
user.name = user.name;
````

正确示例：

<!-- prettier-ignore -->
````js
user.name = nextName;
````

### `no-setter-return`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow returning values from setters

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-setter-return)
- 常见报告：`Setter cannot return a value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const user = { set name(value) { return value; } };
````

正确示例：

<!-- prettier-ignore -->
````js
const user = { set name(value) { saveName(value); } };
````

### `no-shadow-restricted-names`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow identifiers from shadowing restricted names

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-shadow-restricted-names)
- 常见报告：`Shadowing of global property '{{name}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const undefined = 1;
````

正确示例：

<!-- prettier-ignore -->
````js
const missingValue = undefined;
````

### `no-sparse-arrays`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow sparse arrays

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-sparse-arrays)
- 常见报告：`Unexpected comma in middle of array.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const values = [1, , 3];
````

正确示例：

<!-- prettier-ignore -->
````js
const values = [1, undefined, 3];
````

### `no-this-before-super`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow `this`/`super` before calling `super()` in constructors

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-this-before-super)
- 常见报告：`'{{kind}}' is not allowed before 'super()'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
class User extends Entity { constructor() { this.ready = true; super(); } }
````

正确示例：

<!-- prettier-ignore -->
````js
class User extends Entity { constructor() { super(); this.ready = true; } }
````

### `no-unassigned-vars`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow `let` or `var` variables that are read but never assigned

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-unassigned-vars)
- 常见报告：`'{{name}}' is always 'undefined' because it's never assigned.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
let result;
render(result);
````

正确示例：

<!-- prettier-ignore -->
````js
const result = load();
render(result);
````

### `no-undef`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow the use of undeclared variables unless mentioned in `/*global */` comments

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-undef)
- 常见报告：`'{{name}}' is not defined.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
total = price * count;
````

正确示例：

<!-- prettier-ignore -->
````js
const price = 10;
const count = 2;
const total = price * count;
````

### `no-unreachable`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-unreachable)
- 常见报告：`Unreachable code.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
function load() { return value; log(value); }
````

正确示例：

<!-- prettier-ignore -->
````js
function load() { log(value); return value; }
````

### `no-unsafe-finally`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow control flow statements in `finally` blocks

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-unsafe-finally)
- 常见报告：`Unsafe usage of {{nodeType}}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
function load() { try { return fetchValue(); } finally { return fallback; } }
````

正确示例：

<!-- prettier-ignore -->
````js
function load() { try { return fetchValue(); } finally { release(); } }
````

### `no-unsafe-negation`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow negating the left operand of relational operators

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-unsafe-negation)
- 常见报告：`Unexpected negating the left operand of '{{operator}}' operator.`；`Negate '{{operator}}' expression instead of its left operand. This changes the current behavior.`；`Wrap negation in '()' to make the intention explicit. This preserves the current behavior.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (!key in object) handleMissing();
````

正确示例：

<!-- prettier-ignore -->
````js
if (!(key in object)) handleMissing();
````

### `no-unsafe-optional-chaining`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow use of optional chaining in contexts where the `undefined` value is not allowed

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining)
- 常见报告：`Unsafe usage of optional chaining. If it short-circuits with 'undefined' the evaluation will throw TypeError.`；`Unsafe arithmetic operation on optional chaining. It can result in NaN.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const { name } = user?.profile;
````

正确示例：

<!-- prettier-ignore -->
````js
const name = user?.profile?.name;
````

### `no-unused-labels`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow unused labels

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-unused-labels)
- 常见报告：`'{{name}}:' is defined but never used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
retry: run();
````

正确示例：

<!-- prettier-ignore -->
````js
run();
````

### `no-unused-private-class-members`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow unused private class members

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-unused-private-class-members)
- 常见报告：`'{{classMemberName}}' is defined but never used.`；`Remove unused private class member '{{classMemberName}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
class User { #secret = 1; getName() { return "Fast"; } }
````

正确示例：

<!-- prettier-ignore -->
````js
class User { #name; constructor(name) { this.#name = name; } getName() { return this.#name; } }
````

### `no-unused-vars`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow unused variables

- 生效级别与范围：error: JavaScript 基础、Vue JSX、React JSX、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-unused-vars)
- 常见报告：`'{{varName}}' is {{action}} but never used{{additional}}.`；`'{{varName}}' is marked as ignored but is used{{additional}}.`；`Remove unused variable '{{varName}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const unusedValue = load();
````

正确示例：

<!-- prettier-ignore -->
````js
const value = load();
render(value);
````

### `no-useless-assignment`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow variable assignments when the value is not used

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-useless-assignment)
- 常见报告：`The value assigned to '{{name}}' is not used in subsequent statements.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
function getStatus() { let status = "idle";
status = "ready";
return status; }
````

正确示例：

<!-- prettier-ignore -->
````js
function getStatus() { const status = "ready";
return status; }
````

### `no-useless-backreference`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow useless backreferences in regular expressions

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-useless-backreference)
- 常见报告：`Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} from within that group.`；`Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} which appears later in the pattern.`；`Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} which appears before in the same lookbehind.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const pattern = /\1(a)/;
````

正确示例：

<!-- prettier-ignore -->
````js
const pattern = /(a)\1/;
````

### `no-useless-catch`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow unnecessary `catch` clauses

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-useless-catch)
- 常见报告：`Unnecessary catch clause.`；`Unnecessary try/catch wrapper.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
try { run(); } catch (error) { throw error; }
````

正确示例：

<!-- prettier-ignore -->
````js
run();
````

### `no-useless-escape`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow unnecessary escape characters

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/no-useless-escape)
- 常见报告：`Unnecessary escape character: \{{character}}.`；`Remove the '\'. This maintains the current functionality.`；`Remove the '\' if it was inserted by mistake.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
const name = "Fast\!";
````

正确示例：

<!-- prettier-ignore -->
````js
const name = "Fast!";
````

### `preserve-caught-error`

检查该规则对应的代码约束。上游说明：Disallow losing originally caught error when re-throwing custom errors

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/preserve-caught-error)
- 常见报告：`There is no 'cause' attached to the symptom error being thrown.`；`The symptom error is being thrown with an incorrect 'cause'.`；`Include the original caught error as the 'cause' of the symptom error.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
try { connect(); } catch (error) { throw new Error("Connection failed"); }
````

正确示例：

<!-- prettier-ignore -->
````js
try { connect(); } catch (error) { throw new Error("Connection failed", { cause: error }); }
````

### `require-yield`

要求补齐该规则所需的声明、属性或结构。上游说明：Require generator functions to contain `yield`

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/require-yield)
- 常见报告：`This generator function does not have 'yield'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
function* values() { return 1; }
````

正确示例：

<!-- prettier-ignore -->
````js
function* values() { yield 1; }
````

### `use-isnan`

检查该规则对应的代码约束。上游说明：Require calls to `isNaN()` when checking for `NaN`

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/use-isnan)
- 常见报告：`Use the isNaN function to compare with NaN.`；`'switch(NaN)' can never match a case clause. Use Number.isNaN instead of the switch.`；`'case NaN' can never match. Use Number.isNaN before the switch.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (value === NaN) reset();
````

正确示例：

<!-- prettier-ignore -->
````js
if (Number.isNaN(value)) reset();
````

### `valid-typeof`

校验对应语法、属性或参数是否合法。上游说明：Enforce comparing `typeof` expressions against valid strings

- 生效级别与范围：error: JavaScript 基础、TypeScript 基础、框架无关 TSX、Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX、React JSX、React TSX、Angular TypeScript、Lodash、Lodash Unified
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.org/docs/latest/rules/valid-typeof)
- 常见报告：`Invalid typeof comparison value.`；`Typeof comparisons should be to string literals.`；`Use '"{{type}}"' instead of '{{type}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
if (typeof value === "strnig") reset();
````

正确示例：

<!-- prettier-ignore -->
````js
if (typeof value === "string") reset();
````
