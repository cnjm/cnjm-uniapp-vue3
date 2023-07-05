<!--
 * @Description: 这是form表单
 * @Date: 2023-02-16 16:43:43
 * @Author: chenjiaming
 * @LastEditors: chenjiaming
 * @LastEditTime: 2023-03-17 14:07:01
-->
<template>
  <view>
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
  import { onReady } from "@dcloudio/uni-app";
  import { getCurrentInstance, provide } from "vue";

  const props = defineProps({
    errorType: {
      type: Array,
      required: true,
      default: () => [],
    },
    model: {
      type: Object,
      required: true,
      default: () => {},
    },
    rules: {
      type: Object,
      required: false,
      default: () => {},
    },
  });

  const { proxy } = getCurrentInstance() as any;

  provide("rules", props.rules);
  provide("model", props.model);
  provide("errorType", props.errorType);

  // formitem可能存在多层级
  function getFormItem(data: any[]) {
    let children: any[] = [];
    data.forEach((element) => {
      if (element.$ident === "form-item") {
        children.push(element);
      }
      if (element.$children && element.$children.length) {
        children.push(...getFormItem(element.$children));
      }
    });
    return children;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  function validate(cb: Function) {
    let errs: any[] = [];
    const results = getFormItem(proxy.$children)
      .filter((item) => item.prop)
      .map((item) =>
        item.validate((err) => {
          errs.push(err);
        }),
      );
    // 统一处理所有Promise
    Promise.all(results)
      .then(() => cb(true))
      .catch(() => {
        if (props.errorType.includes("toast") && errs.length) {
          uni.showToast({
            title: errs[0].message || "校验失败",
            icon: "none",
            duration: 2000,
          });
        }
        return cb(false);
      });
  }

  // proxy.validate = validate;

  onReady(() => {
    proxy.validate = validate;
  });
</script>

<style lang="scss" scoped></style>
