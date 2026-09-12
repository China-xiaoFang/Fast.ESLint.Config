<!-- 此文件由 scripts/rules-docs.ts 生成，请勿手工编辑。 -->

# TypeScript

本页记录当前依赖版本和仓库配置最终产生的 79 条规则。每条规则均列出实际严重级别、生效范围、上游说明、常见报告以及错误/正确示例。

## 仓库显式规则（47 条）

### `@typescript-eslint/class-literal-property-style`

不强制类的只读字面量属性改写为 getter 或字段中的某一种固定形式。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/class-literal-property-style)
- 常见报告：`Literals should be exposed using readonly fields.`；`Replace the literals with readonly fields.`；`Literals should be exposed using getters.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
class Status { get ready(): "ready" { return "ready"; } }
````

正确示例：

<!-- prettier-ignore -->
````ts
class Status { readonly ready = "ready" as const; }
````

### `@typescript-eslint/consistent-indexed-object-style`

不强制使用索引签名、`Record` 或映射类型中的某一种固定写法。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/consistent-indexed-object-style)
- 常见报告：`An index signature is preferred over a record.`；`Change into an index signature instead of a record.`；`A record is preferred over an index signature.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
type Scores = { [name: string]: number };
````

正确示例：

<!-- prettier-ignore -->
````ts
type Scores = Record<string, number>;
````

### `@typescript-eslint/consistent-type-definitions`

不强制使用 `interface` 或 `type` 的单一类型定义形式。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/consistent-type-definitions)
- 常见报告：`Use an 'interface' instead of a 'type'.`；`Use a 'type' instead of an 'interface'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
type User = { id: number };
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { id: number }
````

### `@typescript-eslint/consistent-type-exports`

纯类型导出必须使用 `export type`，避免生成或暗示不存在的运行时导出。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/consistent-type-exports)
- 常见报告：`Type exports {{exportNames}} are not values and should be exported using 'export type'.`；`Type export {{exportNames}} is not a value and should be exported using 'export type'.`；`All exports in the declaration are only used as types. Use 'export type'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface User { id: string }
export { User };
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { id: string }
export type { User };
````

### `@typescript-eslint/consistent-type-imports`

纯类型依赖必须使用独立的 `import type`，避免生成无用运行时导入并统一导入声明结构。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/consistent-type-imports)
- 常见报告：`Use an 'import' instead of an 'import type'.`；`'import()' type annotations are forbidden.`；`Imports {{typeImports}} are only used as type.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { Stats } from "node:fs";
export const getSize = (stats: Stats): number => stats.size;
````

正确示例：

<!-- prettier-ignore -->
````ts
import type { Stats } from "node:fs";
export const getSize = (stats: Stats): number => stats.size;
````

### `@typescript-eslint/explicit-function-return-type`

SFC 以模板上下文和快速迭代为主，不强制补写函数返回类型。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/explicit-function-return-type)
- 常见报告：`Missing return type on function.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
function load() { return 1; }
````

正确示例：

<!-- prettier-ignore -->
````ts
function load(): number { return 1; }
````

### `@typescript-eslint/explicit-module-boundary-types`

SFC 的导出宏由 Vue 编译器建立契约，不强制补写普通模块边界类型。

- 生效级别与范围：error: TypeScript 基础、Angular TypeScript
- 关闭范围：框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/explicit-module-boundary-types)
- 常见报告：`Argument '{{name}}' should be typed with a non-any type.`；`{{type}} argument should be typed with a non-any type.`；`Argument '{{name}}' should be typed.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
export const add = (left, right) => left + right;
````

正确示例：

<!-- prettier-ignore -->
````ts
export const add = (left: number, right: number): number => left + right;
````

### `@typescript-eslint/no-confusing-void-expression`

保留简洁的 `() => notify()` 回调，其他容易混淆 `void` 值与返回值的用法继续检查。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-confusing-void-expression)
- 常见报告：`Placing a void expression inside another expression is forbidden. Move it to its own statement instead.`；`Returning a void expression from an arrow function shorthand is forbidden. Please add braces to the arrow function.`；`Void expressions returned from an arrow function shorthand must be marked explicitly with the 'void' operator.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const result = console.log("saved");
````

正确示例：

<!-- prettier-ignore -->
````ts
console.log("saved");
````

### `@typescript-eslint/no-deprecated`

弃用 API 需要可见，但兼容多个依赖版本时不应直接阻断构建。

- 生效级别与范围：warn: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-deprecated)
- 常见报告：`'{{name}}' is deprecated.`；`'{{name}}' is deprecated. {{reason}}`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
/** @deprecated Use loadCurrent instead. */
declare function loadLegacy(): void;
loadLegacy();
````

正确示例：

<!-- prettier-ignore -->
````ts
declare function loadCurrent(): void;
loadCurrent();
````

### `@typescript-eslint/no-dynamic-delete`

