<template>

	<view>
		<uv-divider text="医生信息"></uv-divider>
		<uv-skeletons :loading="loading" :skeleton="skeleton">
			<view class="uv-skeletons__row uv-skeletons__row1">
				<view class="uv-skeletons__row1--left">
					<image class="img" src="/static/ZhangJie.jpg"></image>
				</view>
				<view class="uv-skeletons__row1--right">
					<uv-text :text="'医生姓名:'+ doctor.realName"></uv-text>
					<uv-text v-if="doctor.sex == 0" text="性别:男"></uv-text>
					<uv-text v-else-if="doctor.sex == 1" text="性别:女"></uv-text>
					<uv-text :text="'电话:'+ doctor.mobile" lines="1"></uv-text>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</uv-skeletons>
		<uv-divider text="排班信息"></uv-divider>
		<view class="h-table h-table-primary">
			<view class="h-tr h-tr-2 h-thead">
				<view class="h-td">科室</view>
				<view class="h-td">地址</view>
				<view class="h-td">时间</view>
				<view class="h-td">号数</view>
				<view class="h-td">操作</view>
			</view>
			<view class="h-tr h-tr-2" v-for="(item,index) in shift" :key="index" >
				<view class="h-td">{{ item.dpName }}</view>
				<view class="h-td">{{ item.dAddress }}</view>
				<view class="h-td">{{ item.time }}</view>
				<view class="h-td">{{ item.count }}</view>
				<view class="h-td"><uv-button type="success" text="预约"></uv-button></view>
			</view>
		</view>
	</view>

</template>
<script>
	export default {
		onLoad() {

		},
		data() {
			return {
				loading: false,
				doctor: {
					realName: "张杰",
					sex: 0,
					mobile: "18973599823",
				},
				shift: [{
						dpName: "呼吸内一科",
						dAddress: "A-11-11",
						time: 8,
						count: 0
					},
					{
						dpName: "呼吸内一科",
						dAddress: "A-11-11",
						time: 9,
						count: 1
					},
					{
						dpName: "呼吸内一科",
						dAddress: "A-11-11",
						time: 10,
						count: 3
					},
					{
						dpName: "呼吸内一科",
						dAddress: "A-11-11",
						time: 11,
						count: 2
					},
					{
						dpName: "呼吸内一科",
						dAddress: "A-11-11",
						time: 12,
						count: 5
					}
				],
				skeleton: [{
					type: 'flex',
					num: 1,
					children: [{
						type: 'avatar',
						num: 1,
						style: 'marginRight: 10rpx;'
					}, {
						type: 'line',
						num: 3,
						gap: '30rpx',
						style: ['width: 200rpx;', null, 'width:400rpx;']
					}, {
						type: 'custom',
						num: 1,
						style: 'width: 200rpx;height:200rpx;marginLeft: 10rpx;'
					}]
				}]
			}
		},
		methods: {
			leftClick() {
				console.log('leftClick');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../lib/helang-table.scss";
	.uv-skeletons__row {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.img {
		width: 136rpx;
		height: 136rpx;
		margin: 0 60rpx 0 30rpx;
	}

	// 表单的背景色
	.color {
		background-color: #5BC648;
	}

	// 增加表单宽度
	.expand-width {
		width: 200rpx;
	}
</style>