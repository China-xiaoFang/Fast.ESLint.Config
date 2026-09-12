<!-- 此文件由 scripts/rules-docs.ts 生成，请勿手工编辑。 -->

# React 与 React Hooks

本页记录当前依赖版本和仓库配置最终产生的 86 条规则。每条规则均列出实际严重级别、生效范围、上游说明、常见报告以及错误/正确示例。

## 仓库显式规则（13 条）

### `@eslint-react/dom-no-missing-button-type`

`button` 缺少 `type` 时在表单内默认为 `submit`，显式声明可避免意外提交。

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-missing-button-type)
- 常见报告：`Add type attribute with value '{{ type }}'.`；`Missing an explicit type attribute for button.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<button onClick={save}>Save</button>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<button type="button" onClick={save}>Save</button>
````

### `@eslint-react/dom-no-missing-iframe-sandbox`

未受限 `iframe` 权限面较大；以警告提醒评估可信来源和 `sandbox` 策略。

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-missing-iframe-sandbox)
- 常见报告：`Add sandbox attribute with value '{{ value }}'.`；`Missing an explicit sandbox attribute for iframe.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<iframe src="https://example.com" />
````

正确示例：

<!-- prettier-ignore -->
````tsx
<iframe src="https://example.com" sandbox="allow-scripts" />
````

### `@eslint-react/dom-no-unknown-property`

JSX 属性拼写错误会被 React 忽略或错误透传到 DOM，应在提交前阻断。

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-unknown-property)
- 常见报告：`React does not recognize data-* props with uppercase characters on a DOM element. Found '{{name}}', use '{{lowerCaseName}}' instead`；`Invalid property '{{name}}' found on tag '{{tagName}}', but it is only allowed on: {{allowedTags}}`；`Unknown property '{{name}}' found`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<label class="field" for="name">Name</label>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<label className="field" htmlFor="name">Name</label>
````

### `@eslint-react/dom-no-unsafe-target-blank`

`target="_blank"` 未隔离 `opener` 时可能允许目标页控制来源页。

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-unsafe-target-blank)
- 常见报告：`Add 'rel="noreferrer noopener"' to the link to prevent security risks.`；`Using 'target="_blank"' on an external link without 'rel="noreferrer noopener"' is a security risk.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<a href="https://example.com" target="_blank">Open</a>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<a href="https://example.com" target="_blank" rel="noreferrer">Open</a>
````

### `@eslint-react/error-boundaries`

子组件渲染错误应交给 Error Boundary，而不是用父组件 `try/catch` 捕获；由官方 `react-hooks/error-boundaries` 统一检查。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/error-boundaries)
- 常见报告：`Use an Error Boundary to catch errors in child components. Try/catch can't catch errors during React's rendering process.`；`Use an Error Boundary instead of try/catch around the 'use' hook. The 'use' hook suspends the component, and its errors can only be caught by Error Boundaries.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Page() { try { return <Profile />; } catch { return <Fallback />; } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Page() { return <ErrorBoundary fallback={<Fallback />}><Profile /></ErrorBoundary>; }
````

### `@eslint-react/exhaustive-deps`

`useEffect`、`useMemo` 和 `useCallback` 等 Hook 的依赖项必须完整准确；由官方 `react-hooks/exhaustive-deps` 统一检查。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/facebook/react/issues/14920)
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function UserCard({ id }: Props) { useEffect(() => load(id), []); return <div />; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function UserCard({ id }: Props) { useEffect(() => load(id), [id]); return <div />; }
````

### `@eslint-react/purity`

组件和 Hook 渲染期间不得调用 `Date.now`、`Math.random` 等已知非纯函数；由官方 `react-hooks/purity` 统一检查。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/purity)
- 常见报告：`Do not call '{{name}}' during render. Components and hooks must be pure. Move this call into an event handler, effect, or state initializer.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Token() { const value = Math.random(); return <span>{value}</span>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Token() { const [value] = useState(() => Math.random()); return <span>{value}</span>; }
````

### `@eslint-react/rules-of-hooks`

Hook 只能在组件或自定义 Hook 顶层调用，不能放入条件、循环或普通函数；由官方 `react-hooks/rules-of-hooks` 统一检查。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://react.dev/reference/rules/rules-of-hooks)
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function UserCard({ ready }: Props) { if (ready) { useEffect(load, []); } return <div />; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function UserCard({ ready }: Props) { useEffect(() => { if (ready) load(); }, [ready]); return <div />; }
````

### `@eslint-react/set-state-in-effect`

Effect 内同步更新状态会触发额外渲染，应改为派生值或外部订阅回调；由官方 `react-hooks/set-state-in-effect` 统一检查。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/set-state-in-effect)
- 常见报告：`Do not call the 'set' function '{{name}}' of 'useState' synchronously in an effect. This can lead to unnecessary re-renders and performance issues.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function User({ name }: Props) { const [label, setLabel] = useState(''); useEffect(() => { setLabel(name.trim()); }, [name]); return <p>{label}</p>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function User({ name }: Props) { const label = name.trim(); return <p>{label}</p>; }
````

### `@eslint-react/set-state-in-render`

渲染期间无条件更新状态可能造成重复或无限渲染；由官方 `react-hooks/set-state-in-render` 统一检查。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/set-state-in-render)
- 常见报告：`Do not call the 'set' function '{{name}}' unconditionally during render. This will trigger an infinite render loop.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Counter() { const [count, setCount] = useState(0); setCount(count + 1); return <span>{count}</span>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Counter() { const [count, setCount] = useState(0); return <button onClick={() => setCount(count + 1)}>{count}</button>; }
````

### `@eslint-react/static-components`

在渲染函数内部创建组件会使其每次重建并丢失状态；由官方 `react-hooks/static-components` 统一检查。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/static-components)
- 常见报告：`Cannot create components during render. Components created during render will reset their state each time they are created. Declare components outside of render.`；`The component is created during render here.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Page() { function Header() { return <h1>Title</h1>; } return <Header />; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Header() { return <h1>Title</h1>; }
function Page() { return <Header />; }
````

### `@eslint-react/unsupported-syntax`

React Compiler 无法安全转换的语法需要调整或显式隔离；由官方 `react-hooks/unsupported-syntax` 统一检查。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/unsupported-syntax)
- 常见报告：`Do not use 'eval' inside components or hooks. 'eval' cannot be statically analyzed and is not supported by React Compiler.`；`Do not use 'with' statements inside components or hooks. 'with' changes scope dynamically and is not supported by React Compiler.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Page({ source }: Props) { return <div>{eval(source)}</div>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Page({ source }: Props) { return <div>{JSON.parse(source)}</div>; }
````

### `@eslint-react/use-memo`

`useMemo` 回调必须返回需要缓存的值，不能把它误当作副作用 Hook；由官方 `react-hooks/use-memo` 统一检查。

- 生效级别与范围：默认关闭（本地显式覆写）
- 关闭范围：React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/use-memo)
- 常见报告：`useMemo() callbacks must return a value.

