import {
	createCommonConfigs,
	createEnvironmentConfigs,
	createGitignoreConfigs,
	createGlobalIgnores,
	createImportConfigs,
	createJavaScriptConfigs,
	createJsonConfigs,
	createMarkdownConfigs,
	createNodeToolingConfigs,
	createPackageJsonSortConfigs,
	createPrettierConfigs,
	createRegexpConfigs,
	createTsconfigSortConfigs,
	createTypeScriptConfigs,
} from "@fast-china/eslint-config/configs";
import { GLOBS_JAVASCRIPT, GLOBS_TYPESCRIPT } from "@fast-china/eslint-config/constants";
import { defineConfig } from "eslint/config";

export default defineConfig([
	...createGlobalIgnores(),
	...createGitignoreConfigs(),
	...createEnvironmentConfigs({
		environment: "node",
		files: [...GLOBS_JAVASCRIPT, ...GLOBS_TYPESCRIPT],
		nodeFiles: [...GLOBS_JAVASCRIPT, ...GLOBS_TYPESCRIPT],
	}),
	...createCommonConfigs([...GLOBS_JAVASCRIPT, ...GLOBS_TYPESCRIPT]),
	...createJavaScriptConfigs(),
	...createImportConfigs([...GLOBS_JAVASCRIPT, ...GLOBS_TYPESCRIPT]),
	...createRegexpConfigs([...GLOBS_JAVASCRIPT, ...GLOBS_TYPESCRIPT]),
	...createTypeScriptConfigs(),
	...createJsonConfigs(),
	...createPackageJsonSortConfigs(),
	...createTsconfigSortConfigs(),
	...createMarkdownConfigs(),
	...createPrettierConfigs(),
	...createNodeToolingConfigs([...GLOBS_JAVASCRIPT, ...GLOBS_TYPESCRIPT]),
]);
