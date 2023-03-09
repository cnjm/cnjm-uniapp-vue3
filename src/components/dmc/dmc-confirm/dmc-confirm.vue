<template>
  <view class="dmc-confirm" :style="{ width: props.width }" @click="onClick"><slot></slot></view>
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
  .dmc-confirm {
    margin: 0 auto 0;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background: #2960f7;
    border-radius: 48rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
  }
</style>
