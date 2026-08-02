//#region src/rules/sort-tsconfig.ts
/**
* tsconfig.json 属性排序规则。
*
* `[高影响][可自动修复]`：仅在 `sortTsconfig: true` 时启用，首次修复会重排大量字段，
* 但只改变 JSONC 的阅读顺序，不改变 TypeScript 编译选项值。
*/
const tsconfigJsonSortRules = {
	"jsonc/no-comments": "off",
	"jsonc/sort-keys": [
		"error",
		{
			order: [
				"extends",
				"compilerOptions",
				"references",
				"files",
				"include",
				"exclude"
			],
			pathPattern: "^$"
		},
		{
			order: [
				"incremental",
				"composite",
				"tsBuildInfoFile",
				"disableSourceOfProjectReferenceRedirect",
				"disableSolutionSearching",
				"disableReferencedProjectLoad",
				"target",
				"jsx",
				"jsxFactory",
				"jsxFragmentFactory",
				"jsxImportSource",
				"lib",
				"moduleDetection",
				"noLib",
				"reactNamespace",
				"useDefineForClassFields",
				"emitDecoratorMetadata",
				"experimentalDecorators",
				"baseUrl",
				"rootDir",
				"rootDirs",
				"customConditions",
				"module",
				"moduleResolution",
				"moduleSuffixes",
				"noResolve",
				"paths",
				"resolveJsonModule",
				"resolvePackageJsonExports",
				"resolvePackageJsonImports",
				"typeRoots",
				"types",
				"allowArbitraryExtensions",
				"allowImportingTsExtensions",
				"allowUmdGlobalAccess",
				"allowJs",
				"checkJs",
				"maxNodeModuleJsDepth",
				"strict",
				"strictBindCallApply",
				"strictFunctionTypes",
				"strictNullChecks",
				"strictPropertyInitialization",
				"allowUnreachableCode",
				"allowUnusedLabels",
				"alwaysStrict",
				"exactOptionalPropertyTypes",
				"noFallthroughCasesInSwitch",
				"noImplicitAny",
				"noImplicitOverride",
				"noImplicitReturns",
				"noImplicitThis",
				"noPropertyAccessFromIndexSignature",
				"noUncheckedIndexedAccess",
				"noUnusedLocals",
				"noUnusedParameters",
				"useUnknownInCatchVariables",
				"declaration",
				"declarationDir",
				"declarationMap",
				"downlevelIteration",
				"emitBOM",
				"emitDeclarationOnly",
				"importHelpers",
				"importsNotUsedAsValues",
				"inlineSourceMap",
				"inlineSources",
				"isolatedDeclarations",
				"mapRoot",
				"newLine",
				"noEmit",
				"noEmitHelpers",
				"noEmitOnError",
				"outDir",
				"outFile",
				"preserveConstEnums",
				"preserveValueImports",
				"removeComments",
				"sourceMap",
				"sourceRoot",
				"stripInternal",
				"allowSyntheticDefaultImports",
				"esModuleInterop",
				"forceConsistentCasingInFileNames",
				"isolatedModules",
				"preserveSymlinks",
				"verbatimModuleSyntax",
				"skipDefaultLibCheck",
				"skipLibCheck"
			],
			pathPattern: "^compilerOptions$"
		}
	]
};
//#endregion
export { tsconfigJsonSortRules };

//# sourceMappingURL=sort-tsconfig.mjs.map