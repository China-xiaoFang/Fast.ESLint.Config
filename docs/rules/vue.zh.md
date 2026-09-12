<!-- 此文件由 scripts/rules-docs.ts 生成，请勿手工编辑。 -->

# Vue 3、JSX/TSX 与 UniApp

本页记录当前依赖版本和仓库配置最终产生的 109 条规则。每条规则均列出实际严重级别、生效范围、上游说明、常见报告以及错误/正确示例。

## 仓库显式规则（15 条）

### `vue/attribute-hyphenation`

自定义组件的模板属性统一使用 kebab-case；脚本中的 Props 与 JSX 属性仍使用 camelCase。

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/attribute-hyphenation.html)
- 常见报告：`Attribute '{{text}}' must be hyphenated.`；`Attribute '{{text}}' can't be hyphenated.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard userName="Fast" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard user-name="Fast" />
</template>
````

### `vue/attributes-order`

模板属性按定义、循环、条件、修饰、唯一属性、全局属性、普通属性、事件和内容排序。

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/attributes-order.html)
- 常见报告：`Attribute "{{currentNode}}" should go before "{{prevNode}}".`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<button @click="save" v-if="ready" id="save">Save</button>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<button v-if="ready" id="save" @click="save">Save</button>
</template>
````

### `vue/custom-event-name-casing`

`emit`、`emits` 和事件处理引用中的自定义事件名称统一使用 camelCase，原生 DOM 事件不受影响。

- 生效级别与范围：error: Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/custom-event-name-casing.html)
- 常见报告：`Custom event name '{{name}}' must be {{caseType}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup>const emit = defineEmits(["saveItem"]);
emit("save-item");</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>const emit = defineEmits(["saveItem"]);
emit("saveItem");</script>
````

### `vue/multi-word-component-names`

允许 `App`、`Layout` 等约定俗成的单词组件名。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/multi-word-component-names.html)
- 常见报告：`Component name "{{value}}" should always be multi-word.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { name: 'Card' };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { name: 'UserCard' };
</script>
````

### `vue/no-dupe-keys`

`props`、`data`、`computed`、`methods` 等选项中禁止同名键，避免成员互相遮蔽。

- 生效级别与范围：error: Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-dupe-keys.html)
- 常见报告：`Duplicate key '{{name}}'. May cause name collision in script or template tag.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>export default { props: ["name"], data: () => ({ name: "" }) };</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>export default { props: ["name"], data: () => ({ draftName: "" }) };</script>
````

### `vue/no-mutating-props`

Props 属于父组件只读输入，子组件应通过 emit 或本地状态更新。

- 生效级别与范围：error: Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-mutating-props.html)
- 常见报告：`Unexpected mutation of "{{key}}" prop.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup lang="ts">const props = defineProps<{ count: number }>();
props.count++;</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup lang="ts">const props = defineProps<{ count: number }>();
const emit = defineEmits<{ "update:count": [value: number] }>();
emit("update:count", props.count + 1);</script>
````

### `vue/no-ref-object-reactivity-loss`

禁止以会丢失响应性的方式解构或传递 ref 对象，确保后续更新仍能被 Vue 追踪。

- 生效级别与范围：error: Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-ref-object-reactivity-loss.html)
- 常见报告：`Getting a value from the ref object in the same scope will cause the value to lose reactivity.`；`Getting a reactive variable in the same scope will cause the value to lose reactivity.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup>import { ref } from 'vue';
const count = ref(0).value;</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>import { ref } from 'vue';
const count = ref(0);</script>
<template><p>{{ count }}</p></template>
````

### `vue/no-reserved-component-names`

组件名不能占用 Vue 内置组件或平台保留名称。

- 生效级别与范围：error: Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-reserved-component-names.html)
- 常见报告：`Name "{{name}}" is reserved.`；`Name "{{name}}" is reserved in HTML.`；`Name "{{name}}" is reserved in Vue.js.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup>defineOptions({ name: "div" });</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>defineOptions({ name: "PageContainer" });</script>
````

### `vue/no-setup-props-reactivity-loss`

`setup` 中直接解构 props 会丢失响应性，要求保留 props 引用或使用 `toRefs` 等响应式转换。

- 生效级别与范围：error: Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-setup-props-reactivity-loss.html)
- 常见报告：`Destructuring the 'props' will cause the value to lose reactivity.`；`Getting a value from the 'props' in root scope of '{{scopeName}}' will cause the value to lose reactivity.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { setup({ count }) { return { count }; } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { setup(props) { return { count: toRef(props, 'count') }; } };
</script>
````

### `vue/no-v-html`

`v-html` 可能引入 XSS；保留警告以兼容经过净化的富文本场景。

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-v-html.html)
- 常见报告：`'v-html' directive can lead to XSS attack.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-html="untrustedHtml" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<div>{{ plainText }}</div>
</template>
````

### `vue/no-v-text-v-html-on-component`

禁止在组件节点使用 `v-text` 或 `v-html`，避免覆盖组件内容并模糊数据边界。

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-v-text-v-html-on-component.html)
- 常见报告：`Using {{directiveName}} on component may break component's content.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard v-html="content" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard>{{ content }}</UserCard>
</template>
````

