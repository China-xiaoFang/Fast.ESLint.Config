import { t as RuleOptions } from "./typegen.mjs";
import { Config } from "eslint/config";
import { Linter } from "eslint";
//#region src/configs/angular.d.ts
/**
 * Angular TypeScript 源码与 HTML 模板检查的细分选项。
 *
 * 该对象通过 `fastConfig({ angular: { ... } })` 传入。只要传入对象，Angular 支持就会
 * 被启用；未指定的字段继续使用各自默认值。Angular 配置始终包含框架 TypeScript 规则
 * 和外部 `.html` 模板基础规则，本接口只控制成本或迁移影响较高的可选部分。
 *
 * Angular 支持依赖顶层 `typescript` 能力，不能与 `typescript: false` 同时使用。
 * 这些选项不会修改 Angular 编译器、CLI 或模板类型检查配置。
 */
interface AngularConfigOptions {
  /**
   * 是否使用 Angular 官方 processor，从 TypeScript 文件的
   * `@Component({ template: ... })` 元数据中提取内联 HTML 并复用模板规则进行检查。
   *
   * 关闭后仍会检查 Angular TypeScript 源码和外部 `.html` 模板，只是不再处理组件中的
   * 内联模板。大型项目若主要使用外部模板，或 processor 与其他工具发生冲突，可暂时关闭。
   * @default true
   */
  inlineTemplates?: boolean;
  /**
   * 是否在模板基础正确性规则之外启用 Angular 模板无障碍规则组。
   *
   * 该规则组检查替代文本、键盘交互、焦点、表单标签和 ARIA 等可访问性问题，适用于
   * 外部模板与已提取的内联模板。关闭后仍保留模板语法、严格比较和现代控制流等基础规则。
   * 对旧项目而言可能一次产生较多报告，建议在确认迁移计划后再决定是否临时关闭。
   * @default true
   */
  templateAccessibility?: boolean;
}
//#endregion
//#region src/configs/environment.d.ts
type RuntimeEnvironment = "browser" | "node" | "universal";
//#endregion
//#region src/configs/lodash.d.ts
/** 项目允许使用的 Lodash 导入来源。 */
type LodashPreference = "lodash" | "lodash-unified";
//#endregion
//#region src/configs/react.d.ts
/**
 * React 与兼容 JSX 运行时的检测设置。
 *
 * 该对象通过 `fastConfig({ react: { ... } })` 传入。传入对象会启用 React 支持，并在
 * JavaScript/JSX 和 TypeScript/TSX 文件上加载对应的 `@eslint-react` 推荐预置、React
 * 官方 Hooks Flat Config 以及本库规则。实际文件范围仍受顶层 `javascript`、
 * `typescript` 开关控制。
 *
 * 这些字段只传给 ESLint 插件用于理解项目的 React 语义，不会改变 JSX 编译方式、自动
 * 导入 React、设置打包器别名或安装兼容运行时。
 */
interface ReactConfigOptions {
  /**
   * 提供 React API 与 JSX 运行时的包入口名称。
   *
   * 标准 React 项目保持 `"react"`；Preact 等兼容运行时可填写自身包名，使
   * `@eslint-react` 按正确的导入来源识别组件和 API。该设置不会修改 TypeScript
   * `jsxImportSource`、Babel、Vite 或其他构建工具配置，两侧需要由项目自行保持一致。
   * @default "react"
   */
  importSource?: string;
  /**
   * 项目约定用于切换多态组件底层元素或组件类型的属性名。
   *
   * 例如 `<Button as="a" />` 中的 `as`。插件会据此理解多态组件最终渲染元素的语义，
   * 从而提高 DOM 与可访问性相关规则的判断准确度；未采用多态组件时通常无需修改。
   * @default "as"
   */
  polymorphicPropName?: string;
  /**
   * 供插件选择版本相关行为的 React 版本号或自动检测标记。
   *
   * `"detect"` 会尝试从当前项目依赖解析已安装的 React 版本。monorepo、PnP、兼容运行时
   * 或依赖不可见的执行环境若无法可靠检测，可传入明确版本号，例如 `"19.1.0"`。
   * 该值只影响 lint 规则判断，不会限制或安装 React 依赖版本。
   * @default "detect"
   */
  version?: string;
}
//#endregion
//#region src/configs/typescript.d.ts
/**
 * TypeScript 解析器、推荐预置与类型感知检查选项。
 *
 * 该对象通过 `fastConfig({ typescript: { ... } })` 传入。传入对象会启用 TypeScript
 * 支持，并检查 `.ts`、`.cts`、`.mts` 与 `.tsx`。相同的类型感知状态还会传递给已启用的
 * Vue 和 React 配置，使普通 TypeScript 文件、Vue SFC 与 TSX 使用一致的检查级别。
 *
 * 默认模式不读取类型信息，启动快且不要求文件属于某个 tsconfig；类型感知模式会启动
 * typescript-eslint Project Service，能够执行更强的语义规则，但要求项目配置和执行目录
 * 正确，并会增加首次检查时间与内存占用。
 */
