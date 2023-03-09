import { ResultStatusEnum } from "/@/enums/network.enum";

export function checkStatus(code: string, message: string, errorMessageMode?: string): void {
  let errMessage = message;
  // console.log(status, msg);
  switch (code) {
    // 登录超时
    case ResultStatusEnum.TIMEOUT:
      errMessage = `登录超时，请重新登录`;
      break;
    default:
  }

  if (errMessage) {
    // 提示处理
    if (errorMessageMode === "toast") {
      uni.showToast({
        title: errMessage,
        icon: "none",
        duration: 2000,
      });
    }
    if (errorMessageMode === "modal") {
      uni.showModal({
        title: "提示",
        content: errMessage,
        showCancel: false,
      });
    }
  }
}
