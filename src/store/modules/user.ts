import { defineStore } from "pinia";
import { store } from "/@/store";
import { getWxCode } from "/@/utils/util/login";
import { wechatLogin } from "/@/api/user/user";
import { getAppEnvConfig } from "/@/utils/util/env";
import { RouterEnum, StorageEnum } from "/@/enums/app.enum";

const { VITE_GLOB_APP_ID } = getAppEnvConfig();

interface UserState {
  token: string;
  viewVersion: string;
  position: string;
  openIdMd5: string;
  realInfo: {
    realName: string;
    imgUrl: string;
    phone: string;
  };
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: "",
    viewVersion: "",
    position: "",
    openIdMd5: "",
    realInfo: { realName: "未登录", imgUrl: "/portrait.png", phone: "" },
  }),

  getters: {},
  actions: {
    async clearUserInfo() {
      uni.removeStorageSync(StorageEnum.TOKEN);
      uni.removeStorageSync(StorageEnum.VIEW_VERSION);
      uni.removeStorageSync(StorageEnum.POSITION);
    },
    // 处理用户信息
    async setUserInfo() {},
    // 小程序登录
    async userWeappLogin() {
      try {
        await this.clearUserInfo();
        const code = (await getWxCode()) as string;

        await wechatLogin({
          code,
          appId: VITE_GLOB_APP_ID,
        });
      } catch (_error) {
        uni.redirectTo({
          url: RouterEnum.LOGIN,
        });
      }
    },
    // 手机号登录
    async userPhoneLogin() {},
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
