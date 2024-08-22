import request from "@/api/request.js"

export const getRecipel = (params) => {
	return request({
		url: '/patient/getRecipel',
		method: 'get',
		data: params
	})
}
