import fastChina, { type FastConfigOptions, type RuleOptions, createBaseConfigs, defineRules, fastConfig } from "@fast-china/eslint-config";
import {
	type AngularConfigOptions,
	type LodashPreference,
	type ReactConfigOptions,
	createAngularConfigs,
	createLodashConfigs,
	createReactConfigs,
} from "@fast-china/eslint-config/configs";
import { defineConfig } from "eslint/config";

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
	environment: "browser",
} satisfies FastConfigOptions;

defineConfig([fastChina]);
defineConfig([...fastChina]);

const config = fastConfig(options, {
	files: ["**/*.generated.ts"],
	name: "typegen/generated-files",
	rules: projectRules,
});

defineConfig(config);
fastConfig(options);
fastConfig({ environment: "node" });
fastConfig({ environment: "universal" });

const ruleOptions = {
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{ disallowTypeAnnotations: false, fixStyle: "inline-type-imports", prefer: "type-imports" },
	],
	"@typescript-eslint/no-empty-function": ["error", { allow: ["constructors", "overrideMethods"] }],
	"@typescript-eslint/no-unused-vars": [
		"error",
		{
			args: "after-used",
			argsIgnorePattern: "^_",
			caughtErrors: "all",
			caughtErrorsIgnorePattern: "^_",
			ignoreRestSiblings: true,
			varsIgnorePattern: "^_",
		},
	],
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
	"no-use-before-define": ["warn", { classes: true, functions: false, variables: true }],
	"prefer-arrow-callback": ["error", { allowNamedFunctions: false, allowUnboundThis: true }],
	"vue/attribute-hyphenation": ["error", "always"],
} satisfies RuleOptions;

void ruleOptions;

const baseOptions: FastConfigOptions = { environment: "node" };
defineConfig(createBaseConfigs(baseOptions));

const angularOptions: AngularConfigOptions = { inlineTemplates: false, templateAccessibility: false };
const reactOptions: ReactConfigOptions = { importSource: "preact", polymorphicPropName: "as", version: "10.0.0" };
defineConfig([...createBaseConfigs(), ...createAngularConfigs(angularOptions)]);
defineConfig([...createBaseConfigs(), ...createReactConfigs(reactOptions)]);

const lodashPreference: LodashPreference = "lodash";
defineConfig(createLodashConfigs(lodashPreference));
void lodashPreference;
void (undefined as unknown as RootAngularConfigOptions);

// @ts-expect-error -- Unknown rule names must be rejected.
defineRules({ "vue/not-a-real-rule": "error" });

// @ts-expect-error -- `args` only accepts values declared by the rule schema.
defineRules({ "@typescript-eslint/no-unused-vars": ["error", { args: "sometimes" }] });

// @ts-expect-error -- Unknown option names must be rejected.
defineRules({ "no-console": ["warn", { allowedMethods: ["warn"] }] });

// @ts-expect-error -- Environment only accepts the documented runtime values.
fastConfig({ environment: "worker" });

// @ts-expect-error -- Frameworks are composed through the configs subpath.
fastConfig({ react: true });

// @ts-expect-error -- UniApp is built into the root preset and is not a switch.
fastConfig({ uniapp: true });

// @ts-expect-error -- Type-aware TypeScript is fixed and is not a switch.
fastConfig({ typeChecked: false });

// @ts-expect-error -- tsconfigRootDir is no longer a factory option.
fastConfig({ tsconfigRootDir: import.meta.dirname });

// @ts-expect-error -- Unknown factory options must be rejected.
fastConfig({ unknownOption: true });

// @ts-expect-error -- Factory-level rules are supplied as trailing Flat Config.
fastConfig({ rules: { "no-console": "off" } });
