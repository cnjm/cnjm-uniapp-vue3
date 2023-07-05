<!--
 * @Description: 这是form-item
 * @Date: 2023-02-16 16:43:43
 * @Author: chenjiaming
 * @LastEditors: chenjiaming
 * @LastEditTime: 2023-03-17 14:44:16
-->
<template>
  <view class="from-item">
    <view class="label" v-if="label" :style="labelStyle"><text class="req" v-if="required">*</text>{{ label }}</view>
    <!-- slot -->
    <slot></slot>

    <view v-if="showError">{{ error }}</view>
  </view>
</template>

<script setup lang="ts">
  import Validator from "async-validator";
  import { onReady } from "@dcloudio/uni-app";
  import { computed, getCurrentInstance, inject, ref } from "vue";
  import { cloneDeep } from "lodash-es";

  const props = defineProps({
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    labelStyle: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
  });

  const { proxy } = getCurrentInstance() as any;

  const error = ref("");

  const rules: any = inject("rules");
  const model: any = inject("model");
  const errorType: any = inject("errorType");

  const showError = computed(() => {
    return errorType.includes("message");
  });

  function validate(callback) {
    let prop = props.prop.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "");
    const propArr = prop.split(".");

    let propValue: any = cloneDeep(model);

    if (propArr.length >= 1) {
      let key = "";
      for (let i = 0; i < propArr.length; i++) {
        key = propArr[i];
        propValue = propValue[key];
      }
      prop = key;
    } else {
      propValue = model[prop];
    }

    const propRules = rules[prop];

    if (!propRules) {
      return;
    }
    const validator = new Validator({ [prop]: propRules });
    return validator.validate({ [prop]: propValue }, (errors) => {
      if (errors) {
        error.value = errors[0].message || "校验不通过";
      } else {
        error.value = "";
      }
      callback(errors![0] || {});
      return errors;
    });
  }

  onReady(() => {
    proxy.validate = validate;
    proxy.$ident = "form-item";
  });
</script>

<style lang="scss" scoped>
  .from-item {
    width: 100%;
    border-bottom: 1rpx solid #e6e6e6;
    .label {
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
      .req {
        color: #ff4d4f;
      }
    }
  }
</style>
