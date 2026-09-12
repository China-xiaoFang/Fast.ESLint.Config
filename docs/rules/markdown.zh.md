<!-- 此文件由 scripts/rules-docs.ts 生成，请勿手工编辑。 -->

# Markdown

本页记录当前依赖版本和仓库配置最终产生的 17 条规则。每条规则均列出实际严重级别、生效范围、上游说明、常见报告以及错误/正确示例。

## 第三方预置规则（17 条）

### `markdown/fenced-code-language`

检查该规则对应的代码约束。上游说明：Require languages for fenced code blocks

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/fenced-code-language.md)
- 常见报告：`Missing code block language.`；`Code block language "{{lang}}" is not allowed.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
```
const ready = true;
```
````

正确示例：

<!-- prettier-ignore -->
````markdown
```js
const ready = true;
```
````

### `markdown/heading-increment`

检查该规则对应的代码约束。上游说明：Enforce heading levels increment by one

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/heading-increment.md)
- 常见报告：`Heading level skipped from {{fromLevel}} to {{toLevel}}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
# Guide

### Setup
````

正确示例：

<!-- prettier-ignore -->
````markdown
# Guide

## Setup
````

### `markdown/no-duplicate-definitions`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow duplicate definitions

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-duplicate-definitions.md)
- 常见报告：`Unexpected duplicate definition '{{ identifier }}' (label: '{{ label }}') found. First defined at line {{ firstLine }} (label: '{{ firstLabel }}').`；`Unexpected duplicate footnote definition '{{ identifier }}' (label: '{{ label }}') found. First defined at line {{ firstLine }} (label: '{{ firstLabel }}').`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
[docs]: https://example.com/a
[docs]: https://example.com/b
````

正确示例：

<!-- prettier-ignore -->
````markdown
[docs]: https://example.com/a
[api]: https://example.com/b
````

### `markdown/no-empty-definitions`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow empty definitions

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-definitions.md)
- 常见报告：`Unexpected empty definition '{{ identifier }}' (label: '{{ label }}') found.`；`Unexpected empty footnote definition '{{ identifier }}' (label: '{{ label }}') found.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
[docs]: #
````

正确示例：

<!-- prettier-ignore -->
````markdown
[Guide][docs]

[docs]: https://example.com/docs
````

### `markdown/no-empty-images`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow empty images

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-images.md)
- 常见报告：`Unexpected empty image found.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
![Fast logo]()
````

正确示例：

<!-- prettier-ignore -->
````markdown
![Fast logo](/logo.png)
````

### `markdown/no-empty-links`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow empty links

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-links.md)
- 常见报告：`Unexpected empty link found.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
[Fast]()
````

正确示例：

<!-- prettier-ignore -->
````markdown
[Fast](https://example.com)
````

### `markdown/no-invalid-label-refs`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow invalid label references

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-invalid-label-refs.md)
- 常见报告：`Label reference '{{label}}' is invalid due to white space between [ and ].`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
[Guide][ ]
````

正确示例：

<!-- prettier-ignore -->
````markdown
[Guide][guide]

[guide]: /guide
````

### `markdown/no-missing-atx-heading-space`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow headings without a space after the hash characters

- 生效级别与范围：error: Markdown
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-atx-heading-space.md)
- 常见报告：`Missing space {{position}} hash(es) on ATX style heading.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
##Setup
````

正确示例：

<!-- prettier-ignore -->
````markdown
## Setup
````

### `markdown/no-missing-label-refs`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow missing label references

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-label-refs.md)
- 常见报告：`Label reference '{{label}}' not found.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
[Guide][missing]
````

正确示例：

<!-- prettier-ignore -->
````markdown
[Guide][guide]

[guide]: /guide
````

### `markdown/no-missing-link-fragments`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow link fragments that do not reference valid headings

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-link-fragments.md)
- 常见报告：`Link fragment '#{{fragment}}' does not reference a heading or anchor in this document.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
[Install](#missing)
````

正确示例：

<!-- prettier-ignore -->
````markdown
## Install

[Install](#install)
````

### `markdown/no-multiple-h1`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow multiple H1 headings in the same document

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-multiple-h1.md)
- 常见报告：`Unexpected additional H1 heading found.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
# Guide

# API
````

正确示例：

<!-- prettier-ignore -->
````markdown
# Guide

## API
````

### `markdown/no-reference-like-urls`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow URLs that match defined reference identifiers

- 生效级别与范围：error: Markdown
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-reference-like-urls.md)
- 常见报告：`Unexpected resource {{type}} ('{{prefix}}[text](url)') with URL that matches a definition identifier. Use '[text][id]' syntax instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
[docs]: /guide

[Guide](docs)
````

正确示例：

<!-- prettier-ignore -->
````markdown
[docs]: /guide

[Guide][docs]
````

### `markdown/no-reversed-media-syntax`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow reversed link and image syntax

- 生效级别与范围：error: Markdown
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-reversed-media-syntax.md)
- 常见报告：`Unexpected reversed syntax found. Use [label](URL) syntax instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
(Guide)[/guide]
````

正确示例：

<!-- prettier-ignore -->
````markdown
[Guide](/guide)
````

### `markdown/no-space-in-emphasis`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow spaces around emphasis markers

- 生效级别与范围：error: Markdown
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-space-in-emphasis.md)
- 常见报告：`Unexpected space around emphasis marker.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
** emphasized **
````

正确示例：

<!-- prettier-ignore -->
````markdown
**emphasized**
````

### `markdown/no-unused-definitions`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallow unused definitions

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/no-unused-definitions.md)
- 常见报告：`Unexpected unused definition '{{ identifier }}' (label: '{{ label }}') found.`；`Unexpected unused footnote definition '{{ identifier }}' (label: '{{ label }}') found.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
Text only.

[docs]: /guide
````

正确示例：

<!-- prettier-ignore -->
````markdown
[Guide][docs]

[docs]: /guide
````

### `markdown/require-alt-text`

要求补齐该规则所需的声明、属性或结构。上游说明：Require alternative text for images

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/require-alt-text.md)
- 常见报告：`Alternative text for image is required.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
![](/chart.png)
````

正确示例：

<!-- prettier-ignore -->
````markdown
![Request volume chart](/chart.png)
````

### `markdown/table-column-count`

检查该规则对应的代码约束。上游说明：Disallow data rows in a GitHub Flavored Markdown table from having more cells than the header row

- 生效级别与范围：error: Markdown
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/eslint/markdown/blob/main/docs/rules/table-column-count.md)
- 常见报告：`Table column count mismatch (Expected: {{expectedCells}}, Actual: {{actualCells}}), extra data starting here will be ignored.`；`Table column count mismatch (Expected: {{expectedCells}}, Actual: {{actualCells}}), row might be missing data.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````markdown
| Name | Value |
| --- | --- |
| A | 1 | extra |
````

正确示例：

<!-- prettier-ignore -->
````markdown
| Name | Value |
| --- | --- |
| A | 1 |
````
