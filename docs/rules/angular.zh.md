<!-- 此文件由 scripts/rules-docs.ts 生成，请勿手工编辑。 -->

# Angular 与 Angular 模板

本页记录当前依赖版本和仓库配置最终产生的 28 条规则。每条规则均列出实际严重级别、生效范围、上游说明、常见报告以及错误/正确示例。

## 仓库显式规则（28 条）

### `@angular-eslint/contextual-lifecycle`

生命周期方法只能出现在对应的 Angular 组件或指令上下文中，避免无效钩子。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/contextual-lifecycle.md)
- 常见报告：`Angular will not invoke the '{{methodName}}' lifecycle method within '@{{classDecoratorName}}()' classes`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { Injectable } from "@angular/core";
@Injectable()
class UserService { ngOnInit(): void { console.log("initialized"); } }
````

正确示例：

<!-- prettier-ignore -->
````ts
import { Component, OnInit } from "@angular/core";
@Component({ selector: "app-page", template: `` })
class PageComponent implements OnInit { ngOnInit(): void { console.log("initialized"); } }
````

### `@angular-eslint/no-empty-lifecycle-method`

空生命周期方法没有行为且容易误导维护者，应直接移除。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-lifecycle-method.md)
- 常见报告：`Lifecycle methods should not be empty`；`Remove lifecycle method`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { Component, OnInit } from "@angular/core";
@Component({ selector: "app-page", template: `` })
class PageComponent implements OnInit { ngOnInit(): void {} }
````

正确示例：

<!-- prettier-ignore -->
````ts
import { Component, OnInit } from "@angular/core";
@Component({ selector: "app-page", template: `` })
class PageComponent implements OnInit { ngOnInit(): void { console.log("initialized"); } }
````

### `@angular-eslint/no-input-rename`

Input 别名会让模板 API 与类属性名称分离，增加搜索和重构成本。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-input-rename.md)
- 常见报告：`Input bindings should not be aliased (https://angular.dev/guide/components/inputs#choosing-input-names)`；`Remove alias name`；`Remove alias name and use it as the original name`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { Component, Input } from "@angular/core";
@Component({ selector: "app-user", template: `` })
class UserComponent { @Input("userName") name = ""; }
````

正确示例：

<!-- prettier-ignore -->
````ts
import { Component, Input } from "@angular/core";
@Component({ selector: "app-user", template: `` })
class UserComponent { @Input() userName = ""; }
````

### `@angular-eslint/no-inputs-metadata-property`

统一使用 `input()` 或 `@Input` 声明输入，避免与 metadata 数组混用两套 API。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-inputs-metadata-property.md)
- 常见报告：`Use '@Input' rather than the 'inputs' metadata property`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
@Component({ selector: "app-user", inputs: ["name"], template: `` })
class UserComponent { name = ""; }
````

正确示例：

<!-- prettier-ignore -->
````ts
@Component({ selector: "app-user", template: `` })
class UserComponent { @Input() name = ""; }
````

### `@angular-eslint/no-output-native`

输出名称不得覆盖原生 DOM 事件，否则模板事件含义容易混淆。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-output-native.md)
- 常见报告：`Output bindings, including aliases, should not be named as standard DOM events`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { Component, EventEmitter, Output } from "@angular/core";
@Component({ selector: "app-editor", template: `` })
class EditorComponent { @Output() click = new EventEmitter<void>(); }
````

正确示例：

<!-- prettier-ignore -->
````ts
import { Component, EventEmitter, Output } from "@angular/core";
@Component({ selector: "app-editor", template: `` })
class EditorComponent { @Output() saved = new EventEmitter<void>(); }
````

### `@angular-eslint/no-output-on-prefix`

输出本身已经表达事件语义，不使用 `on` 前缀以保持 Angular 公共 API 约定。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-output-on-prefix.md)
- 常见报告：`Output bindings, including aliases, should not be named "on", nor prefixed with it (https://angular.dev/guide/components/outputs#choosing-event-names)`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { Component, EventEmitter, Output } from "@angular/core";
@Component({ selector: "app-editor", template: `` })
class EditorComponent { @Output() onSaved = new EventEmitter<void>(); }
````

正确示例：

<!-- prettier-ignore -->
````ts
import { Component, EventEmitter, Output } from "@angular/core";
@Component({ selector: "app-editor", template: `` })
class EditorComponent { @Output() saved = new EventEmitter<void>(); }
````