动态删除对象字段是表单和字典的正常操作；数组 `delete` 仍由专项规则禁止。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-dynamic-delete)
- 常见报告：`Do not delete dynamically computed property keys.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const record: Record<string, number>;
declare const key: string;
delete record[key];
````

正确示例：

<!-- prettier-ignore -->
````ts
declare const record: Record<string, number>;
declare const key: string;
const { [key]: removedValue, ...remaining } = record;
use(removedValue, remaining);
````

### `@typescript-eslint/no-empty-function`

禁止普通空函数，避免遗漏实现；仅允许无函数体逻辑的构造器和有意留空的重写方法。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-empty-function)
- 常见报告：`Unexpected empty {{name}}.`；`Add comment inside empty {{name}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const save = (): void => {};
````

正确示例：

<!-- prettier-ignore -->
````ts
const save = (): void => { persist(); };
````

### `@typescript-eslint/no-explicit-any`

`any` 会绕过类型检查，但第三方边界和渐进迁移仍可能需要，因此只警告。

- 生效级别与范围：warn: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-explicit-any)
- 常见报告：`Use 'never' instead, this is useful when instantiating generic type parameters that you don't need to know the type of.`；`Use 'PropertyKey' instead, this is more explicit than 'keyof any'.`；`Use 'unknown' instead, this will force you to explicitly, and safely assert the type is correct.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
function parse(value: any): any { return value; }
````

正确示例：

<!-- prettier-ignore -->
````ts
function parse(value: unknown): unknown { return value; }
````

### `@typescript-eslint/no-extraneous-class`

纯静态工具类可能是 SDK 的有意 API 设计，不强制改写为函数或对象。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-extraneous-class)
- 常见报告：`Unexpected empty class.`；`Unexpected class with only a constructor.`；`Unexpected class with only static properties.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
class MathTools { static double(value: number): number { return value * 2; } }
````

正确示例：

<!-- prettier-ignore -->
````ts
const double = (value: number): number => value * 2;
````

### `@typescript-eslint/no-floating-promises`

是否等待、返回或处理 Promise 由开发者根据业务顺序和异常语义决定。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-floating-promises)
- 常见报告：`Promises must be awaited, end with a call to .catch, or end with a call to .then with a rejection handler.`；`Add await operator.`；`Add void operator to ignore.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare function loadData(): Promise<void>;
loadData();
````

正确示例：

<!-- prettier-ignore -->
````ts
declare function loadData(): Promise<void>;
await loadData();
````

### `@typescript-eslint/no-import-type-side-effects`

禁止 `import { type Foo }` 产生仅用于类型的运行时导入，统一提升为独立的 `import type`。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-import-type-side-effects)
- 常见报告：`TypeScript will only remove the inline type specifiers which will leave behind a side effect import at runtime. Convert this to a top-level type qualifier to properly remove the entire import.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { type User } from "./types";
````

正确示例：

<!-- prettier-ignore -->
````ts
import type { User } from "./types";
````

### `@typescript-eslint/no-inferrable-types`

删除局部变量中可直接推断的原始类型；参数和属性允许保留公共契约与文档信息。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-inferrable-types)
- 常见报告：`Type {{type}} trivially inferred from a {{type}} literal, remove type annotation.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const count: number = 1;
````

正确示例：

<!-- prettier-ignore -->
````ts
const count = 1;
````

### `@typescript-eslint/no-meaningless-void-operator`

核心 `no-void` 已禁止全部 `void` 操作符，关闭类型感知的重复诊断。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-meaningless-void-operator)
- 常见报告：`void operator is useless here; it should only discard a call's return value`；`void operator shouldn't be used on {{type}}; it should convey that a return value is being ignored`；`Remove 'void'`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare function logSaved(): void;
void logSaved();
````

正确示例：

<!-- prettier-ignore -->
````ts
declare function logSaved(): void;
logSaved();
````

### `@typescript-eslint/no-misused-promises`

Vue 模板事件由框架接管异步结果，允许 Promise 返回的事件处理函数；其他 Promise 误用继续检查。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-misused-promises)
- 常见报告：`Expected non-Promise value in a boolean conditional.`；`Expected a non-Promise value to be returned.`；`Expected a non-Promise value to be spread in an object.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare function fetchReady(): Promise<boolean>;
if (fetchReady()) { start(); }
````

正确示例：

<!-- prettier-ignore -->
````ts
declare function fetchReady(): Promise<boolean>;
if (await fetchReady()) { start(); }
````

### `@typescript-eslint/no-misused-spread`

禁止展开静态可知不可迭代或语义不匹配的值。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-misused-spread)
- 常见报告：`Add await operator.`；`Using the spread operator on an array in an object will result in a list of indices.`；`Using the spread operator on class declarations will spread only their static properties, and will lose their class prototype.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface User { name: string }
declare function loadUser(): Promise<User>;
const result = { ...loadUser() };
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { name: string }
declare function loadUser(): Promise<User>;
const result = { ...(await loadUser()) };
````

### `@typescript-eslint/no-mixed-enums`

禁止把不同类别的值混入同一枚举，避免比较和序列化语义不稳定。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-mixed-enums)
- 常见报告：`Mixing number and string enums can be confusing.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
enum Status { Ready = "ready", Failed = 1 }
````

