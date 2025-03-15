import process from "node:process";
import { getPackageInfoSync } from "local-pkg";
import { isPackageExists } from "local-pkg";

const getVueVersion = () => {
	const pkg = getPackageInfoSync("vue", { paths: [process.cwd()] });
	if (pkg && typeof pkg.version === "string" && !Number.isNaN(+pkg.version[0])) {
		return +pkg.version[0];
	}
	return 3;
};

/**
 * 是否包含 vue
 */
export const hasVue = isPackageExists("vue") || isPackageExists("nuxt");

/**
 * 是否为 vue3 版本
 */
export const isVue3 = getVueVersion() === 3;
