import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import { GLOBS_TYPESCRIPT } from "../constants";
import { typescriptRules } from "../rules";

import type { Linter } from "eslint";

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
export interface TypeScriptConfigOptions {
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

/**
 * 返回 typescript-eslint 推荐预置。
 *
 * Vue SFC 需要移除上游仅匹配 `.ts` 的文件范围，否则这些关闭核心规则的配置会与
 * `.vue` 外层范围形成不可能命中的 AND 条件。
 */
export const getTypeScriptPresetConfigs = (typeChecked: boolean, removeFileScopes = false): Linter.Config[] => {
	const configs = [
		...(typeChecked ? tseslint.configs.recommendedTypeChecked : tseslint.configs.recommended),
		...(typeChecked ? tseslint.configs.stylisticTypeChecked : tseslint.configs.stylistic),
	] as Linter.Config[];

	if (!removeFileScopes) return configs;

	return configs.map((config) => {
		const { files: _files, ...configWithoutFiles } = config;
		return configWithoutFiles;
	});
};

/** 创建启用 Project Service 时需要的解析器选项。 */
export const createTypeScriptParserOptions = ({ typeChecked = false, tsconfigRootDir }: TypeScriptConfigOptions = {}) => ({
	...(typeChecked ? { projectService: true } : {}),
	...(typeChecked && tsconfigRootDir ? { tsconfigRootDir } : {}),
});

/**
 * 创建 TypeScript 配置。
 *
 * 默认采用无需类型信息的 recommended + stylistic 预置；`typeChecked: true` 会切换为
 * 对应的类型感知预置并启动 Project Service。
 */
export const createTypeScriptConfigs = (options: TypeScriptConfigOptions = {}, files: readonly string[] = GLOBS_TYPESCRIPT) =>
	defineConfig([
		{
			name: options.typeChecked ? "@fast-china/typescript/type-checked" : "@fast-china/typescript",
			files: [...files],
			extends: getTypeScriptPresetConfigs(options.typeChecked ?? false),
			languageOptions: {
				ecmaVersion: "latest",
				parserOptions: createTypeScriptParserOptions(options),
			},
			rules: typescriptRules,
		},
	]);