### `vue/one-component-per-file`

允许在一个 SFC 中声明仅供当前文件使用的小型辅助组件。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/one-component-per-file.html)
- 常见报告：`There is more than one component in this file.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export const Header = defineComponent({});
export const Footer = defineComponent({});
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default defineComponent({ name: 'PageHeader' });
</script>
````

### `vue/prefer-import-from-vue`

允许直接使用 Vue 子包入口，兼容编译器与运行时等明确子模块导入。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/prefer-import-from-vue.html)
- 常见报告：`Import from 'vue' instead of '{{source}}'.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
import { ref } from '@vue/reactivity';
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
import { ref } from 'vue';
</script>
````

### `vue/require-default-prop`

TypeScript 类型 props 和 `required` 声明已能表达可选性，不强制每个可选 prop 提供默认值。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/require-default-prop.html)
- 常见报告：`Prop '{{propName}}' requires default value to be set.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { name: String } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { name: { type: String, default: '' } } };
</script>
````

### `vue/require-explicit-emits`

组件事件必须显式声明，形成可检查的对外事件契约。

- 生效级别与范围：error: Vue SFC、Vue JSX、Vue TSX、UniApp NVue、UniApp TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/require-explicit-emits.html)
- 常见报告：`The "{{name}}" event has been triggered but not declared on {{emitsKind}}.`；`Add the "{{name}}" to {{emitsKind}}.`；`Add the {{emitsKind}} with array syntax and define "{{name}}" event.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup lang="ts">const emit = defineEmits<{ cancel: [] }>();
emit("save");</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup lang="ts">const emit = defineEmits<{ save: [] }>();
emit("save");</script>
````

## 第三方预置规则（94 条）

### `vue/block-order`

检查该规则对应的代码约束。上游说明：enforce order of component top-level elements

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/block-order.html)
- 常见报告：`'<{{elementName}}{{elementAttributes}}>' should be above '<{{firstUnorderedName}}{{firstUnorderedAttributes}}>' on line {{line}}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<style scoped>.page { color: red; }</style>
<script setup>const title = 'Page';</script>
<template><h1>{{ title }}</h1></template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>const title = 'Page';</script>
<template><h1>{{ title }}</h1></template>
<style scoped>.page { color: red; }</style>
````

### `vue/comment-directive`

检查该规则对应的代码约束。上游说明：support comment-directives in `<template>`

- 生效级别与范围：error: Vue SFC
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/comment-directive.html)
- 常见报告：`--block {{key}}`；`++block`；`--line {{key}}`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
// eslint-disable-next-line vue/no-v-html
<div v-html="html" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<!-- eslint-disable-next-line vue/no-v-html -->
<div v-html="html" />
</template>
````

### `vue/component-definition-name-casing`

检查该规则对应的代码约束。上游说明：enforce specific casing for component definition name

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/component-definition-name-casing.html)
- 常见报告：`Property name "{{value}}" is not {{caseType}}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { name: 'user-card' };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { name: 'UserCard' };
</script>
````

### `vue/first-attribute-linebreak`

检查该规则对应的代码约束。上游说明：enforce the location of first attribute

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/first-attribute-linebreak.html)
- 常见报告：`Expected a linebreak before this attribute.`；`Expected no linebreak before this attribute.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard name="Fast"
  :active="true" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard
  name="Fast"
  :active="true"
/>
</template>
````

### `vue/jsx-uses-vars`

检查该规则对应的代码约束。上游说明：prevent variables used in JSX to be marked as unused

- 生效级别与范围：error: Vue SFC
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/jsx-uses-vars.html)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const UserCard = defineComponent({});
const view = <div />;
````

正确示例：

<!-- prettier-ignore -->
````tsx
const UserCard = defineComponent({});
const view = <UserCard />;
````

### `vue/no-arrow-functions-in-watch`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using arrow functions to define watcher

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-arrow-functions-in-watch.html)
- 常见报告：`You should not use an arrow function to define a watcher.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { watch: { count: () => { this.save(); } } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { watch: { count() { this.save(); } } };
</script>
````

### `vue/no-async-in-computed-properties`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow asynchronous actions in computed properties

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-async-in-computed-properties.html)
- 常见报告：`Unexpected {{expressionName}} in computed function.`；`Unexpected {{expressionName}} in "{{propertyName}}" computed property.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { computed: { async user() { return await loadUser(); } } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { data: () => ({ user: null }), async mounted() { this.user = await loadUser(); } };
</script>
````

### `vue/no-child-content`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow element's child contents which would be overwritten by a directive like `v-html` or `v-text`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-child-content.html)
- 常见报告：`Child content is disallowed because it will be overwritten by the v-{{ directiveName }} directive.`；`Remove child content.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-html="html">Fallback</div>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-html="html" />
</template>
````