正确示例：

<!-- prettier-ignore -->
````ts
enum Status { Ready = "ready", Failed = "failed" }
````

### `@typescript-eslint/no-namespace`

声明文件、全局扩展和部分 SDK 仍需要 `namespace`。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-namespace)
- 常见报告：`ES2015 module syntax is preferred over namespaces.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
namespace Format { export const trim = (value: string): string => value.trim(); }
````

正确示例：

<!-- prettier-ignore -->
````ts
export const trim = (value: string): string => value.trim();
````

### `@typescript-eslint/no-non-null-asserted-nullish-coalescing`

非空断言与空值合并同时出现时逻辑矛盾。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing)
- 常见报告：`The nullish coalescing operator is designed to handle undefined and null - using a non-null assertion is not needed.`；`Remove the non-null assertion.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const value = input! ?? fallback;
````

正确示例：

<!-- prettier-ignore -->
````ts
const value = input ?? fallback;
````

### `@typescript-eslint/no-non-null-asserted-optional-chain`

可选链之后再做非空断言逻辑矛盾，通常表示边界条件设计有误。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain)
- 常见报告：`Optional chain expressions can return undefined by design - using a non-null assertion is unsafe and wrong.`；`You should remove the non-null assertion.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const profile = user?.profile!;
````

正确示例：

<!-- prettier-ignore -->
````ts
const profile = user?.profile;
````

### `@typescript-eslint/no-non-null-assertion`

已知运行时不变量可使用标准非空断言；矛盾、重复和无效断言仍由专项规则检查。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-non-null-assertion)
- 常见报告：`Forbidden non-null assertion.`；`Consider using the optional chain operator '?.' instead. This operator includes runtime checks, so it is safer than the compile-only non-null assertion operator.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const name = user!.name;
````

正确示例：

<!-- prettier-ignore -->
````ts
const name = user?.name ?? "Anonymous";
````

### `@typescript-eslint/no-redeclare`

使用 TypeScript 版本避免核心规则误判声明合并、类型和值的同名声明。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-redeclare)
- 常见报告：`'{{id}}' is already defined.`；`'{{id}}' is already defined as a built-in global variable.`；`'{{id}}' is already defined by a variable declaration.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
let value = 1;
let value = 2;
````

正确示例：

<!-- prettier-ignore -->
````ts
let value = 1;
value = 2;
````

### `@typescript-eslint/no-require-imports`

Node.js 配置和脚本可能需要加载 CommonJS 包，只在工具文件范围关闭 ESM `import` 限制。

- 生效级别与范围：error: Vue SFC、UniApp NVue、Angular TypeScript
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue TSX、UniApp TSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-require-imports)
- 常见报告：`A 'require()' style import is forbidden.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const path = require("node:path");
````

正确示例：

<!-- prettier-ignore -->
````ts
import path from "node:path";
````

### `@typescript-eslint/no-unnecessary-boolean-literal-compare`

删除不会改变条件结果的布尔字面量比较。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare)
- 常见报告：`This expression unnecessarily compares a nullable boolean value to false instead of using the ?? operator to provide a default.`；`This expression unnecessarily compares a nullable boolean value to true instead of using it directly.`；`This expression unnecessarily compares a nullable boolean value to true instead of negating it.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const enabled: boolean;
if (enabled === true) start();
````

正确示例：

<!-- prettier-ignore -->
````ts
declare const enabled: boolean;
if (enabled) start();
````

### `@typescript-eslint/no-unnecessary-condition`

TypeScript 类型不一定覆盖外部输入的真实运行时，允许保留防御性条件。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unnecessary-condition)
- 常见报告：`Unnecessary conditional, value is always falsy.`；`This callback should return a conditional, but return is always falsy.`；`Unnecessary conditional, left-hand side of '??' operator is always 'null' or 'undefined'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const ready = true;
if (ready) start();
````

正确示例：

<!-- prettier-ignore -->
````ts
const ready = true;
start();
````

### `@typescript-eslint/no-unnecessary-template-expression`

删除模板字符串中没有插值语义的冗余表达式。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unnecessary-template-expression)
- 常见报告：`Template literal expression is unnecessary and can be simplified.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const status = `${"ready"}`;
````

正确示例：

<!-- prettier-ignore -->
````ts
const status = "ready";
````

### `@typescript-eslint/no-unnecessary-type-arguments`

删除可由调用参数直接推断的显式泛型实参。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unnecessary-type-arguments)
- 常见报告：`This is the default value for this type parameter, so it can be omitted.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare function createValue<T = string>(): T;
const value = createValue<string>();
````

正确示例：

<!-- prettier-ignore -->
````ts
declare function createValue<T = string>(): T;
const value = createValue();
````

### `@typescript-eslint/no-unnecessary-type-conversion`

