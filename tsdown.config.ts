import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		"rules/index": "src/rules/index.ts",
	},
	format: "esm",
	platform: "node",
	target: "node22",
	// 多入口共享 chunk 使用固定名称，避免仅内容变化就产生无意义的文件重命名。
	hash: false,
	// 声明映射让编辑器可以从发布包类型定义直接跳回对应源码。
	dts: { sourcemap: true },
	sourcemap: true,
	clean: true,
	treeshake: true,
});
