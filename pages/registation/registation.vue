<template>
	<view>
		<uv-datetime-picker ref="datetimePicker" v-model="value" mode="date" @confirm="confirm">
		</uv-datetime-picker>
		<button @click="open">选择时间</button>
		<uv-text align="center" size="30" type="info" text="我的挂号"></uv-text>
		<uv-list>
			<uv-list-item border v-for="(item,key) in registations" :key="key"
				:note="item.rgCreatetime | timestampToTime" @click="handleClick(item, key)"
				:title="'病人:'+item.pname +' 科室:'+ item.dpName  +' 地址:'+ item.daddress"></uv-list-item>
		</uv-list>
	</view>
</template>

<script>
	import {
		selRegister
	} from "@/api/api/registration.js"
	export default {
		data() {
			return {
				value: Number(new Date()),
				curDate: new Date().getTime(),
				selDate: '',
				registations: []
			}
		},
		onLoad() {
			this.getRegistations();
		},
		filters: {
			timestampToTime(timestamp) {
				let date = new Date(timestamp); // 根据时间戳创建一个Date对象
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1).toString().padStart(2, '0') + '-';
				let D = date.getDate().toString().padStart(2, '0') + ' ';
				let h = date.getHours().toString().padStart(2, '0') + ':';
				console.log(h);
				let m = date.getMinutes().toString().padStart(2, '0') + ':';
				console.log(m);
				let s = date.getSeconds().toString().padStart(2, '0');
				console.log(s);
				return Y + M + D + h + m + s;
			}
		},
		methods: {
			handleClick(item, key) {

			},
			getRegistations() {
				let _this = this;
				selRegister({
					selDate: _this.selDate
				}).then(res => {
					console.log(res);
					_this.registations = res.data.data;
				})
			},
			timestampToTime(timestamp) {
				let date = new Date(timestamp); // 根据时间戳创建一个Date对象
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1).toString().padStart(2, '0') + '-';
				let D = date.getDate().toString().padStart(2, '0');
				this.selDate = Y + M + D;
			},
			open() {
				this.$refs.datetimePicker.open();
			},
			confirm(e) {
				this.timestampToTime(e.value)
				console.log(e);
				console.log('confirm' + this.selDate);
				this.getRegistations();
			}
		}
	}
</script>

<style>

</style>