<template>
  <view class="filter-wrapper" v-if="show">
    <dmc-mask @close="onClose" />
    <view class="filter-content filter-right w-536rpx bg-white">
      <view class="text-30rpx fw-600 text-#333 h-130rpx p-50rpx pl-28rpx">{{ props.title }}</view>
      <scroll-view class="scroll" scroll-y="true" :refresher-enabled="false">
        <view class="pl-28rpx pr-28rpx"><slot name="form"></slot></view>
      </scroll-view>

      <view class="h-152rpx" />
      <view class="action">
        <view class="action-bt" @click="onReset">重置</view>
        <view class="action-bt action-ac" @click="onConfirm">确定</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  const emits = defineEmits(["update:modelValue", "reset", "confirm", "close"]);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "right",
    },
    title: {
      type: String,
      default: "筛选",
    },
  });
  const show = computed({
    get: () => {
      return props.modelValue;
    },
    set: (value: boolean) => {
      emits("update:modelValue", value);
    },
  });

  function onReset() {
    emits("reset");
  }
  function onConfirm() {
    emits("confirm");
  }
  function onClose() {
    emits("close");
  }
</script>

<style lang="scss" scoped>
  .filter-wrapper {
    z-index: 1024;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    .filter-content {
      position: absolute;
      background-color: #ffffff;
    }
    .filter-right {
      right: 0;
      top: 0;
      bottom: 0;
      min-height: 100vh;
    }
    .scroll {
      height: calc(100vh - 152rpx - 130rpx);
    }
  }
  .action {
    position: absolute;
    bottom: 0;
    left: 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 152rpx;
    width: 90%;
    border-top: 1rpx solid #e6e6e6;
    .action-bt {
      width: auto;
      height: 72rpx;
      line-height: 72rpx;
      padding: 0 66rpx;
      background: #f2f2f2;
      border-radius: 10rpx;
    }
    .action-ac {
      background: #2960f7;
      color: #ffffff;
    }
  }
</style>
