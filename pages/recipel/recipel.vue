<template>
	<view>
		<uv-datetime-picker ref="datetimePicker" v-model="value" mode="date" @confirm="confirm">
		</uv-datetime-picker>
		<button @click="open">选择时间</button>
		<uv-text align="center" size="30" type="info" text="诊断信息"></uv-text>
		<view class="h-table h-table-primary">
			<view class="h-tr h-tr-2 h-thead">
				<view class="h-td">编号</view>
				<view class="h-td">医生</view>
				<view class="h-td">时间</view>
				<view class="h-td">操作</view>
			</view>
			<view class="h-tr h-tr-2" v-for="(item,index) in recipels" :key="index">
				<view class="h-td">{{ item.rgNum }}</view>
				<view class="h-td">{{ item.dname }}</view>
				<view class="h-td">{{ item.createTime | timeFormat }}</view>
				<view class="h-td"><uv-button type="success" @click="goRecipelDetail(item)" text="查看"></uv-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getRecipel
	} from "@/api/api/recipel.js"
	export default {
		data() {
			return {
				value: Number(new Date()),
				curDate: new Date().getTime(),
				selDate: '',
				recipels: []
			};
		},
		onLoad() {
			// this.timestampToTime(this.curDate);
			this.getRecipel();
		},
		filters: {
			timeFormat(timestamp) {
				let date = new Date(timestamp); // 根据时间戳创建一个Date对象
				let h = date.getHours().toString().padStart(2, '0') + ':';
				let m = date.getMinutes().toString().padStart(2, '0') + ':';
				let s = date.getSeconds().toString().padStart(2, '0');
				return h + m + s;
			}

		},
		methods: {
			timestampToTime(timestamp) {
				let date = new Date(timestamp); // 根据时间戳创建一个Date对象
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1).toString().padStart(2, '0') + '-';
				let D = date.getDate().toString().padStart(2, '0');
				this.selDate = Y + M + D;
			},
			getRecipel() {

				var _this = this;
				getRecipel({
					selDate: this.selDate
				}).then(res => {
					console.log(res);
					_this.recipels = res.data.data;
				})
			},
			goRecipelDetail(item) {
				uni.$uv.route({
					url: "/pages/recipelDetail/recipelDetail",
					params: {
						recipel: encodeURIComponent(JSON.stringify(item))
					}
				})
			},
			open() {
				this.$refs.datetimePicker.open();
			},
			confirm(e) {
				this.timestampToTime(e.value)
				console.log(e);
				console.log('confirm' + this.selDate);
				this.getRecipel();
			}
		}
	}
</script>

<style lang="scss">
	@import "../../lib/helang-table.scss";
</style>