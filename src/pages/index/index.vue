<template>
	<view class="content">
		<image class="logo" src="/static/logo.png" />
		<view class="text-area">
			<text class="title">{{ title }}</text>
			<text class="title">{{ count }}</text>
		</view>
		<view class="add" @click="onClick">
			添加
		</view>
	</view>
</template>

<script setup lang="ts">
	import {storeToRefs} from 'pinia'
	import {
		ref
	} from 'vue'
	import {
		useAppStore
	} from "/@/store/modules/app";
	const title = ref('Hello Uni App')
	const appStore = useAppStore();
	const {count} = storeToRefs(appStore);
	
		
	function onClick(){
		// appStore.setCount(count+1)
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