### `vue/no-computed-properties-in-data`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow accessing computed properties in `data`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-computed-properties-in-data.html)
- 常见报告：`The computed property cannot be used in 'data()' because it is before initialization.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { data() { return { label: this.fullName }; }, computed: { fullName() { return this.name.trim(); } } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { data: () => ({ name: '' }), computed: { fullName() { return this.name.trim(); } } };
</script>
````

### `vue/no-deprecated-data-object-declaration`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated object declaration on data (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-data-object-declaration.html)
- 常见报告：`Object declaration on 'data' property is deprecated. Using function declaration instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { data: { ready: false } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { data() { return { ready: false }; } };
</script>
````

### `vue/no-deprecated-delete-set`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated `$delete` and `$set` (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-delete-set.html)
- 常见报告：`The '$delete', '$set' is deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { methods: { update() { this.$set(this.user, 'name', 'Fast'); this.$delete(this.user, 'legacy'); } } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { methods: { update() { this.user.name = 'Fast'; delete this.user.legacy; } } };
</script>
````

### `vue/no-deprecated-destroyed-lifecycle`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated `destroyed` and `beforeDestroy` lifecycle hooks (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-destroyed-lifecycle.html)
- 常见报告：`The 'destroyed' lifecycle hook is deprecated. Use 'unmounted' instead.`；`The 'beforeDestroy' lifecycle hook is deprecated. Use 'beforeUnmount' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { destroyed() { cleanup(); } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { unmounted() { cleanup(); } };
</script>
````

### `vue/no-deprecated-dollar-listeners-api`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated `$listeners` (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-dollar-listeners-api.html)
- 常见报告：`The '$listeners' is deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { use(this.$listeners); } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { use(this.$attrs); } };
</script>
````

### `vue/no-deprecated-dollar-scopedslots-api`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated `$scopedSlots` (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-dollar-scopedslots-api.html)
- 常见报告：`The '$scopedSlots' is deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { use(this.$scopedSlots); } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { use(this.$slots); } };
</script>
````

### `vue/no-deprecated-events-api`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated events api (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-events-api.html)
- 常见报告：`The Events api '$on', '$off' '$once' is deprecated. Using external library instead, for example mitt.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { this.$on('save', this.handleSave); } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { eventBus.on('save', this.handleSave); } };
</script>
````

### `vue/no-deprecated-filter`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated filters syntax (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-filter.html)
- 常见报告：`Filters are deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p>{{ total | currency }}</p>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<p>{{ formatCurrency(total) }}</p>
</template>
````

### `vue/no-deprecated-functional-template`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated the `functional` template (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-functional-template.html)
- 常见报告：`The 'functional' template are deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template functional><div /></template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>export default (props) => h('div', props);</script>
````

### `vue/no-deprecated-html-element-is`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated the `is` attribute on HTML elements (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-html-element-is.html)
- 常见报告：`The 'is' attribute on HTML element are deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<table><tr is="UserRow" /></table>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<table><tr is="vue:UserRow" /></table>
</template>
````

### `vue/no-deprecated-inline-template`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated `inline-template` attribute (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-inline-template.html)
- 常见报告：`'inline-template' are deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard inline-template><p>{{ name }}</p></UserCard>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard><template #default><p>{{ name }}</p></template></UserCard>
</template>
````

### `vue/no-deprecated-model-definition`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow deprecated `model` definition (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-model-definition.html)
- 常见报告：`'model' definition is deprecated.`；`'model' definition is deprecated. You may use the Vue 3-compatible 'modelValue'/'update:modelValue' though.`；`Change to 'modelValue'/'update:modelValue'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { model: { prop: 'value', event: 'input' } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { modelValue: String }, emits: ['update:modelValue'] };
</script>
````

### `vue/no-deprecated-props-default-this`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow deprecated `this` access in props default function (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-props-default-this.html)
- 常见报告：`Props default value factory functions no longer have access to 'this'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { color: { default() { return this.theme.color; } } } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { color: { default: 'blue' } } };
</script>
````

### `vue/no-deprecated-router-link-tag-prop`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated `tag` property on `RouterLink` (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-router-link-tag-prop.html)
- 常见报告：`'tag' property on '{{element}}' component is deprecated. Use scoped slots instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<RouterLink to="/home" tag="button">Home</RouterLink>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<RouterLink to="/home" custom v-slot="{ navigate }"><button @click="navigate">Home</button></RouterLink>
</template>
````

### `vue/no-deprecated-scope-attribute`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow deprecated `scope` attribute (in Vue.js 2.5.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-scope-attribute.html)
- 常见报告：`'scope' attributes are deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<template scope="slotProps">{{ slotProps.name }}</template>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<template #default="slotProps">{{ slotProps.name }}</template>
</template>
````

### `vue/no-deprecated-slot-attribute`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow deprecated `slot` attribute (in Vue.js 2.6.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-slot-attribute.html)
- 常见报告：`'slot' attributes are deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p slot="header">Title</p>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<template #header><p>Title</p></template>
</template>
````

### `vue/no-deprecated-slot-scope-attribute`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow deprecated `slot-scope` attribute (in Vue.js 2.6.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-slot-scope-attribute.html)
- 常见报告：`'slot-scope' are deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<template slot-scope="slotProps">{{ slotProps.name }}</template>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<template #default="slotProps">{{ slotProps.name }}</template>
</template>
````

### `vue/no-deprecated-v-bind-sync`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow use of deprecated `.sync` modifier on `v-bind` directive (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-v-bind-sync.html)
- 常见报告：`'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard :name.sync="name" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard v-model:name="name" />
</template>
````

### `vue/no-deprecated-v-is`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow deprecated `v-is` directive (in Vue.js 3.1.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-v-is.html)
- 常见报告：`'v-is' directive is deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-is="componentName" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<component :is="componentName" />
</template>
````

### `vue/no-deprecated-v-on-native-modifier`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated `.native` modifiers (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-v-on-native-modifier.html)
- 常见报告：`'.native' modifier on 'v-on' directive is deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard @click.native="open" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard @click="open" />
</template>
````

### `vue/no-deprecated-v-on-number-modifiers`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated number (keycode) modifiers (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-v-on-number-modifiers.html)
- 常见报告：`'KeyboardEvent.keyCode' modifier on 'v-on' directive is deprecated. Using 'KeyboardEvent.key' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<input @keyup.13="submit" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<input @keyup.enter="submit" />
</template>
````

### `vue/no-deprecated-vue-config-keycodes`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using deprecated `Vue.config.keyCodes` (in Vue.js 3.0.0+)

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-deprecated-vue-config-keycodes.html)
- 常见报告：`'Vue.config.keyCodes' are deprecated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
Vue.config.keyCodes.f1 = 112;
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
const onKeydown = (event) => { if (event.key === 'F1') openHelp(); };
</script>
````

### `vue/no-dupe-v-else-if`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow duplicate conditions in `v-if` / `v-else-if` chains

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-dupe-v-else-if.html)
- 常见报告：`This branch can never execute. Its condition is a duplicate or covered by previous conditions in the 'v-if' / 'v-else-if' chain.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-if="status === 'ready'">Ready</p><p v-else-if="status === 'ready'">Again</p>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-if="status === 'ready'">Ready</p><p v-else-if="status === 'failed'">Failed</p>
</template>
````

### `vue/no-duplicate-attributes`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow duplication of attributes

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-duplicate-attributes.html)
- 常见报告：`Duplicate attribute '{{name}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard name="A" name="B" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard first-name="A" last-name="B" />
</template>
````

