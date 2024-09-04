<template>
	<view>
		<!-- 病历 -->
		<!-- 		<view v-for="patient in patients" :key="patient.id" class="card">
			<uv-text class="name">{{ patient.name }}</text>
				<text class="age">Age: {{ patient.age }}</text>
				<text class="diagnosis">Diagnosis: {{ patient.diagnosis }}</text>
				<uv-text class="name">{{ patient.name }}</uv-text>
				<uv-text class="age">Age: {{ patient.age }}</uv-text>
				<uv-text class="diagnosis">Diagnosis: {{ patient.diagnosis }}</uv-text>
		</view> -->

		<!-- <view class="from"> -->
		<!-- 			<uv-list>
				<uv-list-item>
					<uv-line>
						<uv-text :text="patients.pAge">
						</uv-text>
					</uv-line>
				</uv-list-item>
			</uv-list -->
		<!-- </view> -->
		<uv-list>
			<uv-list-item showArrow 
			:title="patients.pname" 
			:note="patients.pPatientId"
			thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
			thumb-size="lg" 
			:rightText="patients.psex" 
			link="navigateTo" 
			to="/pages/personaldate/personaldate">
			</uv-list-item>
		</uv-list>
	</view>
</template>

<script>
	import {
		recipel
	} from '@/api/api/patientCard.js'
	export default {
		data() {
			return {
				patients: {
					pname: '',
					page: '',
					psex: '',
					pPatientId: '',
				} // 存储病人信息的数组
			}
		},

		onLoad() {
			let _this = this;
			this.token = uni.getStorageSync('token');
			console.log(this.token);

			// 通过 post 传递用户 token 到后端查询用户基本信息
			recipel(_this.token)
				.then(data => {
					console.log(data);
					console.log(data.data.data);
					// 根据返回的数据更新 patients
					_this.patients.pname = data.data.data.pname;
					_this.patients.page = data.data.data.page;
					_this.patients.ppatientId = data.data.data.pPatientId;
					_this.patients.psex = data.data.data.psex;
				})
				.catch(errors => {
					console.error("请求失败：", errors);
				});
		},

		methods: {
		},
		mounted() {
		}
	}
</script>

<style>
	.card {
		padding: 10px;
		margin: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background-color: #f9f9f9;
	}

	.name {
		font-size: 18px;
		font-weight: bold;
	}

	.age,
	.diagnosis {
		margin-top: 5px;
	}
</style>