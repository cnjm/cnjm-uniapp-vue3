/*
 * @Description: plugin
 */
import type { App } from "vue";
import { getAuthStatus } from "/@/hooks/useAuth";
import { setupInterceptor } from "/@/plugins/interceptor";
export function setupPlugins(app: App<Element>) {
  app.config.globalProperties.$auth = getAuthStatus;
  // api事件拦截
  setupInterceptor();
}
