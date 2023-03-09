import { toRaw } from "vue";
// import { RoleEnum } from "/@/enums/role.enum";
import { useUserStoreWithOut } from "/@/store/modules/user";
// import appSetting from "/@/settings/appSetting";
const userStore = useUserStoreWithOut();

// 按钮级别的权限校验，小程序没法使用自定义指令，v-if走天下
export function getAuthStatus(codes: string[]) {
  // if (appSetting.whetherToVerifyPermissions) {
  //   return true;
  // }
  const permissionList = toRaw(userStore.getPermissionList);
  // 没有设置角色则默认通过
  if (!codes || codes.length <= 0) return true;
  // 设置特定的角色（超级管理员）默认都可以访问
  // if (permissionList.includes(RoleEnum.SUPER)) return true;
  // 余下需要判断该用户是否包含所需角色
  return permissionList.some((item) => codes.includes(item.permissionCode));
}
