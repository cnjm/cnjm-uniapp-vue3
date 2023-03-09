<template>
  <view class="subsection-wrapper">
    <view
      v-for="item in list"
      :key="item.ident"
      class="subsection-item"
      :class="{ active: current === item.ident }"
      @click="onClick(item.ident)"
      >{{ item.name }}
      <view class="active-bottom" v-show="current === item.ident" />
    </view>
  </view>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  const emits = defineEmits(["update:modelValue", "change"]);
  const props = defineProps({
    modelValue: {
      type: String,
      default: "0",
    },
    list: {
      type: Object,
      default: () => {},
    },
  });
  const current = computed({
    get: () => {
      return props.modelValue;
    },
    set: (value: string) => {
      emits("update:modelValue", value);
    },
  });
  function onClick(ident: string) {
    current.value = ident;
    emits("change", ident);
  }
</script>

<style lang="scss" scoped>
  .subsection-wrapper {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    height: 100rpx;
    background: #ffffff;
    border-radius: 20rpx;
    .subsection-item {
      position: relative;
      flex-grow: 1;
      font-size: 32rpx;
      font-weight: 400;
      color: #333333;
      text-align: center;
      height: 100%;
      line-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active {
      font-weight: 500;
      color: #3558e1;
    }
    .active-bottom {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 48rpx;
      height: 4rpx;
      background: #2960f7;
      border-radius: 4rpx;
    }
  }
</style>
