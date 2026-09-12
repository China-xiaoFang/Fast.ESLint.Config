import {
	type ProjectConfigOptions,
	type RuleOptions,
	createBaseConfigs,
	createUniAppProjectConfigs,
	createVueProjectConfigs,
	defineRules,
	uniAppConfig,
	vueConfig,
} from "@fast-china/eslint-config";
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

// @ts-expect-error -- 根入口不再提供 2.x 默认导出。
type LegacyDefaultExport = (typeof import("@fast-china/eslint-config"))["default"];

// @ts-expect-error -- 根入口不再提供 fastConfig() 兼容别名。
type LegacyFastConfig = (typeof import("@fast-china/eslint-config"))["fastConfig"];

// @ts-expect-error -- 根入口不再提供 FastConfigOptions 兼容类型。
type LegacyFastConfigOptions = import("@fast-china/eslint-config").FastConfigOptions;

const projectRules = defineRules({
	"@angular-eslint/template/alt-text": "error",
	"@eslint-react/dom-no-missing-button-type": "error",
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used", argsIgnorePattern: "^_" }],
	"import-x/order": ["error", { "newlines-between": "always" }],
	"import-x/style-imports-last": "error",
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"react-hooks/exhaustive-deps": "warn",
	"vue/attributes-order": ["error", { order: ["DEFINITION", "EVENTS", "CONTENT"] }],
});

const options = {
	environment: "browser",
} satisfies ProjectConfigOptions;

defineConfig([...vueConfig]);
defineConfig([...uniAppConfig]);

const config = createVueProjectConfigs(options, {
	files: ["**/*.generated.ts"],
	name: "typegen/generated-files",
	rules: projectRules,
});

defineConfig(config);
createVueProjectConfigs(options);
createUniAppProjectConfigs({ environment: "node" });
createBaseConfigs({ environment: "universal" });

const ruleOptions = {
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{ disallowTypeAnnotations: false, fixStyle: "separate-type-imports", prefer: "type-imports" },
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
		},
	],
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
	"no-use-before-define": ["warn", { classes: true, functions: false, variables: true }],
	"prefer-arrow-callback": ["error", { allowNamedFunctions: false, allowUnboundThis: true }],
	"vue/attribute-hyphenation": ["error", "always"],
} satisfies RuleOptions;

defineRules(ruleOptions);

const baseOptions: ProjectConfigOptions = { environment: "node" };
defineConfig(createBaseConfigs(baseOptions));

const angularOptions: AngularConfigOptions = { inlineTemplates: false, templateAccessibility: false };
const reactOptions: ReactConfigOptions = { importSource: "preact", polymorphicPropName: "as", version: "10.0.0" };
defineConfig([...createBaseConfigs(), ...createAngularConfigs(angularOptions)]);
defineConfig([...createBaseConfigs(), ...createReactConfigs(reactOptions)]);

const lodashPreference: LodashPreference = "lodash";
defineConfig(createLodashConfigs(lodashPreference));
export type { LegacyDefaultExport, LegacyFastConfig, LegacyFastConfigOptions, RootAngularConfigOptions };

// @ts-expect-error -- Unknown rule names must be rejected.
defineRules({ "vue/not-a-real-rule": "error" });

// @ts-expect-error -- `args` only accepts values declared by the rule schema.
defineRules({ "@typescript-eslint/no-unused-vars": ["error", { args: "sometimes" }] });

// @ts-expect-error -- Unknown option names must be rejected.
defineRules({ "no-console": ["warn", { allowedMethods: ["warn"] }] });

// @ts-expect-error -- Environment only accepts the documented runtime values.
createVueProjectConfigs({ environment: "worker" });

// @ts-expect-error -- Frameworks are composed through the configs subpath.
createVueProjectConfigs({ react: true });

// @ts-expect-error -- Vue and UniApp use separate factories instead of a framework switch.
createVueProjectConfigs({ uniapp: true });

// @ts-expect-error -- Type-aware TypeScript is fixed and is not a switch.
createVueProjectConfigs({ typeChecked: false });

// @ts-expect-error -- tsconfigRootDir is no longer a factory option.
createVueProjectConfigs({ tsconfigRootDir: import.meta.dirname });

// @ts-expect-error -- Unknown factory options must be rejected.
createVueProjectConfigs({ unknownOption: true });

// @ts-expect-error -- Factory-level rules are supplied as trailing Flat Config.
createVueProjectConfigs({ rules: { "no-console": "off" } });
