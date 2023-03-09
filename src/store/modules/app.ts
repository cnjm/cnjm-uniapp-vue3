import { defineStore } from "pinia";
import { getAppEnvConfig } from "/@/utils/util/env";

interface AppState {
  // 公共图片地址
  ossBaseUrl: string;
}
const { VITE_GLOB_OSS_BASEURL } = getAppEnvConfig();

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    ossBaseUrl: VITE_GLOB_OSS_BASEURL,
  }),

  getters: {},
  actions: {},
});
