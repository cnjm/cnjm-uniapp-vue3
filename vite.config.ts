import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";
import pkg from "./package.json";
function pathResolve(dir: string) {
	return resolve(process.cwd(), ".", dir);
}
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: new Date(),
};
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [uni()],
	resolve: {
		alias: [
			{
				find: /\/@\//,
				replacement: pathResolve("src") + "/",
			},
			{
				find: /\/#\//,
				replacement: pathResolve("types") + "/",
			},
		],
	},
	define: {
		__APP_INFO__: JSON.stringify(__APP_INFO__),
	},
});
