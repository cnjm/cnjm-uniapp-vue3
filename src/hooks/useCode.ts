import { ref } from "vue";
import type { Ref } from "vue";
import { onUnload } from "@dcloudio/uni-app";
export default function useCode<T>(request: (formState: T) => Promise<void>, formState: T, filed: string) {
  // 提示语
  const codeText = ref("获取验证码");
  const codeTime = ref(0);
  const codeStatus = ref(false);
  const timer: Ref<NodeJS.Timeout | null> = ref(null);
  // 获取验证码
  const getCode = () => {
    if (!formState[filed]) {
      return uni.showToast({
        title: `请输入正确的手机号`,
        icon: "none",
        duration: 2000,
      });
    }
    if (codeStatus.value) {
      return uni.showToast({
        title: `请${codeTime.value}秒后重新获取`,
        icon: "none",
        duration: 2000,
      });
    }
    request(formState).then(() => {
      codeStatus.value = true;
      codeTime.value = 60;
      codeText.value = `${codeTime.value}S`;
      timer.value = setInterval(() => {
        codeTime.value--;
        codeText.value = `${codeTime.value}S`;
        if (codeTime.value <= 0) {
          codeStatus.value = false;
          // 到点清除
          clearInterval(timer.value as NodeJS.Timeout);
          codeText.value = "获取验证码";
        }
      }, 1000);
      uni.showToast({
        title: `获取成功，请注意查收`,
        icon: "none",
        duration: 2000,
      });
    });
  };
  // 页面卸载也清除
  onUnload(() => {
    timer.value && clearInterval(timer.value as NodeJS.Timeout);
  });
  return {
    codeText,
    codeTime,
    codeStatus,
    getCode,
  };
}
