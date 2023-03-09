<template>
  <u-image
    :src="ossSrc"
    :mode="props.mode"
    :width="props.width"
    :height="props.height"
    :shape="props.shape"
    :borderRadius="props.borderRadius"
    :lazyLoad="props.lazyLoad"
    :showMenuByLongpress="props.showMenuByLongpress"
    :loadingIcon="props.loadingIcon"
    :errorIcon="props.errorIcon"
    :showLoading="props.showLoading"
    :showError="props.showError"
    :fade="props.fade"
    :webp="props.webp"
    :duration="props.duration"
    :bgColor="props.bgColor"
    @click="onClick"
    @error="onError"
    @load="onLoad"
  />
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useAppStore } from "/@/store/modules/app";
  const useApp = useAppStore();
  const emit = defineEmits(["click", "error", "load"]);

  // uniapp竟然不支持透传
  const props = defineProps({
    src: {
      type: String,
      default: "",
      required: true,
    },
    mode: {
      type: String,
      default: "aspectFill",
    },
    width: {
      type: [String, Number],
      default: "100%",
    },
    height: {
      type: [String, Number],
      default: "100%",
    },
    shape: {
      type: String,
      default: "square",
    },
    borderRadius: {
      type: [String, Number],
      default: 0,
    },
    lazyLoad: {
      type: Boolean,
      default: true,
    },
    showMenuByLongpress: {
      type: Boolean,
      default: true,
    },
    // 加载中的图标，或者小图片
    loadingIcon: {
      type: String,
      default: "photo",
    },
    // 加载失败的图标，或者小图片
    errorIcon: {
      type: String,
      default: "error-circle",
    },
    // 是否显示加载中的图标或者自定义的slot
    showLoading: {
      type: Boolean,
      default: true,
    },
    // 是否显示加载错误的图标或者自定义的slot
    showError: {
      type: Boolean,
      default: true,
    },
    // 是否需要淡入效果
    fade: {
      type: Boolean,
      default: false,
    },
    // 只支持网络资源，只对微信小程序有效
    webp: {
      type: Boolean,
      default: false,
    },
    // 过渡时间，单位ms
    duration: {
      type: [String, Number],
      default: 200,
    },
    // 背景颜色，用于深色页面加载图片时，为了和背景色融合
    bgColor: {
      type: String,
      default: "#f3f4f6",
    },
  });

  const ossSrc = computed(() => {
    // 对特定的字符替换，可以在此组件统一处理图片路径等可能的操作
    return props.src.replace("@test", useApp.ossBaseUrl);
  });
  const onClick = () => emit("click");
  const onError = (err: Event) => emit("click", err);
  const onLoad = () => emit("click");
</script>

<style lang="scss" scoped></style>
