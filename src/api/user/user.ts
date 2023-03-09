import { defRequest } from "/@/utils/network/index";
import { LoginParams, LoginResult } from "./user.model";

enum Api {
  // 获取手机短信
  CAPTCHA = "/getCaptcha",
  // 微信小程序登录V2
  WECHAT = "/wechat",
}

export const getCaptcha = (data: { phone: string }, mode: ErrorMessageMode = "toast") =>
  defRequest.post({ url: Api.CAPTCHA, data }, { errorMessageMode: mode, ident: false });

export const wechatLogin = (data: LoginParams, mode: ErrorMessageMode = "toast") =>
  defRequest.post<LoginResult>({ url: Api.WECHAT, data }, { errorMessageMode: mode, ident: false });
