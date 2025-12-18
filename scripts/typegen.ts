/**
 * 生成规则 ts 类型
 */
import fs from "node:fs/promises";
import eslint from "@eslint/js";
import { flatConfigsToRulesDTS } from "eslint-typegen/core";
import fastChinaFlat from "../src/index";
import type { Linter } from "eslint";

const configs: Linter.Config[] = [...fastChinaFlat, eslint.configs.recommended];

const configNames: string[] = configs.map((c) => c.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs, {
	includeAugmentation: false,
});

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(" | ")}
`;

await fs.writeFile("dist/typegen.d.ts", dts);