### `vue/no-export-in-script-setup`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow `export` in `<script setup>`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-export-in-script-setup.html)
- 常见报告：`'<script setup>' cannot contain ES module exports.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup>export const ready = true;</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>const ready = true;</script>
````

### `vue/no-expose-after-await`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow asynchronously registered `expose`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-expose-after-await.html)
- 常见报告：`'{{name}}' is forbidden after an 'await' expression.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup>await load();
defineExpose({ refresh });</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>defineExpose({ refresh });
await load();</script>
````

### `vue/no-lifecycle-after-await`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow asynchronously registered lifecycle hooks

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-lifecycle-after-await.html)
- 常见报告：`Lifecycle hooks are forbidden after an 'await' expression.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>import { onMounted } from 'vue';
export default { async setup() { await load(); onMounted(start); } };</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>import { onMounted } from 'vue';
export default { async setup() { onMounted(start); await load(); } };</script>
````

### `vue/no-lone-template`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow unnecessary `<template>`

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-lone-template.html)
- 常见报告：`'<template>' require directive.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template><template><p>Content</p></template></template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template><p>Content</p></template>
````

### `vue/no-multiple-slot-args`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow passing multiple arguments to scoped slots

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-multiple-slot-args.html)
- 常见报告：`Unexpected multiple arguments.`；`Unexpected spread argument.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { this.$slots.default({ name: 'Fast' }, 0); } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { this.$slots.default({ name: 'Fast', index: 0 }); } };
</script>
````

### `vue/no-parsing-error`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow parsing errors in `<template>`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-parsing-error.html)
- 常见报告：`Parsing error: {{message}}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template><div></span></template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template><div /></template>
````

