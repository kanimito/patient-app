<template>
	<view>
		<uv-divider text="诊断信息"></uv-divider>
		<view class="h-table h-table-primary">
			<view class="h-tr h-tr-2">
				<view class="h-td">医生姓名</view>
				<view class="h-td">{{ recipel.dname }}</view>
			</view>
			<view class="h-tr h-tr-2">
				<view class="h-td">医嘱</view>
				<view class="h-td">{{ recipel.radvice }}</view>
			</view>
		</view>
		<uv-divider text="处方信息"></uv-divider>
		<view class="h-table h-table-success">
			<view class="h-tr h-tr-2 h-thead">
				<view class="h-td">药名</view>
				<view class="h-td">数量</view>
				<view class="h-td">价格</view>
			</view>
			<view class="h-tr h-tr-2" v-for="(item,index) in drugOrder" :key="index">
				<view class="h-td">{{ item.drugName }}</view>
				<view class="h-td">{{ item.drugsQuantity + item.drugUnit }}</view>
				<view class="h-td">{{ item.dodCost }}元</view>

			</view>
		</view>
		<uv-text align="center" size="40" :text="'总价格为:'+totalCost"></uv-text>
		<view v-if="orderStatus==0"><uv-button type="success" @click="payDrugs()" text="支付"></uv-button></view>
		<view v-else-if="orderStatus==1"><uv-text align="center" size="30" text="已支付"></uv-text></view>
	</view>
</template>

<script>
	import {
		getDrugOrder,updateOrderStatus
	} from "@/api/api/drug.js"
	import {
		alipay
	} from "@/api/api/pay.js"
	export default {
		onLoad(o) {
			console.log(JSON.parse(decodeURIComponent(o.recipel)));
			this.recipel = JSON.parse(decodeURIComponent(o.recipel));
			this.getDrugOrder();
			var EnvUtils = plus.android.importClass("com.alipay.sdk.app.EnvUtils");
			EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
		},
		data() {
			return {
				recipel: {},
				drugOrder: [],
				totalCost: 0,
				orderStatus: -1,
				doId:-1
			}
		},
		methods: {
			getDrugOrder() {
				let _this = this;
				getDrugOrder({
					rid: _this.recipel.rid
				}).then(res => {
					_this.drugOrder = res.data.data;
					console.log(_this.drugOrder);
					_this.drugOrder.forEach((item) => {
						_this.totalCost = item.doCost;
						_this.orderStatus = item.doStatus;
						_this.doId = item.doId;
					})
				})
			},
			payDrugs() {
				const date = new Date();
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				const seconds = String(date.getSeconds()).padStart(2, '0');
				const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
				console.log(parseFloat(this.totalCost)+'');
				let _this = this;
				uni.getProvider({
					service: "payment",
					success(res) {
						console.log(res.provider[0]);
						alipay({
							out_trade_no: formattedDate,
							total_amount: _this.totalCost,
							subject: '处方付费',
							status: 1
						}).then((data) => {
							console.log(data.data.data);
							uni.requestPayment({
								provider: res.provider[0],
								orderInfo: data.data.data,
								success(payRes) {
									console.log(payRes);
									updateOrderStatus(
										{
											doId:_this.doId
										}
									).then(result=>{
										console.log(result);
										this.getDrugOrder();
									})
								}
							})
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../lib/helang-table.scss";
</style>