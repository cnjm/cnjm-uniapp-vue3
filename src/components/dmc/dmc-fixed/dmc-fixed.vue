<template>
  <view class="dmc-fixed">
    <dmc-confirm :width="props.width" @click="onClick"> <slot></slot> </dmc-confirm>
  </view>
</template>

<script setup lang="ts">
  const emits = defineEmits(["click"]);
  const props = defineProps({
    width: {
      type: String,
      default: "",
      required: true,
    },
  });
  function onClick() {
    emits("click");
  }
</script>

<style lang="scss" scoped>
  .dmc-fixed {
    width: 100vw;
    background: #ffffff;
    box-shadow: 0rpx -1rpx 0rpx 0rpx #e6e6e6;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    padding: 20rpx 0 calc(20rpx + env(safe-area-inset-bottom));
  }
</style>