This useMemo() callback doesn't return a value. useMemo() is for computing and caching values, not for arbitrary side effects.`；`useMemo() callbacks may not be async or generator functions.

useMemo() callbacks are called once and must synchronously return a value.`；`useMemo() callbacks may not accept parameters.

useMemo() callbacks are called by React to cache calculations across re-renders. They should not take parameters. Instead, directly reference the props, state, or local variables needed for the computation.`

- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function User({ name }: Props) { useMemo(() => name.trim(), [name]); return <p>{name}</p>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function User({ name }: Props) { const label = useMemo(() => name.trim(), [name]); return <p>{label}</p>; }
````

## 第三方预置规则（73 条）

### `@eslint-react/dom-no-dangerously-set-innerhtml`

检查该规则对应的代码约束。上游说明：Disallows DOM elements from using 'dangerouslySetInnerHTML'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml)
- 常见报告：`Using 'dangerouslySetInnerHTML' may have security implications.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<div dangerouslySetInnerHTML={{ __html: html }} />
````

正确示例：

<!-- prettier-ignore -->
````tsx
<div>{plainText}</div>
````

### `@eslint-react/dom-no-dangerously-set-innerhtml-with-children`

检查该规则对应的代码约束。上游说明：Disallows DOM elements from using 'dangerouslySetInnerHTML' and 'children' at the same time.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml-with-children)
- 常见报告：`A DOM component cannot use both children and 'dangerouslySetInnerHTML'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<div dangerouslySetInnerHTML={{ __html: html }}>Fallback</div>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<div dangerouslySetInnerHTML={{ __html: html }} />
````

### `@eslint-react/dom-no-find-dom-node`

检查该规则对应的代码约束。上游说明：Disallows 'findDOMNode'.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-find-dom-node)
- 常见报告：`[Deprecated] Use alternatives instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const node = findDOMNode(component);
````

正确示例：

<!-- prettier-ignore -->
````tsx
const nodeRef = useRef<HTMLDivElement>(null);
````

### `@eslint-react/dom-no-flush-sync`

检查该规则对应的代码约束。上游说明：Disallows 'flushSync'.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-flush-sync)
- 常见报告：`Using 'flushSync' is uncommon and can hurt the performance of your app.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
flushSync(() => setReady(true));
````

正确示例：

<!-- prettier-ignore -->
````tsx
setReady(true);
````

### `@eslint-react/dom-no-hydrate`

检查该规则对应的代码约束。上游说明：Replaces usage of 'ReactDOM.hydrate()' with 'hydrateRoot()'.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-hydrate)
- 常见报告：`[Deprecated] Use 'hydrateRoot()' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
import ReactDOM from "react-dom";
ReactDOM.hydrate(<App />, root);
````

正确示例：

<!-- prettier-ignore -->
````tsx
import { hydrateRoot } from "react-dom/client";
hydrateRoot(root, <App />);
````

### `@eslint-react/dom-no-render`