interface TypeScriptConfigOptions {
  /**
   * 是否启用依赖完整 TypeScript 类型信息的规则。
   *
   * `false` 使用 typescript-eslint 的 `recommended` 与 `stylistic` 预置，不创建 TypeScript
   * Program。`true` 切换到 `recommendedTypeChecked` 与 `stylisticTypeChecked`，并启用
   * `parserOptions.projectService`。被检查文件通常需要包含在可发现的 tsconfig 中，否则
   * Project Service 会报告文件不属于项目。
   *
   * 开启后 Vue 与 React 的 TypeScript 规则也会选择类型感知版本。大型 monorepo 建议评估
   * lint 启动耗时和内存占用，并确保各工作区 tsconfig 边界明确。
   * @default false
   */
  typeChecked?: boolean;
  /**
   * typescript-eslint 查找 tsconfig 与创建 Project Service 时使用的根目录。
   *
   * 仅在 `typeChecked: true` 时写入解析器选项。普通单仓库通常可让 typescript-eslint 从
   * `eslint.config.*` 调用栈推断；复杂 monorepo、共享配置包装层或从其他目录启动 ESLint
   * 时，建议传入配置文件所在目录的绝对路径，例如 `import.meta.dirname`，避免发现错误的
   * tsconfig 或跨越预期的项目边界。
   * @default undefined
   */
  tsconfigRootDir?: string;
}
//#endregion
//#region src/code/index.d.ts
/**
 * `fastConfig()` 的项目级 ESLint Flat Config 选项。
 *
 * 每个字段只控制一个相对独立的配置片段。未传入字段时使用下方 `@default` 标注的值；
 * 布尔选项传入 `false` 会让工厂完全跳过对应片段，支持对象形式的框架或 TypeScript
 * 选项传入 `true` 时采用其内部默认值，传入对象时则在启用能力的同时覆盖内部默认值。
 *
 * `rules` 会在全部内置规则和 Prettier 兼容层之后应用；`fastConfig()` 的其余位置参数
 * 又会排在 `rules` 之后。因此，常规的全项目规则放在 `rules` 中，按文件覆盖或需要最高
 * 优先级的配置应通过其余位置参数传入。
 *
 * 这些选项只负责生成 ESLint 配置，不会修改 TypeScript、Vite 或各框架的构建配置。
 *
 * @example
 * ```ts
 * export default fastConfig({
 *   environment: "browser",
 *   react: { version: "detect" },
 *   typescript: { typeChecked: true },
 *   vue: false,
 * });
 * ```
 */
