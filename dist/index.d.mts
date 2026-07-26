import { n as RuleOptions, t as defineRules } from "./define-rules.mjs";
import { Config } from "eslint/config";
import { Linter } from "eslint";
//#region src/configs/angular.d.ts
interface AngularConfigOptions {
  /**
   * 是否从 `@Component({ template: ... })` 中提取并检查内联模板。
   * @default true
   */
  inlineTemplates?: boolean;
  /**
   * 是否启用 Angular 官方模板无障碍规则集。
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
interface ReactConfigOptions {
  /**
   * JSX 运行时的包入口；Preact 等 React 兼容运行时可传入自己的包名。
   * @default "react"
   */
  importSource?: string;
  /**
   * 用于多态组件底层元素切换的属性名。
   * @default "as"
   */
  polymorphicPropName?: string;
  /**
   * React 版本；默认从项目依赖自动检测，无法检测时可显式传入版本号。
   * @default "detect"
   */
  version?: string;
}
//#endregion
//#region src/configs/typescript.d.ts
interface TypeScriptConfigOptions {
  /**
   * 是否启用依赖 TypeScript 类型信息的规则；开启后会增加启动和检查成本。
   * @default false
   */
  typeChecked?: boolean;
  /**
   * 查找 tsconfig.json 的根目录。
   *
   * typescript-eslint 通常可从 `eslint.config.*` 调用栈推断；复杂 monorepo 可显式传入
   * `import.meta.dirname`，避免从错误目录启动 Project Service。
   * @default undefined
   */
  tsconfigRootDir?: string;
}
//#endregion
//#region src/factory.d.ts
interface FastConfigOptions {
  /**
   * Angular 支持；启用后检查 TypeScript、外部 HTML 模板和内联模板。
   * @default false
   */
  angular?: boolean | AngularConfigOptions;
  /**
   * 应用代码的运行环境；Vue/Vite 项目通常使用 `browser`。
   * @default "browser"
   */
  environment?: RuntimeEnvironment;
  /**
   * 项目额外提供的全局变量，例如测试运行器或宿主平台 API。
   * @default undefined
   */
  globals?: Linter.Globals;
  /**
   * 是否读取项目根目录的 .gitignore。
   * @default true
   */
  gitignore?: boolean;
  /**
   * 追加到内置集合的全局忽略模式。
   * @default []
   */
  ignores?: readonly string[];
  /**
   * 是否启用 import-x 规则。
   * @default true
   */
  imports?: boolean;
  /**
   * 是否处理 JavaScript 与 JSX 文件。
   * @default true
   */
  javascript?: boolean;
  /**
   * 是否启用 JSON、JSONC 与 JSON5 推荐规则；清单排序由独立选项控制。
   * @default true
   */
  json?: boolean;
  /**
   * 统一项目使用的 Lodash 包；`false` 表示不限制 `lodash`、`lodash-es` 或 `lodash-unified`。
   * @default false
   */
  lodash?: false | LodashPreference;
  /**
   * 是否启用 Markdown 规则。
   * @default true
   */
  markdown?: boolean;
  /**
   * 是否在末尾关闭与 Prettier 冲突的格式规则。
   * @default true
   */
  prettier?: boolean;
  /**
   * 是否启用正则表达式规则。
   * @default true
   */
  regexp?: boolean;
  /**
   * React 支持；传入对象可配置 React 版本、JSX 运行时和多态组件属性。
   * @default false
   */
  react?: boolean | ReactConfigOptions;
  /**
   * 应用于全部已启用代码文件的项目级规则，提供精确规则名与选项类型。
   * @default undefined
   */
  rules?: RuleOptions;
  /**
   * 是否按安全的固定顺序整理 package.json；启用后首次运行可能产生较大 diff。
   * @default false
   */
  sortPackageJson?: boolean;
  /**
   * 是否按 TypeScript 文档主题整理 tsconfig*.json。
   * @default false
   */
  sortTsconfig?: boolean;
  /**
   * TypeScript 支持；传入对象可开启类型感知规则。
   * @default true
   */
  typescript?: boolean | TypeScriptConfigOptions;
  /**
   * 是否启用 Vue 3 单文件组件支持。
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
export { type AngularConfigOptions, type FastConfigOptions, type LodashPreference, type ReactConfigOptions, type RuleOptions, type RuntimeEnvironment, type TypeScriptConfigOptions, fastConfig as default, fastConfig, defaultConfigOptions, defineRules };
//# sourceMappingURL=index.d.mts.map