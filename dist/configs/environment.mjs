import { GLOBS_CODE, GLOBS_JAVASCRIPT, GLOBS_NODE_TOOLING } from "../constants/index.mjs";
import { defineConfig } from "eslint/config";
import globals from "globals";
//#region src/configs/environment.ts
/**
* 创建运行时环境相关的 ESLint 配置。
*
* 返回两个相互独立的 Flat Config 片段：第一个为应用源码配置所选环境和项目级全局
* 变量；第二个仅命中配置、脚本、测试与 CLI 等工程文件，为它们配置 Node.js 全局变量
* 并允许使用 `console`。分离范围可以减少跨运行时的假阴性。
*/
const createEnvironmentConfigs = ({ environment = "browser", files = GLOBS_CODE, nodeFiles = GLOBS_JAVASCRIPT, globals: projectGlobals = {} } = {}) => {
	const runtimeGlobals = {
		...environment !== "node" ? globals.browser : {},
		...environment !== "browser" ? globals.node : {},
		...projectGlobals
	};
	const nodeToolingFiles = GLOBS_NODE_TOOLING.flatMap((nodeGlob) => nodeFiles.map((fileGlob) => [nodeGlob, fileGlob]));
	return defineConfig([{
		name: `@fast-china/globals/${environment}`,
		files: [...files],
		languageOptions: { globals: runtimeGlobals }
	}, {
		name: "@fast-china/globals/node-tooling",
		files: nodeToolingFiles,
		languageOptions: { globals: globals.node },
		rules: { "no-console": "off" }
	}]);
};
//#endregion
export { createEnvironmentConfigs };

//# sourceMappingURL=environment.mjs.map