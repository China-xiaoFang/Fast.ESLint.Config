import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		"rules/index": "src/rules/index.ts",
	},
	format: ["esm"],
	target: "node22",
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	treeshake: true,
});
