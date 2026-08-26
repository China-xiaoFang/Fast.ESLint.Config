import { defineConfig } from "eslint/config";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";

// Vue 闭合括号换行约定与 Prettier 输出一致，无需由兼容层关闭。
const prettierRules = { ...eslintConfigPrettierFlat.rules };
delete prettierRules["vue/html-closing-bracket-newline"];

/**
 * 创建 Prettier 兼容层。
 *
 * @remarks
 * 它只关闭与 Prettier 冲突的 ESLint 格式规则，不会在 ESLint 进程中执行 Prettier。
 * 工厂始终把它放在内置配置之后，使上游预置的格式规则能够被正确覆盖。
 *
 * @returns 包含命名后的 `eslint-config-prettier` Flat Config 数组。
 */
export const createPrettierConfigs = (): ReturnType<typeof defineConfig> =>
	defineConfig([
		{
			...eslintConfigPrettierFlat,
			name: "@fast-china/prettier",
			rules: prettierRules,
		},
	]);
