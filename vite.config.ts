import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Unocss from "unocss/vite";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import { viteMockServe } from "vite-plugin-mock";
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
  plugins: [
    uni(),
    Unocss(),
    vueSetupExtend(),
    viteMockServe({
      mockPath: "mock",
      supportTs: true,
      localEnabled: true, // 是否应用于本地
      prodEnabled: false, // 是否应用于生产
      injectCode: `
      import { setupProdMockServer } from '/mock/index';
      setupProdMockServer();
    `,
    }),
  ],
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
