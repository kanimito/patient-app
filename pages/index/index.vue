<template>
	<view>
		<!-- 轮播图 -->
		<uv-swiper :list="list" indicator indicatorMode="line" circular></uv-swiper>
		
		<uv-gap height="20" bgColor="#fff"></uv-gap>

		<!-- 宫格布局 -->
		<uv-grid :col="2" @click="click">
			<uv-grid-item v-for="(item,index) in baseList" :key="index">
				<uv-icon :customStyle="{paddingTop:20+'rpx'}" :name="item.name" :size="22"></uv-icon>
				<text class="grid-text">{{item.title}}</text>
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
					title: '预约挂号'
				}, {
					name: 'email',
					title: '我的挂号'
				}, {
					name: 'scan',
					title: '门诊缴费'
				}, {
					name: 'list',
					title: '医生信息'
				}, {
					name: 'list',
					title: '诊断报告'
				}, {
					name: 'coupon',
					title: '病历卡'
				}
				
				]
			}
		},
		methods: {
			click(name) {
				uni.showToast({
					icon: 'none',
					title: `点击了第${name+1}个`
				})
			}
		}
	}
</script>
<style lang="scss">
	.grid-text {
		font-size: 14px;
		color: #909399;
	}
</style>