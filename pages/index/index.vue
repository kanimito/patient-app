<template>
	<!-- <view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view> -->
	<view style="height: 1000px;">
			<uv-drop-down
				ref="dropDown"
				sign="dropDown_1" 
				:defaultValue="[0,'0','all']" 
			>
				<uv-drop-down-item 
					name="order" 
					type="2" 
					label="综合排序" 
					value="all">
				</uv-drop-down-item>
				<uv-drop-down-item 
					name="type" 
					type="2" 
					label="文档格式" 
					value="0">
				</uv-drop-down-item>
				<uv-drop-down-item 
					name="vip_type" 
					type="1" 
					label='VIP文档'
					:value="0">
				</uv-drop-down-item>
			</uv-drop-down>
			<uv-drop-down-popup
				sign="dropDown_1"
				@popupChange="change"
			>
				<view style="width: 750rpx;height: 300rpx;background-color: #fff;"></view>
			</uv-drop-down-popup>
		</view>
</template>

<script>
	// export default {
	// 	data() {
	// 		return {
	// 			title: 'Hello'
	// 		}
	// 	},
	// 	onLoad() {

	// 	},
	// 	methods: {

	// 	}
	// }
	export default {
			onPageScroll() {
				// 滚动后及时更新位置
				this.$refs.dropDown.init();
			},
			methods: {
				change(e){
					console.log('弹窗打开状态：',e);
				}
			}
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