interface FastConfigOptions {
  /**
   * 是否启用 Angular 源码与模板检查。
   *
   * `true` 使用 Angular 默认选项；传入对象可控制内联模板与模板无障碍规则。
   * 启用后会检查 Angular TypeScript 源码、外部 `.html` 模板，并默认提取
   * `@Component()` 中的内联模板。Angular 依赖 TypeScript 解析能力，因此不能与
   * `typescript: false` 同时使用，否则 `fastConfig()` 会直接抛出配置错误。
   *
   * 此选项只配置 ESLint，不会创建或修改 Angular CLI、编译器或项目文件。
   * @default false
   */
  angular?: boolean | AngularConfigOptions;
  /**
   * 应用代码实际运行的环境，用于声明 ESLint 可识别的运行时全局变量。
   *
   * - `"browser"`：提供浏览器全局变量，例如 `window`、`document`。
   * - `"node"`：提供 Node.js 全局变量，例如 `process`、`Buffer`。
   * - `"universal"`：同时提供浏览器与 Node.js 全局变量，适合 SSR 或同构代码。
   *
   * 常见 Vue、React、Angular 与 Vite 浏览器应用通常保持 `"browser"`。无论选择哪种
   * 环境，配置文件、脚本目录和测试文件等 Node.js 工程文件都会单独获得 Node.js
   * 全局变量。此选项不改变 JavaScript 编译目标或打包平台。
   * @default "browser"
   */
  environment?: RuntimeEnvironment;
  /**
   * 追加到应用代码运行环境中的项目级全局变量。
   *
   * 适用于测试运行器、UniApp、浏览器扩展或其他宿主平台注入的 API。值的格式遵循
   * ESLint `Linter.Globals`，可以声明为 `"readonly"`、`"writable"` 或 `"off"`。
   * 自定义值在环境预置之后合并，因此同名项目配置可以覆盖预置的读写权限。
   * @default undefined
   */
  globals?: Linter.Globals;
  /**
   * 是否读取运行 ESLint 的项目根目录中的 `.gitignore` 并转换为全局忽略规则。
   *
   * 关闭此项只会停止读取 `.gitignore`，不会移除本库内置的依赖目录、构建产物、
   * 缓存、生成文件和锁文件忽略模式；如需补充忽略项，请使用 `ignores`。
   * @default true
   */
  gitignore?: boolean;
  /**
   * 追加到内置全局忽略集合末尾的 ESLint glob 模式。
   *
   * 这些模式不会替换内置忽略项。模式按 ESLint Flat Config 的全局忽略语义解析，
   * 适合排除项目特有的生成目录、工具输出或不应参与检查的资源。
   * @default []
   */
  ignores?: readonly string[];
  /**
   * 是否为全部已启用代码文件加载 `eslint-plugin-import-x` 推荐规则和本库覆盖规则。
   *
   * 该片段检查常见的 ESM 导入导出问题，但共享配置不会猜测项目的路径别名或自定义
   * resolver，因此默认关闭了强依赖模块解析且容易误报的规则。如果项目重新启用这些
   * 规则，应在传给 `fastConfig()` 的覆盖配置中同时补充 resolver。关闭本选项不会影响
   * JavaScript 或 TypeScript 的基础语法检查。
   * @default true
   */
  imports?: boolean;
  /**
   * 是否让工厂接管 JavaScript、CommonJS、ES Module 与 JSX 文件。
   *
   * 启用时匹配 `.js`、`.cjs`、`.mjs` 与 `.jsx`；关闭后这些文件不会进入基础规则、
   * 环境全局变量、import、regexp、Lodash 或 React 的 JavaScript 配置范围，但不会影响
   * 已启用的 TypeScript、Vue、JSON 或 Markdown 文件。
   * @default true
   */
  javascript?: boolean;
  /**
   * 是否检查 JSON、JSONC 与 JSON5 文件，并为三种方言分别使用兼容的推荐规则。
   *
   * 此选项不负责字段排序。`sortPackageJson` 或 `sortTsconfig` 任一启用时，为了让对应
   * 排序规则能够解析文件，JSON 配置仍会被加载，即使这里显式传入 `false`。
   * @default true
   */
  json?: boolean;
  /**
   * 是否统一项目中的 Lodash 静态 ESM 导入来源。
   *
   * - `false`：不限制 `lodash`、`lodash-es` 与 `lodash-unified` 的使用。
   * - `"lodash"`：允许 `lodash` 及其子路径，禁止混用另外两个包。
   * - `"lodash-unified"`：统一使用 `lodash-unified`，禁止另外两个包及其子路径。
   *
   * 该能力只约束静态 `import`/`export`，不会检查动态 `import()` 或 CommonJS
   * `require()`，也不会安装、替换或迁移任何 Lodash 依赖。
   * @default false
   */
  lodash?: false | LodashPreference;
  /**
   * 是否使用 `@eslint/markdown` 推荐配置检查 `.md` 文档的结构和 Markdown 语法。
   *
   * 该配置关注 Markdown 文档本身，不会自动把项目的 JavaScript、TypeScript 或框架
   * 规则应用到围栏代码块；如需检查代码块，应通过项目覆盖配置明确指定。
   * @default true
   */
  markdown?: boolean;
  /**
   * 是否加载 `eslint-config-prettier`，关闭与 Prettier 冲突的 ESLint 格式规则。
   *
   * 该片段不会运行 Prettier，也不会检查文件是否符合 Prettier 输出；项目仍需自行安装
   * 并执行 Prettier。它位于内置规则之后、项目 `rules` 之前，因此项目仍可有意识地
   * 重新启用某条格式规则。
   * @default true
   */
  prettier?: boolean;
  /**
   * 是否为全部已启用代码文件加载 `eslint-plugin-regexp` 推荐规则。
   *
   * 规则用于发现无效、冗余、难以理解或可能产生性能问题的正则表达式；其中部分规则
   * 支持自动修复，执行 `eslint --fix` 后仍应运行项目测试验证真实匹配行为。
   * @default true
   */
  regexp?: boolean;
  /**
   * 是否启用 React、JSX/TSX 与 Hooks 正确性规则。
   *
   * `true` 使用默认 React 设置；传入对象可指定 React 版本、兼容 JSX 运行时包和多态
   * 组件属性名。规则范围由 `javascript` 与 `typescript` 共同决定：关闭其中一种语言
   * 后，React 不会继续接管该语言的文件。兼容 Preact 等运行时时，应同时配置相应的
   * `importSource`，但此选项不会修改 JSX 编译器或打包器设置。
   * @default false
   */
  react?: boolean | ReactConfigOptions;
  /**
   * 应用于全部已启用 JavaScript、TypeScript 和 Vue 文件的项目级规则记录。
   *
   * `RuleOptions` 为已安装插件提供精确规则名、严重级别和选项自动补全。该记录排在
   * 内置规则及 Prettier 兼容层之后，可以覆盖它们；但其余位置参数中的配置优先级更高。
   * JSON、Markdown、Angular HTML 模板或其他特殊文件范围应使用其余位置参数单独配置。
   * @default undefined
   */
  rules?: RuleOptions;
  /**
   * 是否启用 `package.json` 顶层字段的固定顺序规则。
   *
   * 规则只在执行 `eslint --fix` 时重排字段，并刻意不进入顺序具有运行时语义的
   * `exports` 条件对象。首次启用通常会产生较大的纯排序差异，建议单独提交并复核。
   * 启用此项会同时加载 JSON 解析配置。
   * @default false
   */
  sortPackageJson?: boolean;
  /**
   * 是否按 TypeScript 配置主题顺序整理 `tsconfig.json` 与 `tsconfig.*.json`。
   *
   * 规则不会改变编译选项值，只在执行 `eslint --fix` 时调整字段顺序。首次启用可能产生
   * 较大差异，建议单独提交并确认继承关系仍清晰。启用此项会同时加载 JSON 解析配置。
   * @default false
   */
  sortTsconfig?: boolean;
  /**
   * 是否让工厂接管 `.ts`、`.cts`、`.mts` 与 `.tsx` 文件。
   *
   * `true` 使用无需类型信息的 TypeScript 推荐与风格预置；传入对象可进一步启用
   * `typeChecked` 和指定 `tsconfigRootDir`。类型感知设置还会同步给 Vue 与 React 的
   * TypeScript 配置。传入 `false` 会移除 TypeScript 文件范围，使 Vue 退回 JavaScript
   * 脚本解析，并且不能再启用 Angular。
   * @default true
   */
  typescript?: boolean | TypeScriptConfigOptions;
  /**
   * 是否让工厂接管 Vue 3 `.vue` 单文件组件。
   *
   * 启用后加载 Vue 3 推荐规则、模板解析器以及本库的 Vue 规则。脚本语言跟随
   * `typescript`：TypeScript 开启时同时支持 `<script lang="ts">` 和类型感知选项，
   * 关闭时仅按 JavaScript 解析脚本。此库不提供 Vue 2 兼容预置。
   * @default true
   */
  vue?: boolean;
}
/** `fastConfig()` 使用的稳定默认值；对象被冻结，避免运行时被意外修改。 */
declare const defaultConfigOptions: Readonly<{
  readonly angular: false;
  readonly environment: "browser";
  readonly gitignore: true;
  readonly imports: true;
  readonly javascript: true;
  readonly json: true;
  readonly lodash: false;
  readonly markdown: true;
  readonly prettier: true;
  readonly react: false;
  readonly regexp: true;
  readonly sortPackageJson: false;
  readonly sortTsconfig: false;
  readonly typescript: true;
  readonly vue: true;
}>;
/**
 * 创建面向 Vue 3、React、Angular、Vite、TypeScript、JavaScript 与 Node.js 项目的 ESLint Flat Config。
 *
 * 默认导出就是此函数。额外配置参数会放在内置配置之后，因此项目可以按文件范围
 * 覆盖任何默认规则，而无需再次调用 ESLint 的 `defineConfig()`。
 */
declare const fastConfig: (options?: FastConfigOptions, ...overrides: Config[]) => Config[];
//#endregion
//#region src/index.d.ts
type RejectUnknownRuleNames<Rules extends RuleOptions> = Rules & Record<Exclude<keyof Rules, keyof RuleOptions>, never>;
/**
 * 为项目规则提供精确的规则名、严重级别和规则选项自动补全。
 *
 * 该函数不会修改传入对象；它只在 TypeScript 编译阶段拒绝未知规则和无效选项。
 */
declare const defineRules: <const Rules extends RuleOptions>(rules: RejectUnknownRuleNames<Rules>) => Rules & Linter.RulesRecord;
//#endregion
export { type AngularConfigOptions, type FastConfigOptions, type LodashPreference, type ReactConfigOptions, type RuleOptions, type RuntimeEnvironment, type TypeScriptConfigOptions, fastConfig as default, fastConfig, defaultConfigOptions, defineRules };
//# sourceMappingURL=index.d.mts.map