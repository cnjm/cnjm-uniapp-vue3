<template>
  <view class="scroll-wrapper">
    <scroll-view :style="`height: calc(100vh - ${height}rpx)`" :scroll-y="true" :refresher-enabled="true">
      <slot></slot>
      <dmc-load :status="status" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
  import { LoadingEnum } from "/@/enums/loading.enum";

  defineProps({
    height: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: LoadingEnum.LOADING,
    },
  });
</script>

<style lang="scss" scoped>
  .scroll-wrapper {
    width: 100%;
  }
</style>
