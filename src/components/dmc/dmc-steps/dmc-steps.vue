<template>
  <view class="steps-wrapper">
    <view class="steps" v-for="(item, index) in list" :key="index">
      <view class="steps-top">
        <view class="ident"><view class="ident-son" /></view>
        <slot name="title" :title="item.title">
          <view class="title">{{ item.title }}</view>
        </slot>
        <slot name="time" :time="item.time">{{ item.time }}</slot>
      </view>
      <view class="steps-content">
        <view class="content-border" :class="{ 'content-border-dashed': Number(index) >= list.length - 1 }" />
        <slot name="content" :content="item.content">
          <view class="content-text">{{ item.content }}</view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  /**
   * steps 步骤条
   * @description 预留了title time content 插槽  可以再父组件通过 如下方式获取
   * @property
   * <template #title="{ title }">
   * <view>{{ title }}</view>
   * </template>
   * */

  defineProps({
    list: {
      type: Array<{ title: string; time: string; content: string }>,
      default: () => [],
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .steps-wrapper {
    // padding: 30rpx 0;
    .steps {
      width: 100%;
      font-size: 24rpx;
      font-weight: 400;
      color: #666666;
      line-height: 24rpx;
    }
    .steps-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
    }
    .ident {
      position: relative;
      width: 32rpx;
      height: 32rpx;
      background: #2960f7;
      border-radius: 22rpx;
      // ::after
      .ident-son {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 16rpx;
        height: 16rpx;
        background: #ffffff;
        border-radius: 22rpx;
      }
    }
    .title {
      flex-grow: 1;
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      line-height: 28rpx;
      padding: 0 10rpx;
    }
    .steps-content {
      margin: 6rpx 0;
      display: flex;
    }
    .content-border {
      width: 16rpx;
      min-height: 102rpx;
      margin-right: 24rpx;
      border-right: 2rpx dashed #979797;
    }
    .content-border-dashed {
      border-right: 2rpx dashed transparent;
    }
    .content-text {
      flex-grow: 1;
      padding: 16rpx 0;
    }
  }
</style>
