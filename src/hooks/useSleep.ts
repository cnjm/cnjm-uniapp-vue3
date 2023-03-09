export async function sleep(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}
export async function loginSleep(t = 150, n = 100) {
  return new Promise<void>(async (resolve, reject): Promise<void> => {
    for (let i = 0; i < n; i++) {
      const token = uni.getStorageSync("token");
      if (token) {
        resolve();
        return;
      }
      await sleep(t);
    }
    reject();
  });
}
