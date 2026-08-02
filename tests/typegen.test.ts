import { defineConfig } from "eslint/config";

import fastConfig, { type FastConfigOptions, type RuleOptions, defineRules, fastConfig as namedFastConfig } from "@fast-china/eslint-config";
import { type AngularConfigOptions, type LodashPreference, type ReactConfigOptions, createLodashConfigs } from "@fast-china/eslint-config/configs";

// @ts-expect-error -- 配置片段类型只从独立的 configs 子路径导出。
type RootAngularConfigOptions = import("@fast-china/eslint-config").AngularConfigOptions;

const projectRules = defineRules({
	"@angular-eslint/template/alt-text": "error",
	"@eslint-react/dom-no-missing-button-type": "error",
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used", argsIgnorePattern: "^_" }],
	"import-x/order": ["error", { "newlines-between": "always" }],
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"react-hooks/exhaustive-deps": "warn",
	"vue/attributes-order": ["error", { order: ["DEFINITION", "EVENTS", "CONTENT"] }],
});

const options = {
	angular: { inlineTemplates: true, templateAccessibility: true },
	gitignore: false,
	rules: projectRules,
	react: { importSource: "react", polymorphicPropName: "as", version: "detect" },
	sortPackageJson: true,
	typescript: { typeChecked: true },
	vue: false,
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
defineConfig(createLodashConfigs(lodashPreference));
void lodashPreference;

const angularOptions: AngularConfigOptions = { inlineTemplates: false, templateAccessibility: false };
const reactOptions: ReactConfigOptions = { importSource: "preact", polymorphicPropName: "as", version: "10.0.0" };
void angularOptions;
void reactOptions;
void (undefined as unknown as RootAngularConfigOptions);

// @ts-expect-error -- Unknown rule names must be rejected.
defineRules({ "vue/not-a-real-rule": "error" });

// @ts-expect-error -- `args` only accepts values declared by the rule schema.
defineRules({ "@typescript-eslint/no-unused-vars": ["error", { args: "sometimes" }] });

// @ts-expect-error -- Unknown option names must be rejected.
defineRules({ "no-console": ["warn", { allowedMethods: ["warn"] }] });

// @ts-expect-error -- Vue support is configured with a boolean.
fastConfig({ vue: "enabled" });

// @ts-expect-error -- React version must be a string understood by the plugin.
fastConfig({ react: { version: 19 } });

// @ts-expect-error -- Angular accessibility switch is boolean.
fastConfig({ angular: { templateAccessibility: "enabled" } });

// @ts-expect-error -- Unknown factory options must be rejected.
fastConfig({ unknownOption: true });

// @ts-expect-error -- Lodash policies are composed through the configs subpath, not the root factory.
fastConfig({ lodash: "lodash" });

// @ts-expect-error -- Factory-level rules use the same exact generated rule types.
fastConfig({ rules: { "vue/not-a-real-rule": "error" } });
