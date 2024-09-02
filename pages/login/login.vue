<template>
	<view style="padding: 50% 5% 50% 5%;">
		<uv-form labelPosition="left" :model="userInfo" :rules="rules" ref="form">
			<uv-form-item label="用户名:" prop="username">
				<uv-input placeholder="请输入内容" v-model="userInfo.username" border="surround" clearable>
				</uv-input>
			</uv-form-item>
			<uv-form-item label="密 码:" prop="password">
				<uv-input type="password" placeholder="请输入密码" v-model="userInfo.password" border="surround"
					clearable>
				</uv-input>
			</uv-form-item>
			<uv-button type="primary" text="登录" customStyle="margin-top: 10px" @click="submit"></uv-button>
			<view style="margin: 15px 15% 100% 0;">
				<navigator style="color: blue;" url="/pages/register/register">还没有账号，去注册！</navigator>
			</view>
		</uv-form>
	</view>
</template>
<script>
	import { userLogin } from "@/api/api/login"
	export default {
		data() {
			return {
				
				userInfo: {
					username: '',
					password: '',
				},
				rules: {
					'username': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'password': {
						type: 'string',
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}

				},
				radio: '',
				switchVal: false
			}
		},
		methods: {
			// 提交
			submit() {
				let _this = this;
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					console.log(res);
					uni.showToast({
						icon: 'success',
						title: '校验通过',
					})
					userLogin(_this.userInfo).then(res =>{
						console.log(res);
						if(res.data.code == 0){
							uni.setStorageSync('token',res.data.data)
							uni.setStorageSync('myInfo',_this.userInfo.username)
							uni.switchTab({
								url:"/pages/index/index"
							})
						}
					})
				}).catch(errors => {
					uni.showToast({
						icon: 'error',
						title: '校验失败'
					})
				})
			},
			leftClick() {
				console.log('leftClick');
			}
			// // 重置
			// reset() {
			// 	this.$refs.form.resetFields();
			// 	this.$refs.form.clearValidate();
			// },
		}
	}
</script>

<style>

</style>