### `@angular-eslint/no-output-rename`

Output 别名会让模板 API 与类属性名称分离，增加搜索和重构成本。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-output-rename.md)
- 常见报告：`Output bindings should not be aliased (https://angular.dev/guide/components/outputs#choosing-event-names)`；`Remove alias name`；`Remove alias name and use it as the original name`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { Component, EventEmitter, Output } from "@angular/core";
@Component({ selector: "app-editor", template: `` })
class EditorComponent { @Output("saved") save = new EventEmitter<void>(); }
````

正确示例：

<!-- prettier-ignore -->
````ts
import { Component, EventEmitter, Output } from "@angular/core";
@Component({ selector: "app-editor", template: `` })
class EditorComponent { @Output() saved = new EventEmitter<void>(); }
````

### `@angular-eslint/no-outputs-metadata-property`

统一使用 `output()` 或 `@Output` 声明输出，避免与 metadata 数组混用两套 API。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-outputs-metadata-property.md)
- 常见报告：`Use '@Output' rather than the 'outputs' metadata property`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
@Component({ selector: "app-editor", outputs: ["saved"], template: `` })
class EditorComponent { saved = new EventEmitter<void>(); }
````

正确示例：

<!-- prettier-ignore -->
````ts
@Component({ selector: "app-editor", template: `` })
class EditorComponent { @Output() saved = new EventEmitter<void>(); }
````

### `@angular-eslint/prefer-inject`

Angular 推荐使用 `inject()` 统一依赖注入写法。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-inject.md)
- 常见报告：`Prefer using the inject() function over constructor parameter injection. Use Angular's migration schematic to automatically refactor: ng generate @angular/core:inject`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
@Injectable()
class UserService { constructor(private readonly api: ApiService) {} }
````

正确示例：

<!-- prettier-ignore -->
````ts
@Injectable()
class UserService { private readonly api = inject(ApiService); }
````

### `@angular-eslint/prefer-on-push-component-change-detection`

Angular 22 默认采用 `OnPush`，禁止组件显式退回 `Eager` 或旧的 `Default` 策略。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-on-push-component-change-detection.md)
- 常见报告：`Components should not opt out of the default 'ChangeDetectionStrategy.OnPush' change detection strategy`；`Remove 'changeDetection' to use the default ('ChangeDetectionStrategy.OnPush')`；`'changeDetection: ChangeDetectionStrategy.OnPush' is redundant because 'ChangeDetectionStrategy.OnPush' is the default change detection strategy`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { ChangeDetectionStrategy, Component } from "@angular/core";
@Component({ selector: "app-user", template: ``, changeDetection: ChangeDetectionStrategy.Eager })
class UserComponent {}
````

正确示例：

<!-- prettier-ignore -->
````ts
import { Component } from "@angular/core";
@Component({ selector: "app-user", template: `` })
class UserComponent {}
````

### `@angular-eslint/prefer-standalone`

独立组件是现代 Angular 的默认模型。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-standalone.md)
- 常见报告：`Components, Directives and Pipes should not opt out of standalone. Following this guide is highly recommended: https://angular.dev/reference/migrations/standalone`；`Quickly remove 'standalone: false'. NOTE - Following this guide is highly recommended: https://angular.dev/reference/migrations/standalone`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
@Component({ selector: "app-user", standalone: false, template: `` })
class UserComponent {}
````

正确示例：

<!-- prettier-ignore -->
````ts
@Component({ selector: "app-user", standalone: true, template: `` })
class UserComponent {}
````

### `@angular-eslint/template/alt-text`

图片和图像型元素需要替代文本，确保非视觉用户能获得等价信息。