禁止不会改变运行时值或静态类型的冗余转换。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unnecessary-type-conversion)
- 常见报告：`Remove the type conversion.`；`Instead, assert that the value satisfies the {{type}} type.`；`{{violation}} does not change the type or value of the {{type}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const enabled = Boolean(true);
````

正确示例：

<!-- prettier-ignore -->
````ts
const enabled = true;
````

### `@typescript-eslint/no-unused-expressions`

使用 TypeScript 版本识别类型断言等语法；允许常见的短路和三元表达式调用模式。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unused-expressions)
- 常见报告：`Expected an assignment or function call and instead saw an expression.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
ready;
````

正确示例：

<!-- prettier-ignore -->
````ts
if (ready) start();
````

### `@typescript-eslint/no-unused-vars`

`defineEmits` 校验器和框架回调的形参可只声明契约；普通未使用变量和导入仍然报错。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unused-vars)
- 常见报告：`Remove unused import declaration.`；`Remove unused variable "{{varName}}".`；`'{{varName}}' is {{action}} but never used{{additional}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const unused = loadData();
````

正确示例：

<!-- prettier-ignore -->
````ts
const data = loadData();
render(data);
````

### `@typescript-eslint/no-useless-default-assignment`

默认参数已经表达回退值，不再重复传入 `undefined`。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-useless-default-assignment)
- 常见报告：`This rule requires the 'strictNullChecks' compiler option to be turned on to function correctly.`；`Using '= undefined' to make a parameter optional adds unnecessary runtime logic. Use the '?' optional syntax instead.`；`Default value is useless because the {{ type }} is not optional.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface Options { limit: number }
declare const options: Options;
const { limit = 10 } = options;
````

正确示例：

<!-- prettier-ignore -->
````ts
interface Options { limit: number }
declare const options: Options;
const { limit } = options;
````

### `@typescript-eslint/prefer-nullish-coalescing`

原始类型的 `||` 与 `??` 可能承载不同业务语义，不为了风格强制互换。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/prefer-nullish-coalescing)
- 常见报告：`This rule requires the 'strictNullChecks' compiler option to be turned on to function correctly.`；`Prefer using nullish coalescing operator ('??{{ equals }}') instead of an assignment expression, as it is simpler to read.`；`Prefer using nullish coalescing operator ('??{{ equals }}') instead of a logical {{ description }} ('||{{ equals }}'), as it is a safer operator.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface Config { timeout: number }
declare const input: Config | null;
declare const defaultConfig: Config;
const config = input || defaultConfig;
````

正确示例：

<!-- prettier-ignore -->
````ts
interface Config { timeout: number }
declare const input: Config | null;
declare const defaultConfig: Config;
const config = input ?? defaultConfig;
````

### `@typescript-eslint/prefer-optional-chain`

仅在类型明确包含 `null` 或 `undefined` 时要求使用可选链，避免改变其他假值的业务语义。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/prefer-optional-chain)
- 常见报告：`Change to an optional chain.`；`Prefer using an optional chain expression instead, as it's more concise and easier to read.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface User { profile?: { name: string } }
declare const user: User | undefined;
const name = user && user.profile && user.profile.name;
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { profile?: { name: string } }
declare const user: User | undefined;
const name = user?.profile?.name;
````

### `@typescript-eslint/prefer-promise-reject-errors`

允许透明转发外部 Promise 的未知拒绝原因；静态可知的 `string`、`number` 等仍会被报告。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/prefer-promise-reject-errors)
- 常见报告：`Expected the Promise rejection reason to be an Error.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
function fail(): Promise<never> { return Promise.reject("Failed"); }
````

正确示例：

<!-- prettier-ignore -->
````ts
function fail(): Promise<never> { return Promise.reject(new Error("Failed")); }
````

### `@typescript-eslint/prefer-readonly`

只在构造阶段赋值且之后保持不变的私有成员应声明为 `readonly`。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/prefer-readonly)
- 常见报告：`Member '{{name}}' is never reassigned; mark it as 'readonly'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
class User { private id: number; constructor(id: number) { this.id = id; } getId(): number { return this.id; } }
````

正确示例：

<!-- prettier-ignore -->
````ts
class User { private readonly id: number; constructor(id: number) { this.id = id; } getId(): number { return this.id; } }
````

### `@typescript-eslint/prefer-regexp-exec`

不强制使用 `RegExp#exec` 取代字符串匹配 API。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/prefer-regexp-exec)
- 常见报告：`Use the 'RegExp#exec()' method instead.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const text: string;
const match = text.match(/fast/);
````

正确示例：

<!-- prettier-ignore -->
````ts
declare const text: string;
const match = /fast/.exec(text);
````

### `@typescript-eslint/related-getter-setter-pairs`

getter 与 setter 必须使用相互兼容的类型。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/related-getter-setter-pairs)
- 常见报告：`'get()' type should be assignable to its equivalent 'set()' type.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
class User { get name(): string { return "Fast"; } set name(value: number) { save(value); } }
````

正确示例：

<!-- prettier-ignore -->
````ts
class User { get name(): string { return "Fast"; } set name(value: string) { save(value); } }
````

