<template>
<<<<<<< HEAD
	<view>
		<uv-toast ref="toast"></uv-toast>
		<!-- 轮播图 -->
		<uv-swiper :list="list" indicator indicatorMode="line" circular></uv-swiper>

		<uv-gap height="20" bgColor="#fff"></uv-gap>

		<!-- 宫格布局 -->
		<uv-grid :col="2" @click="click">
			<uv-grid-item v-for="(item,index) in baseList" :key="index">
				<uv-icon :customStyle="{paddingTop:20+'rpx'}" :name="item.name" :size="22"></uv-icon>
				<text class="grid-text">{{ item.title }}</text>
			</uv-grid-item>
		</uv-grid>
		<uv-gap height="20" bgColor="#fff"></uv-gap>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图图片
				list: [
					'https://ts1.cn.mm.bing.net/th?id=OIP-C.mH9YLFEL5YdVxJM82mjVJQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2',
					'https://ts2.cn.mm.bing.net/th?id=OIP-C.VzhOTC3SVqdVV48AhF5grwHaFS&w=295&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2'
				],
				baseList: [{
						name: 'star',
						title: '预约挂号',
						path: '/pages/test/test'
					}, {
						name: 'email',
						title: '我的挂号'
					}, {
						name: 'list',
						title: '诊断报告'
					}, {
						name: 'coupon',
						title: '病历卡',
						path: '/pages/patientCard/patientCard'
					}]
			}
		},


		methods: {
			click(index) {
				const item = this.baseList[index];
				console.log(item);
				console.log(item.path);
				if (!item.path) {
					uni.showToast({
						icon: 'none',
						title: `点击了第${index + 1}个`
					});
					return;
				}

				let isLogin = uni.getStorageSync('token');
				console.log(isLogin);
				if (!isLogin) {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					});
					uni.redirectTo({
						url: '/pages/login/login'
					});
				} else {
					console.log('去病历卡实现了');
					uni.navigateTo({
						url: item.path
					});
				}
			}

		},
	}
</script>
<style lang="scss">
	.grid-text {
		font-size: 14px;
		color: #909399;
	}
</style>
=======
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
>>>>>>> b48180b85b63805bf44c51613ced96d8031d9c3b
