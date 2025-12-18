import { commonConfigs } from "./configs/common";
import { ignoresConfigs } from "./configs/ignores";
import { importConfigs } from "./configs/import";
import { javascriptConfigs } from "./configs/javascript";
import { jsonConfigs } from "./configs/json";
import { markdownConfigs } from "./configs/markdown";
import { prettierConfigs } from "./configs/prettier";
import { regexpConfigs } from "./configs/regexp";
import { packageJsonSortConfigs } from "./configs/sort-package";
import { tsconfigJsonSortConfigs } from "./configs/sort-tsconfig";
import { typescriptConfigs } from "./configs/typescript";
import { vueConfigs } from "./configs/vue";

export * from "./configs/common";
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

/**
 * JavaScript 预置配置
 *
 * @description ignores，common，javascript，import，regexp
 */
export const PresetJavascriptConfigs = [...ignoresConfigs, ...commonConfigs, ...javascriptConfigs, ...importConfigs, ...regexpConfigs];

/**
 * JSON 预置配置
 */
export const PresetJsonConfigs = [...jsonConfigs, ...packageJsonSortConfigs, ...tsconfigJsonSortConfigs];

/**
 * 基础预置配置
 *
 * @description javascript，typescript，json
 */
export const PresetBasicConfigs = [...PresetJavascriptConfigs, ...typescriptConfigs, ...PresetJsonConfigs];

/**
 * 默认最全的配置
 */
export default [...PresetBasicConfigs, ...vueConfigs, ...prettierConfigs, ...markdownConfigs];
