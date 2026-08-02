import { GLOBS_TYPESCRIPT } from "../constants/index.mjs";
import { typescriptRules } from "../rules/typescript.mjs";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
//#region src/configs/typescript.ts
/**
* 返回 typescript-eslint 推荐预置。
*
* Vue SFC 需要移除上游仅匹配 `.ts` 的文件范围，否则这些关闭核心规则的配置会与
* `.vue` 外层范围形成不可能命中的 AND 条件。
*/
const getTypeScriptPresetConfigs = (typeChecked, removeFileScopes = false) => {
	const configs = [...typeChecked ? tseslint.configs.recommendedTypeChecked : tseslint.configs.recommended, ...typeChecked ? tseslint.configs.stylisticTypeChecked : tseslint.configs.stylistic];
	if (!removeFileScopes) return configs;
	return configs.map((config) => {
		const { files: _files, ...configWithoutFiles } = config;
		return configWithoutFiles;
	});
};
/** 创建启用 Project Service 时需要的解析器选项。 */
const createTypeScriptParserOptions = ({ typeChecked = false, tsconfigRootDir } = {}) => ({
	...typeChecked ? { projectService: true } : {},
	...typeChecked && tsconfigRootDir ? { tsconfigRootDir } : {}
});
/**
* 创建 TypeScript 配置。
*
* 默认采用无需类型信息的 recommended + stylistic 预置；`typeChecked: true` 会切换为
* 对应的类型感知预置并启动 Project Service。
*/
const createTypeScriptConfigs = (options = {}, files = GLOBS_TYPESCRIPT) => defineConfig([{
	name: options.typeChecked ? "@fast-china/typescript/type-checked" : "@fast-china/typescript",
	files: [...files],
	extends: getTypeScriptPresetConfigs(options.typeChecked ?? false),
	languageOptions: {
		ecmaVersion: "latest",
		parserOptions: createTypeScriptParserOptions(options)
	},
	rules: typescriptRules
}]);
//#endregion
export { createTypeScriptConfigs, createTypeScriptParserOptions, getTypeScriptPresetConfigs };

//# sourceMappingURL=typescript.mjs.map