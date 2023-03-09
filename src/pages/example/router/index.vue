<template>
  <view class="router-wrapper">
    <!-- <DrawingBoard ref="board" /> -->
    <view class="save" @click="onSave">保存</view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  // import DrawingBoard from "../../../components/drawingBoard/draBoard.vue";
  const board = ref();
  function onSave() {
    console.log(board);
  }
</script>

<style lang="scss" scoped>
  .save {
    position: fixed;
    bottom: 20rpx;
    left: 50rpx;
  }
</style>
