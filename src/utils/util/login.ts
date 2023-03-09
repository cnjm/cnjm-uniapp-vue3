/**
 * 获取 小程序的code
 */
export const getWxCode = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    uni.login({
      success(res) {
        if (res.code) {
          // 把微信code返回
          resolve(res.code);
        } else {
          reject();
        }
      },
      fail() {
        reject();
      },
    });
  });
};
