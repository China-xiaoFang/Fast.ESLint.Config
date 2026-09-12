import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import { GLOBS_TYPESCRIPT, GLOB_TSX } from "../constants";
import { javascriptRules, typescriptRules, typescriptTypeCheckedRules } from "../rules";
import type { Linter } from "eslint";

/**
 * 返回 typescript-eslint 通用且类型感知的官方预置。
 *
 * @returns ESLint 核心推荐规则与对应的 typescript-eslint 推荐预置。
 */
export const getTypeScriptPresetConfigs = (): Linter.Config[] =>
	[eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked] as Linter.Config[];

/**
 * 创建 TypeScript 解析器的 Project Service 选项。
 *
 * @remarks
 * 同一个项目组合中的 TypeScript 与框架文件必须使用完全一致的 `extraFileExtensions`。
 * 否则混合检查文件时，TypeScript Server 会因扩展名集合变化而反复重载整个项目。
 *
 * @param extraFileExtensions - 当前项目组合需要交给 TypeScript Project Service 的额外扩展名。
 * @returns 始终启用 `projectService` 的解析器选项。
 */
export const createTypeScriptParserOptions = (extraFileExtensions: readonly string[] = []): Linter.ParserOptions => ({
	projectService: true,
	...(extraFileExtensions.length > 0 ? { extraFileExtensions: [...extraFileExtensions] } : {}),
});

/**
 * 创建 TypeScript 配置。
 *
 * @remarks
 * 始终采用 ESLint 与 typescript-eslint 的 `recommendedTypeChecked` 预置并启动 Project Service，
 * 再由本地规则补充公共模块契约、简洁写法和高价值正确性检查。普通 TypeScript 文件
 * 按 SDK 式模块边界检查；TSX 保留同等类型安全，但允许组件返回类型使用上下文推断。
 * 被检查文件必须属于可发现的 tsconfig。特殊项目可在后置 Flat Config 中覆盖解析器选项。
 *
 * @param files - 应用 TypeScript 配置的 ESLint glob 列表。
 * @param extraFileExtensions - 与同一项目组合中的框架解析器保持一致的额外扩展名。
 * @returns 包含 TypeScript 预置、解析器选项与本地规则的 Flat Config 数组。
 */
export const createTypeScriptConfigs = (
	files: readonly string[] = GLOBS_TYPESCRIPT,
	extraFileExtensions: readonly string[] = []
): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/typescript/type-checked",
			files: [...files],
			extends: getTypeScriptPresetConfigs(),
			languageOptions: {
				ecmaVersion: "latest",
				parserOptions: createTypeScriptParserOptions(extraFileExtensions),
			},
			rules: {
				...javascriptRules,
				...typescriptRules,
				...typescriptTypeCheckedRules,
			},
		},
		{
			name: "@fast-china/typescript/tsx",
			/** 与调用方传入的 TypeScript 范围取交集，避免独立组合时意外接管范围外的 TSX 文件。 */
			files: files.map((file) => [file, GLOB_TSX]),
			rules: {
				/** TSX 通常用于 UI 组件，不强制为导出组件补写可由 TypeScript 稳定推断的 JSX 返回类型。 */
				"@typescript-eslint/explicit-module-boundary-types": "off",
				/** TSX 事件属性由框架接管异步结果，允许把 Promise 返回函数传给 `void` 回调属性；其他误用继续检查。 */
				"@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
			},
		},
	]);
