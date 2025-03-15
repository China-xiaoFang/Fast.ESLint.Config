/**
 * 生成规则 ts 类型
 */
import fs from "node:fs/promises";
import { flatConfigsToRulesDTS } from "eslint-typegen/core";
import { builtinRules } from "eslint/use-at-your-own-risk";
import fastChinaFlat from "../src/flat/index";
import { Linter } from "eslint";

const configs: Linter.Config[] = [
	...fastChinaFlat,
	{
		plugins: {
			"": {
				rules: Object.fromEntries(builtinRules.entries()),
			},
		},
	},
];

const configNames: string[] = configs.map((c) => c.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs, {
	includeAugmentation: false,
});

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(" | ")}
`;

await fs.writeFile("src/typegen.d.ts", dts);
