import { defineConfig } from "eslint/config";

import fastConfig, {
	type FastConfigOptions,
	type LodashPreference,
	type RuleOptions,
	defineRules,
	fastConfig as namedFastConfig,
} from "@fast-china/eslint-config";

const projectRules = defineRules({
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used", argsIgnorePattern: "^_" }],
	"import-x/order": ["error", { "newlines-between": "always" }],
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"vue/attributes-order": ["error", { order: ["DEFINITION", "EVENTS", "CONTENT"] }],
});

const options = {
	gitignore: false,
	lodash: "lodash-unified",
	rules: projectRules,
	sortPackageJson: true,
	typescript: { typeChecked: true },
	vue: true,
} satisfies FastConfigOptions;

const config = fastConfig(options, {
	files: ["**/*.generated.ts"],
	name: "typegen/generated-files",
	rules: defineRules({ "@typescript-eslint/no-unused-vars": "off" }),
});

defineConfig(config);
namedFastConfig(options);

const ruleOptions = {
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
} satisfies RuleOptions;

void ruleOptions;

const lodashPreference: LodashPreference = "lodash";
void lodashPreference;

// @ts-expect-error -- Unknown rule names must be rejected.
defineRules({ "vue/not-a-real-rule": "error" });

// @ts-expect-error -- `args` only accepts values declared by the rule schema.
defineRules({ "@typescript-eslint/no-unused-vars": ["error", { args: "sometimes" }] });

// @ts-expect-error -- Unknown option names must be rejected.
defineRules({ "no-console": ["warn", { allowedMethods: ["warn"] }] });

// @ts-expect-error -- Vue support is configured with a boolean.
fastConfig({ vue: "enabled" });

// @ts-expect-error -- Unknown factory options must be rejected.
fastConfig({ unknownOption: true });

// @ts-expect-error -- Only the documented Lodash package preferences are accepted.
fastConfig({ lodash: "lodash-es" });

// @ts-expect-error -- Factory-level rules use the same exact generated rule types.
fastConfig({ rules: { "vue/not-a-real-rule": "error" } });
