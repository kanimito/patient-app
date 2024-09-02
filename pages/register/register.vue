<template>
	<view style="padding: 50% 5% 50% 5%;">
		<uv-form labelPosition="left" :model="model1" :rules="rules" ref="form">
			<uv-form-item label="用户名:" prop="userInfo.name" >
				<uv-input placeholder="请输入内容" v-model="model1.userInfo.name" border="surround" clearable>
				</uv-input>
			</uv-form-item>
			<uv-form-item label="密 码:" prop="userInfo.pwd" >
				<uv-input type="password" placeholder="请输入密码" v-model="model1.userInfo.password"  border="surround" clearable>
				</uv-input>
			</uv-form-item>
			<uv-form-item label="重复密码:" prop="userInfo.repwd" >
				<uv-input type="password" placeholder="请输入密码" v-model="model1.userInfo.password"  border="surround" clearable>
				</uv-input>
			</uv-form-item>
			<uv-button type="primary" text="注册" customStyle="margin-top: 10px" @click="submit"></uv-button>
			<view style="margin: 15px 15% 100% 0;"><navigator style="color: blue;" url="/pages/login/login">已有账号，去登录！</navigator></view>
		</uv-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model1: {
					userInfo: {
						name: '',
						password: '',
					},
				},
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.pwd': {
						type: 'String',
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
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					uni.showToast({
						icon: 'success',
						title: '校验通过',
					})
				}).catch(errors => {
					uni.showToast({
						icon: 'error',
						title: '校验失败'
					})
				})
			},
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