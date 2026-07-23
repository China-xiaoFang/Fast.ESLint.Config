import { jsonConfigs } from "./configs/json";
import { packageJsonSortConfigs } from "./configs/sort-package";
import { tsconfigJsonSortConfigs } from "./configs/sort-tsconfig";
import { createConfig } from "./factory";

export * from "./configs/common";
export * from "./configs/environment";
export * from "./configs/ignores";
export * from "./configs/import";
export * from "./configs/javascript";
export * from "./configs/json";
export * from "./configs/markdown";
export * from "./configs/prettier";
export * from "./configs/regexp";
export * from "./configs/sort-package";
export * from "./configs/sort-tsconfig";
export * from "./configs/typescript";
export * from "./configs/vue";

export * from "./constants";
export * from "./define-rules";
export * from "./factory";

/**
 * JavaScript 预置配置
 *
 * @description ignores，common，javascript，import，regexp
 */
export const PresetJavascriptConfigs = createConfig({
	json: false,
	markdown: false,
	typescript: false,
	vue: false,
});

/**
 * JSON 预置配置
 */
export const PresetJsonConfigs = [...jsonConfigs, ...packageJsonSortConfigs, ...tsconfigJsonSortConfigs];

/**
 * TypeScript 预置配置（不包含 Vue、JSON 和 Markdown）。
 */
export const PresetTypescriptConfigs = createConfig({
	json: false,
	markdown: false,
	vue: false,
});

export const PresetTypeScriptConfigs = PresetTypescriptConfigs;

/**
 * 基础预置配置
 *
 * @description javascript，typescript，json
 */
export const PresetBasicConfigs = createConfig({ markdown: false, vue: false });

/**
 * Vue 3 + TypeScript 完整预置配置。
 */
export const PresetVueConfigs = createConfig();

/**
 * 默认最全的配置
 */
export default PresetVueConfigs;
