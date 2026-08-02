//#region src/configs/ignores.d.ts
/**
 * 默认忽略依赖、构建结果、缓存、生成文件和包管理器锁文件。
 *
 * 不忽略 `src`、`public`、测试夹具或普通 Markdown 文档，避免共享配置静默漏检
 * 应由项目维护的文件。
 */
declare const DEFAULT_IGNORE_PATTERNS: readonly string[];
/** 创建全局忽略配置，并在默认集合之后追加项目自定义模式。 */
declare const createGlobalIgnores: (additionalPatterns?: readonly string[]) => import("eslint/config").ConfigObject[];
/** 读取运行 ESLint 的项目根目录中的 `.gitignore`。 */
declare const createGitignoreConfigs: () => import("eslint/config").ConfigObject[];
//#endregion
export { DEFAULT_IGNORE_PATTERNS, createGitignoreConfigs, createGlobalIgnores };
//# sourceMappingURL=ignores.d.mts.map