### `vue/no-ref-as-operand`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow use of value wrapped by `ref()` (Composition API) as an operand

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-ref-as-operand.html)
- 常见报告：`Must use '.value' to read or write the value wrapped by '{{method}}()'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup>import { ref } from 'vue';
const count = ref(0);
const next = count + 1;</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>import { ref } from 'vue';
const count = ref(0);
const next = count.value + 1;</script>
````

### `vue/no-required-prop-with-default`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：enforce props with default values to be optional

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-required-prop-with-default.html)
- 常见报告：`Prop "{{ key }}" should be optional.`；`Change this prop to be optional.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { name: { type: String, required: true, default: 'Fast' } } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { name: { type: String, default: 'Fast' } } };
</script>
````

### `vue/no-reserved-keys`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow overwriting reserved keys

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-reserved-keys.html)
- 常见报告：`Key '{{name}}' is reserved.`；`Keys starting with '_' are reserved in '{{name}}' group.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { data: () => ({ $el: null }) };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { data: () => ({ element: null }) };
</script>
````

### `vue/no-reserved-props`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow reserved names in props

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-reserved-props.html)
- 常见报告：`'{{propName}}' is a reserved attribute and cannot be used as props.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { key: String } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { itemKey: String } };
</script>
````

### `vue/no-shared-component-data`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：enforce component's data property to be a function

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-shared-component-data.html)
- 常见报告：`'data' property in component must be a function.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { data: { ready: false } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { data() { return { ready: false }; } };
</script>
````

### `vue/no-side-effects-in-computed-properties`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow side effects in computed properties

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-side-effects-in-computed-properties.html)
- 常见报告：`Unexpected side effect in computed function.`；`Unexpected side effect in "{{key}}" computed property.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { computed: { fullName() { this.name = this.name.trim(); return this.name; } } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { computed: { fullName() { return this.name.trim(); } } };
</script>
````

### `vue/no-template-key`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow `key` attribute on `<template>`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-template-key.html)
- 常见报告：`'<template>' cannot be keyed. Place the key on real elements instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<template :key="item.id"><UserRow /></template>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserRow :key="item.id" />
</template>
````

### `vue/no-template-shadow`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow variable declarations from shadowing variables declared in the outer scope

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-template-shadow.html)
- 常见报告：`Variable '{{name}}' is already declared in the upper scope.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-for="user in users"><span v-for="user in user.friends">{{ user.name }}</span></div>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-for="user in users"><span v-for="friend in user.friends">{{ friend.name }}</span></div>
</template>
````

### `vue/no-textarea-mustache`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow mustaches in `<textarea>`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-textarea-mustache.html)
- 常见报告：`Unexpected mustache. Use 'v-model' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<textarea>{{ message }}</textarea>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<textarea v-model="message" />
</template>
````

### `vue/no-unused-components`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow registering components that are not used inside templates

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-unused-components.html)
- 常见报告：`The "{{name}}" component has been registered but not used.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>import UserCard from './UserCard.vue';
export default { components: { UserCard } };</script>
<template><div /></template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>import UserCard from './UserCard.vue';
export default { components: { UserCard } };</script>
<template><UserCard /></template>
````

### `vue/no-unused-vars`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow unused variable definitions of v-for directives or scope attributes

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-unused-vars.html)
- 常见报告：`'{{name}}' is defined but never used.`；`Replace '{{name}}' with '_{{name}}' to ignore the unused variable.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<li v-for="item in items">Static</li>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<li v-for="item in items">{{ item.name }}</li>
</template>
````

### `vue/no-use-computed-property-like-method`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow use computed property like method

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-use-computed-property-like-method.html)
- 常见报告：`Use {{ likeProperty }} instead of {{ likeMethod }}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { computed: { fullName() { return 'Fast'; } }, mounted() { use(this.fullName()); } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { computed: { fullName() { return 'Fast'; } }, mounted() { use(this.fullName); } };
</script>
````

### `vue/no-use-v-if-with-v-for`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow using `v-if` on the same element as `v-for`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-use-v-if-with-v-for.html)
- 常见报告：`This 'v-if' should be moved to the wrapper element.`；`The '{{iteratorName}}' {{kind}} inside 'v-for' directive should be replaced with a computed property that returns filtered array instead. You should not mix 'v-for' with 'v-if'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<li v-for="item in items" v-if="item.visible">{{ item.name }}</li>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<li v-for="item in visibleItems">{{ item.name }}</li>
</template>
````

### `vue/no-useless-template-attributes`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow useless attribute on `<template>`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-useless-template-attributes.html)
- 常见报告：`Unexpected useless attribute on '<template>'.`；`Unexpected useless directive on '<template>'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<template v-if="ready" class="wrapper"><p>Text</p></template>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<template v-if="ready"><p class="wrapper">Text</p></template>
</template>
````

### `vue/no-v-for-template-key-on-child`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow key of `<template v-for>` placed on child elements

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-v-for-template-key-on-child.html)
- 常见报告：`'<template v-for>' key should be placed on the '<template>' tag.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<template v-for="item in items"><UserRow :key="item.id" /></template>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<template v-for="item in items" :key="item.id"><UserRow /></template>
</template>
````

### `vue/no-watch-after-await`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：disallow asynchronously registered `watch`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/no-watch-after-await.html)
- 常见报告：`'watch' is forbidden after an 'await' expression.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>import { watch } from 'vue';
export default { async setup() { await load(); watch(source, update); } };</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>import { watch } from 'vue';
export default { async setup() { watch(source, update); await load(); } };</script>
````