检查该规则对应的代码约束。上游说明：Replaces usage of 'ReactDOM.render()' with 'createRoot(node).render()'.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-render)
- 常见报告：`[Deprecated] Use 'createRoot(node).render()' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
ReactDOM.render(<App />, root);
````

正确示例：

<!-- prettier-ignore -->
````tsx
createRoot(root).render(<App />);
````

### `@eslint-react/dom-no-render-return-value`

检查该规则对应的代码约束。上游说明：Disallows the return value of 'ReactDOM.render'.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-render-return-value)
- 常见报告：`Do not depend on the return value from 'ReactDOM.render'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const instance = ReactDOM.render(<App />, root);
````

正确示例：

<!-- prettier-ignore -->
````tsx
createRoot(root).render(<App />);
````

### `@eslint-react/dom-no-script-url`

检查该规则对应的代码约束。上游说明：Disallows 'javascript:' URLs as attribute values.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-script-url)
- 常见报告：`Using a 'javascript:' URL is a security risk and should be avoided.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<a href="javascript:alert(1)">Open</a>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<button type="button" onClick={open}>Open</button>
````

### `@eslint-react/dom-no-unsafe-iframe-sandbox`

检查该规则对应的代码约束。上游说明：Enforces that the 'sandbox' attribute for 'iframe' elements is not set to unsafe combinations.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-unsafe-iframe-sandbox)
- 常见报告：`Unsafe 'sandbox' attribute value on 'iframe' component.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<iframe sandbox="allow-scripts allow-same-origin" src={url} />
````

正确示例：

<!-- prettier-ignore -->
````tsx
<iframe sandbox="allow-scripts" src={url} />
````

### `@eslint-react/dom-no-use-form-state`

检查该规则对应的代码约束。上游说明：Replaces usage of 'useFormState' with 'useActionState'.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-use-form-state)
- 常见报告：`[Deprecated] Use 'useActionState' from 'react' package instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
import { useFormState } from 'react-dom';
function Form() { const [state, action] = useFormState(save, initialState); return <form action={action}>{state.message}</form>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
import { useActionState } from 'react';
function Form() { const [state, action] = useActionState(save, initialState); return <form action={action}>{state.message}</form>; }
````

### `@eslint-react/dom-no-void-elements-with-children`

检查该规则对应的代码约束。上游说明：Disallows 'children' in void DOM elements.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/dom-no-void-elements-with-children)
- 常见报告：`'{{elementType}}' is a void element tag and must not have children.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<img src={url}>Avatar</img>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<img src={url} alt="Avatar" />
````

### `@eslint-react/jsx-no-children-prop`

检查该规则对应的代码约束。上游说明：Disallows passing 'children' as a prop.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/jsx-no-children-prop)
- 常见报告：`Do not pass 'children' as props.`；`Move 'children' to element content.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<UserCard children={<span>Name</span>} />
````

正确示例：

<!-- prettier-ignore -->
````tsx
<UserCard><span>Name</span></UserCard>
````

### `@eslint-react/jsx-no-children-prop-with-children`

检查该规则对应的代码约束。上游说明：Disallows passing 'children' as a prop when children are also passed as nested content.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/jsx-no-children-prop-with-children)
- 常见报告：`Do not pass 'children' as a prop when the element already has children content.`；`Remove the nested children content.`；`Remove the 'children' prop.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<UserCard children={<span>A</span>}><span>B</span></UserCard>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<UserCard><span>B</span></UserCard>
````

### `@eslint-react/jsx-no-comment-textnodes`

检查该规则对应的代码约束。上游说明：Prevents comment strings from being accidentally inserted into a JSX element's text nodes.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/jsx-no-comment-textnodes)
- 常见报告：`Possible misused comment in text node. Comments inside children section of tag should be placed inside braces.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<div>// temporary note</div>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<div>{/* temporary note */}</div>
````

### `@eslint-react/jsx-no-key-after-spread`

检查该规则对应的代码约束。上游说明：Prevent patterns that cause deoptimization when using the automatic JSX runtime.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/jsx-no-key-after-spread)
- 常见报告：`Placing 'key' after spread props causes deoptimization when using the automatic JSX runtime. Put 'key' before any spread props.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const props = { className: 'row' };
<div {...props} key="row" />;
````

正确示例：

<!-- prettier-ignore -->
````tsx
const props = { className: 'row' };
<div key="row" {...props} />;
````

### `@eslint-react/jsx-no-leaked-dollar`

检查该规则对应的代码约束。上游说明：Catches `$` before `{expr}` in JSX — typically from template literal `${expr}` being copy-pasted into JSX without removing the `$`. The `$` "leaks" into the rendered output.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/jsx-no-leaked-dollar)
- 常见报告：`Leaked '$' in JSX. This '$' will be rendered as text nodes.`；`Remove the text node '$'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<span>Total: ${total}</span>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<span>Total: {total}</span>
````

### `@eslint-react/jsx-no-leaked-semicolon`

检查该规则对应的代码约束。上游说明：Catches `;` at the start of JSX text nodes — typically from accidentally placing a statement-ending `;` inside JSX. The `;` "leaks" into the rendered output.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/jsx-no-leaked-semicolon)
- 常见报告：`Leaked ';' in JSX. This ';' will be rendered as text nodes.`；`Remove the text node ';'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<span>;
{label}</span>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<span>{label}</span>
````

### `@eslint-react/jsx-no-namespace`

