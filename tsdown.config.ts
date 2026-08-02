import { defineConfig } from "tsdown";

export default defineConfig({
	// 分别生成主入口与规则子路径入口，对应 package.json 中的 exports。
	entry: {
		index: "src/index.ts",
		"rules/index": "src/rules/index.ts",
	},
	// 仅输出 ESM，与包的 module 类型保持一致。
	format: "esm",
	// 按 Node.js 运行时处理内置模块和依赖。
	platform: "node",
	// 以最低支持的 Node.js 22 为语法转换目标。
	target: "node22",
	// 共享 chunk 不追加内容哈希，保持构建产物名称稳定。
	hash: false,
	// 生成类型声明及其映射，支持编辑器从声明文件跳转到源码。
	dts: { sourcemap: true },
	// 生成 JavaScript 源码映射，便于定位运行时错误。
	sourcemap: true,
	// 构建前清理输出目录，避免残留失效文件。
	clean: true,
	// 移除未使用代码，减小发布产物体积。
	treeshake: true,
});