### `@typescript-eslint/require-await`

无 `await` 的 `async` 会改变返回值和异常语义，应删除 `async` 或返回真实 Promise。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/require-await)
- 常见报告：`{{name}} has no 'await' expression.`；`Remove 'async'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
async function getValue(): Promise<number> { return 1; }
````

正确示例：

<!-- prettier-ignore -->
````ts
function getValue(): number { return 1; }
````

### `@typescript-eslint/restrict-template-expressions`

数字和布尔值是模板字符串的常见安全插值；对象、`any` 和空值仍需显式处理。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/restrict-template-expressions)
- 常见报告：`Invalid type "{{type}}" of template literal expression.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface User { name: string }
declare const user: User;
const label = `User: ${user}`;
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { name: string }
declare const user: User;
const label = `User: ${user.name}`;
````

### `@typescript-eslint/return-await`

只在错误处理语义需要时要求 `return await`，不增加纯风格 `await`。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/return-await)
- 常见报告：`Returning an awaited promise is not allowed in this context.`；`Remove 'await' before the expression. Use caution as this may impact control flow.`；`Returning an awaited value that is not a promise is not allowed.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface User { id: number }
declare function fetchUser(): Promise<User>;
async function load(): Promise<User> { try { return fetchUser(); } catch (error) { recover(error); throw error; } }
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { id: number }
declare function fetchUser(): Promise<User>;
async function load(): Promise<User> { try { return await fetchUser(); } catch (error) { recover(error); throw error; } }
````

### `@typescript-eslint/strict-void-return`

不限制框架生命周期和事件回调的返回写法。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/strict-void-return)
- 常见报告：`Async function used in a context where a void function is expected.`；`Value-returning function used in a context where a void function is expected.`；`Value returned in a context where a void return is expected.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const callback: () => void = () => 42;
````

正确示例：

<!-- prettier-ignore -->
````ts
const callback: () => void = () => { log(); };
````

### `@typescript-eslint/switch-exhaustiveness-check`

联合类型和枚举新增成员时，`switch` 必须覆盖全部分支或显式提供 `default`。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/switch-exhaustiveness-check)
- 常见报告：`Add branches for missing cases.`；`The switch statement is exhaustive, so the default case is unnecessary.`；`Switch is not exhaustive. Cases not matched: {{missingBranches}}`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
type State = "idle" | "ready";
declare const state: State;
switch (state) { case "idle": break; }
````

正确示例：

<!-- prettier-ignore -->
````ts
type State = "idle" | "ready";
declare const state: State;
switch (state) { case "idle": break; case "ready": break; }
````

### `@typescript-eslint/unified-signatures`

公共重载会影响类型查询与调用契约，不为减少声明行数强制合并。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/unified-signatures)
- 常见报告：`{{failureStringStart}} with identical parameters.`；`{{failureStringStart}} with a rest parameter.`；`{{failureStringStart}} with an optional parameter.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
function format(value: string): string;
function format(value: number): string;
````

正确示例：

<!-- prettier-ignore -->
````ts
function format(value: string | number): string;
````

### `@typescript-eslint/use-unknown-in-catch-callback-variable`

Promise `catch` 回调接收未知拒绝原因，使用 `unknown` 后再显式收窄。

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable)
- 常见报告：`Add an explicit ': [unknown]' type annotation to the rejection callback rest variable.`；`Add an explicit ': unknown' type annotation to the rejection callback variable.`；`Prefer the safe ': unknown' for a '{{method}}'{{append}} callback variable.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const promise: Promise<void>;
promise.catch((error: any) => report(error));
````

正确示例：

<!-- prettier-ignore -->
````ts
declare const promise: Promise<void>;
promise.catch((error: unknown) => report(normalizeError(error)));
````

## 第三方预置规则（32 条）

### `@typescript-eslint/await-thenable`

检查该规则对应的代码约束。上游说明：Disallow awaiting a value that is not a Thenable

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/await-thenable)
- 常见报告：`Unexpected 'await' of a non-Promise (non-"Thenable") value.`；`Unexpected 'await using' of a value that is not async disposable.`；`Convert to an ordinary 'for...of' loop.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const value = await 42;
````

正确示例：

<!-- prettier-ignore -->
````ts
const value = await Promise.resolve(42);
````

### `@typescript-eslint/ban-ts-comment`

检查该规则对应的代码约束。上游说明：Disallow `@ts-<directive>` comments or require descriptions after directives

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/ban-ts-comment)
- 常见报告：`Replace "@ts-ignore" with "@ts-expect-error".`；`Do not use "@ts-{{directive}}" because it alters compilation errors.`；`The description for the "@ts-{{directive}}" directive must match the {{format}} format.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
// @ts-ignore
const count: number = loadValue();
````

正确示例：

<!-- prettier-ignore -->
````ts
// @ts-expect-error -- legacy API returns an invalid declaration
const count: number = loadValue();
````

