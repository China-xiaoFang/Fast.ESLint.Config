import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import ts from "typescript";

const rulesDirectory = new URL("../src/rules/", import.meta.url);
const readRuleSources = () =>
	fs
		.readdirSync(rulesDirectory)
		.filter((fileName) => fileName.endsWith(".ts") && fileName !== "index.ts")
		.map((fileName) => ({ fileName, source: fs.readFileSync(new URL(fileName, rulesDirectory), "utf8") }));

test("every local rule override has a nearby rationale comment", () => {
	for (const { fileName, source } of readRuleSources()) {
		const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

		const visit = (node) => {
			if (ts.isVariableDeclaration(node) && node.initializer && ts.isSatisfiesExpression(node.initializer)) {
				const { expression, type } = node.initializer;

				if (type.getText(sourceFile) !== "RuleOptions" || !ts.isObjectLiteralExpression(expression)) {
					ts.forEachChild(node, visit);
					return;
				}

				for (const property of expression.properties) {
					if (!ts.isPropertyAssignment(property)) continue;

					const leadingTrivia = source.slice(property.getFullStart(), property.getStart(sourceFile));
					assert.match(
						leadingTrivia,
						/\/\/[^\r\n]+|\/\*[\s\S]*?\*\//,
						`${fileName}:${sourceFile.getLineAndCharacterOfPosition(property.getStart(sourceFile)).line + 1} needs a rationale comment`
					);
				}
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
	}
});

test("risk guide documents every high-impact local default", () => {
	const riskGuide = fs.readFileSync(new URL("../docs/rules-risk.zh.md", import.meta.url), "utf8");
	const highImpactRules = new Set();

	for (const { source } of readRuleSources()) {
		for (const match of source.matchAll(/\/\/([^\r\n]*\[高影响\][^\r\n]*)\r?\n\s*"([^"]+)"/g)) {
			const [, comment, rule] = match;
			if (!comment.includes("[按需启用]") && !comment.includes("[默认关闭]")) highImpactRules.add(rule);
		}
	}

	assert.ok(highImpactRules.size > 0);
	for (const rule of highImpactRules) {
		assert.ok(riskGuide.includes(`\`${rule}\``), `${rule} is missing from the risk guide`);
	}
});
