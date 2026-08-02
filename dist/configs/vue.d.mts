import { TypeScriptConfigOptions } from "./typescript.mjs";
//#region src/configs/vue.d.ts
/**
 * Vue 3 单文件组件生成器使用的脚本语言与类型感知选项。
 *
 * `fastConfig()` 会根据顶层选项推导这些值；直接组合配置片段时可从 `./configs`
 * 子路径使用该接口。
 * 用户通过顶层 `vue` 决定是否接管 `.vue` 文件，通过顶层 `typescript` 决定 SFC 脚本
 * 是否启用 TypeScript 解析和类型感知能力；工厂会把两者转换为此对象。
 *
 * Vue 模板始终由 `vue-eslint-parser` 解析。启用 TypeScript 时，它再把 `<script>` 内容
 * 委托给 typescript-eslint parser，并复用普通 TypeScript 文件的推荐预置与解析器选项。
 */
interface VueConfigOptions {
  /**
   * 是否使用 typescript-eslint parser 解析 SFC 的 `<script>` 与 `<script setup>` 内容。
   *
   * `true` 同时加载 TypeScript 推荐规则和本库 TypeScript 规则，并允许
   * `<script lang="ts">`；`false` 不注册 TypeScript 脚本解析器，只按 JavaScript 处理
   * SFC 脚本。该值由顶层 `FastConfigOptions.typescript` 是否关闭推导。
   * @default true
   */
  typescript?: boolean;
  /**
   * 与普通 TypeScript 文件共享的类型感知和 tsconfig 根目录选项。
   *
   * `typeChecked: true` 会让 Vue SFC 使用类型感知的 typescript-eslint 预置并启动 Project
   * Service；`tsconfigRootDir` 会原样传给解析器。工厂只会在顶层 TypeScript 能力启用时
   * 传入有效设置，避免 Vue 单独形成与普通 `.ts` 文件不一致的类型检查模式。
   * @default {}
   */
  typescriptOptions?: TypeScriptConfigOptions;
}
/**
 * 创建 Vue 3 单文件组件配置。
 *
 * 本包只处理 Vue 3。启用 TypeScript 时，Vue 模板解析器通过 `parserOptions.parser`
 * 委托给 typescript-eslint；这是 Vue 官方推荐的自定义脚本解析器接入方式。
 */
declare const createVueConfigs: ({ typescript, typescriptOptions }?: VueConfigOptions) => import("eslint/config").ConfigObject[];
//#endregion
export { VueConfigOptions, createVueConfigs };
//# sourceMappingURL=vue.d.mts.map