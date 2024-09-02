import request from "@/api/request.js"

export const alipay = (params) => {
	return request({
		url: '/alipay/pay',
		method: 'get',
		data: params
	})
}