检查该规则对应的代码约束。上游说明：Disallow JSX namespace syntax, as React does not support them.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/jsx-no-namespace)
- 常见报告：`A React component '{{name}}' must not be in a namespace, as React does not support them.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<svg:path />
````

正确示例：

<!-- prettier-ignore -->
````tsx
<path />
````

### `@eslint-react/naming-convention-context-name`

检查该规则对应的代码约束。上游说明：Enforces identifier names assigned from `createContext` calls to be a valid component name with the suffix `Context`.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/naming-convention-context-name)
- 常见报告：`A context name must be a valid component name with the suffix 'Context'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const Theme = createContext('light');
````

正确示例：

<!-- prettier-ignore -->
````tsx
const ThemeContext = createContext('light');
````

### `@eslint-react/naming-convention-id-name`

检查该规则对应的代码约束。上游说明：Enforces identifier names assigned from 'useId' calls to be either 'id' or end with 'Id'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/naming-convention-id-name)
- 常见报告：`An identifier assigned from 'useId' must be named 'id' or end with 'Id'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const userIdentifier = useId();
````

正确示例：

<!-- prettier-ignore -->
````tsx
const userId = useId();
````

### `@eslint-react/naming-convention-ref-name`

检查该规则对应的代码约束。上游说明：Enforces identifier names assigned from 'useRef' calls to be either 'ref' or end with 'Ref'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/naming-convention-ref-name)
- 常见报告：`A ref identifier must be named 'ref' or ending in 'Ref'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const element = useRef<HTMLDivElement>(null);
````

正确示例：

<!-- prettier-ignore -->
````tsx
const elementRef = useRef<HTMLDivElement>(null);
````

### `@eslint-react/no-access-state-in-setstate`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows accessing 'this.state' inside 'setState' calls.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-access-state-in-setstate)
- 常见报告：`Do not access 'this.state' within 'setState'. Use the update function instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Counter extends Component { increment() { this.setState({ count: this.state.count + 1 }); } render() { return <span>{this.state.count}</span>; } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Counter extends Component { increment() { this.setState((state) => ({ count: state.count + 1 })); } render() { return <span>{this.state.count}</span>; } }
````

### `@eslint-react/no-array-index-key`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows using an item's index in the array as its key.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-array-index-key)
- 常见报告：`Do not use item index in the array as its key.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
items.map((item, index) => <Row key={index} item={item} />)
````

正确示例：

<!-- prettier-ignore -->
````tsx
items.map((item) => <Row key={item.id} item={item} />)
````

### `@eslint-react/no-children-count`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows the use of 'Children.count' from the 'react' package.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-children-count)
- 常见报告：`Using 'Children.count' is uncommon and can lead to fragile code. Use alternatives instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const count = Children.count(children);
````

正确示例：

<!-- prettier-ignore -->
````tsx
const count = items.length;
````

### `@eslint-react/no-children-for-each`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows the use of 'Children.forEach' from the 'react' package.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-children-for-each)
- 常见报告：`Using 'Children.forEach' is uncommon and can lead to fragile code. Use alternatives instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
Children.forEach(children, renderChild);
````

正确示例：

<!-- prettier-ignore -->
````tsx
items.forEach(renderItem);
````

### `@eslint-react/no-children-map`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows the use of 'Children.map' from the 'react' package.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-children-map)
- 常见报告：`Using 'Children.map' is uncommon and can lead to fragile code. Use alternatives instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const rows = Children.map(children, wrapChild);
````

正确示例：

<!-- prettier-ignore -->
````tsx
const rows = items.map(renderItem);
````

### `@eslint-react/no-children-only`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows the use of 'Children.only' from the 'react' package.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-children-only)
- 常见报告：`Using 'Children.only' is uncommon and can lead to fragile code. Use alternatives instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const child = Children.only(children);
````

正确示例：

<!-- prettier-ignore -->
````tsx
const child = Array.isArray(children) ? children[0] : children;
````

### `@eslint-react/no-children-to-array`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows the use of 'Children.toArray' from the 'react' package.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-children-to-array)
- 常见报告：`Using 'Children.toArray' is uncommon and can lead to fragile code. Use alternatives instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const list = Children.toArray(children);
````

正确示例：

<!-- prettier-ignore -->
````tsx
const list = items.slice();
````

### `@eslint-react/no-clone-element`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows 'cloneElement'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-clone-element)
- 常见报告：`Using 'cloneElement' is uncommon and can lead to fragile code. Use alternatives instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const button = cloneElement(child, { disabled: true });
````

正确示例：

<!-- prettier-ignore -->
````tsx
const button = <Button {...props} disabled />;
````

### `@eslint-react/no-component-will-mount`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Replaces usage of 'componentWillMount' with 'UNSAFE_componentWillMount'.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-component-will-mount)
- 常见报告：`[Deprecated] Use 'UNSAFE_componentWillMount' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentWillMount() { load(); } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentDidMount() { load(); } }
````

### `@eslint-react/no-component-will-receive-props`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Replaces usage of 'componentWillReceiveProps' with 'UNSAFE_componentWillReceiveProps'.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-component-will-receive-props)
- 常见报告：`[Deprecated] Use 'UNSAFE_componentWillReceiveProps' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentWillReceiveProps(next: Props) { sync(next); } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentDidUpdate(previous: Props) { if (previous.id !== this.props.id) sync(this.props); } }
````

