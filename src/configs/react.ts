import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

import { GLOBS_JAVASCRIPT, GLOBS_TYPESCRIPT } from "../constants";
import { reactRules } from "../rules";

import type { Linter } from "eslint";

export interface ReactConfigOptions {
	/**
	 * JSX 运行时的包入口；Preact 等 React 兼容运行时可传入自己的包名。
	 * @default "react"
	 */
	importSource?: string;
	/**
	 * 用于多态组件底层元素切换的属性名。
	 * @default "as"
	 */
	polymorphicPropName?: string;
	/**
	 * React 版本；默认从项目依赖自动检测，无法检测时可显式传入版本号。
	 * @default "detect"
	 */
	version?: string;
}

interface ReactLanguageOptions {
	javascript?: boolean;
	typeChecked?: boolean;
	typescript?: boolean;
}

/**
 * 创建 React、JSX/TSX 与 Hooks 配置。
 *
 * JavaScript 和 TypeScript 分别继承对应的 @eslint-react 推荐预置；Hooks 使用
 * React 官方 Flat Config。组件、Hooks 即使不返回 JSX 也能在普通 `.js`/`.ts` 中
 * 定义，因此规则覆盖全部已启用脚本扩展名，而不仅是 `.jsx`/`.tsx`。
 */
export const createReactConfigs = (
	{ importSource = "react", polymorphicPropName = "as", version = "detect" }: ReactConfigOptions = {},
	{ javascript = true, typeChecked = false, typescript = true }: ReactLanguageOptions = {}
) => {
	const createConfig = (name: string, files: readonly string[], preset: Linter.Config) => ({
		name,
		files: [...files],
		extends: [preset, eslintPluginReactHooks.configs.flat.recommended],
		settings: {
			"react-x": {
				importSource,
				polymorphicPropName,
				version,
			},
		},
		rules: reactRules,
	});

	return defineConfig([
		...(javascript ? [createConfig("@fast-china/react/javascript", GLOBS_JAVASCRIPT, eslintReact.configs.recommended)] : []),
		...(typescript
			? [
					createConfig(
						typeChecked ? "@fast-china/react/typescript-type-checked" : "@fast-china/react/typescript",
						GLOBS_TYPESCRIPT,
						typeChecked ? eslintReact.configs["recommended-type-checked"] : eslintReact.configs["recommended-typescript"]
					),
				]
			: []),
	]);
};