### `@typescript-eslint/no-array-constructor`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow generic `Array` constructors

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-array-constructor)
- 常见报告：`The array literal notation [] is preferable.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const values = new Array();
````

正确示例：

<!-- prettier-ignore -->
````ts
const values: unknown[] = [];
````

### `@typescript-eslint/no-array-delete`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow using the `delete` operator on array values

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-array-delete)
- 常见报告：`Using the 'delete' operator with an array expression is unsafe.`；`Use 'array.splice()' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const items: string[];
delete items[index];
````

正确示例：

<!-- prettier-ignore -->
````ts
declare const items: string[];
items.splice(index, 1);
````

### `@typescript-eslint/no-base-to-string`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Require `.toString()` and `.toLocaleString()` to only be called on objects which provide useful information when stringified

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-base-to-string)
- 常见报告：`Using 'join()' for {{name}} {{certainty}} use Object's default stringification format ('[object Object]') when stringified.`；`'{{name}}' {{certainty}} use Object's default stringification format ('[object Object]') when stringified.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface User { name: string }
declare const user: User;
const label = `User: ${user}`;
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { name: string }
declare const user: User;
const label = `User: ${user.name}`;
````

### `@typescript-eslint/no-duplicate-enum-values`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow duplicate enum member values

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-duplicate-enum-values)
- 常见报告：`Duplicate enum member value {{value}}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
enum Status { Ready = 1, Done = 1 }
````

正确示例：

<!-- prettier-ignore -->
````ts
enum Status { Ready = 1, Done = 2 }
````

### `@typescript-eslint/no-duplicate-type-constituents`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow duplicate constituents of union or intersection types

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-duplicate-type-constituents)
- 常见报告：`{{type}} type constituent is duplicated with {{previous}}.`；`Explicit undefined is unnecessary on an optional parameter.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
type Id = string | string;
````

正确示例：

<!-- prettier-ignore -->
````ts
type Id = string | number;
````

### `@typescript-eslint/no-empty-object-type`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow accidentally using the "empty object" type

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-empty-object-type)
- 常见报告：`An empty interface declaration allows any non-nullish value, including literals like '0' and '""'.
- If that's what you want, disable this lint rule with an inline comment or configure the '{{ option }}' rule option.
- If you want a type meaning "any object", you probably want 'object' instead.
- If you want a type meaning "any value", you probably want 'unknown' instead.`；`An interface declaring no members is equivalent to its supertype.`；`The '{}' ("empty object") type allows any non-nullish value, including literals like '0' and '""'.
- If that's what you want, disable this lint rule with an inline comment or configure the '{{ option }}' rule option.
- If you want a type meaning "any object", you probably want 'object' instead.
- If you want a type meaning "any value", you probably want 'unknown' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
type Empty = {};
````

正确示例：

<!-- prettier-ignore -->
````ts
type Empty = Record<string, never>;
````

### `@typescript-eslint/no-extra-non-null-assertion`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow extra non-null assertions

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-extra-non-null-assertion)
- 常见报告：`Forbidden extra non-null assertion.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const name = user!!.name;
````

正确示例：

<!-- prettier-ignore -->
````ts
const name = user!.name;
````

### `@typescript-eslint/no-for-in-array`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow iterating over an array with a for-in loop

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-for-in-array)
- 常见报告：`For-in loops over arrays skips holes, returns indices as strings, and may visit the prototype chain or other enumerable properties. Use a more robust iteration method such as for-of or array.forEach instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const items: readonly string[];
for (const index in items) use(items[index]);
````

正确示例：

<!-- prettier-ignore -->
````ts
declare const items: readonly string[];
for (const item of items) use(item);
````

### `@typescript-eslint/no-implied-eval`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow the use of `eval()`-like functions

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-implied-eval)
- 常见报告：`Implied eval. Do not use the Function constructor to create functions.`；`Implied eval. Consider passing a function.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
setTimeout("refresh()", 1000);
````

正确示例：

<!-- prettier-ignore -->
````ts
setTimeout(() => refresh(), 1000);
````

### `@typescript-eslint/no-misused-new`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Enforce valid definition of `new` and `constructor`

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-misused-new)
- 常见报告：`Class cannot have method named 'new'.`；`Interfaces cannot be constructed, only classes.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface User { new (): User; }
````

正确示例：

<!-- prettier-ignore -->
````ts
interface UserConstructor { new (): User; }
````

### `@typescript-eslint/no-redundant-type-constituents`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow members of unions and intersections that do nothing or override type information

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-redundant-type-constituents)
- 常见报告：`'{{typeName}}' is an 'error' type that acts as 'any' and overrides all other types in this {{container}} type.`；`{{literal}} is overridden by {{primitive}} in this union type.`；`'{{typeName}}' is overridden by other types in this {{container}} type.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
type Name = string | "Fast";
````

正确示例：

<!-- prettier-ignore -->
````ts
type Name = string;
````

### `@typescript-eslint/no-this-alias`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow aliasing `this`

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-this-alias)
- 常见报告：`Unexpected aliasing of 'this' to local variable.`；`Unexpected aliasing of members of 'this' to local variables.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const self = this;
self.save();
````

