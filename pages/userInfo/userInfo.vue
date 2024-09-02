
<template>
	<view class="my">
		<!-- <uv-image class="img" :src="myInfo.userBg" mode="widthFix" @click="up"></uv-image> -->
		<image class="img" src="https://cdn.uviewui.com/uview/album/1.jpg" mode="widthFix" @click="up"></uv-image>
			<viem class="personal">
				<view class="name-profile">
					<image class="head" src="https://cdn.uviewui.com/uview/album/1.jpg" mode="widthFix"
						@click="uppicture" shape="circle"></uv-image>
						<view class="info">
							<view class="name">
								{{myInfo.username ||'默认用户'}}
								
								<uv-button v-if="token==0" @click="tologin" text="登录"
									color="linear-gradient(to right, rgb(199, 216, 6), rgb(11, 213, 163))"></uv-button>
								<uv-button v-else @click="upLogin" text="退出登录"
									color="linear-gradient(to right, rgb(199, 216, 6), rgb(11, 213, 163))"></uv-button>
							</view>
						</view>
				</view>

				<view class="from">
					<uv-list>
						<uv-list-item 
						showArrow
						 title="个人资料"
						 note="个人基本信息" 
						 thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						 thumb-size="lg"
						 rightText="Go =>"
						  link="navigateTo" to="/pages/personaldate/personaldate">
						</uv-list-item>
					</uv-list>
				</view>

			</viem>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:'',
				myInfo: {
					username:''
				}
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token');
			console.log(this.token);
			const value1 = uni.getStorageSync('myInfo');
			console.log(value1);
			this.myInfo.username = value1;
		},

		methods: {
			tologin() {
				uni.redirectTo({
					url: '/pages/login/login'
				});
			},

			upLogin() {
				uni.clearStorageSync();
				uni.reLaunch({
					url:'/pages/userInfo/userInfo'
				})
				console.log('退出登录了');
			},

			uppicture() {
				uni.chooseImage({
					//定义 选择的 数量
					count: 1,
					success: (res) => {
						//获取 图片 链接
						let imgUrl = res.tempFilePaths[0]
						uni.request({
							url: imgUrl,
							//设置arraybuffer对象 类型
							responseType: "arraybuffer",
							success: (res) => {
								if (res.statusCode === 200) {
									let data = res.data
									//转换成 base64编码
									const base64 = uni.arrayBufferToBase64(data)
									uni.request({
										url: "替换为自己的url地址",
										method: "post",
										header: {
											'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
										},
										data: {
											appkey: '替换为自己的appkey值',
											tokenString: this.token,
											imgType: 'jpg',
											serverBase64Img: base64
										},
										success(res) {
											console.log('res', res);
										},
										fail(err) {
											console.log('err', err)
										}
									})
									this.back();
								}
							}
						})
					}
				})
			},

			up() {
				uni.chooseImage({
					//定义 选择的 数量
					count: 1,
					success: (res) => {
						//获取 图片 链接
						let imgUrl = res.tempFilePaths[0]
						uni.request({
							url: imgUrl,
							//设置arraybuffer对象 类型
							responseType: "arraybuffer",
							success: (res) => {
								if (res.statusCode === 200) {
									let data = res.data
									//转换成 base64编码
									const base64 = uni.arrayBufferToBase64(data)
									uni.request({
										url: "替换为自己的url地址值",
										method: "post",
										header: {
											'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
										},
										data: {
											appkey: '替换为自己的appkey值',
											tokenString: this.token,
											imgType: 'jpg',
											serverBase64Img: base64
										},
										success(res) {
											console.log('res', res);
										},
										fail(err) {
											console.log('err', err)
										}
									})
									this.back();
								}
							}


						})
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	.img {
		width: 100%;
	}

	.personal {
		height: 600rpx;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7));
		/* 渐变透明白色背景 */
		margin: 20rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin-top: -100rpx;
		position: relative;
		box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
		z-index: 10;
		/* 确保高于其他元素 */

		.name-profile {
			padding: 35rpx;
			display: flex;
			align-items: flex-start;
			position: relative;

			.head {
				margin-top: -10rpx;
				/* 确保头像左边界紧贴容器左边 */
				border-radius: 50%;
				width: 150rpx;
				height: 150rpx;
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 50rpx;
			}

			.name {
				font-size: 35rpx;
				margin-top: -20rpx;
				margin-bottom: 10rpx;
				color: #0c34ba;
				font-weight: 600;
			}

		}

		.from {
			color: #646566;
			margin-top: 80rpx;
			font-size: 40rpx;
		}

	}
</style>