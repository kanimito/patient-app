<template>
	<view>
		<view v-if="!isEditing">
			<image class="head" src="https://cdn.uviewui.com/uview/album/1.jpg" mode="widthFix"
				@click="uppicture" shape="circle"></uv-image>
			<view>真实姓名: {{ userInfo.pname }}</view>
			<view>邮箱: {{ userInfo.pemail }}</view>
			<view>电话: {{ userInfo.ptel }}</view>
			<view>性别: {{ userInfo.psex }}</view>
			<button @click="editProfile">编辑</button>
		</view>
		<view v-else>
			<view>编辑个人资料</view>
			真实姓名: <input v-model="userInfo.pname"  placeholder="请输入姓名" />
			邮箱: <input v-model="userInfo.pemail" placeholder="请输入邮箱" />
			电话: <input v-model="userInfo.ptel" placeholder="请输入电话" />
			性别: <input v-model="userInfo.psex" placeholder="性别" />
			<button @click="saveProfile">保存</button>
			<button @click="cancelEdit">取消</button>
		</view>
	</view>
</template>

<script>
import { personalDate, updatePersonalDate } from'@/api/api/personaldate.js';

	export default {
		data() {
			return {
				isEditing: false,
				token: '',
				userInfo: {
					pname: "",
					pemail: "",
					ptel: "",
					psex: ""
				}
			};
		},

		onLoad() {
			let _this = this;
			this.token = uni.getStorageSync('token');
			console.log( this.token);

			// 通过 post 传递用户 token 到后端查询用户基本信息
			personalDate(_this.token)
				.then(data => {
					console.log(data);
					console.log(data.data.data);
					// 根据返回的数据更新 userInfo
					_this.userInfo.pname = data.data.data.pname;
					_this.userInfo.pemail = data.data.data.pemail;
					_this.userInfo.ptel = data.data.data.ptel;
					_this.userInfo.psex = data.data.data.psex;
					try {
						uni.setStorageSync('userdate',data.data.data);
						console.log('缓存成功');
					} catch (e) {
						console.log('缓存失败');
					}
				})
				.catch(errors => {
					console.error("请求失败：", errors);
				});
		},

		methods: {
			editProfile() {
				this.isEditing = true;
			},
			saveProfile() {
				this.isEditing = false;
				// 这里可以添加保存逻辑，例如发送请求到服务器保存数据
				console.log("this.userInfo",this.userInfo);
				updatePersonalDate(this.userInfo).then(data => {
					console.log(data);
				}).catch(errors => {
					console.error("请求失败：", errors);
				})
			},
			cancelEdit() {
				this.isEditing = false;
				// 取消编辑时，可能需要重置数据
				const value1 = uni.getStorageSync('userdate');
				this.userInfo.pname = value1.pname;
				this.userInfo.pemail = value1.pemail;
				this.userInfo.ptel = value1.ptel;
				this.userInfo.psex = value1.psex;
				
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
			}
		}
	}
</script>


<style scoped>
	view {
		padding: 10px;
	}

	button {
		margin-top: 10px;
		padding: 5px 10px;
		background-color: #007aff;
		color: white;
		border: none;
		border-radius: 5px;
	}

	input {
		margin-top: 10px;
		padding: 5px;
		border: 1px solid #ddd;
		border-radius: 5px;
		width: 70%;
		height: 14px;
		/* box-sizing: border-box; */
	}
	
	.head {
		margin-top: -10rpx;
		/* 确保头像左边界紧贴容器左边 */
		border-radius: 50%;
		width: 150rpx;
		height: 150rpx;
	}
	
</style>