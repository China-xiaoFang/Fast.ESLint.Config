import { defineConfig } from "eslint/config";

import { createCommonConfigs } from "./configs/common";
import { type RuntimeEnvironment, createEnvironmentConfigs } from "./configs/environment";
import { gitignoreConfigs, globalIgnoresConfigs } from "./configs/ignores";
import { createImportConfigs } from "./configs/import";
import { javascriptConfigs } from "./configs/javascript";
import { jsonConfigs } from "./configs/json";
import { markdownConfigs } from "./configs/markdown";
import { prettierConfigs } from "./configs/prettier";
import { createRegexpConfigs } from "./configs/regexp";
import { packageJsonSortConfigs } from "./configs/sort-package";
import { tsconfigJsonSortConfigs } from "./configs/sort-tsconfig";
import { type TypeScriptConfigOptions, createTypeScriptConfigs } from "./configs/typescript";
import { type VueConfigOptions, createVueConfigs } from "./configs/vue";
import { CONST_VUE, GLOB_JAVASCRIPT, GLOB_TYPESCRIPT } from "./constants";

export interface FastConfigOptions {
	/** 运行时全局变量。Vue/Vite 应用通常使用 browser。 */
	environment?: RuntimeEnvironment;
	/** 是否读取项目根目录的 .gitignore。 */
	gitignore?: boolean;
	/** 额外的全局忽略模式。 */
	ignores?: string[];
	/** 是否启用 import-x 规则。 */
	imports?: boolean;
	/** 是否启用 JSON、JSONC、JSON5 规则及常用清单排序。 */
	json?: boolean;
	/** 是否启用 Markdown 规则。 */
	markdown?: boolean;
	/** 是否在末尾关闭与 Prettier 冲突的格式规则。 */
	prettier?: boolean;
	/** 是否启用正则表达式规则。 */
	regexp?: boolean;
	/** TypeScript 支持；传入对象可开启类型感知规则。 */
	typescript?: boolean | TypeScriptConfigOptions;
	/** Vue 支持；默认 Vue 3，也可显式选择 Vue 2。 */
	vue?: boolean | 2 | 3 | VueConfigOptions;
}

export const defaultOptions = Object.freeze({
	environment: "browser",
	gitignore: true,
	imports: true,
	json: true,
	markdown: true,
	prettier: true,
	regexp: true,
	typescript: true,
	vue: 3,
} satisfies Required<Omit<FastConfigOptions, "ignores">>);

/**
 * 创建可组合的 ESLint Flat Config。
 *
 * 返回普通配置数组，可直接展开，也可继续通过 defineConfig 追加项目规则。
 */
export const createConfig = (options: FastConfigOptions = {}) => {
	const resolvedOptions = { ...defaultOptions, ...options };
	const typeScriptEnabled = resolvedOptions.typescript !== false;
	const typeScriptOptions = typeof resolvedOptions.typescript === "object" ? resolvedOptions.typescript : {};
	const vueEnabled = resolvedOptions.vue !== false;

	let vueOptions: VueConfigOptions = {
		typeChecked: typeScriptOptions.typeChecked,
		version: 3,
	};

	if (typeof resolvedOptions.vue === "number") {
		vueOptions = { ...vueOptions, version: resolvedOptions.vue };
	} else if (typeof resolvedOptions.vue === "object") {
		vueOptions = { ...vueOptions, ...resolvedOptions.vue };
	}

	const codeFiles = [...GLOB_JAVASCRIPT, ...(typeScriptEnabled ? GLOB_TYPESCRIPT : []), ...(vueEnabled ? [CONST_VUE] : [])];

	return defineConfig([
		...globalIgnoresConfigs,
		...(resolvedOptions.gitignore ? gitignoreConfigs : []),
		...(resolvedOptions.ignores?.length
			? [
					{
						name: "@fast-china/ignores/custom",
						ignores: resolvedOptions.ignores,
					},
				]
			: []),
		...createEnvironmentConfigs(resolvedOptions.environment, codeFiles),
		...createCommonConfigs(codeFiles),
		...javascriptConfigs,
		...(resolvedOptions.imports ? createImportConfigs(codeFiles) : []),
		...(resolvedOptions.regexp ? createRegexpConfigs(codeFiles) : []),
		...(typeScriptEnabled ? createTypeScriptConfigs(typeScriptOptions) : []),
		...(resolvedOptions.json ? [...jsonConfigs, ...packageJsonSortConfigs, ...tsconfigJsonSortConfigs] : []),
		...(vueEnabled ? createVueConfigs(vueOptions) : []),
		...(resolvedOptions.markdown ? markdownConfigs : []),
		...(resolvedOptions.prettier ? prettierConfigs : []),
	]);
};
