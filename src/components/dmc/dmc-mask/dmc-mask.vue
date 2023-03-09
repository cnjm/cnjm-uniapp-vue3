<template>
  <view
    class="mask-wrapper"
    hover-stop-propagation
    @click="onClick"
    @touchmove.stop.prevent="() => {}"
    :style="zIndex"
  />
</template>

<script setup lang="ts">
  const emits = defineEmits(["close"]);
  const props = defineProps({
    // 是否显示遮罩
    show: {
      type: Boolean,
      default: false,
    },
    // 层级z-index
    zIndex: {
      type: String,
      default: "",
    },
    // 是否可以通过点击遮罩进行关闭
    maskClickAble: {
      type: Boolean,
      default: true,
    },
  });

  function onClick() {
    if (!props.maskClickAble) return;
    emits("close");
  }
</script>

<style lang="scss" scoped>
  .mask-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: transform 0.3s;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
