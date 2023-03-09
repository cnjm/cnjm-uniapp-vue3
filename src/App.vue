<script setup lang="ts">
  import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
  // import { useUserStore } from "/@/store/modules/user";
  // const useUser = useUserStore();
  onLaunch(async () => {
    // 微信登录逻辑
    // await useUser.userWeappLogin();
    // console.log("App Launch");
  });
  onShow(() => {
    // console.log("App Show");
  });
  onHide(() => {
    // console.log("App Hide");
  });
</script>
<style lang="scss">
  @import "vk-uview-ui/index.scss";
</style>
