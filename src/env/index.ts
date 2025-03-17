import { getPackageInfoSync } from "local-pkg";

const getVueVersion = (): number => {
	const pkg = getPackageInfoSync("vue", { paths: [process.cwd()] });
	if (pkg && typeof pkg.version === "string" && !Number.isNaN(+pkg.version[0])) {
		return +pkg.version[0];
	}
	return 3;
};

/**
 * 是否为 vue3 版本
 */
export const isVue3 = getVueVersion() === 3;
