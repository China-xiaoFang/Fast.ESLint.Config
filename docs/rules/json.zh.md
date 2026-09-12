<!-- 此文件由 scripts/rules-docs.ts 生成，请勿手工编辑。 -->

# JSON、JSONC 与 JSON5

本页记录当前依赖版本和仓库配置最终产生的 32 条规则。每条规则均列出实际严重级别、生效范围、上游说明、常见报告以及错误/正确示例。

## 仓库显式规则（3 条）

### `jsonc/no-comments`

UniApp 的 `pages.json` 和 `manifest.json` 使用允许注释的 JSONC 方言。

- 生效级别与范围：error: JSON、package.json
- 关闭范围：tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-comments.html)
- 常见报告：`Unexpected comment.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ // name
  "name": "Fast"
}
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "name": "Fast" }
````

### `jsonc/sort-array-values`

npm 的 `files` 清单按字母排序；数组顺序不改打包集合，但首次 diff 较大。

- 生效级别与范围：error: package.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-array-values.html)
- 常见报告：`Expected array values to be in {{orderText}} order. '{{thisValue}}' should be before '{{targetValue}}'.`；`Expected array values to be in {{orderText}} order. '{{thisValue}}' should be after '{{targetValue}}'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````json
{ "files": ["dist/z.js", "dist/a.js"] }
````

正确示例：

<!-- prettier-ignore -->
````json
{ "files": ["dist/a.js", "dist/z.js"] }
````

### `jsonc/sort-keys`

只调整顶层和 `compilerOptions` 的键顺序，不改写任何选项值或数组。

- 生效级别与范围：error: package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-keys.html)
- 常见报告：`Expected object keys to be in {{orderText}} order. '{{thisName}}' should be before '{{targetName}}'.`；`Expected object keys to be in {{orderText}} order. '{{thisName}}' should be after '{{targetName}}'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````json
{ "version": "1.0.0", "name": "demo" }
````

正确示例：

<!-- prettier-ignore -->
````json
{ "name": "demo", "version": "1.0.0" }
````

## 第三方预置规则（29 条）

### `jsonc/comma-dangle`

检查该规则对应的代码约束。上游说明：require or disallow trailing commas

- 生效级别与范围：error: JSON、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/comma-dangle.html)
- 常见报告：`Unexpected trailing comma.`；`Missing trailing comma.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "name": "Fast", }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "name": "Fast" }
````

### `jsonc/no-bigint-literals`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow BigInt literals

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-bigint-literals.html)
- 常见报告：`BigInt literals are not allowed.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "id": 1n }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "id": "1" }
````

### `jsonc/no-binary-expression`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow binary expression

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-binary-expression.html)
- 常见报告：`The binary expressions are not allowed.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "timeout": 1000 + 500 }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "timeout": 1500 }
````

### `jsonc/no-binary-numeric-literals`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow binary numeric literals

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-binary-numeric-literals.html)
- 常见报告：`Binary numeric literals should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "mask": 0b1010 }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "mask": 10 }
````

### `jsonc/no-dupe-keys`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow duplicate keys in object literals

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-dupe-keys.html)
- 常见报告：`Duplicate key '{{name}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "name": "Fast", "name": "Admin" }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "name": "Fast", "title": "Admin" }
````

### `jsonc/no-escape-sequence-in-identifier`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow escape sequences in identifiers.

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-escape-sequence-in-identifier.html)
- 常见报告：`Escape sequence in identifiers should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ \u0061: "Fast" }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ a: "Fast" }
````

### `jsonc/no-floating-decimal`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow leading or trailing decimal points in numeric literals

- 生效级别与范围：error: JSON、JSONC、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-floating-decimal.html)
- 常见报告：`A leading decimal point can be confused with a dot.`；`A trailing decimal point can be confused with a dot.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "ratio": .5 }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "ratio": 0.5 }
````

### `jsonc/no-hexadecimal-numeric-literals`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow hexadecimal numeric literals

- 生效级别与范围：error: JSON、JSONC、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-hexadecimal-numeric-literals.html)
- 常见报告：`Hexadecimal numeric literals should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "color": 0xff }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "color": 255 }
````

### `jsonc/no-infinity`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow Infinity

- 生效级别与范围：error: JSON、JSONC、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-infinity.html)
- 常见报告：`Infinity should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "limit": Infinity }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "limit": null }
````

### `jsonc/no-irregular-whitespace`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow irregular whitespace

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-irregular-whitespace.html)
- 常见报告：`Irregular whitespace not allowed.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{
 "name": "Fast"
}
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{
  "name": "Fast"
}
````

### `jsonc/no-multi-str`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow multiline strings

- 生效级别与范围：error: JSON、JSONC、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-multi-str.html)
- 常见报告：`Multiline support is limited to JSON5 only.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "text": "first\
second" }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "text": "first\nsecond" }
````

