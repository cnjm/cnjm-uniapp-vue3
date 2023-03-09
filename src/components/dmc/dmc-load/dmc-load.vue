<template>
  <view class="load-wrapper">
    <slot name="content">
      <u-loadmore
        v-if="props.status === LoadingEnum.LOADING || props.status === LoadingEnum.NOMORE"
        :status="props.status"
      />
      <view v-else class="load">
        <view class="w-402rpx h-202rpx">
          <dmc-image src="@test/no-data.png" :showLoading="false" />
        </view>
        <view class="text-#999 mt-36rpx">{{
          props.status === LoadingEnum.NODATA ? "暂无数据" : "加载失败，请稍候重试"
        }}</view>
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
  import { LoadingEnum } from "/@/enums/loading.enum";
  const props = defineProps({
    status: {
      type: String,
      default: LoadingEnum.LOADING,
    },
  });
</script>

<style lang="scss" scoped>
  .load-wrapper {
    .load {
      margin: 20rpx auto 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
