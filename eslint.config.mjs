import { defineConfig } from "eslint/config";

import {
	createCommonConfigs,
	createEnvironmentConfigs,
	createGitignoreConfigs,
	createGlobalIgnores,
	createImportConfigs,
	createJavaScriptConfigs,
	createJsonConfigs,
	createMarkdownConfigs,
	createPackageJsonSortConfigs,
	createPrettierConfigs,
	createRegexpConfigs,
	createTsconfigSortConfigs,
	createTypeScriptConfigs,
} from "@fast-china/eslint-config/configs";
import { GLOBS_JAVASCRIPT, GLOBS_TYPESCRIPT } from "@fast-china/eslint-config/constants";

const codeFiles = [...GLOBS_JAVASCRIPT, ...GLOBS_TYPESCRIPT];

export default defineConfig([
	...createGlobalIgnores(),
	...createGitignoreConfigs(),
	...createEnvironmentConfigs({ environment: "node", files: codeFiles, nodeFiles: codeFiles }),
	...createCommonConfigs(codeFiles),
	...createJavaScriptConfigs(),
	...createImportConfigs(codeFiles),
	...createRegexpConfigs(codeFiles),
	...createTypeScriptConfigs({ typeChecked: true }),
	...createJsonConfigs(),
	...createPackageJsonSortConfigs(),
	...createTsconfigSortConfigs(),
	...createMarkdownConfigs(),
	...createPrettierConfigs(),
]);
