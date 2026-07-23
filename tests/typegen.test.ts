import { defineConfig } from "eslint/config";

import { type RuleOptions, defineRules } from "@fast-china/eslint-config";

const projectRules = defineRules({
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used", argsIgnorePattern: "^_" }],
	"import-x/order": ["error", { "newlines-between": "always" }],
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"vue/attributes-order": ["error", { order: ["DEFINITION", "EVENTS", "CONTENT"] }],
});

defineConfig([
	{
		name: "typegen/consumer-example",
		rules: projectRules,
	},
]);

const ruleOptions = {
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
} satisfies RuleOptions;

void ruleOptions;

// @ts-expect-error -- Unknown rule names must be rejected.
defineRules({ "vue/not-a-real-rule": "error" });

// @ts-expect-error -- `args` only accepts values declared by the rule schema.
defineRules({ "@typescript-eslint/no-unused-vars": ["error", { args: "sometimes" }] });

// @ts-expect-error -- Unknown option names must be rejected.
defineRules({ "no-console": ["warn", { allowedMethods: ["warn"] }] });
