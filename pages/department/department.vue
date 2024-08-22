<template>
	<view>
		<uv-picker ref="picker" :columns="columns" @confirm="confirm" @change="change"></uv-picker>
		<button @click="openPicker">打开</button>
		<uv-divider :text="curDepartment"></uv-divider>
		<view class="h-table h-table-primary">
			<view class="h-tr h-tr-2 h-thead">
				<view class="h-td">医生照片</view>
				<view class="h-td">医生名称</view>
				<view class="h-td">操作</view>
			</view>
			<view class="h-tr h-tr-2" v-for="(item,index) in doctorList" :key="index">
				<view class="h-td"><uv-image :src="'/static/'+item.avatar" width="80px" height="80px"></uv-image></view>
				<view class="h-td"><uv-text :text="item.realName"></uv-text></uv-image></view>
				<view class="h-td"><uv-button type="primary" text="查看" @click="goDoctorDetail(item.id)"></uv-button></uv-image></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		selAllDepartment
	} from "@/api/api/department.js"
	import {
		getDoctorList
	} from "@/api/api/doctor.js"
	export default {
		data() {
			return {
				columns: [
					['中国', '美国'],
					['深圳', '厦门', '上海', '拉萨']
				],
				columnData: [
					['深圳', '厦门', '上海', '拉萨'],
					['得州', '华盛顿', '纽约', '阿拉斯加']
				],
				curDepartment: '',
				departmentList: [],
				doctorList: []
			}
		},
		onLoad() {
			this.getDepartment();
			this.getDoctor();
		},
		methods: {
			goDoctorDetail(doctorId){
				uni.$uv.route({
					url:'/pages/doctorDetail/doctorDetail',
					params:{
						doctorId:doctorId
					}
				})
			},
			getDoctor() {
				console.log(this.curDepartment);
				let curDcId = 0;
				this.departmentList.forEach(department => {
					if (department.dcName == this.curDepartment) {
						curDcId = department.dcId;
					}
				})
				getDoctorList({
					dId: curDcId
				}).then(res => {
					this.doctorList = res.data.data;
					console.log(res.data.data);
				})
			},
			getDepartment() {
				selAllDepartment().then(res => {
					// console.log(res);
					let catgorys = res.data.data;
					this.departmentList = catgorys;
					let columns = [];
					let columnData = [];
					let dcNameList1 = [];
					let dcNameList2 = [];
					let dcIdList = {};
					catgorys.forEach(res => {
						// console.log(res);
						if (res.dcId == res.dcParentId) {
							dcNameList1.push(res.dcName);
							dcIdList[res.dcId] = [];
						} else {
							// 如果dcId和dcParentId不相等，将其添加到对应的父分类的子数组中
							if (dcIdList[res.dcParentId]) {
								dcIdList[res.dcParentId].push(res.dcName);
							} else {
								// 如果dcParentId在dcIdList中不存在，初始化该父分类的子数组
								dcIdList[res.dcParentId] = [res.dcName];
							}
						}
					})
					columns.push(dcNameList1);
					columns.push(dcIdList["1"]);
					Object.values(dcIdList).forEach(arr => {

						columnData.push(arr);
						// console.log(arr);
					})
					// console.log(dcIdList);
					// console.log(dcNameList1);
					console.log(columns);
					console.log(columnData);
					this.columns = columns;
					this.columnData = columnData;

				})
			},
			openPicker() {
				this.$refs.picker.open();
			},
			confirm(e) {
				// console.log('confirm', e.values[1][e.indexs[1]]);
				this.curDepartment = e.values[1][e.indexs[1]];
				this.getDoctor();
			},
			change(e) {
				const {
					columnIndex,
					index
				} = e
				if (columnIndex === 0) {
					this.$refs.picker.setColumnValues(1, this.columnData[index])
				}
			}
		}
	}
</script>

<style lang="scss">
	// @import "../../lib/helang-table.scss";
	@import "@/lib/helang-table.scss"
</style>