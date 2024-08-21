// 全局请求封装
const base_url = 'http://u4taww.natappfree.cc'
// 请求超出时间
const timeout = 5000
 
// 需要修改token，和根据实际修改请求头
export default (params) => {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {
		// 'X-Token': uni.getStorageSync('token') || '',
		'Content-Type': 'application/json;charset=UTF-8',
		// 'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
		// 'Tenant-Id': uni.getStorageSync('tenantId') || 'xxx', // avue配置相关
		...params.header
	}
	if (method == "post") {
		header = {
			'Content-Type': 'application/json'
		};
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			data: data,
            timeout,
			success(response) {
				const res = response
				// 根据返回的状态码做出对应的操作
				//获取成功
				resolve(res)
			},
			complete() {
				// 不管成功还是失败都会执行
				uni.hideLoading();
				uni.hideToast();
			}
		});
	}).catch(() => {});
};