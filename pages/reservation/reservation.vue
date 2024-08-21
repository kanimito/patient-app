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
				registrationFee: 0.1
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
			toPay() {
				var date = new Date();
				console.log(date);
				uni.getProvider({
					service: 'payment',
					success(res) {
						console.log(res);
						uni.request({
							url:'http://192.168.43.214:8083/alipay/pay',
							method:'GET',
							data:{
								out_trade_no:'70501111111S00111119',
								total_amount:'9.00',
								subject:'大乐透'
							},
							success(data) {
								// console.log(data.data.data);
								uni.requestPayment({
									provider:res.provider[0],
									orderInfo:data.data.data,
									success(payRes) {
										 console.log('success:' + JSON.stringify(payRes));
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