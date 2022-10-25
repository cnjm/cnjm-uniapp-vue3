import { createSSRApp } from "vue";
import App from "./App.vue";
import { setupStore } from "/@/store";
export function createApp() {
  const app = createSSRApp(App);
  // pinia
  setupStore(app);
  return {
    app,
  };
}