正确示例：

<!-- prettier-ignore -->
````ts
this.save();
````

### `@typescript-eslint/no-unnecessary-type-assertion`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow type assertions that do not change the type of an expression

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unnecessary-type-assertion)
- 常见报告：`This assertion is unnecessary since the receiver accepts the original type of the expression.`；`This assertion is unnecessary since it does not change the type of the expression.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const name: string;
const normalized = name as string;
````

正确示例：

<!-- prettier-ignore -->
````ts
declare const name: string;
const normalized = name;
````

### `@typescript-eslint/no-unnecessary-type-constraint`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow unnecessary constraints on generic types

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unnecessary-type-constraint)
- 常见报告：`Remove the unnecessary '{{constraint}}' constraint.`；`Constraining the generic type '{{name}}' to '{{constraint}}' does nothing and is unnecessary.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
function identity<T extends unknown>(value: T): T { return value; }
````

正确示例：

<!-- prettier-ignore -->
````ts
function identity<T>(value: T): T { return value; }
````

### `@typescript-eslint/no-unsafe-argument`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow calling a function with a value with type `any`

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unsafe-argument)
- 常见报告：`Unsafe argument of type {{sender}} assigned to a parameter of type {{receiver}}.`；`Unsafe spread of an {{sender}} array type.`；`Unsafe spread of an {{sender}} type.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface User { id: number }
declare function saveUser(user: User): void;
declare const input: any;
saveUser(input);
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { id: number }
declare function isUser(value: unknown): value is User;
declare function saveUser(user: User): void;
declare const input: unknown;
if (isUser(input)) saveUser(input);
````

### `@typescript-eslint/no-unsafe-assignment`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow assigning a value with type `any` to variables and properties

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unsafe-assignment)
- 常见报告：`Unsafe assignment of an {{sender}} value.`；`Unsafe assignment of an {{sender}} value. 'this' is typed as 'any'.
You can try to fix this by turning on the 'noImplicitThis' compiler option, or adding a 'this' parameter to the function.`；`Unsafe array destructuring of an {{sender}} array value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const input: any;
const user = input;
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { id: number }
declare function parseUser(value: unknown): User;
declare const input: unknown;
const user = parseUser(input);
````

### `@typescript-eslint/no-unsafe-call`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow calling a value with type `any`

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unsafe-call)
- 常见报告：`Unsafe call of a type that could not be resolved.`；`Unsafe call of a 'this' type that could not be resolved.`；`Unsafe construction of a type that could not be resolved.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const callback: any;
callback();
````

正确示例：

<!-- prettier-ignore -->
````ts
declare const callback: () => void;
callback();
````

### `@typescript-eslint/no-unsafe-declaration-merging`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow unsafe declaration merging

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unsafe-declaration-merging)
- 常见报告：`Unsafe declaration merging between classes and interfaces.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface User { id: number }
class User {}
````

正确示例：

<!-- prettier-ignore -->
````ts
interface UserData { id: number }
class User {}
````

### `@typescript-eslint/no-unsafe-enum-comparison`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow comparing an enum value with a non-enum value

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unsafe-enum-comparison)
- 常见报告：`The case statement does not have a shared enum type with the switch predicate.`；`The two values in this comparison do not have a shared enum type.`；`Replace with an enum value comparison.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
enum Status { Ready = "ready" }
declare const status: Status;
if (status === "ready") start();
````

正确示例：

<!-- prettier-ignore -->
````ts
enum Status { Ready = "ready" }
declare const status: Status;
if (status === Status.Ready) start();
````

### `@typescript-eslint/no-unsafe-function-type`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow using the unsafe built-in Function type

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unsafe-function-type)
- 常见报告：`The 'Function' type accepts any function-like value.
Prefer explicitly defining any function parameters and return type.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
let callback: Function;
````

正确示例：

<!-- prettier-ignore -->
````ts
let callback: (...args: unknown[]) => unknown;
````

### `@typescript-eslint/no-unsafe-member-access`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow member access on a value with type `any`

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unsafe-member-access)
- 常见报告：`The type of computed name {{property}} cannot be resolved.`；`Unsafe member access {{property}} on a type that cannot be resolved.`；`Unsafe member access {{property}}. The type of 'this' cannot be resolved.
You can try to fix this by turning on the 'noImplicitThis' compiler option, or adding a 'this' parameter to the function.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const input: any;
const id = input.id;
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { id: number }
declare function isUser(value: unknown): value is User;
declare const input: unknown;
const id = isUser(input) ? input.id : undefined;
````

### `@typescript-eslint/no-unsafe-return`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow returning a value with type `any` from a function

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unsafe-return)
- 常见报告：`Unsafe return of a value of type {{type}}.`；`Unsafe return of type '{{sender}}' from function with return type '{{receiver}}'.`；`Unsafe return of a value of type '{{type}}'. 'this' is typed as 'any'.
You can try to fix this by turning on the 'noImplicitThis' compiler option, or adding a 'this' parameter to the function.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
interface User { id: number }
declare const input: any;
function load(): User { return input; }
````

