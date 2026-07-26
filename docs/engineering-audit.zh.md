# 工程质量审查报告

审查日期：2026-07-26

审查对象：`@fast-china/eslint-config` 2.0.0 工作区

## 结论

当前仓库已经具备完整 ESLint Flat Config 开源库所需的核心能力：稳定且精简的公共 API、明确的语言作用域、可选类型感知检查、精确规则类型、可重复构建、集成测试、CI、发布归档检查和中英文文档。

默认场景面向 Vue 3 + Vite + TypeScript，同时支持 JavaScript、Node.js、JSON、JSONC、JSON5、Markdown、正则表达式和模块导入检查。所有可选能力均通过 `fastConfig(options, ...overrides)` 组合，项目覆写始终位于内置配置之后。

## 审查范围

- npm 包元数据、ESM 入口、公开子路径与发布文件
- TypeScript、tsup、类型生成与声明文件
- ESLint Flat Config 顺序、文件作用域、解析器和插件注册
- JavaScript、TypeScript、Vue、JSON 方言、Markdown、RegExp 与 import 集成
- 浏览器、Node.js、通用环境和项目自定义全局变量
- Lodash 静态导入策略、清单排序与 Prettier 职责边界
- README、规则风险说明、贡献流程、CI、测试和发布前检查

## 当前工程基线

| 领域           | 状态 | 质量保障                                                                  |
| -------------- | ---- | ------------------------------------------------------------------------- |
| 公共 API       | 通过 | 根入口提供 `fastConfig`、`defaultConfigOptions`、`defineRules` 和相关类型 |
| Flat Config    | 通过 | 所有语言和插件配置限定到明确文件范围，项目覆写最后应用                    |
| Vue 3          | 通过 | `vue-eslint-parser` 处理 SFC，TypeScript 解析器正确嵌套                   |
| TypeScript     | 通过 | 默认使用推荐规则，可选 Project Service 类型感知模式                       |
| JavaScript     | 通过 | 应用 `@eslint/js` 推荐规则并区分应用环境与 Node.js 工程文件               |
| 数据与文档文件 | 通过 | JSON、JSONC、JSON5 和 Markdown 分别使用对应语言配置                       |
| 规则自动补全   | 通过 | 从 ESLint 核心和随包插件 schema 生成精确 `RuleOptions`                    |
| Lodash 策略    | 通过 | 可选统一 `lodash` 或 `lodash-unified`，默认不限制项目依赖选择             |
| 清单排序       | 通过 | 默认关闭；启用后不会重排 `package.json#exports` 条件键                    |
| Prettier       | 通过 | 只关闭冲突规则，格式化由 Prettier CLI 或编辑器负责                        |
| 构建与发布     | 通过 | tsup 生成 ESM、声明和 source map，`prepack` 执行完整质量门禁              |
| 自动化验证     | 通过 | 运行时测试、消费者类型测试、格式检查、静态检查和 Node.js 多版本 CI        |

## 配置组合模型

`fastConfig()` 按以下顺序生成配置：

1. 内置忽略项、项目附加忽略项和可选 `.gitignore`。
2. 应用运行环境、项目全局变量和 Node.js 工程文件全局变量。
3. JavaScript、import-x、Lodash 策略、RegExp、TypeScript、JSON 方言、Vue 和 Markdown 配置。
4. 可选 `package.json`、`tsconfig*.json` 排序配置。
5. Prettier 冲突关闭配置。
6. 工厂级 `rules` 与调用方传入的文件级覆写。

这一顺序保证调用方可以覆盖任何内置规则，同时避免语言规则进入不支持的文件类型。

## 规则与类型维护

- 每条本地规则旁必须说明作用、启用理由和重要风险。
- 高影响、可自动修复、安全相关和按需启用规则使用统一标签。
- 默认高影响规则同步记录在中英文风险指南中。
- `src/typegen.d.ts` 由规则 schema 生成，不允许手工编辑。
- ESLint 或插件升级后必须运行 `pnpm typegen` 并审查类型差异。
- `@fast-china/eslint-config/rules` 提供有完整注释的原始规则记录，便于高级组合。

Lodash 选项使用 ESLint 核心 `no-restricted-imports`，因此无需增加插件依赖。它负责防止静态 import/export 混用包入口，不负责安装目标包，也不检查动态 `import()` 或 CommonJS `require()`。

## 质量门禁

发布前必须全部通过：

```sh
pnpm check
pnpm pack --dry-run
```

`pnpm check` 包含：

1. 生成类型漂移检查。
2. 正式 ESM 与声明文件构建。
3. TypeScript 源码类型检查。
4. ESLint 全仓检查。
5. Prettier 格式检查。
6. 消费者类型测试和运行时集成测试。

发布归档必须包含根入口和 `./rules` 子入口的 JavaScript、声明文件和 source map，且不得包含源码缓存、测试缓存或本地依赖目录。

## CI 与发布边界

GitHub Actions 在 `master`、`main` 推送和 Pull Request 上运行，覆盖 Node.js 22.13 和 24。CI 使用 pnpm 11.x、冻结锁文件安装、完整质量门禁和发布归档预览。

CI 只验证代码和发布包，不自动发布 npm。正式发布仍由维护者确认版本、Changelog、归档内容和 npm 身份后执行。

## 剩余风险

- ESLint 和插件推荐预置会随依赖升级变化，每次升级都要检查实际生效配置和生成类型差异。
- 类型感知模式依赖项目 `tsconfig.json` 覆盖被检查文件，复杂 monorepo 应显式设置 `tsconfigRootDir`。
- 自动修复可能调整 import、模板属性、正则表达式和清单字段，应在独立提交中审查结果。
- Lodash 策略只覆盖静态模块语法；需要限制 CommonJS 或动态导入的项目应追加自己的文件级规则或代码审查约定。
- npm 发布自动化尚未启用，后续应在可信发布、分支保护和维护者审批策略确定后单独设计。