### `vue/order-in-components`

检查该规则对应的代码约束。上游说明：enforce order of properties in components

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/order-in-components.html)
- 常见报告：`The "{{name}}" property should be above the "{{firstUnorderedPropertyName}}" property on line {{line}}.`；`Manually move "{{name}}" property above "{{firstUnorderedPropertyName}}" property on line {{line}} (might break side effects).`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { methods: { save() {} }, props: { name: String }, data: () => ({ ready: false }) };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { name: String }, data: () => ({ ready: false }), methods: { save() {} } };
</script>
````

### `vue/prop-name-casing`

检查该规则对应的代码约束。上游说明：enforce specific casing for the Prop name in Vue components

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/prop-name-casing.html)
- 常见报告：`Prop "{{name}}" is not in {{caseType}}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { user_name: String } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { userName: String } };
</script>
````

### `vue/require-component-is`

要求补齐该规则所需的声明、属性或结构。上游说明：require `v-bind:is` of `<component>` elements

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/require-component-is.html)
- 常见报告：`Expected '<component>' elements to have 'v-bind:is' attribute.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<component />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<component :is="currentComponent" />
</template>
````

### `vue/require-prop-type-constructor`

要求补齐该规则所需的声明、属性或结构。上游说明：require prop type to be a constructor

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/require-prop-type-constructor.html)
- 常见报告：`The "{{name}}" property should be a constructor.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { name: { type: 'string' } } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { name: { type: String } } };
</script>
````

### `vue/require-prop-types`

要求补齐该规则所需的声明、属性或结构。上游说明：require type definitions in props

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/require-prop-types.html)
- 常见报告：`Prop "{{name}}" should define at least its type.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: ['name'] };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { name: String } };
</script>
````

### `vue/require-render-return`

要求补齐该规则所需的声明、属性或结构。上游说明：enforce render function to always return value

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/require-render-return.html)
- 常见报告：`Expected to return a value in render function.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { render() { createVNode('div'); } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { render() { return createVNode('div'); } };
</script>
````

### `vue/require-slots-as-functions`

要求补齐该规则所需的声明、属性或结构。上游说明：enforce properties of `$slots` to be used as a function

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/require-slots-as-functions.html)
- 常见报告：`Property in '$slots' should be used as function.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { const content = [this.$slots.default]; use(content); } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { const content = [this.$slots.default?.()]; use(content); } };
</script>
````

### `vue/require-toggle-inside-transition`

要求补齐该规则所需的声明、属性或结构。上游说明：require control the display of the content inside `<transition>`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/require-toggle-inside-transition.html)
- 常见报告：`The element inside '<transition>' is expected to have a {{allowedDirectives}} directive.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<Transition><div>Always visible</div></Transition>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<Transition><div v-if="visible">Visible</div></Transition>
</template>
````

### `vue/require-v-for-key`

要求补齐该规则所需的声明、属性或结构。上游说明：require `v-bind:key` with `v-for` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/require-v-for-key.html)
- 常见报告：`Elements in iteration expect to have 'v-bind:key' directives.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-for="item in items">{{ item.name }}</div>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-for="item in items" :key="item.id">{{ item.name }}</div>
</template>
````

### `vue/require-valid-default-prop`

要求补齐该规则所需的声明、属性或结构。上游说明：enforce props default values to be valid

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/require-valid-default-prop.html)
- 常见报告：`Type of the default value for '{{name}}' prop must be a {{types}}.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { items: { type: Array, default: [] } } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { props: { items: { type: Array, default: () => [] } } };
</script>
````

### `vue/return-in-computed-property`

检查该规则对应的代码约束。上游说明：enforce that a return statement is present in computed property

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/return-in-computed-property.html)
- 常见报告：`Expected to return a value in computed function.`；`Expected to return a value in "{{name}}" computed property.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { computed: { label() { if (this.name) return this.name; } } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { computed: { label() { return this.name || 'Anonymous'; } } };
</script>
````

### `vue/return-in-emits-validator`

检查该规则对应的代码约束。上游说明：enforce that a return statement is present in emits validator

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/return-in-emits-validator.html)
- 常见报告：`Expected to return a true value in "{{name}}" emits validator.`；`Expected to return a boolean value in "{{name}}" emits validator.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup>const emit = defineEmits({ save(payload) { validate(payload); } });</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>const emit = defineEmits({ save(payload) { return validate(payload); } });</script>
````

### `vue/this-in-template`

检查该规则对应的代码约束。上游说明：disallow usage of `this` in template

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/this-in-template.html)
- 常见报告：`Unexpected usage of 'this'.`；`Expected 'this'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p>{{ this.name }}</p>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<p>{{ name }}</p>
</template>
````

