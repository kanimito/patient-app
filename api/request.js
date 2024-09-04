// 全局请求封装
const base_url = 'http://aph2ag.natappfree.cc'
// 请求超出时间
const timeout = 5000
 
// 需要修改token，和根据实际修改请求头
export default (params) => {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};

	// 获取Token
	const token = uni.getStorageSync('token') || '';

	let header = {
		'X-Token': token,
		'Content-Type': 'application/json;charset=UTF-8',
		'Authorization': `Bearer ${token}`, // 确保Token在Authorization头中
		// 'Tenant-Id': uni.getStorageSync('tenantId') || 'xxx', // avue配置相关
		...params.header
	}
	if (method == "post") {
		header = {
			...header, // 保留原有的header内容
			// 'Authorization': `Bearer ${token}`,  // 确保Token在Authorization头中
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