### `@eslint-react/no-component-will-update`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Replaces usage of 'componentWillUpdate' with 'UNSAFE_componentWillUpdate'.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-component-will-update)
- 常见报告：`[Deprecated] Use 'UNSAFE_componentWillUpdate' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentWillUpdate() { saveLayout(); } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentDidUpdate() { saveLayout(); } }
````

### `@eslint-react/no-context-provider`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Replaces usage of '<Context.Provider>' with '<Context>'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-context-provider)
- 常见报告：`In React 19, you can render '<Context>' as a provider instead of '<Context.Provider>'.`；`Replace '<Context.Provider>' with '<Context>'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
<ThemeContext.Provider value={theme}><Page /></ThemeContext.Provider>
````

正确示例：

<!-- prettier-ignore -->
````tsx
<ThemeContext value={theme}><Page /></ThemeContext>
````

### `@eslint-react/no-create-ref`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows 'createRef' in function components and Hooks.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-create-ref)
- 常见报告：`[Deprecated] Use 'useRef' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Input() { const inputRef = createRef<HTMLInputElement>(); return <input ref={inputRef} />; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Input() { const inputRef = useRef<HTMLInputElement>(null); return <input ref={inputRef} />; }
````

### `@eslint-react/no-direct-mutation-state`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows direct mutation of 'this.state'.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-direct-mutation-state)
- 常见报告：`Do not mutate state directly. Use 'setState()' instead.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Counter extends Component { increment() { this.state.count += 1; } render() { return <span>{this.state.count}</span>; } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Counter extends Component { increment() { this.setState((state) => ({ count: state.count + 1 })); } render() { return <span>{this.state.count}</span>; } }
````

### `@eslint-react/no-forward-ref`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Replaces usage of 'forwardRef' with passing 'ref' as a prop.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-forward-ref)
- 常见报告：`In React 19, 'forwardRef' is no longer necessary. Pass 'ref' as a prop instead.`；`Replace 'forwardRef' with passing 'ref' as a prop.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => <input ref={ref} />);
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Input({ ref, ...props }: Props & { ref?: Ref<HTMLInputElement> }) { return <input ref={ref} {...props} />; }
````

### `@eslint-react/no-leaked-conditional-rendering`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Prevents problematic leaked values from being rendered.

- 生效级别与范围：error: React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-leaked-conditional-rendering)
- 常见报告：`Potential leaked value {{value}} that might cause unintentionally rendered values or rendering crashes.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
interface Props { count: number }
function List({ count }: Props) { return <div>{count && <Items />}</div>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
interface Props { count: number }
function List({ count }: Props) { return <div>{count > 0 ? <Items /> : null}</div>; }
````

### `@eslint-react/no-missing-key`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows missing 'key' on items in list rendering.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-missing-key)
- 常见报告：`Missing 'key' for element when rendering list.`；`Use fragment component instead of '<>' because it does not support 'key'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
items.map((item) => <Row item={item} />)
````

正确示例：

<!-- prettier-ignore -->
````tsx
items.map((item) => <Row key={item.id} item={item} />)
````

### `@eslint-react/no-nested-component-definitions`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows nesting component definitions inside other components.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-nested-component-definitions)
- 常见报告：`Do not nest component definitions inside other components or props. {{suggestion}}`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Page() { function Header() { return <h1>Title</h1>; } return <Header />; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Header() { return <h1>Title</h1>; }
function Page() { return <Header />; }
````

### `@eslint-react/no-nested-lazy-component-declarations`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows nesting lazy component declarations inside other components or hooks.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-nested-lazy-component-declarations)
- 常见报告：`Do not declare lazy components inside other components or hooks. Instead, always declare them at the top level of your module.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Page() { const Settings = lazy(() => import('./Settings')); return <Settings />; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
const Settings = lazy(() => import('./Settings'));
function Page() { return <Settings />; }
````

### `@eslint-react/no-set-state-in-component-did-mount`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows calling 'this.setState' in 'componentDidMount' outside functions such as callbacks.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-set-state-in-component-did-mount)
- 常见报告：`Do not call 'this.setState' in 'componentDidMount' outside functions such as callbacks.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentDidMount() { this.setState({ ready: true }); } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentDidMount() { subscribe(() => this.setState({ ready: true })); } }
````

### `@eslint-react/no-set-state-in-component-did-update`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows calling 'this.setState' in 'componentDidUpdate' outside functions such as callbacks.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-set-state-in-component-did-update)
- 常见报告：`Do not call 'this.setState' in 'componentDidUpdate' outside functions such as callbacks.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentDidUpdate() { this.setState({ ready: true }); } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentDidUpdate() { schedule(() => this.setState({ ready: true })); } }
````

### `@eslint-react/no-set-state-in-component-will-update`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Disallows calling 'this.setState' in 'componentWillUpdate' outside functions such as callbacks.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-set-state-in-component-will-update)
- 常见报告：`Do not call 'this.setState' in 'componentWillUpdate' outside functions such as callbacks.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentWillUpdate() { this.setState({ ready: true }); } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentWillUpdate() { schedule(() => this.setState({ ready: true })); } }
````

### `@eslint-react/no-unnecessary-use-prefix`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Enforces that a function with the 'use' prefix uses at least one Hook inside it.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-unnecessary-use-prefix)
- 常见报告：`If your function doesn't call any Hooks, avoid the 'use' prefix. Instead, write it as a regular function without the 'use' prefix.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function useFormatter(value: string) { return value.trim(); }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function formatValue(value: string) { return value.trim(); }
````

### `@eslint-react/no-unsafe-component-will-mount`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Warns about the use of 'UNSAFE_componentWillMount' in class components.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-unsafe-component-will-mount)
- 常见报告：`Do not use 'UNSAFE_componentWillMount'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { UNSAFE_componentWillMount() { load(); } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentDidMount() { load(); } }
````

### `@eslint-react/no-unsafe-component-will-receive-props`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Warns about the use of 'UNSAFE_componentWillReceiveProps' in class components.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-unsafe-component-will-receive-props)
- 常见报告：`Do not use 'UNSAFE_componentWillReceiveProps'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { UNSAFE_componentWillReceiveProps(next: Props) { sync(next); } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentDidUpdate(previous: Props) { if (previous.id !== this.props.id) sync(this.props); } }
````

### `@eslint-react/no-unsafe-component-will-update`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Warns about the use of 'UNSAFE_componentWillUpdate' in class components.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-unsafe-component-will-update)
- 常见报告：`Do not use 'UNSAFE_componentWillUpdate'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { UNSAFE_componentWillUpdate() { saveLayout(); } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { componentDidUpdate() { saveLayout(); } }
````

### `@eslint-react/no-unused-class-component-members`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Warns about unused class component methods and properties.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-unused-class-component-members)
- 常见报告：`Unused method or property '{{methodName}}'' of class '{{className}}'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { unused = 1; render() { return <div />; } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
class Page extends Component { title = 'Page'; render() { return <div>{this.title}</div>; } }
````

### `@eslint-react/no-use-context`

禁止出现该规则定义的不安全、无效或易误解结构。上游说明：Replaces usage of 'useContext' with 'use'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/no-use-context)
- 常见报告：`In React 19, 'use' is preferred over 'useContext' because it is more flexible.`；`Replace 'useContext' with 'use'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const theme = useContext(ThemeContext);
````

正确示例：

<!-- prettier-ignore -->
````tsx
const theme = use(ThemeContext);
````

### `@eslint-react/rsc-function-definition`

检查该规则对应的代码约束。上游说明：Validates and transforms React Client/Server Function definitions.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/rsc-function-definition)
- 常见报告：`Functions exported from files with 'use server' directive are React Server Functions and therefore must be async.`；`The '{{name}}' directive must be at the very beginning of the file, before any imports or other code.`；`The '{{name}}' directive must be written with single or double quotes, not backticks.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
"use server";
export function save() { persist(); }
````

正确示例：

<!-- prettier-ignore -->
````tsx
"use server";
export async function save(): Promise<void> { await persist(); }
````

### `@eslint-react/use-state`

检查该规则对应的代码约束。上游说明：Enforces correct usage of 'useState', including destructuring, symmetric naming of the value and setter, and wrapping expensive initializers in a lazy initializer function.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/use-state)
- 常见报告：`useState should be destructured into a value and setter pair, e.g., const [state, setState] = useState(...).`；`To prevent re-computation, consider using lazy initial state for useState calls that involve function calls. Ex: 'useState(() => getValue())'.`；`The setter should be named 'set' followed by the capitalized state variable name, e.g., 'setState' for 'state'.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
const state = useState(0);
````

正确示例：

<!-- prettier-ignore -->
````tsx
const [count, setCount] = useState(0);
````

### `@eslint-react/web-api-no-leaked-event-listener`

检查该规则对应的代码约束。上游说明：Enforces that every 'addEventListener' in a component or custom hook has a corresponding 'removeEventListener'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/web-api-no-leaked-event-listener)
- 常见报告：`An 'addEventListener' in '{{effectMethodKind}}' should have a corresponding 'removeEventListener' in its cleanup function.`；`A/an '{{eventMethodKind}}' should not have an inline listener function.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { window.addEventListener('resize', resize); }, []);
````

