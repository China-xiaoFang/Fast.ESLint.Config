import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import { GLOBS_TYPESCRIPT } from "../constants";
import { javascriptRules, typescriptRules, typescriptTypeCheckedRules } from "../rules";
import type { Linter } from "eslint";

/**
 * 返回 typescript-eslint 推荐预置。
 *
 * @returns ESLint 核心推荐规则与对应的 typescript-eslint 推荐预置。
 */
export const getTypeScriptPresetConfigs = (): Linter.Config[] =>
	[
		eslint.configs.recommended,
		{
			name: "@fast-china/typescript/javascript-rules",
			rules: javascriptRules,
		},
		...tseslint.configs.recommendedTypeChecked,
	] as Linter.Config[];

/**
 * 创建 TypeScript 解析器的 Project Service 选项。
 *
 * @returns 始终启用 `projectService` 的解析器选项。
 */
export const createTypeScriptParserOptions = (): Linter.ParserOptions => ({ projectService: true });

/**
 * 创建 TypeScript 配置。
 *
 * @remarks
 * 始终采用 ESLint 与 typescript-eslint 的 `recommendedTypeChecked` 预置并启动 Project Service。
 * 被检查文件必须属于可发现的 tsconfig。特殊项目可在后置 Flat Config 中覆盖解析器选项。
 *
 * @param files - 应用 TypeScript 配置的 ESLint glob 列表。
 * @returns 包含 TypeScript 预置、解析器选项与本地规则的 Flat Config 数组。
 */
export const createTypeScriptConfigs = (files: readonly string[] = GLOBS_TYPESCRIPT): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			name: "@fast-china/typescript/type-checked",
			files: [...files],
			extends: getTypeScriptPresetConfigs(),
			languageOptions: {
				ecmaVersion: "latest",
				parserOptions: createTypeScriptParserOptions(),
			},
			rules: {
				...typescriptRules,
				...typescriptTypeCheckedRules,
			},
		},
	]);
