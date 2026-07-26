import fastChina from "./dist/index.js";

export default fastChina({
	environment: "node",
	sortPackageJson: true,
	sortTsconfig: true,
	typescript: { typeChecked: true },
	vue: false,
});
