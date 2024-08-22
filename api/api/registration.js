import request from "@/api/request.js"

export const insertRegistration = (params) => {
	return request({
		url: '/patient/addRegisterP',
		method: 'post',
		data: params
	})
}


export const isIn = (params) => {
	return request({
		url: '/patient/isIn',
		method: 'get',
		data: params
	})
}
