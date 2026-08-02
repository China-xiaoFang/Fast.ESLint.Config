//#region src/rules/import.ts
/** 默认启用的模块导入正确性与排序规则。 */
const importRules = {
	"import-x/first": "error",
	"import-x/no-duplicates": "error",
	"import-x/order": ["error", {
		groups: [
			"builtin",
			"external",
			"internal",
			"parent",
			"sibling",
			"index",
			"object",
			"type",
			"unknown"
		],
		"newlines-between": "always",
		alphabetize: {
			order: "asc",
			caseInsensitive: true
		},
		warnOnUnassignedImports: true
	}],
	"import-x/no-unresolved": "off",
	"import-x/namespace": "off",
	"import-x/default": "off",
	"import-x/no-named-as-default": "off",
	"import-x/no-named-as-default-member": "off",
	"import-x/named": "off"
};
//#endregion
export { importRules };

//# sourceMappingURL=import.mjs.map