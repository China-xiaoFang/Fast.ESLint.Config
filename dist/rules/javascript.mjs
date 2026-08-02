//#region src/rules/javascript.ts
/**
* JavaScript 本地覆写规则。
* 高影响规则的解释与关闭方式见 `docs/rules-risk.zh.md`。
*/
const javascriptRules = {
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"no-debugger": "error",
	"no-constant-condition": ["error", { checkLoops: false }],
	"no-restricted-syntax": ["error", "LabeledStatement"],
	"no-var": "error",
	"no-empty": ["error", { allowEmptyCatch: true }],
	"no-irregular-whitespace": "error",
	"no-use-before-define": ["warn", {
		classes: true,
		functions: false,
		variables: true
	}],
	"prefer-const": ["warn", {
		destructuring: "all",
		ignoreReadBeforeAssign: true
	}],
	"prefer-arrow-callback": ["error", {
		allowNamedFunctions: false,
		allowUnboundThis: true
	}],
	"object-shorthand": [
		"error",
		"always",
		{
			ignoreConstructors: false,
			avoidQuotes: true
		}
	],
	"logical-assignment-operators": [
		"error",
		"always",
		{ enforceForIfStatements: true }
	],
	"prefer-object-spread": "error",
	"prefer-rest-params": "error",
	"prefer-spread": "error",
	"prefer-template": "error",
	"no-redeclare": "error"
};
//#endregion
export { javascriptRules };

//# sourceMappingURL=javascript.mjs.map