- 生效级别与范围：error: Angular HTML
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/alt-text.md)
- 常见报告：`<{{element}}/> element must have a text alternative.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<img src="user.png">
````

正确示例：

<!-- prettier-ignore -->
````html
<img src="user.png" alt="User avatar">
````

### `@angular-eslint/template/banana-in-box`

双向绑定必须使用 `[(...)]` 顺序，反写的“香蕉盒”通常是模板笔误。

- 生效级别与范围：error: Angular HTML
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/banana-in-box.md)
- 常见报告：`Invalid binding syntax. Use [(expr)] instead`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<input ([ngModel])="name">
````

正确示例：

<!-- prettier-ignore -->
````html
<input [(ngModel)]="name">
````

### `@angular-eslint/template/click-events-have-key-events`

`click` 交互需要键盘等价入口，避免仅鼠标用户可操作。

- 生效级别与范围：error: Angular HTML
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/click-events-have-key-events.md)
- 常见报告：`click must be accompanied by either keyup, keydown or keypress event for accessibility.`；`click must be accompanied by a keyup, keydown or keypress event that specifies a key (e.g. '(keydown.enter)') for accessibility.`；`click must be accompanied by a keyup, keydown or keypress event for one of the allowed keys ({{allowedKeyCodes}}) for accessibility.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<div (click)="open()">Open</div>
````

正确示例：

<!-- prettier-ignore -->
````html
<button type="button" (click)="open()">Open</button>
````

### `@angular-eslint/template/elements-content`

需要可访问名称的元素不得为空，避免读屏软件播报无意义控件。

- 生效级别与范围：error: Angular HTML
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/elements-content.md)
- 常见报告：`<{{element}}> should have content`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<button></button>
````

正确示例：

<!-- prettier-ignore -->
````html
<button>Save</button>
````

### `@angular-eslint/template/eqeqeq`

模板比较使用严格等号，避免 Angular 表达式中的隐式类型转换。

- 生效级别与范围：error: Angular HTML
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/eqeqeq.md)
- 常见报告：`Expected '{{expectedOperation}}' but received '{{actualOperation}}'`；`Replace '{{actualOperation}}' with '{{expectedOperation}}'`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<p *ngIf="count == 0">Empty</p>
````

正确示例：

<!-- prettier-ignore -->
````html
<p *ngIf="count === 0">Empty</p>
````

### `@angular-eslint/template/interactive-supports-focus`

具有交互语义的元素必须可聚焦，确保键盘导航能够到达。

- 生效级别与范围：error: Angular HTML
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/interactive-supports-focus.md)
- 常见报告：`Elements with interaction handlers must be focusable.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<div role="button" (click)="save()">Save</div>
````

正确示例：

<!-- prettier-ignore -->
````html
<div role="button" tabindex="0" (click)="save()" (keydown.enter)="save()">Save</div>
````

### `@angular-eslint/template/label-has-associated-control`

表单 `label` 必须关联控件，扩大可点击区域并为辅助技术提供名称。

- 生效级别与范围：error: Angular HTML
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/label-has-associated-control.md)
- 常见报告：`A label component must be associated with a form element`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<label>Name</label><input>
````

正确示例：

<!-- prettier-ignore -->
````html
<label for="name">Name</label><input id="name">
````

### `@angular-eslint/template/mouse-events-have-key-events`

`mouseover` 和 `mouseout` 行为需要对应键盘焦点事件，保持输入方式等价。

- 生效级别与范围：error: Angular HTML
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/mouse-events-have-key-events.md)
- 常见报告：`'{{mouseEvent}}' must be accompanied by '{{keyEvent}}' for accessibility (https://www.w3.org/WAI/WCAG21/Understanding/keyboard)`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<div (mouseover)="showDetails()">Details</div>
````

正确示例：

<!-- prettier-ignore -->
````html
<div (mouseover)="showDetails()" (focus)="showDetails()" tabindex="0">Details</div>
````

### `@angular-eslint/template/no-autofocus`

`autofocus` 会突然移动焦点并干扰读屏流程，默认禁止。

- 生效级别与范围：error: Angular HTML
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-autofocus.md)
- 常见报告：`The 'autofocus' attribute should not be used, as it reduces usability and accessibility for users`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<input autofocus>
````

正确示例：

<!-- prettier-ignore -->
````html
<input>
````

### `@angular-eslint/template/no-distracting-elements`

禁止 `marquee`、`blink` 等干扰性元素，避免可读性和可访问性问题。

- 生效级别与范围：error: Angular HTML
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-distracting-elements.md)
- 常见报告：`Do not use <{{element}}> elements as they can create visual accessibility issues and are deprecated`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<marquee>News</marquee>
````

正确示例：

<!-- prettier-ignore -->
````html
<p aria-live="polite">News</p>
````

### `@angular-eslint/template/no-negated-async`

对 `async` pipe 结果直接取反会让初始 `null` 状态产生反直觉分支。

