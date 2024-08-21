<template>
	<view>

	</view>
</template>

<script>
	
	export default {
		onLoad(o) {
			this.totalAmount = o.totalAmount
			var EnvUtils = plus.android.importClass("com.alipay.sdk.app.EnvUtils");
			EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
		},
		data() {
			return {
				orderId: 2,
				subject: "挂号",
				totalAmount: 0
			}
		},
		methods: {
			
		}
	}
</script>


<style lang="scss">

</style>