import "uno.css";
import { setupPlugins } from "/@/plugins";
import { createSSRApp } from "vue";
// 引入 uview  UI
import uView from "vk-uview-ui";
import App from "./App.vue";
import { setupStore } from "/@/store";
export function createApp() {
  const app = createSSRApp(App);
  // 使用 uView  UI
  app.use(uView);
  // pinia
  setupStore(app);
  // plugins
  setupPlugins(app);
  return {
    app,
  };
}
