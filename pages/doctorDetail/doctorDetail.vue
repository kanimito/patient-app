<template>

	<view>
		<uv-divider text="医生信息"></uv-divider>
		<uv-skeletons :loading="loading" :skeleton="skeleton">
			<view class="uv-skeletons__row uv-skeletons__row1">
				<view class="uv-skeletons__row1--left">
					<image class="img" :src="'/static/'+doctor.avatar"></image>
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
			<view class="h-tr h-tr-2" v-for="(item,index) in shift" :key="index">
				<view class="h-td">{{ item.dpName }}</view>
				<view class="h-td">{{ item.daddress }}</view>
				<view class="h-td">{{ item.time }}:00</view>
				<view class="h-td">{{ item.count }}</view>
				<view class="h-td"><uv-button type="success" @click="goReservation(item)" text="预约"></uv-button></view>
			</view>
		</view>
		<uv-toast ref="toast"></uv-toast>
	</view>


</template>
<script>
	import {
		getDoctor
	} from "@/api/api/doctor.js"
	import {
		getShiftTimeList
	} from "@/api/api/shift.js"
	export default {
		onLoad() {

		},
		data() {
			return {
				doctorId: 0,
				toast: {
					type: "error",
					message: "预约失败，已经没号了"
				},
				loading: true,
				doctor: {
					// avatar:"ZhangJie.jpg",
					// realName: "张杰",
					// sex: 0,
					// mobile: "18973599823",
				},
				selDate: '',
				shift: [],
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
		onLaunch() {


		},
		onInit() {},
		onLoad(o) {
			this.doctorId = o.doctorId;
			this.selDate = '2024-02-23';
			this.getDoctorInfo();
			this.getShiftTimeList();
		},
		methods: {
			leftClick() {
				console.log('leftClick');
			},
			getDoctorInfo() {
				var _this = this;
				getDoctor({
					doctorId: _this.doctorId
				}).then((res) => {
					console.log(res);
					_this.doctor = res.data.data;
				})
			},
			getShiftTimeList() {
				var _this = this;
				getShiftTimeList({
					doctorId: _this.doctorId,
					selDate: _this.selDate
				}).then(res => {
					console.log(res);
					_this.shift = res.data.data
					_this.loading = false;
				})
			},
			goReservation(item) {
				if (item.count > 0) {
					uni.$uv.route({
						url: "/pages/reservation/reservation",
						params: {
							shift: encodeURIComponent(JSON.stringify(item)),
							doctor: encodeURIComponent(JSON.stringify(this.doctor))
						}
					})
				} else {
					this.showToast(this.toast)
				}

			},
			showToast(params) {
				this.$refs.toast.show({
					...params
				})
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

	.item {
		margin: 10rpx 0;
		padding: 10rpx;
		text-align: center;
		background: #f1f1f1;
		font-size: 28rpx;
		color: #666;
	}
</style>