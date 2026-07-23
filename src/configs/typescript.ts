import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import { CONST_DTS, GLOB_TYPESCRIPT } from "../constants";
import { typescriptRules } from "../rules";

export interface TypeScriptConfigOptions {
	typeChecked?: boolean;
}

/**
 * TypeScript 核心配置
 */
export const createTypeScriptCoreConfigs = ({ typeChecked = false }: TypeScriptConfigOptions = {}) =>
	defineConfig([
		{
			name: typeChecked ? "@fast-china/typescript/type-checked" : "@fast-china/typescript",
			files: [...GLOB_TYPESCRIPT],
			extends: [
				...(typeChecked ? tseslint.configs.recommendedTypeChecked : tseslint.configs.recommended),
				...(typeChecked ? tseslint.configs.stylisticTypeChecked : tseslint.configs.stylistic),
			],
			languageOptions: {
				ecmaVersion: "latest",
				parserOptions: {
					...(typeChecked ? { projectService: true } : {}),
				},
			},
			rules: typescriptRules,
		},
	]);

export const typescriptCoreConfigs = createTypeScriptCoreConfigs();

/**
 * TypeScript配置
 */
export const createTypeScriptConfigs = (options: TypeScriptConfigOptions = {}) =>
	defineConfig([
		...createTypeScriptCoreConfigs(options),
		{
			name: "@fast-china/typescript/declarations",
			files: [CONST_DTS],
			rules: {
				"@typescript-eslint/consistent-type-imports": "off",
				"@typescript-eslint/no-unused-vars": "off",
			},
		},
	]);

export const typescriptConfigs = createTypeScriptConfigs();
export const typescriptTypeCheckedConfigs = createTypeScriptConfigs({ typeChecked: true });
