import { defineConfig } from "tsup";

export default defineConfig([
	{
		// 入口文件
		entry: ["src/flat/index.ts"],
		// 输出目录
		outDir: "dist/flat",
		// 输出格式
		format: ["esm"],
		// 编译版本
		target: "node18.18",
		// 生成类型定义文件
		dts: true,
		// 启用代码拆分
		splitting: false,
		// 生成 source map
		sourcemap: true,
		// 清理输出目录
		clean: true,
		// 压缩输出文件
		minify: false,
		// 去除未使用的代码
		treeshake: false,
	},
]);