- 生效级别与范围：error: Angular HTML
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-negated-async.md)
- 常见报告：`Async pipe results should not be negated. Use '(observable | async) === false', '(observable | async) === null', or '(observable | async) === undefined' to check its value instead`；`Values used with the async pipe should not be negated.`；`Compare with 'false'`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<p *ngIf="!(ready$ | async)">Loading</p>
````

正确示例：

<!-- prettier-ignore -->
````html
<p *ngIf="(ready$ | async) === false">Loading</p>
````

### `@angular-eslint/template/prefer-control-flow`

采用现代 `@if` 和 `@for` 控制流，与 Angular 推荐模板语法保持一致。

- 生效级别与范围：error: Angular HTML
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-control-flow.md)
- 常见报告：`Use built-in control flow instead of directive {{name}}.`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<p *ngIf="ready">Ready</p>
````

正确示例：

<!-- prettier-ignore -->
````html
@if (ready) { <p>Ready</p> }
````

### `@angular-eslint/template/role-has-required-aria`

ARIA role 必须提供该角色要求的属性，避免声明不完整的语义。

- 生效级别与范围：error: Angular HTML
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/role-has-required-aria.md)
- 常见报告：`The {{element}} with role="{{role}}" does not have required ARIA properties: {{missingProps}}`；`Remove role '{{role}}'`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<div role="checkbox">Enabled</div>
````

正确示例：

<!-- prettier-ignore -->
````html
<div role="checkbox" aria-checked="false" tabindex="0">Enabled</div>
````

### `@angular-eslint/template/table-scope`

`scope` 只能用于表头 `<th>`，避免在普通单元格上声明无效的表头范围。

- 生效级别与范围：error: Angular HTML
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/table-scope.md)
- 常见报告：`The 'scope' attribute should only be on the '<th>' element`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<td scope="col">Name</td>
````

正确示例：

<!-- prettier-ignore -->
````html
<th scope="col">Name</th>
````

### `@angular-eslint/template/valid-aria`

ARIA 属性名和值必须有效，避免浏览器静默忽略错误语义。

- 生效级别与范围：error: Angular HTML
- 自动修复：不支持或上游未声明
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/valid-aria.md)
- 常见报告：`The '{{attribute}}' is an invalid ARIA attribute`；`The '{{attribute}}' has an invalid value. Check the valid values at https://raw.githack.com/w3c/aria/stable/#roles`；`Remove attribute '{{attribute}}'`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````html
<button aria-labl="Save">Save</button>
````

正确示例：

<!-- prettier-ignore -->
````html
<button aria-label="Save">Save</button>
````

### `@angular-eslint/use-lifecycle-interface`

生命周期接口让方法拼写和签名可由 TypeScript 验证；警告级别便于渐进补齐旧代码。

- 生效级别与范围：warn: Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/use-lifecycle-interface.md)
- 常见报告：`Lifecycle interface '{{interfaceName}}' should be implemented for method '{{methodName}}'. (https://angular.dev/style-guide#use-lifecycle-hook-interfaces)`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
import { Component } from "@angular/core";
@Component({ selector: "app-page", template: `` })
class PageComponent { ngOnInit(): void { console.log("initialized"); } }
````

正确示例：

<!-- prettier-ignore -->
````ts
import { Component, OnInit } from "@angular/core";
@Component({ selector: "app-page", template: `` })
class PageComponent implements OnInit { ngOnInit(): void { console.log("initialized"); } }
````

### `@angular-eslint/use-pipe-transform-interface`

Pipe 类实现接口后可由 TypeScript 检查 `transform` 签名，避免运行时才发现不一致。

- 生效级别与范围：error: Angular TypeScript
- 自动修复：支持；执行前仍应检查语义和差异
- 规则来源：[官方文档](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/use-pipe-transform-interface.md)
- 常见报告：`Pipes should implement 'PipeTransform' interface`
- 示例类型：仓库显式规则的直接代码示例

错误示例：

<!-- prettier-ignore -->
````ts
@Pipe({ name: "label" })
class LabelPipe { transform(value: string): string { return value.trim(); } }
````

正确示例：

<!-- prettier-ignore -->
````ts
@Pipe({ name: "label" })
class LabelPipe implements PipeTransform { transform(value: string): string { return value.trim(); } }
````
