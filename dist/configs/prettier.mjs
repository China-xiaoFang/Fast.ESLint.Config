import { defineConfig } from "eslint/config";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";
//#region src/configs/prettier.ts
/**
* 创建 Prettier 兼容层。
*
* @remarks
* 它只关闭与 Prettier 冲突的 ESLint 格式规则，不会在 ESLint 进程中执行 Prettier。
* 工厂始终把它放在内置配置之后，使上游预置的格式规则能够被正确覆盖。
*
* @returns 包含命名后的 `eslint-config-prettier` Flat Config 数组。
*/
const createPrettierConfigs = () => defineConfig([{
	...eslintConfigPrettierFlat,
	name: "@fast-china/prettier"
}]);
//#endregion
export { createPrettierConfigs };

//# sourceMappingURL=prettier.mjs.map