<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png" /> -->
		<view class="text-area">
			<view class="title">{{ title }}</view>
			<view class="title">{{ count }}</view>
			<view class="title">{{ useApp.getCount }}</view>
			<view class="add" @click="onClick">
				添加
			</view>
		</view>
		<view class="text-area">
			<view class="title-sass">使用全局的css变量-sass</view>
		</view>

	</view>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia'
	import { ref } from 'vue'
	import { useAppStore } from "/@/store/modules/app";
	const title = ref('Hello Uni App')
	const useApp = useAppStore();
	const { count } = storeToRefs(useApp);
	const env =
		import.meta.env
	console.log("env", env)

	function onClick() {
		useApp.setCount(useApp.count + 1)
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		font-size: 36rpx;
	}

	.title {
		color: #000000;
	}

	.title-sass {
		color: $uni-color-error;
	}
</style>
