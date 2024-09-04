<template>
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
						path: '/pages/department/department'
					}, {
						name: 'email',
						title: '我的挂号',
						path:'/pages/registation/registation'
					}, {
						name: 'list',
						title: '诊断报告',
						path:'/pages/recipel/recipel'
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