正确示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize); }, []);
````

### `@eslint-react/web-api-no-leaked-fetch`

检查该规则对应的代码约束。上游说明：Enforces that every 'fetch' in a component or custom hook has a corresponding 'AbortController' abort in the cleanup function.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/web-api-no-leaked-fetch)
- 常见报告：`A 'fetch' must be provided with an 'AbortController' for proper cleanup.`；`A 'fetch' started in effect must be aborted with 'AbortController.abort' in the cleanup function.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { fetch(url).then(read); }, [url]);
````

正确示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { const controller = new AbortController(); fetch(url, { signal: controller.signal }).then(read); return () => controller.abort(); }, [url]);
````

### `@eslint-react/web-api-no-leaked-intersection-observer`

检查该规则对应的代码约束。上游说明：Enforces that every 'IntersectionObserver' created in a component or custom hook has a corresponding 'IntersectionObserver.disconnect()'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/web-api-no-leaked-intersection-observer)
- 常见报告：`Dynamically added 'IntersectionObserver.observe' should be cleared all at once using 'IntersectionObserver.disconnect' in the cleanup function.`；`An 'IntersectionObserver' instance created in 'useEffect' must be disconnected in the cleanup function.`；`An 'IntersectionObserver' instance created in component or custom hook must be assigned to a variable for proper cleanup.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { const observer = new IntersectionObserver(update); observer.observe(node); }, [node]);
````

