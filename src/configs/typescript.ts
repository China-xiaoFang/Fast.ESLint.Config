import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import { GLOBS_TYPESCRIPT } from "../constants";
import { typescriptRules } from "../rules";

import type { Linter } from "eslint";

export interface TypeScriptConfigOptions {
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