### `jsonc/no-nan`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow NaN

- 生效级别与范围：error: JSON、JSONC、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-nan.html)
- 常见报告：`NaN should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "value": NaN }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "value": null }
````

### `jsonc/no-number-props`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow number property keys

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-number-props.html)
- 常见报告：`The number property keys are not allowed.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ 1: "one" }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "1": "one" }
````

### `jsonc/no-numeric-separators`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow numeric separators

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-numeric-separators.html)
- 常见报告：`Numeric separators are not allowed.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "size": 1_000 }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "size": 1000 }
````

### `jsonc/no-octal`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow legacy octal literals

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-octal.html)
- 常见报告：`Octal literals should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "mode": 071 }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "mode": 57 }
````

### `jsonc/no-octal-numeric-literals`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow octal numeric literals

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-octal-numeric-literals.html)
- 常见报告：`Octal numeric literals should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "mode": 0o71 }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "mode": 57 }
````

### `jsonc/no-parenthesized`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow parentheses around the expression

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-parenthesized.html)
- 常见报告：`Parentheses around expression should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "timeout": (1000) }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "timeout": 1000 }
````

### `jsonc/no-plus-sign`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow plus sign

- 生效级别与范围：error: JSON、JSONC、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-plus-sign.html)
- 常见报告：`Plus sign should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "offset": +1 }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "offset": 1 }
````

### `jsonc/no-regexp-literals`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow RegExp literals

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-regexp-literals.html)
- 常见报告：`RegExp literals are not allowed.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "pattern": /fast/i }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "pattern": "fast" }
````

### `jsonc/no-sparse-arrays`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow sparse arrays

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-sparse-arrays.html)
- 常见报告：`Unexpected comma in middle of array.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "items": [1, , 3] }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "items": [1, null, 3] }
````

### `jsonc/no-template-literals`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow template literals

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-template-literals.html)
- 常见报告：`The template literals are not allowed.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "name": `Fast` }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "name": "Fast" }
````

### `jsonc/no-undefined-value`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow `undefined`

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-undefined-value.html)
- 常见报告：`'undefined' is not allowed.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "value": undefined }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "value": null }
````

### `jsonc/no-unicode-codepoint-escapes`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow Unicode code point escape sequences.

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-unicode-codepoint-escapes.html)
- 常见报告：`Unicode code point escape sequence should not be used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "emoji": "\u{1F600}" }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "emoji": "😀" }
````

### `jsonc/no-useless-escape`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow unnecessary escape usage

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/no-useless-escape.html)
- 常见报告：`Unnecessary escape character: \{{character}}.`；`Remove the '\'. This maintains the current functionality.`；`Remove the '\' if it was inserted by mistake.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "name": "Fast\!" }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "name": "Fast!" }
````

### `jsonc/quote-props`

检查该规则对应的代码约束。上游说明：require quotes around object literal property names

- 生效级别与范围：error: JSON、JSONC、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/quote-props.html)
- 常见报告：`Properties should be quoted as '{{property}}' is a reserved word.`；`Inconsistently quoted property '{{key}}' found.`；`Unnecessarily quoted property '{{property}}' found.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ name: "Fast" }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "name": "Fast" }
````

### `jsonc/quotes`

检查该规则对应的代码约束。上游说明：enforce use of double or single quotes

- 生效级别与范围：error: JSON、JSONC、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/quotes.html)
- 常见报告：`Strings must use {{description}}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ 'name': 'Fast' }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "name": "Fast" }
````

### `jsonc/space-unary-ops`

检查该规则对应的代码约束。上游说明：disallow spaces after unary operators

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/space-unary-ops.html)
- 常见报告：`Unexpected space before unary operator '{{operator}}'.`；`Unexpected space after unary operator '{{operator}}'.`；`Unary operator '{{operator}}' must be followed by whitespace.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "offset": - 1 }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "offset": -1 }
````

### `jsonc/valid-json-number`

校验对应语法、属性或参数是否合法。上游说明：disallow invalid number for JSON

- 生效级别与范围：error: JSON、JSONC、package.json、tsconfig.json
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/valid-json-number.html)
- 常见报告：`Invalid number for JSON.`；`Spaces after minus sign are not allowed in JSON.`；`Plus signs are not allowed in JSON.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````jsonc
{ "value": 01 }
````

正确示例：

<!-- prettier-ignore -->
````jsonc
{ "value": 1 }
````

### `jsonc/vue-custom-block/no-parsing-error`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow parsing errors in Vue custom blocks

- 生效级别与范围：error: JSON、JSONC、JSON5、package.json、tsconfig.json
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/vue-custom-block/no-parsing-error.html)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<i18n>{ "hello": }</i18n>
````

正确示例：

<!-- prettier-ignore -->
````vue
<i18n>{ "hello": "Hello" }</i18n>
````
