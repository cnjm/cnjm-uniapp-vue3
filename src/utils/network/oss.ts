import { getAppEnvConfig } from "/@/utils/util/env";
import { randomWord } from "/@/utils/internal/random";
import { Base64 } from "js-base64";
import Crypto from "crypto-js";
import { OssPathEnum } from "/@/enums/app.enum";

interface Sts {
  accessKeyId: string;
  accessKeySecret: string;
  securityToken: string;
}

const { VITE_GLOB_BUCKET_NAME } = getAppEnvConfig();

const STS_URL = `https://test.com/aliyun/acs/token?bucketName=${VITE_GLOB_BUCKET_NAME}`;
const URL = `https://${VITE_GLOB_BUCKET_NAME}.oss-cn-beijing.aliyuncs.com`;

/**
 * @description 接口获取OSS临时密钥
 */
export const stsApi = async (): Promise<Sts> => {
  return await new Promise((resolve, reject) => {
    uni.request({
      url: STS_URL,
      header: { "X-APP-KEY": "56fd49ea-7f14-4341-a384-882dba673ed6" },
      method: "GET",
      success: (res) => {
        const { code, payload, message } = res.data as any;
        if (code !== 200) {
          reject(message || "服务器异常");
          return;
        }
        resolve(payload);
      },
      fail(err) {
        uni.showToast({
          title: "网络请求错误",
          icon: "none",
          duration: 2000,
        });
        reject(new Error(err.errMsg));
      },
    });
  });
};

// 计算签名。
function computeSignature(accessKeySecret, canonicalString) {
  return Crypto.enc.Base64.stringify(Crypto.HmacSHA1(canonicalString, accessKeySecret));
}

function computePolicy() {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  const policyText = {
    expiration: date.toISOString(), // 设置policy过期时间。
    conditions: [
      // 限制上传大小。
      ["content-length-range", 0, 1024 * 1024 * 1024],
    ],
  };
  return Base64.encode(JSON.stringify(policyText));
}

export const ossUpload = async ({
  filePath,
  dirPath = OssPathEnum.DEFAULT,
}: {
  filePath: string;
  dirPath: OssPathEnum;
}): Promise<string> => {
  const credentials = await stsApi();
  const policy = computePolicy(); // policy必须为base64的string。
  const signature = computeSignature(credentials.accessKeySecret, policy);
  const key = `${dirPath}${randomWord(6)}_${Date.now()}.${filePath.substring(filePath.lastIndexOf(".") + 1)}`;
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: URL, //开发者服务器 url
      filePath, //要上传文件资源的路径
      name: "file", //必须填file
      formData: {
        key,
        policy,
        OSSAccessKeyId: credentials.accessKeyId,
        signature,
        "x-oss-security-token": credentials.securityToken,
        success_action_status: "200",
      },
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(`${URL}/${key}`);
          return;
        }
        reject("文件上传失败");
      },
      fail: function () {
        reject("文件上传失败");
      },
    });
  });
};
