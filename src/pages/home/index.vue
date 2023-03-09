<template>
  <view class="home-wrapper text-center">
    <view class="text-28rpx text-#333">unocss原子化示例</view>
    <view class="m-50rpx" @click="toExample">路由跳转示例、点击跳转</view>
    <view>uview form 示例</view>
    <view>说是支持prop . [] 深度查找，</view>
    <view>
      但是rules也要如此，实在脑残，时间充裕的话还是别用这个UI库自己封装一个，或者换个好的，不过时间有限没发现啥好的
    </view>
    <view> 对手机号输入限制 </view>
    <u-form :model="formState" ref="uForm" :errorType="['toast']">
      <u-form-item label="" prop="phone">
        <u-input
          v-model="formState.phone"
          placeholder="请输入手机号"
          :placeholderStyle="placeholderStyle"
          :height="78"
          :maxlength="11"
          type="number"
          @input="inputPhone($event, 'phone')"
        />
      </u-form-item>
      <u-form-item label="" prop="smsCode">
        <u-input
          v-model="formState.smsCode"
          placeholder="请输入短信验证码"
          :placeholderStyle="placeholderStyle"
          :height="78"
          type="number"
        />
        <template #right>
          <view class="w-160rpx text-right h-78rpx fw-400 text-#2960F7 text-30rpx" @click="getCode">
            {{ codeText }}
          </view>
        </template>
      </u-form-item>
    </u-form>

    <view>手写签名板 示例</view>
    <u-popup v-model="show" mode="center">
      <view class="popup flex">
        <view class="action">
          <view class="action-bt" @click="onCancel">取消签名</view>
          <view class="action-bt" @click="empty">重新签名</view>
          <view class="action-bt action-confirm" @click="onConfirm">提交签名</view>
        </view>
        <view class="drawing-board-wrapper">
          <canvas
            :style="{
              width: drawData.width + 'px',
              height: drawData.height + 'px',
            }"
            :canvas-id="canvasId"
            :id="canvasId"
            @touchstart="canvasStart($event)"
            @touchmove="canvasMove($event)"
          ></canvas>
          <view class="sign">签名区</view>
        </view>

        <!-- <DrawingBoard ref="board" v-if="show" :options="options"></DrawingBoard> -->
      </view>
    </u-popup>
    <dmc-fixed width="582rpx" @click="openBoard">打开签名板</dmc-fixed>
  </view>
</template>

<script setup lang="ts">
  import { onReady } from "@dcloudio/uni-app";
  import { getCurrentInstance, reactive, ref } from "vue";
  import { getCaptcha } from "/@/api/user/user";
  import useCode from "/@/hooks/useCode";
  import useDrawingBoard from "/@/hooks/useDrawingBoard";
  import useInput from "/@/hooks/useInput";
  import { phoneValidator } from "/@/utils/util/regular";
  const { proxy } = getCurrentInstance() as any;
  const placeholderStyle = `color: #CCCCCC;fontWeight: 400;font-size: 30rpx;`;
  const rules = {
    phone: [
      { required: true, message: "请输入手机号", trigger: ["blur"] },
      {
        // 自定义验证函数
        validator: phoneValidator,
        message: "手机号码不正确",
        // 触发器可以同时用blur和change
        trigger: ["blur"],
      },
    ],
    smsCode: [{ required: true, message: "请输入短信验证码", trigger: ["blur"] }],
  };
  interface FormParams {
    phone: string;
    smsCode: string;
  }

  const formState = reactive({
    smsCode: "",
    phone: "",
  });
  function toExample() {
    uni.navigateTo({
      url: "/pages/example/index",
    });
  }

  // 获取验证码的
  const { codeText, getCode } = useCode<FormParams>(getCaptcha, formState, "phone");

  // 输入框input事件校验
  const { inputPhone } = useInput(formState);

  // 手写签名板
  const { canvasId, drawData, canvasStart, canvasMove, empty, toImage } = useDrawingBoard("board");
  const show = ref(false);
  function openBoard() {
    show.value = true;
  }
  function onCancel() {
    show.value = false;
  }
  async function onConfirm() {
    if (drawData.strokes.length < 1 || (drawData.strokes.length === 1 && drawData.strokes[0].length < 50)) {
      uni.showToast({
        title: "请先签名",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    uni.showLoading({ title: "加载中" });
    const tempFilePath = await toImage();
    console.log(tempFilePath);
    uni.hideLoading();
  }

  onReady(() => {
    proxy.$refs["uForm"].setRules(rules);
  });
</script>

<style lang="scss" scoped>
  .home-wrapper {
    .action {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      writing-mode: sideways-lr;
      height: 100vh;
      background: rgba(41, 96, 247, 0.1);
      width: 120rpx;
      .action-bt {
        width: 320rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: #ffffff;
        border-radius: 10rpx;
        font-size: 32rpx;
        font-weight: 400;
        color: #2960f7;
        transform: rotate(90deg) translateY(260rpx);
        transform-origin: right;
        margin-top: 260rpx;
      }
      .action-confirm {
        color: #ffffff;
        background: #2960f7;
      }
    }
    .drawing-board-wrapper {
      position: relative;
    }
    .sign {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%) rotate(90deg);
      font-size: 80rpx;
      font-weight: 500;
      color: #2960f7;
      opacity: 0.1;
    }
  }
</style>
<style lang="scss">
  page {
    background-color: $u-bg-color;
  }
</style>