正确示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { const observer = new IntersectionObserver(update); observer.observe(node); return () => observer.disconnect(); }, [node]);
````

### `@eslint-react/web-api-no-leaked-interval`

检查该规则对应的代码约束。上游说明：Enforces that every 'setInterval' in a component or custom hook has a corresponding 'clearInterval'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/web-api-no-leaked-interval)
- 常见报告：`A 'setInterval' created in '{{ kind }}' must be cleared with 'clearInterval' in the cleanup function.`；`A 'setInterval' must be assigned to a variable for proper cleanup.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { setInterval(refresh, 1000); }, []);
````

正确示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { const timer = setInterval(refresh, 1000); return () => clearInterval(timer); }, []);
````

### `@eslint-react/web-api-no-leaked-resize-observer`

检查该规则对应的代码约束。上游说明：Enforces that every 'ResizeObserver' created in a component or custom hook has a corresponding 'ResizeObserver.disconnect()'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/web-api-no-leaked-resize-observer)
- 常见报告：`Dynamically added 'ResizeObserver.observe' should be cleared all at once using 'ResizeObserver.disconnect' in the cleanup function.`；`A 'ResizeObserver' instance created in 'useEffect' must be disconnected in the cleanup function.`；`A 'ResizeObserver' instance created in component or custom hook must be assigned to a variable for proper cleanup.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { const observer = new ResizeObserver(update); observer.observe(node); }, [node]);
````

正确示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { const observer = new ResizeObserver(update); observer.observe(node); return () => observer.disconnect(); }, [node]);
````

### `@eslint-react/web-api-no-leaked-timeout`

检查该规则对应的代码约束。上游说明：Enforces that every 'setTimeout' in a component or custom hook has a corresponding 'clearTimeout'.

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://eslint-react.xyz/docs/rules/web-api-no-leaked-timeout)
- 常见报告：`A 'setTimeout' created in '{{ kind }}' must be cleared with 'clearTimeout' in the cleanup function.`；`A 'setTimeout' must be assigned to a variable for proper cleanup.`
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { setTimeout(refresh, 1000); }, []);
````

正确示例：

<!-- prettier-ignore -->
````tsx
useEffect(() => { const timer = setTimeout(refresh, 1000); return () => clearTimeout(timer); }, []);
````

### `react-hooks/config`

检查该规则对应的代码约束。上游说明：Validates the compiler configuration options

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/config)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
export default [{ rules: { "react-hooks/config": ["error", { compilationMode: "invalid" }] } }];
````

正确示例：

<!-- prettier-ignore -->
````js
export default [{ rules: { "react-hooks/config": ["error", { compilationMode: "infer" }] } }];
````

### `react-hooks/error-boundaries`

检查该规则对应的代码约束。上游说明：Validates usage of error boundaries instead of try/catch for errors in child components

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/error-boundaries)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Page() { try { return <Profile />; } catch { return <Fallback />; } }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Page() { return <ErrorBoundary fallback={<Fallback />}><Profile /></ErrorBoundary>; }
````

### `react-hooks/exhaustive-deps`

