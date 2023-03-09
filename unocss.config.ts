import presetWeapp from "unocss-preset-weapp";
import { transformerAttributify, transformerClass } from "unocss-preset-weapp/transformer";

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
  ],
  shortcuts: [
    {
      "border-base": "border border-gray-500_10",
      "flex-center": "flex justify-center items-center",
      "left-translate": "left-50% -translate-x-50%",
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
};
