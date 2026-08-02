import { GLOBS_JAVASCRIPT, GLOBS_TYPESCRIPT } from "../constants/index.mjs";
import { reactRules } from "../rules/react.mjs";
import { defineConfig } from "eslint/config";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
//#region src/configs/react.ts
/**
* 创建 React、JSX/TSX 与 Hooks 配置。
*
* JavaScript 和 TypeScript 分别继承对应的 @eslint-react 推荐预置；Hooks 使用
* React 官方 Flat Config。组件、Hooks 即使不返回 JSX 也能在普通 `.js`/`.ts` 中
* 定义，因此规则覆盖全部已启用脚本扩展名，而不仅是 `.jsx`/`.tsx`。
*/
const createReactConfigs = ({ importSource = "react", polymorphicPropName = "as", version = "detect" } = {}, { javascript = true, typeChecked = false, typescript = true } = {}) => {
	const createConfig = (name, files, preset) => ({
		name,
		files: [...files],
		extends: [preset, eslintPluginReactHooks.configs.flat.recommended],
		settings: { "react-x": {
			importSource,
			polymorphicPropName,
			version
		} },
		rules: reactRules
	});
	return defineConfig([...javascript ? [createConfig("@fast-china/react/javascript", GLOBS_JAVASCRIPT, eslintReact.configs.recommended)] : [], ...typescript ? [createConfig(typeChecked ? "@fast-china/react/typescript-type-checked" : "@fast-china/react/typescript", GLOBS_TYPESCRIPT, typeChecked ? eslintReact.configs["recommended-type-checked"] : eslintReact.configs["recommended-typescript"])] : []]);
};
//#endregion
export { createReactConfigs };

//# sourceMappingURL=react.mjs.map