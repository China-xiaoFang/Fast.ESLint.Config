import { R as RuleOptions } from './define-rules-CSwQ8C1q.js';
export { d as defineRules } from './define-rules-CSwQ8C1q.js';
import { Config } from 'eslint/config';
import { Linter } from 'eslint';

type RuntimeEnvironment = "browser" | "node" | "universal";

/** 项目允许使用的 Lodash 导入来源。 */
type LodashPreference = "lodash" | "lodash-unified";

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

interface FastConfigOptions {
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
    readonly environment: "browser";
    readonly gitignore: true;
    readonly imports: true;
    readonly javascript: true;
    readonly json: true;
    readonly lodash: false;
    readonly markdown: true;
    readonly prettier: true;
    readonly regexp: true;
    readonly sortPackageJson: false;
    readonly sortTsconfig: false;
    readonly typescript: true;
    readonly vue: true;
}>;
/**
 * 创建面向 Vue 3、Vite、TypeScript、JavaScript 与 Node.js 项目的 ESLint Flat Config。
 *
 * 默认导出就是此函数。额外配置参数会放在内置配置之后，因此项目可以按文件范围
 * 覆盖任何默认规则，而无需再次调用 ESLint 的 `defineConfig()`。
 */
declare const fastConfig: (options?: FastConfigOptions, ...overrides: Config[]) => Config[];

export { type FastConfigOptions, type LodashPreference, RuleOptions, type RuntimeEnvironment, type TypeScriptConfigOptions, fastConfig as default, defaultConfigOptions, fastConfig };
