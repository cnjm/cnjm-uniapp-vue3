<template>
  <view @click="onChooseImage">
    <slot name="content">
      <view class="upload">
        <view class="w-36rpx h-36rpx mb-8rpx">
          <dmc-image src="/static/icon/add-image.png" mode="aspectFit" />
        </view>
        <view class="text">上传图片</view>
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
  // import { computed } from "vue";
  // import { useAppStore } from "/@/store/modules/app";
  // const useApp = useAppStore();
  import { OssPathEnum } from "/@/enums/app.enum";
  import { ossUpload } from "/@/utils/network/oss";

  type StatusType = "success" | "fail";
  interface UploadPaths {
    size: number;
    path: string;
    status: StatusType;
  }

  const emit = defineEmits(["chooseSuccess", "chooseFail", "uploaded"]);

  const props = defineProps({
    count: {
      type: Number,
      default: 9,
      required: false,
    },
    sizeType: {
      type: Array,
      default: () => ["original", "compressed"],
      required: false,
    },
    // ['album', 'compressed']
    sourceType: {
      type: Array<string>,
      default: () => ["album"],
      required: false,
    },
    // 自动上传
    auto: {
      type: Boolean,
      default: true,
      required: false,
    },
    // 上传文件路劲
    dirPath: {
      type: String,
      default: OssPathEnum.DEFAULT,
      required: false,
    },
  });

  function onChooseImage() {
    uni.chooseImage({
      count: props.count,
      sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
      sourceType: props.sourceType, //从相册选择
      success: function (res) {
        const data = {
          files: res.tempFiles,
          filePaths: res.tempFilePaths,
        };
        emit("chooseSuccess", data);
        if (props.auto) {
          uploadImage(data);
        }
      },
      fail: function (err) {
        emit("chooseFail", err);
        uni.showToast({
          title: "图片选择失败",
          icon: "none",
        });
      },
    });
  }

  async function uploadImage(data: ChooseFile) {
    const files = data.files as UniApp.ChooseImageSuccessCallbackResultFile[];
    let paths: UploadPaths[] = [];
    uni.showToast({
      title: "上传中",
      icon: "loading",
      mask: true,
    });
    let num = 0;
    for (let i = 0; i < files.length; i++) {
      if (i >= props.count) {
        break;
      }
      num++;
      let url = "";
      let status: StatusType = "fail";
      try {
        url = await ossUpload({ filePath: files[i].path, dirPath: props.dirPath as OssPathEnum });
        status = "success";
      } catch (error) {}
      paths.push({ size: files[i].size, path: url, status });
    }
    num && emit("uploaded", paths);
    uni.hideToast();
  }
</script>

<style lang="scss" scoped>
  .upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 146rpx;
    height: 110rpx;
    background: #fdfdfd;
    border-radius: 8rpx;
    border: 2rpx dashed #e6e6e6;
    .text {
      font-size: 20rpx;
      font-weight: 400;
      color: #cccccc;
    }
  }
</style>
