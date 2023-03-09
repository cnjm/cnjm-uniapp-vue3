export type SmsLoginResult = {
  token: string; //token
};
export interface LoginParams {
  code: string; //微信code
  appId: string; //小程序appId（小程序登录必填）
}

export type LoginResult = SmsLoginResult & {
  openIdMd5: string; //openIdMd5-微信登录且微信openId未绑定
};