正确示例：

<!-- prettier-ignore -->
````ts
interface User { id: number }
declare function parseUser(value: unknown): User;
declare const input: unknown;
function load(): User { return parseUser(input); }
````

### `@typescript-eslint/no-unsafe-unary-minus`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Require unary negation to take a number

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-unsafe-unary-minus)
- 常见报告：`Argument of unary negation should be assignable to number | bigint but is {{type}} instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const value: string;
const result = -value;
````

正确示例：

<!-- prettier-ignore -->
````ts
declare const value: number;
const result = -value;
````

### `@typescript-eslint/no-wrapper-object-types`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow using confusing built-in primitive class wrappers

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/no-wrapper-object-types)
- 常见报告：`Prefer using the primitive '{{preferred}}' as a type name, rather than the upper-cased '{{typeName}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
const name: String = "Fast";
````

正确示例：

<!-- prettier-ignore -->
````ts
const name: string = "Fast";
````

### `@typescript-eslint/only-throw-error`

检查该规则对应的代码约束。上游说明：Disallow throwing non-`Error` values as exceptions

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/only-throw-error)
- 常见报告：`Expected an error object to be thrown.`；`Do not throw undefined.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
throw "Failed";
````

正确示例：

<!-- prettier-ignore -->
````ts
throw new Error("Failed");
````

### `@typescript-eslint/prefer-as-const`

要求优先使用该规则指定的现代或更清晰写法。上游说明：Enforce the use of `as const` over literal type

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/prefer-as-const)
- 常见报告：`Expected a 'const' instead of a literal type assertion.`；`Expected a 'const' assertion instead of a literal type annotation.`；`You should use 'as const' instead of type annotation.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
let status: "ready" = "ready";
````

正确示例：

<!-- prettier-ignore -->
````ts
let status = "ready" as const;
````

### `@typescript-eslint/prefer-namespace-keyword`

要求优先使用该规则指定的现代或更清晰写法。上游说明：Require using `namespace` keyword over `module` keyword to declare custom TypeScript modules

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://typescript-eslint.io/rules/prefer-namespace-keyword)
- 常见报告：`Use 'namespace' instead of 'module' to declare custom TypeScript modules.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
module Format { export const trim = String.prototype.trim; }
````

正确示例：

<!-- prettier-ignore -->
````ts
namespace Format { export const trim = String.prototype.trim; }
````

### `@typescript-eslint/restrict-plus-operands`

检查该规则对应的代码约束。上游说明：Require both operands of addition to be the same type and be `bigint`, `number`, or `string`

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/restrict-plus-operands)
- 常见报告：`Numeric '+' operations must either be both bigints or both numbers. Got '{{left}}' + '{{right}}'.`；`Invalid operand for a '+' operation. Operands must each be a number or {{stringLike}}. Got '{{type}}'.`；`Operands of '+' operations must be a number or {{stringLike}}. Got '{{left}}' + '{{right}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
declare const count: number;
declare const offset: bigint;
const total = count + offset;
````

正确示例：

<!-- prettier-ignore -->
````ts
declare const count: number;
declare const offset: number;
const total = count + offset;
````

### `@typescript-eslint/triple-slash-reference`

检查该规则对应的代码约束。上游说明：Disallow certain triple slash directives in favor of ES6-style import declarations

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/triple-slash-reference)
- 常见报告：`Do not use a triple slash reference for {{module}}, use 'import' style instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
/// <reference path="./types.d.ts" />
const user: User = loadUser();
````

正确示例：

<!-- prettier-ignore -->
````ts
import type { User } from "./types";
const user: User = loadUser();
````

### `@typescript-eslint/unbound-method`

检查该规则对应的代码约束。上游说明：Enforce unbound methods are called with their expected scope

- 生效级别与范围：error: TypeScript 基础、框架无关 TSX、Vue SFC、Vue TSX、UniApp NVue、UniApp TSX、React TSX、Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://typescript-eslint.io/rules/unbound-method)
- 常见报告：`A method that is not declared with 'this: void' may cause unintentional scoping of 'this' when separated from its object.
Consider using an arrow function or explicitly '.bind()'ing the method to avoid calling the method with an unintended 'this' value. `；`A method that is not declared with 'this: void' may cause unintentional scoping of 'this' when separated from its object.
Consider using an arrow function or explicitly '.bind()'ing the method to avoid calling the method with an unintended 'this' value. 
If a function does not access 'this', it can be annotated with 'this: void'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
class Logger { prefix = "Fast"; log(message: string): void { console.log(this.prefix, message); } }
const logger = new Logger();
const log = logger.log;
log("Saved");
````

正确示例：

<!-- prettier-ignore -->
````ts
class Logger { prefix = "Fast"; log(message: string): void { console.log(this.prefix, message); } }
const logger = new Logger();
const log = logger.log.bind(logger);
log("Saved");
````
