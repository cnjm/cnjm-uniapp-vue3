<template>
  <u-popup v-model="show" mode="center" :mask-close-able="false" :border-radius="20">
    <view class="popup-content">
      <view class="w-148rpx h-214rpx">
        <dmc-image src="@test/warn.png" />
      </view>
      <slot name="title" :title="title">
        <view class="title text-32rpx fw-500 text-#333 mb-20rpx">{{ title }}</view>
      </slot>
      <slot name="subtitle " :title="subtitle">
        <view class="max-w-336rpx text-center text-28rpx fw-400 text-#666 mb-56rpx">
          {{ subtitle }}
        </view>
      </slot>
      <view class="tips text-24rpx fw-400 text-#aaa mb-50rpx" v-if="tips">{{ tips }}</view>
      <view class="confirm mb-26rpx" @click="onConfirm">{{ confirmText }}</view>
      <view class="cancel text-28rpx fw-400 text-#999" @click="onCancel" v-if="showCancel">{{ cancelText }}</view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  const emits = defineEmits(["update:modelValue", "cancel", "confirm"]);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    confirmText: {
      type: String,
      default: "确认",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "权限未开通",
    },
    subtitle: {
      type: String,
      default: "该门店尚为开通慧招财会员 请联系门店联系",
    },
    tips: {
      type: String,
      default: "",
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

  function onConfirm() {
    emits("confirm");
  }
  function onCancel() {
    emits("cancel");
  }
</script>

<style lang="scss" scoped>
  .popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 560rpx;
    padding: 38rpx 48rpx 60rpx;
    background: linear-gradient(180deg, #bed9ff 0%, #ffffff 35%);
    box-shadow: inset 0rpx 2rpx 0rpx 0rpx #ffffff, inset 2rpx 0rpx 0rpx 0rpx #ffffff, inset -2rpx 0rpx 0rpx 0rpx #ffffff;
    .confirm {
      width: 462rpx;
      height: 80rpx;
      background: #2960f7;
      border-radius: 48rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #ffffff;
      line-height: 80rpx;
      text-align: center;
    }
  }
</style>
