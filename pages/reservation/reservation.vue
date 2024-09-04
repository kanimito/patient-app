<template>
	<view class="content">
		<uv-image :src="'/static/' + doctor.avatar" width="80px" height="80px"></uv-image>
		<text>{{ doctor.realName }}</text>
		<text>{{ doctor.mobile }}</text>
		<text>{{ shift.dpName }}</text>
		<text>{{ shift.dAddress }}</text>
		<uv-button type="primary" @click="toPay()" :text="'挂号请支付'+registrationFee+'元'"></uv-button>
		<uv-toast ref="toast"></uv-toast>
	</view>
</template>

<script>
	import {
		alipay
	} from "@/api/api/pay.js"
	import {
		insertRegistration,
		isIn
	} from "@/api/api/registration.js"
	export default {
		data() {
			return {
				title: 'Hello',
				doctor: {},
				shift: {},
				registrationFee: 0.1,
				register: {
					shiftId: 0,
					shiftTimeId: 0
				}
			}
		},
		onLoad(o) {
			this.doctor = JSON.parse(decodeURIComponent(o.doctor));
			console.log(this.doctor);
			this.shift = JSON.parse(decodeURIComponent(o.shift));
			var EnvUtils = plus.android.importClass("com.alipay.sdk.app.EnvUtils");
			EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);

		},
		methods: {
			dateFormat() {

			},
			isIn() {

			},
			toPay() {
				let _this = this;
				_this.register.shiftTimeId = _this.shift.shiftTimeId;
				_this.register.shiftId = _this.shift.shiftId;
				isIn().then(res => {
					console.log(res);
					if (res.data.code == 0) {
						const date = new Date();
						const year = date.getFullYear();
						const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
						const day = String(date.getDate()).padStart(2, '0');
						const hours = String(date.getHours()).padStart(2, '0');
						const minutes = String(date.getMinutes()).padStart(2, '0');
						const seconds = String(date.getSeconds()).padStart(2, '0');
						const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
						console.log(date);
						uni.getProvider({
							service: 'payment',
							success(res) {
								console.log(res);
								alipay({
									out_trade_no: formattedDate,
									total_amount: '9.00',
									subject: '挂号',
									status:0
								}).then(data => {
									uni.requestPayment({
										provider: res.provider[0],
										orderInfo: data.data.data,
										success(payRes) {
											console.log(payRes);

											console.log(_this.register);
											insertRegistration(_this.register).then(
												res => {
													console.log(res);
													uni.$uv.route({
														type:"switchTab",
														url: "/pages/index/index"
													})
												})
										}
									})
								})
							}
						})
					} else {
						console.log(res.data.data);
						this.$refs.toast.show({
							type: 'error',
							icon: false,
							title: '失败主题',
							message: "您已预约过",
							complete() {
							}
						})
					}
				})


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