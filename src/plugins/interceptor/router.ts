/*
 * @Description: 这是拦截路由api
 */
// import type { App } from "vue";
import { pages } from "/@/pages.json";
import { getAuthStatus } from "/@/hooks/useAuth";
const pagesAuth = {};
pages.forEach((item) => {
  const element = item as any;
  if ((element as any).meta && element.meta.auth && element.meta.auth.length) {
    pagesAuth["/" + element.path] = element.meta.auth;
  }
});

function check(path: string) {
  if (pagesAuth[path]) {
    return getAuthStatus(pagesAuth[path]);
  }
  return true;
}

export default () => {
  uni.addInterceptor("navigateTo", {
    invoke({ url }) {
      return check(url);
    },
  });
  uni.addInterceptor("redirectTo", {
    invoke({ url }) {
      return check(url);
    },
  });
  uni.addInterceptor("reLaunch", {
    invoke({ url }) {
      return check(url);
    },
  });
  uni.addInterceptor("switchTab", {
    invoke({ url }) {
      return check(url);
    },
  });
};
