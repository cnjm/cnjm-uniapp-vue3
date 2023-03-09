<template>
  <view class="radio-group-wrapper">
    <view class="label" v-if="label"> <text class="required">*</text>{{ label }} </view>
    <view>
      <slot> </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { computed, getCurrentInstance } from "vue";

  const { proxy } = getCurrentInstance() as any;
  const emits = defineEmits(["update:modelValue"]);
  const props = defineProps({
    modelValue: {
      type: [String, Array],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    // 类型 single multiple
    type: {
      type: String,
      default: "single",
    },
  });
  let radio = computed({
    get: () => {
      return props.modelValue;
    },
    set: (value: string | Array<any>) => {
      emits("update:modelValue", value);
    },
  });
  proxy.onChange = onChange;
  function onChange(value) {
    if (props.type === "single") {
      radio.value = value;
    }
    if (props.type === "multiple") {
      const index = radio.value.indexOf(value);
      if (index >= 0) {
        (radio.value as Array<string>).splice(index, 1);
        return;
      }
      (radio.value as Array<string>).push(value);
    }
  }
</script>

<style lang="scss" scoped>
  .label {
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
    margin-bottom: 36rpx;
  }
  .required {
    color: #ff4d4f;
  }
</style>
