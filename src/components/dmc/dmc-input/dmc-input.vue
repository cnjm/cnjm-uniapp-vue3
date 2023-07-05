<!--
 * @Description: 这是**页面（组件）
 * @Date: 2023-03-17 14:19:11
 * @Author: chenjiaming
 * @LastEditors: chenjiaming
 * @LastEditTime: 2023-03-24 10:47:08
-->
<template>
  <view class="dmc-input">
    <input
      class="dmc-input__input"
      :type="type == 'password' ? 'text' : type"
      :style="[getStyle]"
      :value="defaultValue"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :disabled="disabled || type === 'select'"
      :maxlength="Number(maxlength)"
      :focus="focus"
      :confirmType="confirmType"
      :cursor-spacing="cursorSpacing"
      :selection-end="selectionEnd"
      :selection-start="selectionStart"
      :show-confirm-bar="showConfirmbar"
      :adjust-position="adjustPosition"
      @focus="onFocus"
      @blur="onBlur"
      @input="handleInput"
      @confirm="onConfirm"
    />
  </view>
</template>

<script setup lang="ts">
  import { onReady } from "@dcloudio/uni-app";
  import { computed, getCurrentInstance, Ref, ref } from "vue";
  import { trim } from "/@/utils/util";

  const emit = defineEmits(["focus", "blur", "confirm", "input", "update:modelValue", "click"]);

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: "",
    },
    // 输入框的类型，textarea，text，number
    type: {
      type: String,
      default: "text",
    },
    inputAlign: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [Number, String],
      default: 140,
    },
    placeholderStyle: {
      type: String,
      default: "color: #c0c4cc;",
    },
    confirmType: {
      type: String,
      default: "done",
    },
    // 输入框的自定义样式
    customStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
    fixed: {
      type: Boolean,
      default: false,
    },
    // 是否自动获得焦点
    focus: {
      type: Boolean,
      default: false,
    },
    // 密码类型时，是否显示右侧的密码图标
    passwordIcon: {
      type: Boolean,
      default: true,
    },
    // input|textarea是否显示边框
    border: {
      type: Boolean,
      default: false,
    },
    // 输入框的边框颜色
    borderColor: {
      type: String,
      default: "#dcdfe6",
    },
    autoHeight: {
      type: Boolean,
      default: true,
    },
    // type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态
    // open-打开，close-关闭
    selectOpen: {
      type: Boolean,
      default: false,
    },
    // 高度，单位rpx
    height: {
      type: [Number, String],
      default: "",
    },
    // 是否可清空
    clearable: {
      type: [Boolean, String],
    },
    // 指定光标与键盘的距离，单位 px
    cursorSpacing: {
      type: [Number, String],
      default: 0,
    },
    // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
    selectionStart: {
      type: [Number, String],
      default: -1,
    },
    // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
    selectionEnd: {
      type: [Number, String],
      default: -1,
    },
    // 是否自动去除两端的空格
    trim: {
      type: Boolean,
      default: true,
    },
    // 是否显示键盘上方带有”完成“按钮那一栏
    showConfirmbar: {
      type: Boolean,
      default: true,
    },
    // 弹出键盘时是否自动调节高度，uni-app默认值是true
    adjustPosition: {
      type: Boolean,
      default: true,
    },
    // input的背景色
    backgroundColor: {
      type: String,
    },
    // input的padding
    padding: {
      type: String,
    },
  });

  const { proxy } = getCurrentInstance() as any;
  console.log(proxy);

  // const rules: any = inject("rules");
  // const model: any = inject("model");
  let defaultValue: Ref<string | number> = ref("");

  const getStyle = computed(() => {
    let style = {};
    return style;
  });

  // 输入事件
  function handleInput(event) {
    let value = event.detail.value;
    // 判断是否去除空格
    if (props.trim) value = trim(value);
    emit("update:modelValue", value);
    defaultValue.value = value;
  }

  function onFocus() {
    emit("focus");
  }
  function onBlur() {
    emit("blur");
  }
  function onConfirm() {
    emit("confirm");
  }
  // function onClear() {
  //   emit("input", "");
  //   emit("update:modelValue", "");
  // }
  // function inputClick() {
  //   emit("click");
  // }

  onReady(() => {});
</script>

<style lang="scss" scoped>
  .from-item {
    width: 100%;
    border-bottom: 1rpx solid #e6e6e6;
    .label {
      font-size: 28rpx;
      font-weight: 400;
      color: #ff4d4f;
    }
    .req {
      color: #ff4d4f;
    }
  }
</style>