### `vue/use-v-on-exact`

检查该规则对应的代码约束。上游说明：enforce usage of `exact` modifier on `v-on`

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/use-v-on-exact.html)
- 常见报告：`Consider to use '.exact' modifier.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<button @click="select" @click.ctrl="selectMultiple">Select</button>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<button @click.exact="select" @click.ctrl.exact="selectMultiple">Select</button>
</template>
````

### `vue/v-bind-style`

检查该规则对应的代码约束。上游说明：enforce `v-bind` directive style

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/v-bind-style.html)
- 常见报告：`Expected 'v-bind' before ':'.`；`Unexpected 'v-bind' before ':'.`；`Expected 'v-bind:' instead of '.'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard v-bind:name="name" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard :name="name" />
</template>
````

### `vue/v-on-event-hyphenation`

检查该规则对应的代码约束。上游说明：enforce v-on event naming style on custom components in template

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/v-on-event-hyphenation.html)
- 常见报告：`v-on event '{{text}}' must be hyphenated.`；`v-on event '{{text}}' can't be hyphenated.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard @saveItem="save" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard @save-item="save" />
</template>
````

### `vue/v-on-style`

检查该规则对应的代码约束。上游说明：enforce `v-on` directive style

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/v-on-style.html)
- 常见报告：`Expected '@' instead of 'v-on:'.`；`Expected 'v-on:' instead of '@'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<button v-on:click="save">Save</button>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<button @click="save">Save</button>
</template>
````

### `vue/v-slot-style`

检查该规则对应的代码约束。上游说明：enforce `v-slot` directive style

- 生效级别与范围：warn: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/v-slot-style.html)
- 常见报告：`Expected '#{{argument}}' instead of '{{actual}}'.`；`Expected 'v-slot:{{argument}}' instead of '{{actual}}'.`；`Expected 'v-slot' instead of '{{actual}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<template v-slot:header>Title</template>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<template #header>Title</template>
</template>
````

### `vue/valid-attribute-name`

校验对应语法、属性或参数是否合法。上游说明：require valid attribute names

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-attribute-name.html)
- 常见报告：`Attribute name {{name}} is not valid.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div bad"name="value" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<div data-name="value" />
</template>
````

### `vue/valid-define-emits`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `defineEmits` compiler macro

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-define-emits.html)
- 常见报告：`'defineEmits' has both a type-only emit and an argument.`；`'defineEmits' is referencing locally declared variables.`；`'defineEmits' has been called multiple times.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup>defineEmits(['save']);
defineEmits(['cancel']);</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>const emit = defineEmits(['save', 'cancel']);</script>
````

### `vue/valid-define-options`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `defineOptions` compiler macro

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-define-options.html)
- 常见报告：`'defineOptions' is referencing locally declared variables.`；`'defineOptions' has been called multiple times.`；`Options are not defined.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup>const componentName = getComponentName();
defineOptions({ name: componentName });</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>defineOptions({ name: 'UserCard' });</script>
````

### `vue/valid-define-props`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `defineProps` compiler macro

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-define-props.html)
- 常见报告：`'defineProps' has both a type-only props and an argument.`；`'defineProps' is referencing locally declared variables.`；`'defineProps' has been called multiple times.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script setup>defineProps(['name']);
defineProps(['age']);</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script setup>const props = defineProps(['name', 'age']);</script>
````

### `vue/valid-next-tick`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `nextTick` function calls

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-next-tick.html)
- 常见报告：`'nextTick' is a function.`；`Await the Promise returned by 'nextTick' or pass a callback function.`；`Add missing 'await' statement.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { this.$nextTick(); } };
</script>
````

正确示例：

<!-- prettier-ignore -->
````vue
<script>
export default { mounted() { this.$nextTick(() => updateLayout()); } };
</script>
````

### `vue/valid-template-root`

