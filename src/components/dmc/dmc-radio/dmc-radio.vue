<template>
  <view class="radio-wrapper" @click="onClick">
    <view v-show="status" class="in-radio"><view class="son" /></view>
    <view v-show="!status" class="un-radio" />
    <view>
      <slot>{{ text }}</slot>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { computed, getCurrentInstance, ref, watch } from "vue";

  const { proxy } = getCurrentInstance() as any;

  let status = ref(false);

  const props = defineProps({
    value: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    radio: {
      type: String,
      default: "",
    },
  });
  const parentValue = computed(() => {
    if (proxy.$parent) {
      return proxy.$parent.modelValue;
    }
    return "";
  });
  const typeValue = computed(() => {
    if (proxy.$parent) {
      return proxy.$parent.type;
    }
    return "single";
  });
  watch(
    parentValue,
    (val) => {
      if (val) {
        if (typeValue.value === "single") {
          status.value = val === props.value;
        }
        if (typeValue.value === "multiple") {
          status.value = val.includes(props.value);
        }
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );
  function onClick() {
    proxy.$parent.onChange(props.value);
  }
</script>
<style lang="scss" scoped>
  .radio-wrapper {
    display: flex;
    align-items: flex-start;
    padding-bottom: 24rpx;
  }
  .un-radio {
    margin-top: 12rpx;
    margin-right: 12rpx;
    width: 20rpx;
    height: 20rpx;
    background: #ffffff;
    border-radius: 12rpx;
    border: 2rpx solid #cccccc;
  }
  .in-radio {
    margin-top: 12rpx;
    margin-right: 12rpx;
    position: relative;
    width: 20rpx;
    height: 20rpx;
    background: #ffffff;
    border-radius: 12rpx;
    border: 2rpx solid #2960f7;
    .son {
      width: 12rpx;
      height: 12rpx;
      background: #2960f7;
      border-radius: 12rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }
</style>
