<template>
  <view class="example-wrapper">
    <text>{{ title }}</text>
    <button @click="toRouter">跳转</button>
    <input v-model="count" />
    <view class="w-100">计算属性双倍：{{ doubleCount }}</view>
    <view bg="#333" h200 class="bg-red">pinia getters双倍：{{ getCount }}</view>
    <view>{{ useExample.count }}</view>
    <button @click="handelAdd">增加</button>
    <button @click="handelRequest">mock请求</button>
    <u-button type="primary">主要按钮</u-button>
    <view class="page-section page-section-gap">
      <!-- <map
        style="width: 100%; height: 300px"
        :latitude="latitude"
        :longitude="longitude"
        :markers="covers"
      >
      </map> -->
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, watchEffect } from "vue";
  import { onShow, onHide, onLoad } from "@dcloudio/uni-app";
  import { storeToRefs } from "pinia";
  import { useExampleStore } from "/@/store/modules/example";
  // import { addExample } from "../../api/demo/store";

  const title = ref("一段文字");
  // const latitude = ref(39.909);
  // const longitude = ref(116.39742);

  // const covers = reactive([
  //   {
  //     latitude: 39.909,
  //     longitude: 116.39742,
  //   },
  //   {
  //     latitude: 39.9,
  //     longitude: 116.39,
  //   },
  // ]);
  const obj = reactive({ a: "1", b: 1 });

  // pinia
  const useExample = useExampleStore();
  const { count, getCount } = storeToRefs(useExample);

  // 修改方式1
  // useExample.count++;
  // useExample.count = useExample.count + 1;

  // 修改方式2
  // useExample.$patch({ count: 999 });

  // 修改方式3
  // useExample.$patch((state) => {
  //   // 增加处理逻辑
  //   let count = useExample.count;
  //   count = count * 2 > 5 ? count * 2 : count;
  //   state.count = count;
  // });

  // 修改方式4
  // useExample.setCount(count.value + 1);

  // 计算属性只读
  const doubleCount = computed(() => {
    return count.value * 2;
  });
  // 计算属性读写
  // let readingWriting = computed({
  //   get: () => {
  //     return title.value;
  //   },
  //   set: (value: string) => {
  //     title.value = value;
  //   },
  // });
  // readingWriting.value = "title 已修改";

  // watch
  // 单个监听
  watch(
    count,
    (newVal, oldVal) => {
      console.log(`count从${oldVal}修改为${newVal}`);
    },
    {
      immediate: false, //是否立即调用一次
      deep: false, //是否开启深度监听
    },
  );
  // 监听多个
  watch([count, title], (newVal, oldVal) => {
    console.log("也是数组了", newVal, oldVal);
  });
  // 监听reactive
  watch(obj, (newVal, oldVal) => {
    console.log("默认深度监听", newVal, oldVal);
  });
  // 监听reactive下的 某个值
  watch(
    () => obj.b,
    (newVal, oldVal) => {
      console.log("b：", newVal, oldVal);
    },
  );
  obj.b = 55;

  const stop = watchEffect(
    (onInvalidate) => {
      console.log(title.value, count.value);
      console.log("title or count 发生了改变");
      onInvalidate(() => {
        console.log("before");
      });
    },
    {
      // flush: "post",// 类似this.$nextTick() pre：默认值，在组件更新前执行；post：在组件更新后执行；sync： 强制效果始终同步触发；
      // 调试可用、computed同
      onTrack(e) {
        console.log(e);
        // debugger
      },
      onTrigger() {
        // debugger
      },
    },
  );

  // 双向绑定
  function handelAdd() {
    useExample.setCount(count.value + 1);
    stop();
  }

  // 页面跳转
  function toRouter() {
    // 在起始页面跳转到test.vue页面，并监听test.vue发送过来的事件数据
    uni.navigateTo({
      url: "/pages/example/router/index",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data);
        },
        someEvent: function (data) {
          console.log(data);
        },
      },
    });
  }

  async function handelRequest() {
    uni.chooseLocation({
      success: function (res) {
        console.log("位置名称：" + res.name);
        console.log("详细地址：" + res.address);
        console.log("纬度：" + res.latitude);
        console.log("经度：" + res.longitude);
      },
      fail: function (err) {
        console.log(err);
      },
    });
    // addExample({ account: "admin", password: "12345" });
  }

  // 页面加载
  onLoad((options) => {
    console.log("页面加载，参数：", options);
  });
  // 页面展示
  onShow(() => {
    console.log("页面展示");
  });
  // 页面隐藏
  onHide(() => {
    console.log("页面隐藏");
  });
</script>

<style lang="scss" scoped></style>