校验对应语法、属性或参数是否合法。上游说明：enforce valid template root

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-template-root.html)
- 常见报告：`The template root with 'src' attribute is required to be empty.`；`The template requires child element.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template></template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template><main>Content</main></template>
````

### `vue/valid-v-bind`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-bind` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-bind.html)
- 常见报告：`'v-bind' directives don't support the modifier '{{name}}'.`；`'v-bind' directives require an attribute value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-bind:class />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<div :class="classes" />
</template>
````

### `vue/valid-v-cloak`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-cloak` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-cloak.html)
- 常见报告：`'v-cloak' directives require no argument.`；`'v-cloak' directives require no modifier.`；`'v-cloak' directives require no attribute value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-cloak="ready" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-cloak />
</template>
````

### `vue/valid-v-else`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-else` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-else.html)
- 常见报告：`'v-else' directives require being preceded by the element which has a 'v-if' or 'v-else-if' directive.`；`'v-else' and 'v-if' directives can't exist on the same element. You may want 'v-else-if' directives.`；`'v-else' and 'v-else-if' directives can't exist on the same element.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-else="ready">Fallback</p>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-if="ready">Ready</p><p v-else>Fallback</p>
</template>
````

### `vue/valid-v-else-if`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-else-if` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-else-if.html)
- 常见报告：`'v-else-if' directives require being preceded by the element which has a 'v-if' or 'v-else-if' directive.`；`'v-else-if' and 'v-if' directives can't exist on the same element.`；`'v-else-if' and 'v-else' directives can't exist on the same element.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-else-if>Loading</p>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-if="ready">Ready</p><p v-else-if="loading">Loading</p>
</template>
````

### `vue/valid-v-for`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-for` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-for.html)
- 常见报告：`Custom elements in iteration require 'v-bind:key' directives.`；`Expected 'v-bind:key' directive to use the variables which are defined by the 'v-for' directive.`；`'v-for' directives require no argument.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<li v-for>Item</li>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<li v-for="item in items" :key="item.id">{{ item.name }}</li>
</template>
````

### `vue/valid-v-html`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-html` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-html.html)
- 常见报告：`'v-html' directives require no argument.`；`'v-html' directives require no modifier.`；`'v-html' directives require that attribute value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-html />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-html="sanitizedHtml" />
</template>
````

### `vue/valid-v-if`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-if` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-if.html)
- 常见报告：`'v-if' and 'v-else' directives can't exist on the same element. You may want 'v-else-if' directives.`；`'v-if' and 'v-else-if' directives can't exist on the same element.`；`'v-if' directives require no argument.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-if>Ready</p>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-if="ready">Ready</p>
</template>
````

### `vue/valid-v-is`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-is` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-is.html)
- 常见报告：`'v-is' directives require no argument.`；`'v-is' directives require no modifier.`；`'v-is' directives require that attribute value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-is />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<component :is="currentComponent" />
</template>
````

### `vue/valid-v-memo`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-memo` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-memo.html)
- 常见报告：`'v-memo' directives require no argument.`；`'v-memo' directives require no modifier.`；`'v-memo' directives require that attribute value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-memo />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<div v-memo="[count]" />
</template>
````

### `vue/valid-v-model`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-model` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-model.html)
- 常见报告：`'v-model' directives aren't supported on <{{name}}> elements.`；`'v-model' directives don't support 'file' input type.`；`'v-model' directives require no argument.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<input v-model:color="color" />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<input v-model="color" />
</template>
````

### `vue/valid-v-on`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-on` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-on.html)
- 常见报告：`'v-on' directives don't support the modifier '{{modifier}}'.`；`Avoid using JavaScript keyword as "v-on" value: {{value}}.`；`'v-on' directives require a value or verb modifier (like 'stop' or 'prevent').`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<button v-on>Save</button>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<button @click="save">Save</button>
</template>
````

### `vue/valid-v-once`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-once` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-once.html)
- 常见报告：`'v-once' directives require no argument.`；`'v-once' directives require no modifier.`；`'v-once' directives require no attribute value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-once:label>Static</p>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-once>Static</p>
</template>
````

### `vue/valid-v-pre`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-pre` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-pre.html)
- 常见报告：`'v-pre' directives require no argument.`；`'v-pre' directives require no modifier.`；`'v-pre' directives require no attribute value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-pre="enabled">{{ raw }}</p>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-pre>{{ raw }}</p>
</template>
````

### `vue/valid-v-show`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-show` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-show.html)
- 常见报告：`'v-show' directives require no argument.`；`'v-show' directives require no modifier.`；`'v-show' directives require that attribute value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-show>Visible</p>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-show="visible">Visible</p>
</template>
````

### `vue/valid-v-slot`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-slot` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-slot.html)
- 常见报告：`'v-slot' directive must be owned by a custom element, but '{{name}}' is not.`；`Named slots must use '<template>' on a custom element.`；`Default slot must use '<template>' on a custom element when there are other named slots.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<div #header>Title</div>
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<UserCard><template #header>Title</template></UserCard>
</template>
````

### `vue/valid-v-text`

校验对应语法、属性或参数是否合法。上游说明：enforce valid `v-text` directives

- 生效级别与范围：error: Vue SFC、UniApp NVue
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint.vuejs.org/rules/valid-v-text.html)
- 常见报告：`'v-text' directives require no argument.`；`'v-text' directives require no modifier.`；`'v-text' directives require that attribute value.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-text />
</template>
````

正确示例：

<!-- prettier-ignore -->
````vue
<template>
<p v-text="message" />
</template>
````
