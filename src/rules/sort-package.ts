import tseslint from "typescript-eslint";
import type { Linter } from "eslint";

/**
 * package.json 属性排序规则
 */
export const packageJsonSortRules: Linter.RulesRecord = {
	"jsonc/sort-array-values": [
		"error",
		{
			order: { type: "asc" },
			pathPattern: "^files$",
		},
	],
	"jsonc/sort-keys": [
		"error",
		{
			order: [
				"name",
				"version",
				"private",
				"packageManager",
				"description",
				"type",
				"keywords",
				"license",
				"homepage",
				"bugs",
				"repository",
				"author",
				"contributors",
				"funding",
				"files",
				"main",
				"module",
				"types",
				"exports",
				"typesVersions",
				"sideEffects",
				"unpkg",
				"jsdelivr",
				"browser",
				"bin",
				"man",
				"directories",
				"publishConfig",
				"scripts",
				"peerDependencies",
				"peerDependenciesMeta",
				"optionalDependencies",
				"dependencies",
				"devDependencies",
				"engines",
				"config",
				"overrides",
				"pnpm",
				"husky",
				"lint-staged",
				"eslintConfig",
				"prettier",
			],
			pathPattern: "^$",
		},
		{
			order: { type: "asc" },
			pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$",
		},
		{
			order: ["types", "require", "import", "default"],
			pathPattern: "^exports.*$",
		},
		{
			order: { type: "asc" },
			pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$",
		},
	],
};
