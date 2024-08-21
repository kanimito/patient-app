<template>
	<view>
		<uv-form labelPosition="left" :model="model1" :rules="rules" ref="form">
			<uv-form-item label="用户名" prop="userInfo.name" borderBottom>
				<uv-input v-model="model1.userInfo.name" border="none">
				</uv-input>
			</uv-form-item>
			<uv-form-item label="密码" prop="userInfo.name" borderBottom>
				<uv-input v-model="model1.userInfo.password" border="none">
				</uv-input>
			</uv-form-item>
			<uv-button type="primary" text="登录" customStyle="margin-top: 10px" @click="submit"></uv-button>
			<uv-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></uv-button>
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
						password:'',
					},
				},
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
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
						title: '校验通过'
					})
				}).catch(errors => {
					uni.showToast({
						icon: 'error',
						title: '校验失败'
					})
				})
			},
			// 重置
			reset() {
				this.$refs.form.resetFields();
				this.$refs.form.clearValidate();
			},

			hideKeyboard() {
				uni.hideKeyboard()
			}
		}
	}
</script>

<style>

</style>