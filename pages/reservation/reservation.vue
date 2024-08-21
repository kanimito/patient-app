<template>
	<view class="content">
		<uv-image :src="'/static/' + doctor.avatar" width="80px" height="80px"></uv-image>
		<text>{{ doctor.realName }}</text>
		<text>{{ doctor.mobile }}</text>
		<text>{{ shift.dpName }}</text>
		<text>{{ shift.dAddress }}</text>
		<uv-button type="primary" @click="toPay()" :text="'挂号请支付'+registrationFee+'元'"></uv-button>
	</view>
</template>

<script>
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
			dateFormat(){
				
			},
			toPay() {
				let _this = this;
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
						uni.request({
							url: 'http://u4taww.natappfree.cc/alipay/pay',
							method: 'GET',
							data: {
								out_trade_no: formattedDate,
								total_amount: '9.00',
								subject: '挂号'
							},
							success(data) {
								// console.log(data.data.data);
								uni.requestPayment({
									provider: res.provider[0],
									orderInfo: data.data.data,
									success(payRes) {
										console.log(payRes);
										_this.register.shiftTimeId = _this.shift.shiftTimeId;
										_this.register.shiftId= _this.shift.shiftId;
										console.log(_this.register);
										uni.request({
											url:"http://u4taww.natappfree.cc/alipay/pay"
										})
									}
								})
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