检查该规则对应的代码约束。上游说明：verifies the list of dependencies for Hooks like useEffect and similar

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/facebook/react/issues/14920)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function UserCard({ id }: Props) { useEffect(() => load(id), []); return <div />; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function UserCard({ id }: Props) { useEffect(() => load(id), [id]); return <div />; }
````

### `react-hooks/gating`

检查该规则对应的代码约束。上游说明：Validates configuration of [gating mode](https://react.dev/reference/react-compiler/gating)

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/gating)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````js
export default [{ rules: { "react-hooks/gating": ["error", { gating: { source: "" } }] } }];
````

正确示例：

<!-- prettier-ignore -->
````js
export default [{ rules: { "react-hooks/gating": ["error", { gating: { source: "featureFlags", importSpecifierName: "isCompilerEnabled" } }] } }];
````

### `react-hooks/globals`

检查该规则对应的代码约束。上游说明：Validates against assignment/mutation of globals during render, part of ensuring that [side effects must render outside of render](https://react.dev/reference/rules/components-and-hooks-must-be-pure#side-effects-must-run-outside-of-render)

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/globals)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
let currentUser = null;
function User({ user }: Props) { currentUser = user; return <p>{user.name}</p>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function User({ user }: Props) { return <p>{user.name}</p>; }
````

### `react-hooks/immutability`

检查该规则对应的代码约束。上游说明：Validates against mutating props, state, and other values that [are immutable](https://react.dev/reference/rules/components-and-hooks-must-be-pure#props-and-state-are-immutable)

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function User({ user }: Props) { user.name = 'Fast'; return <p>{user.name}</p>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function User({ user }: Props) { const nextUser = { ...user, name: 'Fast' }; return <p>{nextUser.name}</p>; }
````

### `react-hooks/incompatible-library`

检查该规则对应的代码约束。上游说明：Validates against usage of libraries which are incompatible with memoization (manual or automatic)

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
import { useForm } from 'react-hook-form';
function Form() { const form = useForm(); const name = form.watch('name'); return <p>{name}</p>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
import { useWatch } from 'react-hook-form';
function Form() { const name = useWatch({ name: 'name' }); return <p>{name}</p>; }
````

### `react-hooks/preserve-manual-memoization`

检查该规则对应的代码约束。上游说明：Validates that existing manual memoized is preserved by the compiler. React Compiler will only compile components and hooks if its inference [matches or exceeds the existing manual memoization](https://react.dev/learn/react-compiler/introduction#what-should-i-do-about-usememo-usecallback-and-reactmemo)

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
import { useCallback } from 'react';
function User({ user }: Props) { const open = useCallback(() => { if (user?.id) console.log(user.id); }, [user?.id]); return <button onClick={open}>Open</button>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
import { useCallback } from 'react';
function User({ user }: Props) { const id = user?.id; const open = useCallback(() => { if (id) console.log(id); }, [id]); return <button onClick={open}>Open</button>; }
````

### `react-hooks/purity`

检查该规则对应的代码约束。上游说明：Validates that [components/hooks are pure](https://react.dev/reference/rules/components-and-hooks-must-be-pure) by checking that they do not call known-impure functions

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/purity)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Token() { const value = Math.random(); return <span>{value}</span>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Token() { const [value] = useState(() => Math.random()); return <span>{value}</span>; }
````

### `react-hooks/refs`

检查该规则对应的代码约束。上游说明：Validates correct usage of refs, not reading/writing during render. See the "pitfalls" section in [`useRef()` usage](https://react.dev/reference/react/useRef#usage)

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/refs)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Input() { const inputRef = useRef<HTMLInputElement>(null); return <span>{inputRef.current?.value}</span>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Input() { const inputRef = useRef<HTMLInputElement>(null); return <input ref={inputRef} />; }
````

### `react-hooks/rules-of-hooks`

检查该规则对应的代码约束。上游说明：enforces the Rules of Hooks

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://react.dev/reference/rules/rules-of-hooks)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function UserCard({ ready }: Props) { if (ready) { useEffect(load, []); } return <div />; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function UserCard({ ready }: Props) { useEffect(() => { if (ready) load(); }, [ready]); return <div />; }
````

### `react-hooks/set-state-in-effect`

检查该规则对应的代码约束。上游说明：Validates against calling setState synchronously in an effect. This can indicate non-local derived data, a derived event pattern, or improper external data synchronization.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function User({ name }: Props) { const [label, setLabel] = useState(''); useEffect(() => { setLabel(name.trim()); }, [name]); return <p>{label}</p>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function User({ name }: Props) { const label = name.trim(); return <p>{label}</p>; }
````

### `react-hooks/set-state-in-render`

检查该规则对应的代码约束。上游说明：Validates against setting state during render, which can trigger additional renders and potential infinite render loops

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-render)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Counter() { const [count, setCount] = useState(0); setCount(count + 1); return <span>{count}</span>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Counter() { const [count, setCount] = useState(0); return <button onClick={() => setCount(count + 1)}>{count}</button>; }
````

### `react-hooks/static-components`

检查该规则对应的代码约束。上游说明：Validates that components are static, not recreated every render. Components that are recreated dynamically can reset state and trigger excessive re-rendering

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Page() { function Header() { return <h1>Title</h1>; } return <Header />; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Header() { return <h1>Title</h1>; }
function Page() { return <Header />; }
````

### `react-hooks/unsupported-syntax`

检查该规则对应的代码约束。上游说明：Validates against syntax that we do not plan to support in React Compiler

- 生效级别与范围：warn: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/unsupported-syntax)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function Page({ source }: Props) { return <div>{eval(source)}</div>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function Page({ source }: Props) { return <div>{JSON.parse(source)}</div>; }
````

### `react-hooks/use-memo`

检查该规则对应的代码约束。上游说明：Validates usage of the useMemo() hook against common mistakes. See [`useMemo()` docs](https://react.dev/reference/react/useMemo) for more information.

- 生效级别与范围：error: React JSX、React TSX
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://react.dev/reference/eslint-plugin-react-hooks/lints/use-memo)
- 示例类型：第三方预置规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````tsx
function User({ name }: Props) { const label = useMemo(async () => name.trim(), [name]); return <p>{label}</p>; }
````

正确示例：

<!-- prettier-ignore -->
````tsx
function User({ name }: Props) { const label = useMemo(() => name.trim(), [name]); return <p>{label}</p>; }
````
